<script lang="ts">
    import type {Snippet} from "svelte";
    import type {HTMLInputAttributes} from "svelte/elements";

    interface Props {
        id: string;
        titleText: Snippet;
        description: Snippet;
        checked:boolean;
    }
    let {titleText, id, description, checked = $bindable(), ...attrCheckBox}: Props & HTMLInputAttributes = $props();
</script>
<label for={id}>
    <div class="primary-wrapper">
        <h3 class="titleText">
            {@render titleText()}
        </h3>
        <div class="icon-wrapper">
            <input type="checkbox" id={id} {...attrCheckBox} bind:checked={checked}>
        </div>
    </div>
    <div class="description">
        {@render description()}
    </div>
</label>

<style>
    input[type="checkbox"] {
        accent-color: black;
        outline:none;
    }
    label {
        display: flex;
        min-width: 200px;
        flex-direction: column;
        align-items: flex-start;
        flex: 1 0 0;
        background: var(--layer-contextual, #FFF);
        transition: 70ms all cubic-bezier(0.4, 0.14, 0.3, 1)
    }
    label:hover:not(label:has(input:checked)) {
        background: var(--layer-hover-contextual, #E8E8E8);
    }
    label:has(input:checked) {
        box-shadow:0 0 0 1px inset var(--Border-border-inverse, #161616);
    }
    .primary-wrapper {
        display: flex;
        align-items: flex-start;
        align-self: stretch;
    }
    .titleText {
        display: flex;
        padding: 16px 8px 16px 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        flex: 1 0 0;
        color: var(--Text-text-primary, #161616);
        font-size: var(--Typography-Fluid-Heading-Heading-03-Size, 20px);
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 90% */
        letter-spacing: 0.16px;
    }
    .icon-wrapper {
        padding: 16px 16px 0 0
    }
    .description {
        padding: 0 16px 16px 16px
    }
</style>