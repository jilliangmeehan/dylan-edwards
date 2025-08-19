<script>
    import { fade } from "svelte/transition";

    const { project } = $props();
</script>

<div class="credits" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
    {#if project.director}
        <div class="credit-line">
            <span class="credit-label">Director</span>
            <span class="credit-value">{project.director}</span>
        </div>
    {/if}
    {#if project.client}
        <div class="credit-line">
            <span class="credit-label">Client</span>
            <span class="credit-value">{project.client}</span>
        </div>
    {/if}
    {#if project.agency}
        <div class="credit-line">
            <span class="credit-label">Agency</span>
            <span class="credit-value">{project.agency}</span>
        </div>
    {/if}
    {#if project["production-company"]}
        <div class="credit-line">
            <span class="credit-label">Production</span>
            <span class="credit-value">{project["production-company"]}</span>
        </div>
    {/if}
</div>

<style lang="scss">
    @import "../styles/variables";

    .credits {
        position: fixed;
        top: 50%;
        right: $spacing-xs; // Closer to edge instead of calculated position
        transform: translateY(-50%);
        padding: $spacing-sm; // Reduced padding
        color: $color-text;
        text-align: right;
        z-index: map-get($z-index, content);
        font-family: "Tuffy";
        font-weight: 300;
        pointer-events: none;
    }

    .credit {
        &-line {
            margin-bottom: $spacing-xs;
            font-size: 0.875rem; // Smaller font size
            line-height: 1.4;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &-label {
            opacity: 0.4; // More subtle label
            margin-right: $spacing-xs;
            // font-size: 0.75rem; // Even smaller labels
        }

        &-value {
            font-weight: 400; // Slightly less bold
            opacity: 0.8; // Slightly transparent
        }
    }

    @media (max-width: map-get($breakpoints, mobile)) {
        .credits {
            padding: $spacing-xs;
            font-size: 0.75rem; // Even smaller on mobile
        }
    }
</style>
