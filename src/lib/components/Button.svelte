<script lang="ts">
    import type {Snippet} from "svelte";
    import {cn} from "cn";
    import type {HTMLButtonAttributes} from "svelte/elements";

    interface Props {
        style?: ButtonStyle;
        size?: ButtonSize;
        children: Snippet;
    }
    let {size = "medium", style = "primary", children, ...buttonAttributes}: Props & HTMLButtonAttributes = $props();
</script>

<button class={cn(size, style)} {...buttonAttributes}>
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

</style>