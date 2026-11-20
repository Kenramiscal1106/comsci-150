import { createContext } from 'svelte';
import type GridCostMinimize from '#lib/simplex/GridCostOptimizer.svelte.ts';
import type PlantDataStore from '#lib/simplex/PlantDataStore.svelte.ts';
import type OptimizationDialogStore from '#lib/components/dialog/OptimizationDialogStore.svelte.ts';

export const [getGridCostOptimizer, initGridCostOptimizer] = createContext<GridCostMinimize>();
export const [getPlantDataStore, initPlantDataStore] = createContext<PlantDataStore>();
export const [getOptimizationDialog, initOptimizationDialog] = createContext<OptimizationDialogStore>()