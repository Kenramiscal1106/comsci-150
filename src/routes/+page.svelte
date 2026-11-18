<script lang="ts">
    import ConstraintsStore from "#lib/ConstraintsStore.ts";
    import PlantDataStore from "#lib/PlantDataStore.svelte.ts";
    import BlocksDataStore from "#lib/BlocksDataStore.ts";
    import GridCostMinimize from "#lib/GridCostMinimize.svelte.ts";

    const plantDataStore = new PlantDataStore();
    const tableauSolver = new GridCostMinimize();
    tableauSolver.loadPlantData(plantDataStore);
    // tableauSolver.performCalculation()
</script>

<h1>Welcome to Power plant solver</h1>

<input type="checkbox" bind:checked={plantDataStore._barePlantData.coal.enabled}/> coal <br/>
<input type="checkbox" bind:checked={plantDataStore._barePlantData.naturalGas.enabled}/> naturalGas <br/>
<input type="checkbox" bind:checked={plantDataStore._barePlantData.oil.enabled}/> oil <br/>
<input type="checkbox" bind:checked={plantDataStore._barePlantData.geothermal.enabled}/> geothermal <br/>
<input type="checkbox" bind:checked={plantDataStore._barePlantData.hydro.enabled}/> hydro <br/>
<input type="checkbox" bind:checked={plantDataStore._barePlantData.solar.enabled}/> solar <br/>
<input type="checkbox" bind:checked={plantDataStore._barePlantData.wind.enabled}/>  wind <br/>
<br />
<input type="checkbox" bind:checked={tableauSolver._hasEmissionConstraint} /> Limit CO2 <input type="number" bind:value={tableauSolver._emissionValue} />
<br/>
<button onclick={() => {tableauSolver.performCalculation();tableauSolver.extractAnswer()}}>
    Submit brah
</button>