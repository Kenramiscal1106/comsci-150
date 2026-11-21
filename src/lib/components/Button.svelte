<script lang="ts">
    import type {Snippet} from "svelte";
    import {cn} from "cn";
    import type {HTMLButtonAttributes} from "svelte/elements";

    interface Props {
        variant?: ButtonVariant;
        size?: ButtonSize;
        children: Snippet;
    }

    let {
        size = "medium",
        variant = "primary",
        children,
        class: className,
        ...buttonAttributes
    }: Props & HTMLButtonAttributes = $props();
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
        transition: 70ms all cubic-bezier(0.4, 0.14, 0.3, 1);
    }

    button:focus {
        outline: 1px solid #fff;
        outline-offset: -3px;
    }

    .medium {
        display: flex;
        padding: 11px 16px 11px 16px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
    }

    .primary {
        background: var(--Button-button-primary, #0F62FE);
        color: white;
    }

    .primary:hover {
        background: var(--Button-button-primary-hover, #0050E6);
    }

    .primary:active {
        background: var(--Button-button-primary-active, #002D9C);
    }

    .secondary {
        background: var(--Button-button-secondary, #393939);
        color: white;
    }

    .secondary:hover {
        background: var(--Button-button-secondary-hover, #474747);
    }
    .secondary:active {
        background: var(--Button-button-secondary-active, #6F6F6F);
    }

</style>