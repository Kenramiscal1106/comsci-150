<script lang="ts">
    import type {HTMLInputAttributes} from "svelte/elements";

    interface Props extends HTMLInputAttributes {
        id: string;
        labelText?: string;
        value: number
    }

    let {id, labelText, value=$bindable()}: Props = $props();
</script>
<div class="number-input-container">
    {#if labelText}
        <label for={id}>{labelText}</label>
    {/if}
    <div>
        <input type="number" {id} bind:value={value}/>
    </div>
</div>

<style>
    input[type="number"] {
        all: unset;
    }

    .number-input-container {
        display: flex;
        padding-bottom: 8px;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
    }
</style>