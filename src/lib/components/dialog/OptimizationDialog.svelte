<script lang="ts">
    import {getGridCostOptimizer, getOptimizationDialog, getPlantDataStore} from "#lib/context.ts";
    import TileSelect from "#lib/components/TileSelect.svelte";
    import Button from "#lib/components/Button.svelte";
    import CheckBox from "#lib/components/CheckBox.svelte";
    import NumberInput from "#lib/components/NumberInput.svelte";

    const plantDataStore = getPlantDataStore();
    const gridCostOptimizer = getGridCostOptimizer();
    const optimizationDialog = getOptimizationDialog();

    $inspect(plantDataStore._barePlantData)
</script>

{#if optimizationDialog.open}
    <div class="flex justify-center items-center bg-neutral-600/50 fixed top-0 left-0 z-10 w-screen h-screen">
        <button class="absolute top-0 left-0 w-full h-full -z-10"
                onclick={() => {optimizationDialog.closeDialog()}}
                aria-label="overlay"></button>
        <div class="dialog">
            <div class="dialog-header">
                <h2>New Grid Optimization</h2>
            </div>
            {#if optimizationDialog.stageI === 0}
                <div class="dialog-content">
                    <div class="dialog-content-description">Select all the types you want to include</div>
                    <div class="dialog-content-proper">
                        <div class="tiles">

                            <TileSelect bind:checked={plantDataStore._barePlantData.coal.enabled} id="coal">
                                {#snippet titleText() }
                                    <span>Coal</span>
                                {/snippet}
                                {#snippet description() }
                                    <span>Cheap but slow</span>
                                {/snippet}
                            </TileSelect>
                            <TileSelect bind:checked={plantDataStore._barePlantData.naturalGas.enabled}
                                        id="natural-gas">
                                {#snippet titleText() }
                                    <span>Natural Gas</span>
                                {/snippet}
                                {#snippet description() }
                                    <span>More expensive than coal, but flexible</span>
                                {/snippet}
                            </TileSelect>
                            <TileSelect bind:checked={plantDataStore._barePlantData.geothermal.enabled} id="geothermal">
                                {#snippet titleText() }
                                    <span>Geothermal</span>
                                {/snippet}
                                {#snippet description() }
                                    <span>Cheap and steady</span>
                                {/snippet}
                            </TileSelect>
                            <TileSelect bind:checked={plantDataStore._barePlantData.oil.enabled} id="oil">
                                {#snippet titleText() }
                                    <span>Oil</span>
                                {/snippet}
                                {#snippet description() }
                                    <span>Most Expensive</span>
                                {/snippet}
                            </TileSelect>
                            <TileSelect bind:checked={plantDataStore._barePlantData.solar.enabled} id="solar">
                                {#snippet titleText() }
                                    <span>Solar</span>
                                {/snippet}
                                {#snippet description() }
                                    <span>Produces only on sunny days</span>
                                {/snippet}
                            </TileSelect>
                            <TileSelect bind:checked={plantDataStore._barePlantData.wind.enabled} id="wind">
                                {#snippet titleText() }
                                    <span>Wind</span>
                                {/snippet}
                                {#snippet description() }
                                    <span>Produces only when wind blows</span>
                                {/snippet}
                            </TileSelect>
                            <TileSelect bind:checked={plantDataStore._barePlantData.hydro.enabled} id="hydro">
                                {#snippet titleText() }
                                    <span>Hydro</span>
                                {/snippet}
                                {#snippet description() }
                                    <span>Very Cheap, but only holds limited water</span>
                                {/snippet}
                            </TileSelect>
                        </div>
                        <div class="flex self-stretch gap-2">
                            <Button onclick={() => {
                                plantDataStore.disableAll()
                            }}>Reset
                            </Button>
                            <Button onclick={() =>{
                                plantDataStore.enableAll()
                            }}>Check All
                            </Button>

                        </div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <Button onclick={() => optimizationDialog.closeDialog()}>Cancel</Button>
                    <Button onclick={() => optimizationDialog.nextStage()}>Next</Button>

                </div>
            {:else if optimizationDialog.stageI === 1}
                <div>
                    <CheckBox bind:checked={gridCostOptimizer._emissionConfig.enabled}>Enable CO2 Limit</CheckBox>
                    <NumberInput
                            type="number"
                            id="co2-levels"
                            bind:value={gridCostOptimizer._emissionConfig.value}
                            disabled={gridCostOptimizer._emissionConfig.enabled}
                    />
                    <br/>
                </div>
                <div class="dialog-footer">
                    <Button onclick={() => optimizationDialog.previousStage()}>Back</Button>
                    <Button >Next</Button>

                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .dialog {
        display: flex;
        width: 608px;
        min-width: 608px;
        max-width: 608px;
        padding-bottom: 64px;
        flex-direction: column;
        align-items: flex-start;
        border: 1px solid var(--border-subtle-contextual, #C6C6C6);
        background: var(--layer-contextual, #F4F4F4);
    }

    .dialog-header {
        display: flex;
        width: 608px;
        padding: 16px;
        align-items: flex-start;
        gap: 16px;
    }

    .dialog-content {
        display: flex;
        padding-bottom: 48px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
    }

    .dialog-content-description {
        display: flex;
        padding: 0 16px 24px 16px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
    }

    .dialog-content-proper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        align-self: stretch;
        padding: 0 16px;
    }

    .tiles {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        gap: 8px;
        align-self: stretch;
    }
    .dialog-footer {
        display:flex;
        justify-content: stretch;
        align-self:stretch;
    }
</style>