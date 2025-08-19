<script>
    import { fade } from "svelte/transition";

    const { project, height, onClick } = $props();
</script>

<div
    class="thumbnail-container"
    style="height: {height}"
    onclick={() => {
        console.log("Thumbnail clicked!");
        onClick();
    }}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === "Enter" && onClick()}
>
    {#if project.gif?.includes("vimeo.com")}
        <iframe
            class="thumbnail"
            src={`${project.gif}?background=true&autopause=true&autoplay=1&loop=1&byline=0&title=0&quality=720p`}
            loading="lazy"
            width="100%"
            height="100%"
            frameborder="0"
            allowfullscreen="false"
            title={project.title}
            in:fade={{ duration: 300 }}
            out:fade={{ duration: 300 }}
        />
    {:else}
        <img
            src={project.gif}
            alt={project.title}
            class="thumbnail"
            in:fade={{ duration: 300 }}
            out:fade={{ duration: 300 }}
        />
    {/if}
</div>

<style lang="scss">
    @import "../styles/variables";

    .thumbnail {
        &-container {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: calc(
                min(
                    #{map-get($thumbnail, desktop-height)} *
                        #{map-get($thumbnail, aspect-ratio)},
                    #{map-get($thumbnail, desktop-width)}
                )
            );
            height: map-get($thumbnail, desktop-height);
            z-index: map-get($z-index, base);
            transition: opacity map-get($thumbnail, transition-duration) ease;

            &:hover {
                // opacity: 0.9;
                cursor: url("../assets/icons/play_cursor.png"), pointer;
            }
            @include focus-visible;

            @media (max-width: map-get($breakpoints, tablet)) {
                width: map-get($thumbnail, tablet-width);
                height: map-get($thumbnail, tablet-height);
            }

            @media (max-width: map-get($breakpoints, mobile)) {
                width: map-get($thumbnail, mobile-width);
                height: map-get($thumbnail, mobile-height);
            }
        }

        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: map-get($thumbnail, border-radius);
        pointer-events: none;
    }
</style>
