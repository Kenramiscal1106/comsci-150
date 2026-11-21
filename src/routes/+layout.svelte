<script lang="ts">
    import './layout.css';
    import './font.css';
    import favicon from '#lib/assets/favicon.svg';
    import type {LayoutProps} from './$types';
    import Header from "#lib/components/Header.svelte";
    import PlantDataStore from "#lib/simplex/PlantDataStore.svelte.ts";
    import GridCostOptimizer from "#lib/simplex/GridCostOptimizer.svelte.ts";
    import {
        initGridCostOptimizer,
        initOptimizationDialog,
        initPlantDataStore,
        initResultTabsStore
    } from "#lib/context.ts";
    import OptimizationDialogStore from "#lib/components/dialog/OptimizationDialogStore.svelte.ts";
    import OptimizationDialog from "#lib/components/dialog/OptimizationDialog.svelte";
    import ResultTabsStore from "#lib/components/tab/ResultTabsStore.svelte.ts";

    const {children}: LayoutProps = $props();

    const plantDataStore = new PlantDataStore();
    const gridCostOptimizer = new GridCostOptimizer();
    gridCostOptimizer.loadPlantData(plantDataStore);
    initPlantDataStore(plantDataStore);
    initGridCostOptimizer(gridCostOptimizer)
    initOptimizationDialog(new OptimizationDialogStore());
    initResultTabsStore(new ResultTabsStore())
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
</svelte:head>

<Header/>
<main class="min-h-screen pt-16 flex flex-col gap-4 p-8 justify-center">
    {@render children()}
</main>
<OptimizationDialog/>
