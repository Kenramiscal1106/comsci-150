import type PlantDataStore from '#lib/PlantDataStore.svelte.ts';
import type BlocksDataStore from '#lib/BlocksDataStore.ts';

export default class ConstraintsStore implements IConstraintsStore {
	private readonly plantDataStore: PlantDataStore;
	private readonly blocksDataStore: BlocksDataStore;

	constructor(plantDataStore: PlantDataStore, blocksDataStore: BlocksDataStore) {
		this.plantDataStore = plantDataStore;
		this.blocksDataStore = blocksDataStore;
	}

	private constraints: Constraint[] = [];

	private addDemandConstraint(): void {
		const numBlocks = this.plantDataStore.getNumBlocks();
		for (let i = 0; i < numBlocks; i++) {
			this.constraints.push({
				b: this.blocksDataStore.demands[i].demand,
				coal: new Array<number>(numBlocks).fill(0).fill(1, i, i + 1),
				naturalGas: new Array<number>(numBlocks).fill(0).fill(1, i, i + 1),
				geothermal: new Array<number>(numBlocks).fill(0).fill(1, i, i + 1),
				hydro: new Array<number>(numBlocks).fill(0).fill(1, i, i + 1),
				oil: new Array<number>(numBlocks).fill(0).fill(1, i, i + 1),
				solar: new Array<number>(numBlocks).fill(0).fill(1, i, i + 1),
				wind: new Array<number>(numBlocks).fill(0).fill(1, i, i + 1)
			});
		}
	}

	private addCapacityConstraints(): void {
		const numBlocks = this.plantDataStore.getNumBlocks();
		const { demands } = this.blocksDataStore;
		for (const [key, value] of Object.entries(this.plantDataStore.plantData).filter(
			([_, value]) => value.enabled
		)) {
			for (let t = 0; t < numBlocks; t++) {
				const obj: Constraint = {
					b:
						-value.cap *
						// @ts-ignore
						(key in demands[t] ? demands[t][key] : 1)
				};
				obj[key as PlantType] = new Array<number>(numBlocks).fill(0).fill(-1, t, t + 1);
				this.constraints.push(obj);
			}
		}
	}

	private addCoalMinimumConstraint(): void {
		if (!this.plantDataStore.coalEnabled) return;
		const numBlocks = this.plantDataStore.getNumBlocks();
		const { coal } = this.plantDataStore.plantData;
		for (let t = 0; t < numBlocks; t++) {
			const obj: Constraint = {
				b: coal.cap * 0.4,
				coal: new Array<number>(numBlocks).fill(0).fill(1, t, t + 1)
			};
			this.constraints.push(obj);
		}
	}

	private addCoalRampingConstraint(): void {
		if (!this.plantDataStore.coalEnabled) return;
		const numBlocks = this.plantDataStore.getNumBlocks();
		const outputDifference = 1500;
		for (let t = 0; t < numBlocks - 1; t++) {
			const positiveConstraint: Constraint = {
				b: -outputDifference,
				coal: new Array<number>(numBlocks)
					.fill(0)
					.fill(1, t, t + 1)
					.fill(-1, t + 1, t + 2)
			};
			const negativeConstraint: Constraint = {
				b: -outputDifference,
				coal: new Array<number>(numBlocks)
					.fill(0)
					.fill(-1, t, t + 1)
					.fill(1, t + 1, t + 2)
			};
			this.constraints.push(positiveConstraint, negativeConstraint);
		}
	}

	private addHydroDamConstraint(): void {
		if (!this.plantDataStore.hydroEnabled) return;
		const numBlocks = this.plantDataStore.getNumBlocks();
		const maxDamEnergyHold = 8000;
		this.constraints.push({
			hydro: new Array<number>(numBlocks).fill(-4),
			b: -maxDamEnergyHold
		});
	}

	private addCarbonEmissionConstraint(emissionValue: number): void {
		const numBlocks = this.plantDataStore.getNumBlocks();
		const obj: Constraint = { b: -emissionValue };
		for (const [key, value] of Object.entries(this.plantDataStore.plantData)) {
			obj[key as PlantType] = new Array<number>(numBlocks).fill(-value.emissionPerTon * 4);
		}
		this.constraints.push(obj);
	}

	private addObjectiveFunction() {
		this.constraints.push({
			coal: this.getSpreadOperatingCost(this.plantDataStore.plantData.coal),
			naturalGas: this.getSpreadOperatingCost(this.plantDataStore.plantData.naturalGas),
			geothermal: this.getSpreadOperatingCost(this.plantDataStore.plantData.geothermal),
			oil: this.getSpreadOperatingCost(this.plantDataStore.plantData.oil),
			solar: this.getSpreadOperatingCost(this.plantDataStore.plantData.solar),
			hydro: this.getSpreadOperatingCost(this.plantDataStore.plantData.hydro),
			wind: this.getSpreadOperatingCost(this.plantDataStore.plantData.wind),
			b: 0
		});
	}

	initiateConstraints({ enabled: hasEmissionCap, value: emissionValue }: EmissionConfig): void {
		this.addDemandConstraint();
		this.addCapacityConstraints();
		this.addCoalMinimumConstraint();
		this.addCoalRampingConstraint();
		this.addHydroDamConstraint();
		if (hasEmissionCap) this.addCarbonEmissionConstraint(emissionValue);
		this.addObjectiveFunction();
	}

	getInitialTableau(): number[][] {
		return this.constraints.map((constraint) => this.parseEachConstraint(constraint));
	}

	private parseEachConstraint(constraint: Constraint): number[] {
		const accumulator: number[] = [];
		const numBlocks = this.plantDataStore.getNumBlocks();
		const nullVector = this.emptyArray(numBlocks);
		accumulator.push(
			...(this.plantDataStore.coalEnabled ? (constraint.coal ?? nullVector) : []),
			...(this.plantDataStore.naturalGasEnabled ? (constraint.naturalGas ?? nullVector) : []),
			...(this.plantDataStore.geothermalEnabled ? (constraint.geothermal ?? nullVector) : []),
			...(this.plantDataStore.oilEnabled ? (constraint.oil ?? nullVector) : []),
			...(this.plantDataStore.hydroEnabled ? (constraint.hydro ?? nullVector) : []),
			...(this.plantDataStore.solarEnabled ? (constraint.solar ?? nullVector) : []),
			...(this.plantDataStore.windEnabled ? (constraint.wind ?? nullVector) : []),
			constraint.b
		);
		return accumulator;
	}
	private emptyArray(length: number): number[] {
		return new Array<number>(length).fill(0);
	}

	private getSpreadOperatingCost(plantData: PlantData): number[] {
		return this.spreadToArray(plantData.operatingCost, this.plantDataStore.getNumBlocks()).map(
			(value) => value * 4
		);
	}

	private spreadToArray(variable: number[] | number, length: number): number[] {
		if (Array.isArray(variable)) return variable;
		return new Array(length).fill(variable);
	}
}
