<script lang="ts">
    import type {HTMLInputAttributes} from "svelte/elements";
    import type GridCostOptimizer from "#lib/simplex/GridCostOptimizer.svelte.ts";
    import {getGridCostOptimizer} from "#lib/context.ts";
    import type {Snippet} from "svelte";

    interface Props extends HTMLInputAttributes {
        checked: boolean;
        children: Snippet
    }

    let {checked = $bindable(), children, ...otherProps}: Props = $props();
</script>

<div>
    <input type="checkbox" bind:checked={checked} id="co2" {...otherProps}/> <label
        for="co2">{@render children()}</label>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
</style>