<script>
    const props = $props();
    $inspect(props);
</script>

<svelte:head>
    <title>About | Gridsim</title>
</svelte:head>


<div class="manual">
    {#if props.data}
        {@render props.data.content()}
    {/if}
    <hr>
    <h2>Starting a grid optimization</h2>
    <ol class="instructions">
        <li>
            To start a grid operation, navigate to the Calculate tab found in the top bar
            <img src="/images/help/top-bar.png"
                 alt="A top navigation bar with calculate, history, and about tabs laid out sequentially">
            <p>If you haven't started a calculation, this screen may appear</p>
            <img src="/images/help/empty-calculation.png"
                 alt="An empty screen state with the text Yet to cook: you haven't started an optimization yet">
        </li>
        <li>If this screen appears, just click the Start Optimizing button to start your calculation. After that,
                you will see this modal, that will let you select what power plant groups you want to include
            <img src="/images/help/plant-group-modal.png"
                 alt="A modal that shows a checkbox modal to select all plant groups you want to include">
        </li>
        <li>
            After you clicked next, you will see the next part, which is a prompt to enable CO2 limit
            <img src="/images/help/emission-config-modal.png"
                 alt="A prompt that will ask you if you want to enable a CO2 limit"/>
        </li>
        <li>Clicking Compute Optimized Operation will give you the result you want, but there are will be two types
                of result: A valid and an infeasible solution
            <img src="/images/help/valid-result.png"
                 alt="A window that shows you the final solution, the iteration, and the variables">
            <img src="/images/help/infeasible-result.png"
                 alt="A ui that shows you the message the problem is infeasible">
        </li>
    </ol>
    <hr/>
    <h2>Rerunning a grid optimization</h2>
    <p>You can click "Start another optimization" and start another grid optimization.</p>
    <hr/>
    <h2>Sample Optimization Run</h2>
    <h3>Sample Run 1</h3>
    <p>Coal, Natural Gas, Hydro, Oil-based, Solar, Wind (Geothermal not selected). CO2 cap: OFF</p>
    <img src="/images/help/sample-run-1.png"
         alt="A result with 34 iterations and 1.149 billion as the total iteration of the cost">
    <h3>Sample Run 2</h3>
    <p>Plant groups selected: Coal, Natural Gas, Geothermal, Hydro, Oil-based, Wind (Solar not selected). CO2 cap: ON
        (limit 180,000 t/day)</p>
    <img src="/images/help/sample-run-2.png"
         alt="A result with 39 iterations and 1.181 billion as the Minimum Cost (Z)">
    <h3>Sample Run 3</h3>
    <p>Plant groups selected: Coal, Natural Gas, Geothermal, Hydro, Oil-based, Wind (Solar not selected). CO2 cap: ON
        (limit 165,000 t/day)</p>
    <img src="/images/help/sample-run-3.png" alt="A result showing that the optimization operation is infeasible">
</div>

<style>
    @reference "tailwindcss";
    :global(.manual) {
        @apply max-w-2xl mx-auto;
        :global(table) {
            background: var(--layer-contextual, #F4F4F4);

            :global(caption) {
                background: var(--layer-contextual, #F4F4F4);
                color: var(--Text-text-primary, #161616);
                padding: 16px 16px 24px 16px;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: 28px; /* 140% */
                text-align: left;
            }

            :global(th, td) {
                height: 40px;
                padding: 16px;
            }

            :global(th) {
                background: var(--layer-accent-contextual, #E0E0E0);
                font-weight: 600;
            }

            :global(tbody tr) {
                border-top: 1px solid var(--border-subtle-contextual, #C6C6C6);
            }

            :global(td.number-data) {
                text-align: right;
            }
        }

        :global(p, h1, h2, h3) {
            @apply my-4;
        }

        :global(h1) {
            @apply text-3xl;
        }
        :global(h2) {
            @apply text-2xl;
        }
        :global(h3) {
            @apply text-xl;
        }
        :global(ol) {
            @apply list-decimal list-inside;
        }
        :global(ul) {
            @apply list-disc list-inside;
        }
        :global(ol.instructions li, ol.instructions img) {
            @apply my-3;
        }
        :global(h1, h2, h3, h4, h5 ,h6) {
            @apply font-semibold;
        }
        :global(hr) {
            @apply border-neutral-200 my-3 border-2;
        }
        :global(a) {
            color:#0F62FE;
            text-decoration: underline;

        }

        :global(code, pre code *) {
            font-family: Consolas, "Courier New", monospace;
            font-size:14px;
        }
    }
</style>