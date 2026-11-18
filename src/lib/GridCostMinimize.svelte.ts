import type PlantDataStore from '#lib/PlantDataStore.svelte.ts';
import BlocksDataStore from '#lib/BlocksDataStore.ts';
import ConstraintsStore from '#lib/ConstraintsStore.ts';
import { delay } from 'es-toolkit';

export default class GridCostMinimize {
	private hours = 4;
	private _plantDataStore: PlantDataStore | null = null;
	private _tableau: number[][] | null = null;
	_emissionConfig: EmissionConfig = $state({
		enabled: false,
		value: 165000
	});
	private _blocksDataStore: BlocksDataStore = new BlocksDataStore();
	private _shadowPrices: number[] = $state(new Array<number>(this._blocksDataStore.demands.length));
	private _answer: number = $state(-Infinity);
	private tableauPerIteration: number[][][] = [];
	private _noSolutionFound: boolean = true;
	private _energyOutputPerPlant = $state<Record<PlantType, number[]>>({
		coal: [0, 0, 0, 0, 0, 0],
		geothermal: [0, 0, 0, 0, 0, 0],
		oil: [0, 0, 0, 0, 0, 0],
		naturalGas: [0, 0, 0, 0, 0, 0],
		wind: [0, 0, 0, 0, 0, 0],
		solar: [0, 0, 0, 0, 0, 0],
		hydro: [0, 0, 0, 0, 0, 0]
	});
	private _tableauPlantOrder: PlantType[] = $derived.by(() => {
		if (this._plantDataStore === null) return [];
		const array: PlantType[] = [];
		if (this._plantDataStore.coalEnabled) array.push('coal');
		if (this._plantDataStore.naturalGasEnabled) array.push('naturalGas');
		if (this._plantDataStore.geothermalEnabled) array.push('geothermal');
		if (this._plantDataStore.oilEnabled) array.push('oil');
		if (this._plantDataStore.hydroEnabled) array.push('hydro');
		if (this._plantDataStore.solarEnabled) array.push('solar');
		if (this._plantDataStore.windEnabled) array.push('wind');
		return array;
	});
	readonly answer = $derived(this._answer);
	readonly shadowPrices = $derived(this._shadowPrices);
	readonly energyOutput = $derived(this._energyOutputPerPlant);

	loadPlantData(plantDataStore: PlantDataStore) {
		this._plantDataStore = plantDataStore;
	}

	async performCalculation() {
		if (this._tableau == null) {
			this._tableau = [];
		}
		this.setUpTableau();
		this.transposeTableau();
		this.addIdentityColumns();
		this.startSimplex();
	}

	extractAnswer(): void {
		this.storeAnswer();
		this.storeShadowPrices();
		this.storePlantEnergyGeneration();
	}

	private setUpTableau() {
		if (this._tableau == null || this._plantDataStore == null) return;
		const constraintsStore = new ConstraintsStore(this._plantDataStore, this._blocksDataStore);
		constraintsStore.initiateConstraints(this._emissionConfig);
		this._tableau = constraintsStore.getInitialTableau();
	}

	private transposeTableau() {
		if (this._tableau == null) {
			throw new Error('Cannot transpose missing tableau');
		}
		const transposed: number[][] = [];

		for (let colI = 0; colI < this._tableau[0].length; colI++) {
			transposed[colI] = [];
			for (let rowI = 0; rowI < this._tableau.length; rowI++) {
				transposed[colI][rowI] = this._tableau[rowI][colI];
			}
		}
		this._tableau = transposed;
		this._tableau[this._tableau.length - 1] = this._tableau[this._tableau.length - 1].map(
			(item) => item * -1
		);
	}

	private addIdentityColumns() {
		if (this._tableau == null) {
			throw new Error('Cannot add identities in a tableau.');
		}
		const identityMatSize = this._tableau.length;
		for (const [index, row] of this._tableau.entries()) {
			const insertedArray: number[] = new Array(identityMatSize).fill(0).fill(1, index, index + 1);
			row.splice(row.length - 1, 0, ...insertedArray);
		}
	}

	private startSimplex() {
		if (this._tableau == null) return;
		let iteration = 0;
		while (this.hasNegativeInObjectiveRow()) {
			const pivotColumnData = this.findColumn();
			if (pivotColumnData === null) return;
			const pivotRowData = this.findRow(pivotColumnData);

			if (pivotRowData === null || pivotRowData.min === Infinity) {
				this._noSolutionFound = true;
				return;
			}

			this.normalizePivotRow(pivotRowData);
			const pivotElement = this._tableau[pivotRowData.i][pivotColumnData.i];

			for (let i = 0; i < this._tableau.length; i++) {
				if (i === pivotRowData.i) continue;
				const multiplier = this._tableau[i][pivotColumnData.i] / pivotElement;
				for (let j = 0; j < this._tableau[i].length; j++) {
					this._tableau[i][j] = this._tableau[i][j] - this._tableau[pivotRowData.i][j] * multiplier;
				}
			}
			iteration++;
		}
		this._noSolutionFound = true;
	}

	private hasNegativeInObjectiveRow() {
		if (this._tableau == null) return;
		const objectiveFunctionRow = this._tableau[this._tableau.length - 1];
		return objectiveFunctionRow.some((number) => number < 0);
	}

	private findColumn(): { min: number; i: number } | null {
		if (this._tableau == null) return null;
		const objectiveFunctionRow = this._tableau[this._tableau.length - 1];
		return objectiveFunctionRow.reduce<{ min: number; i: number }>(
			(returnValue, curr: number, i: number) => {
				const smaller: boolean = curr < returnValue.min;
				return {
					min: smaller ? curr : returnValue.min,
					i: smaller ? i : returnValue.i
				};
			},
			{ min: Infinity, i: -1 }
		);
	}

	private findRow(pivotCol: { min: number; i: number }): { min: number; i: number } | null {
		if (this._tableau == null) return null;
		return this._tableau.reduce(
			(returnValue, curr, i) => {
				if (i == (this._tableau as number[][]).length - 1) return returnValue;
				const testRatio = curr[curr.length - 1] / curr[pivotCol.i];
				const smaller = testRatio < returnValue.testRatio;
				if (i == (this._tableau?.length as number) - 1 || testRatio <= 0) return returnValue;

				return smaller
					? {
							testRatio,
							min: curr[pivotCol.i],
							i
						}
					: returnValue;
			},
			{ min: Infinity, i: -1, testRatio: Infinity }
		);
	}

	private normalizePivotRow({ min, i }: { min: number; i: number }) {
		if (this._tableau == null) return;
		for (let j = 0; j < this._tableau[i].length; j++) {
			this._tableau[i][j] /= min;
		}
	}

	private storeShadowPrices() {
		this.resetShadowPrices();
		if (this._tableau == null || this._noSolutionFound) return;
		const activeVariable: (number | null)[] = new Array(6).fill(null);
		this._tableau.forEach((row, i) => {
			row.forEach((number, numI) => {
				if (number === 1) {
					if (numI <= 5) {
						activeVariable[numI] = i;
					}
				}
			});
		});
		this._shadowPrices = activeVariable.map((item, i) => {
			if (this._tableau == null) return 0;
			if (item == null) return 0;
			return Number((this._tableau[item][this._tableau[i].length - 1] / 4).toFixed(2));
		});
		console.log(this._tableau.map((row) => row[row.length - 1] / 4));
		console.log($state.snapshot(this._shadowPrices));
	}

	private storePlantEnergyGeneration() {
		this.resetPlantEnergyGeneration();
		if (this._tableau == null || this._noSolutionFound) return;
		const originalColumnCount = this._tableau[0].length - this._tableau.length - 1;

		for (let j = originalColumnCount; j < this._tableau[0].length - 2; j++) {
			const plantType = this._tableauPlantOrder[Math.floor((j - originalColumnCount) / 6)];
			const block = (j - originalColumnCount) % 6;
			this._energyOutputPerPlant[plantType][block] = Number(
				this._tableau[this._tableau.length - 1][j].toFixed(2)
			);
		}
	}

	private storeAnswer() {
		this.resetAnswer();
		if (this._tableau == null || this._noSolutionFound) return;
		this._answer = this._tableau[this._tableau.length - 1][this._tableau[0].length - 1];
	}

	private resetAnswer() {
		this._answer = 0;
	}

	private resetPlantEnergyGeneration() {
		this._energyOutputPerPlant = {
			coal: [0, 0, 0, 0, 0, 0],
			geothermal: [0, 0, 0, 0, 0, 0],
			oil: [0, 0, 0, 0, 0, 0],
			naturalGas: [0, 0, 0, 0, 0, 0],
			wind: [0, 0, 0, 0, 0, 0],
			solar: [0, 0, 0, 0, 0, 0],
			hydro: [0, 0, 0, 0, 0, 0]
		};
	}

	private resetShadowPrices() {
		this._shadowPrices = new Array(6).fill(0);
	}
}
