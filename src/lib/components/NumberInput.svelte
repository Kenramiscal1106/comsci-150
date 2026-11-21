<script lang="ts">
    import type {HTMLInputAttributes} from "svelte/elements";
    import {cn} from "cn";

    interface Props extends HTMLInputAttributes {
        id: string;
        labelText?: string;
        value: number
    }

    let {id, labelText, value = $bindable(), ...otherAttributes}: Props = $props();
</script>

<div class={cn("number-input-container", otherAttributes.disabled ? "disabled" : "")}>
    {#if labelText}
        <label for={id}>{labelText}</label>
    {/if}
    <input type="number" {id} bind:value={value}/>
</div>

<style>
    input[type="number"] {
        all: unset;
        background-color: white;
        padding: 16px;
        transition: 70ms box-shadow cubic-bezier(0.4, 0.14, 0.3, 1);

        &:focus {
            box-shadow: 0 0 0 2px inset var(--Focus-focus, #0F62FE);
        }
    }

    .number-input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    }
</style>