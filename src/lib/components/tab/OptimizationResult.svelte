<script>
    import {getGridCostOptimizer, getOptimizationDialog, getPlantDataStore} from "#lib/context.ts";
    import Button from "#lib/components/Button.svelte";

    const plantDataStore = getPlantDataStore();
    const gridCostOptimizer = getGridCostOptimizer();
    const optimizationDialog = getOptimizationDialog();
</script>

<div>
    <div>
        <Button onclick={() => optimizationDialog.openDialog()}>Start another optimization</Button>
    </div>
    Solution Found
    <div>
        Number of iterations: {gridCostOptimizer._iteration}
    </div>
    <div>
        Total Minimum Cost (Z): {gridCostOptimizer.answer.toLocaleString('en-US', {
        maximumFractionDigits: 2
    })}
    </div>
    <table class="border border-collapse">
        <thead>
        <tr>
            <th>Plant Group</th>
            {#each {length: plantDataStore.getNumBlocks()} as value, i (i)}

                <th class="border border-collapse min-w-5">B{i + 1}</th>
            {/each}
        </tr>
        </thead>
        <tbody>

        {#each Object.entries(gridCostOptimizer.energyOutput) as [key, values] (key)}
            {#if plantDataStore._barePlantData[key].enabled}
                <tr class="border border-collapse">
                    <td class="border border-collapse">{key}</td>
                    {#each values as blockValue }
                        <td class="border border-collapse min-w-5">{blockValue}</td>
                    {/each}
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>
</div>