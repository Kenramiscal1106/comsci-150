<script lang="ts">

import MenuItem from "#lib/components/MenuItem.svelte";
</script>
<header>
        <div class="site-name">
            GridSim
        </div>
        <nav>
            <MenuItem href="/calculate">
                Calculate
            </MenuItem>
            <MenuItem href="/history">
                History
            </MenuItem>
            <MenuItem href="/about">
                About
            </MenuItem>
        </nav>
</header>

<style>
    header {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        border-bottom: 1px solid #E0E0E0;
        background: #FFF;
        height: 48px;
        align-self: stretch;
    }

    nav {
        display: flex;
    }

    .site-name {
        color: var(--Text-text-primary, #161616);
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        letter-spacing: 0.16px;
        display: flex;
        padding: 15px 32px 15px 8px;
        align-items: center;
        gap: 3px;
        align-self: stretch;
    }
</style>