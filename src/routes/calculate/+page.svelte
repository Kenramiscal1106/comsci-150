<script lang="ts">
    import Button from "#lib/components/Button.svelte";
    import {getGridCostOptimizer, getOptimizationDialog, getPlantDataStore, getResultTabs} from "#lib/context.ts";
    import ResultTabs from "#lib/components/tab/ResultTabs.svelte";
    import ResultTab from "#lib/components/tab/ResultTab.svelte";
    import IterationTableau from "#lib/components/tab/IterationTableau.svelte";
    import OptimizationResult from "#lib/components/tab/OptimizationResult.svelte";

    const optimizationDialog = getOptimizationDialog();

    const gridCostOptimizer = getGridCostOptimizer();
    const resultTabs = getResultTabs();
</script>

{#if !gridCostOptimizer._completed && !gridCostOptimizer._solutionFound}
    <div class="h-full w-full flex flex-col justify-center items-center">
        <div>
            <h1>Yet to cook</h1>
            <p>You haven't started an optimization yet.</p>
            <Button onclick={() => {optimizationDialog.openDialog()}}>Start optimizing</Button>
        </div>
    </div>
{/if}
{#if gridCostOptimizer._completed}
    {#if gridCostOptimizer._solutionFound}
        <ResultTabs>
            <ResultTab activeTab="results">
                Results
            </ResultTab>
            <ResultTab activeTab="simplex">
                Simplex Tableau Iterations
            </ResultTab>
        </ResultTabs>
        {#if resultTabs.activeTab === "results"}
            <OptimizationResult />
        {:else if resultTabs.activeTab === "simplex"}
            <IterationTableau/>
        {/if}
    {:else}
        <div>
            Cannot found solution
            <Button onclick={() => optimizationDialog.openDialog()}>Start another optimization</Button>
        </div>
    {/if}
{/if}
<!--{:else}
<div>
    Cannot
</div>-->
