<script>
    import { onMount } from "svelte";
    const { index, title, subtitle, isActive } = $props();
</script>

<div class="project-title" class:active={isActive}>
    <!-- <span class="project-number">0{index + 1}</span> -->
    {title}{subtitle ? ` • ${subtitle}` : ""}
</div>

<style lang="scss">
    @import "../styles/variables";

    .project {
        &-title {
            font-size: map-get($project-title, desktop-size);
            transition: all map-get($project-title, transition-duration)
                cubic-bezier(0.4, 0, 0.2, 1);
            opacity: map-get($project-title, inactive-opacity);
            display: flex;
            align-items: baseline;
            gap: $spacing-xs;
            padding: $spacing-xxs;
            border-radius: map-get($project-title, border-radius);
            line-height: 1.2;

            &.active {
                opacity: map-get($project-title, active-opacity);
                transform: scale(map-get($project-title, active-scale));
                transform-origin: center;
            }

            @include focus-visible;

            @media (max-width: map-get($breakpoints, tablet)) {
                font-size: map-get($project-title, tablet-size);
                padding: $spacing-xs;
                gap: $spacing-xs;
            }

            @media (max-width: map-get($breakpoints, mobile)) {
                font-size: map-get($project-title, mobile-size);
                gap: $spacing-xs;
                padding: $spacing-xs $spacing-xs;
                // Optional: Add word-wrap for very long titles
                word-break: break-word;
                hyphens: auto;
            }
        }

        /* &-number {
            font-size: map-get($project-title, number-size);
            opacity: map-get($project-title, inactive-opacity);
            font-family: monospace;

            @media (max-width: map-get($breakpoints, mobile)) {
                font-size: map-get($project-title, number-mobile-size);
            }
            } */
    }
</style>
