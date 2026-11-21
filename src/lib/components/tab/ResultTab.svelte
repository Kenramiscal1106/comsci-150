<script lang="ts">

    import {getResultTabs} from "#lib/context.ts";
    import type {Snippet} from "svelte";
    import {cn} from "cn";

    const resultTabs = getResultTabs();

    interface Props {
        activeTab: ActiveTab
        children:Snippet
    }

    let {activeTab, children}:Props = $props()
</script>
<button class={cn("tab", activeTab === resultTabs.activeTab && "tab-active")} onclick={() => resultTabs.changeTab(activeTab)}>
    {@render children()}
</button>

<style>
    .tab {
        display: flex;
        padding: 11px 16px;
        align-items: center;
        gap: 8px;
        box-shadow:0 -2px 0 0 inset var(--border-subtle-contextual, #C6C6C6);
        color: var(--Text-text-primary, #161616);

        /* Fixed heading styles/heading-compact-01 */
        font-size: 14px;
        font-style: normal;
        line-height: 18px; /* 128.571% */
        transition: 70ms all cubic-bezier(0.4, 0.14, 0.3, 1);
    }
    .tab:hover:not(.tab-active) {
        box-shadow:0 -2px 0 0 inset var(--border-strong-contextual, #8D8D8D);
    }
    .tab-active {
        box-shadow:0 -2px 0 0 inset var(--Border-border-interactive, #0F62FE);
        font-weight: 600;
    }
</style>