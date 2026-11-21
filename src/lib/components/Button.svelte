<script lang="ts">
    import type {Snippet} from "svelte";
    import {cn} from "cn";
    import type {HTMLButtonAttributes} from "svelte/elements";

    interface Props {
        variant?: ButtonVariant;
        size?: ButtonSize;
        children: Snippet;
    }
    let {size = "medium", variant = "primary", children, class: className, ...buttonAttributes}: Props & HTMLButtonAttributes = $props();
</script>

<button class={cn(size, variant, className)} {...buttonAttributes}>
    {@render children()}
</button>

<style>
    /*.primary {

    }

    .small {

    }

    .medium {

    }

    .large {

    }*/

    button {
        display: flex;
        padding: 11px 64px 11px 16px;
        align-items: center;
        align-self: stretch;
    }
    .medium {
        display: flex;
        padding: 11px 16px 11px 16px;
        justify-content:space-between;
        align-items: center;
        align-self: stretch;
    }

    .primary {
        background: var(--Button-button-primary, #0F62FE);
        color:white;
    }

    .secondary {
        background: var(--Button-button-secondary, #393939);
        color:white;
    }

</style>