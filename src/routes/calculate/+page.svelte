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
    <div class=" flex flex-col justify-center items-center self-center">
        <!--        <div>-->
        <h1 class="text-3xl font-medium">Yet to cook</h1>
        <p class="mb-3">You haven't started an optimization yet.</p>
        <Button onclick={() => {optimizationDialog.openDialog()}}>Start optimizing</Button>
        <!--        </div>-->
    </div>
{/if}
{#if gridCostOptimizer._completed}
    <div class="mb-auto gap-4 flex flex-col">
        <ResultTabs>
            <ResultTab activeTab="results">
                Results
            </ResultTab>
            <ResultTab activeTab="simplex">
                Simplex Tableau Iterations
            </ResultTab>
        </ResultTabs>
        {#if resultTabs.activeTab === "results"}
            <OptimizationResult/>
        {:else if resultTabs.activeTab === "simplex"}
            <IterationTableau/>
        {/if}
    </div>
    <!--{#if gridCostOptimizer._solutionFound}-->
    <!--{:else}-->
    <!--    <div class="flex flex-col justify-center items-center">-->
    <!--        <div>-->
    <!--            <h2 class="text-2xl font-medium">-->
    <!--                Cannot found solution-->
    <!--            </h2>-->
    <!--            <p>With the selected plant groups and carbon emission constraints, </p>-->
    <!--            <Button onclick={() => optimizationDialog.openDialog()}>Change optimization configuration</Button>-->

    <!--        </div>-->
    <!--    </div>-->
    <!--{/if}-->
{/if}
