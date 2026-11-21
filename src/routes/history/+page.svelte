<script lang="ts">
    import {retrieveOptimizationHistory} from "#lib/localStorage.ts";
    import InfoCard from "#lib/components/InfoCard.svelte";
    import Button from "#lib/components/Button.svelte";

    const history = retrieveOptimizationHistory();
</script>
<div>

    {#if history.length !== 0}
        {#each history as optimizationRecord}
            <h4 class="my-2 text-lg font-medium">{new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeStyle: "medium"
            }).format(new Date(optimizationRecord.dateTime))}</h4>
            <div class="flex flex-col gap-4">
                <div class="flex gap-4">
                    <InfoCard title="Total Minimum Cost (Z)" value={optimizationRecord.answer.toLocaleString('en-US', {
            maximumFractionDigits: 2
        })}/>
                    <InfoCard title="Number of iterations" value={optimizationRecord.iterations.toString()}/>
                </div>
                <table class="self-start">
                    <caption>
                        <h2>Unknowns</h2>
                    </caption>
                    <thead>

                    <tr>
                        <th>Plant Group</th>
                        {#each {length: 6} as value, i (i)}

                            <th>B{i + 1}</th>
                        {/each}
                    </tr>
                    </thead>
                    <tbody>

                    {#each Object.entries(optimizationRecord.energyOutputPerPlant) as [key, values] (key)}
                        {#if values.some(value => value !== 0)}
                            <tr>
                                <td>{key}</td>
                                {#each values as blockValue }
                                    <td class="number-data">{blockValue}</td>
                                {/each}
                            </tr>
                        {/if}
                    {/each}
                    </tbody>
                </table>

                <table class="self-start">
                    <caption>
                        <h2>Prices Per block (In Pesos)</h2>
                    </caption>
                    <thead>

                    <tr>
                        {#each optimizationRecord.shadowPrices as value, i (i)}

                            <th>Block {i + 1}</th>
                        {/each}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {#each optimizationRecord.shadowPrices as shadowPrice}
                            <td class="number-data">{shadowPrice}</td>
                        {/each}
                    </tr>
                    </tbody>
                </table>
            </div>
            <hr class="my-6"/>
        {/each}
    {/if}
</div>

<style>
    table {
        background: var(--layer-contextual, #F4F4F4);

        caption {
            background: var(--layer-contextual, #F4F4F4);
            color: var(--Text-text-primary, #161616);
            padding: 16px 16px 24px 16px;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px; /* 140% */
            text-align: left;
        }

        th, td {
            height: 40px;
            padding: 16px;
        }

        th {
            background: var(--layer-accent-contextual, #E0E0E0);
            font-weight: 600;
        }

        tbody tr {
            border-top: 1px solid var(--border-subtle-contextual, #C6C6C6);
        }

        td.number-data {
            text-align: right;
        }
    }
</style>