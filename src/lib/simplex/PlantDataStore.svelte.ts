export default class PlantDataStore {
	private _blocks = 6;
	private _variableRates: number[] = [1, 1.01, 1.03, 1.05, 1.04, 1.02];
	_barePlantData: PlantRecord = $state({
		coal: {
			emissionPerTon: 0.95,
			cap: 7000,
			operatingCost: this.computeVariableCosts(3800),
			enabled: true
		},
		naturalGas: {
			emissionPerTon: 0.4,
			cap: 3300,
			operatingCost: this.computeVariableCosts(6500),
			enabled: true
		},
		geothermal: {
			emissionPerTon: 0.1,
			cap: 800,
			operatingCost: this.computeVariableCosts(1500),
			enabled: true
		},
		oil: {
			emissionPerTon: 0.75,
			cap: 1500,
			operatingCost: this.computeVariableCosts(14000),
			enabled: true
		},
		hydro: { emissionPerTon: 0, cap: 2500, operatingCost: 300, enabled: true },
		solar: { emissionPerTon: 0, cap: 2500, operatingCost: 40, enabled: false },
		wind: { emissionPerTon: 0, cap: 400, operatingCost: 60, enabled: true }
	});

	private computeVariableCosts(base: number): number[] {
		return this._variableRates.map((rate) => rate * base);
	}

	getNumBlocks(): number {
		return this._blocks;
	}

	readonly plantData = $derived(this._barePlantData);
	coalEnabled = $derived(this._barePlantData.coal.enabled);
	naturalGasEnabled = $derived(this._barePlantData.naturalGas.enabled);
	geothermalEnabled = $derived(this._barePlantData.geothermal.enabled);
	oilEnabled = $derived(this._barePlantData.oil.enabled);
	hydroEnabled = $derived(this._barePlantData.hydro.enabled);
	solarEnabled = $derived(this._barePlantData.solar.enabled);
	windEnabled = $derived(this._barePlantData.wind.enabled);

	updateFromDialog(plantData: Record<PlantType, boolean>) {
		for (const key of Object.keys(plantData) as Array<keyof typeof plantData>) {
			this._barePlantData[key].enabled = plantData[key];
		}
	}
}
