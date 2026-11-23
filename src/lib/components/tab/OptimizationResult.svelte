<script>
    import {getGridCostOptimizer, getOptimizationDialog, getPlantDataStore} from "#lib/context.ts";
    import Button from "#lib/components/Button.svelte";
    import InfoCard from "#lib/components/InfoCard.svelte";

    const plantDataStore = getPlantDataStore();
    const gridCostOptimizer = getGridCostOptimizer();
    const optimizationDialog = getOptimizationDialog();
</script>

<div class="flex flex-col gap-4">
    <div>
        <Button onclick={() => optimizationDialog.openDialog()}>Start another optimization</Button>
    </div>
    <div class="flex gap-4">
        <InfoCard title="Total Minimum Cost (Z)" value={gridCostOptimizer._solutionFound ? gridCostOptimizer.answer.toLocaleString('en-US', {
            maximumFractionDigits: 2
        }) : "--"}/>
        <InfoCard title="Number of iterations" value={gridCostOptimizer._iteration.toString()}/>
    </div>
    {#if gridCostOptimizer._solutionFound}
        <table class="self-start">
            <caption>
                <h2>Unknowns</h2>
            </caption>
            <thead>

            <tr>
                <th>Plant Group</th>
                {#each {length: plantDataStore.getNumBlocks()} as _, i (i)}

                    <th>B{i + 1}</th>
                {/each}
            </tr>
            </thead>
            <tbody>

            {#each Object.entries(gridCostOptimizer.energyOutput) as [key, values] (key)}
                {#if plantDataStore._barePlantData[key].enabled}
                    <tr>
                        <td>{key}</td>
                        {#each values as blockValue }
                            <td class="number-data">{blockValue}</td>
                        {/each}
                    </tr>
                {/if}
            {/each}
            </tbody>
        </table>

        <table class="self-start">
            <caption>
                <h2>Prices Per block (In Pesos)</h2>
            </caption>
            <thead>

            <tr>
                {#each gridCostOptimizer.shadowPrices as value, i (i)}

                    <th>Block {i + 1}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            <tr>
                {#each gridCostOptimizer.shadowPrices as shadowPrice}
                    <td class="number-data">{shadowPrice}</td>
                {/each}
            </tr>
            </tbody>
        </table>
        {:else}
        <h2 class="text-xl font-bold">The problem is infeasible</h2>
    {/if}
</div>

<style>
    table {
        background: var(--layer-contextual, #F4F4F4);

        caption {
            background: var(--layer-contextual, #F4F4F4);
            color: var(--Text-text-primary, #161616);
            padding: 16px 16px 24px 16px;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px; /* 140% */
            text-align: left;
        }

        th, td {
            height: 40px;
            padding: 16px;
        }

        th {
            background: var(--layer-accent-contextual, #E0E0E0);
            font-weight: 600;
        }

        tbody tr {
            border-top: 1px solid var(--border-subtle-contextual, #C6C6C6);
        }

        td.number-data {
            text-align: right;
        }
    }
</style>