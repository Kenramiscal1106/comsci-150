<script lang="ts">
	import './layout.css';
	import './font.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import Header from "#lib/components/Header.svelte";
	import PlantDataStore from "#lib/simplex/PlantDataStore.svelte.ts";
	import GridCostOptimizer from "#lib/simplex/GridCostOptimizer.svelte.ts";
	import {initGridCostOptimizer, initOptimizationDialog, initPlantDataStore} from "#lib/context.ts";
	import OptimizationDialogStore from "#lib/components/dialog/OptimizationDialogStore.svelte.ts";
	import OptimizationDialog from "#lib/components/dialog/OptimizationDialog.svelte";

	const { children }: LayoutProps = $props();

	const plantDataStore = new PlantDataStore();
	const gridCostOptimizer = new GridCostOptimizer();
	gridCostOptimizer.loadPlantData(plantDataStore);
	initPlantDataStore(plantDataStore);
	initGridCostOptimizer(gridCostOptimizer)
	initOptimizationDialog(new OptimizationDialogStore());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<main class="min-h-screen h-screen">
	{@render children()}
</main>
<OptimizationDialog />
