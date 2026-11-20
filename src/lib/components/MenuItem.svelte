<script lang="ts">
    import type {Snippet} from "svelte";
    import {cn} from "cn";
    import {page} from "$app/state"

    interface Props {
        href: string;
        children: Snippet;
    }
    const {href, children}: Props = $props();
    // const
    // $inspect(page.route)
</script>

<a {href} class={page.route.id === href ? "active" : ""}>
    {@render children()}
</a>

<style>
    a {
        display: flex;
        padding: 15px 16px;
        align-items: center;
        gap: 8px;
        color: var(--Text-text-primary, #161616);

        /* Body styles/body-compact-01 */
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 128.571% */

    }

    a:hover {
        background: var(--Background-background-hover, rgba(141, 141, 141, 0.12));
    }

    a:active {
        background: var(--Background-background-active, rgba(141, 141, 141, 0.50));
    }

    a:focus-visible, a.active:focus-visible {
        box-shadow: 0 0 0 3px inset var(--Border-border-interactive, #0F62FE);
        outline:none;
    }

    a.active {
        box-shadow: 0 -3px 0 0 inset var(--Border-border-interactive, #0F62FE);
        background: var(--Transparent, rgba(255, 255, 255, 0.00));
    }
</style>
