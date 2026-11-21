<script lang="ts">
    import {getGridCostOptimizer} from "#lib/context.ts";
    import Button from "#lib/components/Button.svelte";

    const gridCostOptimizer = getGridCostOptimizer();
    let iterationIndex: number = $state(0);
</script>

<div class="flex items-center gap-6">

    <Button onclick={() => iterationIndex -= iterationIndex === 0 ? 0 : 1}>Previous iteration</Button>
    <div>{iterationIndex}</div>
    <Button onclick={() => iterationIndex += iterationIndex === gridCostOptimizer.tableauPerIteration.length - 1 ? 0 : 1}>
        Next iteration
    </Button>
</div>
<div>
    <div class="overflow-x-auto">
        <table class="border border-collapse">
            <thead></thead>
            <tbody>
            {#each gridCostOptimizer.tableauPerIteration[iterationIndex] as tableauRows}
                <tr>
                    {#each tableauRows as tableauColumn}
                        <td class="border border-collapse text-right min-w-10">{tableauColumn.toLocaleString("en-US", {maximumFractionDigits: 2})}</td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>