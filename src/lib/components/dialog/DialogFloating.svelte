<script lang="ts">

    import {getGridCostOptimizer, getOptimizationDialog, getPlantDataStore} from "#lib/context.ts";
    import TileSelect from "#lib/components/TileSelect.svelte";
    import Button from "#lib/components/Button.svelte";
    import CheckBox from "#lib/components/CheckBox.svelte";
    import NumberInput from "#lib/components/NumberInput.svelte";
    import {delay} from "es-toolkit";

    const optimizationDialog = getOptimizationDialog();
    const plantDataStore = getPlantDataStore();
    const gridCostOptimizer = getGridCostOptimizer();
    let dialogPlantData: Record<PlantType, boolean> = $state(
        Object.fromEntries(
            Object.entries(plantDataStore._barePlantData).map(([key, data]) => ([key, data.enabled])) as [PlantType, boolean][]
        ) as Record<PlantType, boolean>
    )
    const emissionConfig: EmissionConfig = $state(gridCostOptimizer._emissionConfig);
    $inspect(emissionConfig)
</script>

<div class="dialog">
    <div class="dialog-header">
        <h2>New Grid Optimization</h2>
    </div>
    {#if optimizationDialog.stageI === 0}
        <div class="dialog-content">
            <div class="dialog-content-description">Select all the types you want to include</div>
            <div class="dialog-content-proper">
                <div class="tiles">

                    <TileSelect bind:checked={dialogPlantData.coal} id="coal">
                        {#snippet titleText() }
                            <span>Coal</span>
                        {/snippet}
                        {#snippet description() }
                            <span>Cheap but slow</span>
                        {/snippet}
                    </TileSelect>
                    <TileSelect bind:checked={dialogPlantData.naturalGas}
                                id="natural-gas">
                        {#snippet titleText() }
                            <span>Natural Gas</span>
                        {/snippet}
                        {#snippet description() }
                            <span>More expensive than coal, but flexible</span>
                        {/snippet}
                    </TileSelect>
                    <TileSelect bind:checked={dialogPlantData.geothermal} id="geothermal">
                        {#snippet titleText() }
                            <span>Geothermal</span>
                        {/snippet}
                        {#snippet description() }
                            <span>Cheap and steady</span>
                        {/snippet}
                    </TileSelect>
                    <TileSelect bind:checked={dialogPlantData.oil} id="oil">
                        {#snippet titleText() }
                            <span>Oil</span>
                        {/snippet}
                        {#snippet description() }
                            <span>Most Expensive</span>
                        {/snippet}
                    </TileSelect>
                    <TileSelect bind:checked={dialogPlantData.solar} id="solar">
                        {#snippet titleText() }
                            <span>Solar</span>
                        {/snippet}
                        {#snippet description() }
                            <span>Produces only on sunny days</span>
                        {/snippet}
                    </TileSelect>
                    <TileSelect bind:checked={dialogPlantData.wind} id="wind">
                        {#snippet titleText() }
                            <span>Wind</span>
                        {/snippet}
                        {#snippet description() }
                            <span>Produces only when wind blows</span>
                        {/snippet}
                    </TileSelect>
                    <TileSelect bind:checked={dialogPlantData.hydro} id="hydro">
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
                        dialogPlantData = {
                            coal: false,
                            naturalGas: false,
                            solar: false,
                            wind: false,
                            hydro: false,
                            oil: false,
                            geothermal: false,
                        }
                            }} variant="secondary">Reset
                    </Button>
                    <Button onclick={() =>{
                        dialogPlantData = {
                            coal: true,
                            naturalGas: true,
                            solar: true,
                            wind: true,
                            hydro: true,
                            oil: true,
                            geothermal: true,
                        }
                            }}>Check All
                    </Button>

                </div>
            </div>
        </div>
        <div class="dialog-footer">
            <Button onclick={() => optimizationDialog.closeDialog()} class="grow" variant="secondary">Cancel
            </Button>
            <Button onclick={() => optimizationDialog.nextStage()} class="grow">Next</Button>

        </div>
    {:else if optimizationDialog.stageI === 1}
        <div class="dialog-content">
            <div class="dialog-content-proper">
                <div class="emission-config">

                    <CheckBox bind:checked={emissionConfig.enabled}>Enable CO2 Limit
                    </CheckBox>
                    <NumberInput
                            type="number"
                            id="co2-levels"
                            labelText="Value"
                            bind:value={emissionConfig.value}
                            disabled={!emissionConfig.enabled}
                    />
                </div>
            </div>
        </div>
        <div class="dialog-footer">
            <Button variant="secondary" onclick={() => optimizationDialog.previousStage()} class="flex-1">Back
            </Button>
            <Button class="flex-1" onclick={() => {
                        plantDataStore.updateFromDialog($state.snapshot(dialogPlantData))
                        gridCostOptimizer.updateEmissionConfigFromDialog($state.snapshot(emissionConfig));
                        delay(10);
                        gridCostOptimizer.performOptimization();
                        optimizationDialog.closeDialog()
                    }}>Compute Optimized Operation
            </Button>
        </div>
    {/if}
</div>

<style>
    .dialog {
        display: flex;
        width: 608px;
        min-width: 608px;
        max-width: 608px;
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
        font-size: 20px;
        line-height: 28px;
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
        display: flex;
        align-self: stretch;
    }

    .emission-config {
        display: flex;
        flex-flow: column nowrap;
        gap: 8px;
    }
</style>