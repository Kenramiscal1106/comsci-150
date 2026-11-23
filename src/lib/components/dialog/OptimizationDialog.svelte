<script lang="ts">
    import {getGridCostOptimizer, getOptimizationDialog, getPlantDataStore} from "#lib/context.ts";
    import TileSelect from "#lib/components/TileSelect.svelte";
    import Button from "#lib/components/Button.svelte";
    import CheckBox from "#lib/components/CheckBox.svelte";
    import NumberInput from "#lib/components/NumberInput.svelte";
    import DialogFloating from "#lib/components/dialog/DialogFloating.svelte";
	import { fade, fly } from "svelte/transition";
    import BezierEasing from "bezier-easing"

    const optimizationDialog = getOptimizationDialog();
</script>
{#if optimizationDialog.open}
    <div class="flex justify-center items-center bg-neutral-600/50 fixed top-0 left-0 z-10 w-screen h-screen"
         in:fade={{
             duration: 100,
             easing: BezierEasing(0, 0, 0.3, 1)
         }}
         out:fade={{
             duration: 100,
             easing: BezierEasing(0.4, 0.14, 1, 1)
         }}>
        <button class="absolute top-0 left-0 w-full h-full -z-10"
                onclick={() => {optimizationDialog.closeDialog()}}
                aria-label="overlay"></button>
        <DialogFloating />
    </div>
{/if}

<style>

</style>