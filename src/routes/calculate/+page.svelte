<script>
    import Button from "#lib/components/Button.svelte";
    import {getGridCostOptimizer, getOptimizationDialog} from "#lib/context.ts";
    const optimizationDialog = getOptimizationDialog();
</script>

<!--
<script lang="ts">

    import {getGridCostOptimizer, getPlantDataStore} from "#lib/context.ts";

    const plantDataStore = getPlantDataStore();
    const tableauSolver = getGridCostOptimizer();
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
<input type="checkbox" bind:checked={tableauSolver._emissionConfig.enabled} /> Limit CO2 <input type="number" bind:value={tableauSolver._emissionConfig.value} />
<br/>
<button onclick={() => {tableauSolver.performCalculation();tableauSolver.extractAnswer()}}>
    Submit brah
</button>-->
<div class="h-full w-full flex flex-col justify-center items-center">
    <div>

    <h1>Yet to cook</h1>
        <p>You haven't started an optimization yet.</p>
<!-- svelte-no-check        -->
        <Button onclick={() => {optimizationDialog.openDialog()}}>Start optimizing</Button>
    </div>
</div>
