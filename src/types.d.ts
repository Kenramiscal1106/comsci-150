
/**
 * Array in each block, number if all the same
 */
type OperatingCost = number[] | number;

type PlantType = "coal" | "naturalGas" | "geothermal" | "oil" | "solar" | "wind" | "hydro";
type PlantData = {
	cap: number;
	emissionPerTon: number;
	operatingCost: OperatingCost;
	enabled: boolean;
}
type PlantRecord = Record<PlantType, PlantData>;

type Constraint = (Partial<Record<PlantType, number[]>> & {b: number});

interface IConstraintsStore {
	getInitialTableau(groups:number): number[][]
}

type BlockData = {
	demand: number;
	wind: number;
	solar: number;
}
