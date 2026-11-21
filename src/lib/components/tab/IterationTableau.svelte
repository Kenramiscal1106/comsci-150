<script lang="ts">
    import {getGridCostOptimizer} from "#lib/context.ts";
    import Button from "#lib/components/Button.svelte";

    const gridCostOptimizer = getGridCostOptimizer();
    let iterationIndex: number = $state(0);
</script>

<div class="flex items-center gap-6 justify-center">

    <Button onclick={() => iterationIndex -= iterationIndex === 0 ? 0 : 1}>Previous iteration</Button>
    <div>Iteration {iterationIndex + 1}</div>
    <Button onclick={() => iterationIndex += iterationIndex === gridCostOptimizer.tableauPerIteration.length - 1 ? 0 : 1}>
        Next iteration
    </Button>
</div>
<div>
<div class="overflow-x-auto">
        <table>
            <tbody>
            {#each gridCostOptimizer.tableauPerIteration[iterationIndex] as tableauRows}
                <tr>
                    {#each tableauRows as tableauColumn}
                        <td class="text-right min-w-24 h-6">{tableauColumn.toLocaleString("en-US", {maximumFractionDigits: 2})}</td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    table {
        background: var(--layer-contextual, #F4F4F4);
        font-size:12px;
    }

    td {
        padding:0 16px;
    }

    tr:not(:first-child) {
        border-top: 1px solid var(--border-subtle-contextual, #C6C6C6);

    }
</style>