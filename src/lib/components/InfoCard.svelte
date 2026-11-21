<script lang="ts">
    interface Props {
        title: string,
        value: string,
    }
    const {title, value}: Props = $props();
</script>
<div class="card">
    <div class="card-title">{title}</div>
    <div class="card-value">{value}</div>
</div>

<style>
    @reference "tailwindcss";
    .card-title {
        color: var(--Text-text-primary, #161616);

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 128.571% */
    }

    .card-value {
        color: var(--Text-text-primary, #161616);
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: var(--Typography-Fluid-Heading-Heading-03-Line-height, 28px); /* 140% */
    }

    .card {
        background: var(--layer-contextual, #F4F4F4);
        @apply p-4 gap-1 flex flex-col;
    }
</style>