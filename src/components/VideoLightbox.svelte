<script>
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";

    const { videoUrl = "", onClose = () => {} } = $props();

    let dialogElement;

    onMount(() => {
        document.body.classList.add("lightbox-active");
        // Focus trap
        dialogElement?.focus();
    });

    onDestroy(() => {
        document.body.classList.remove("lightbox-active");
    });

    function getVimeoEmbedUrl(url) {
        const match = url.match(/(?:vimeo.com\/)(\d+)/);
        return match?.[1] ? `https://player.vimeo.com/video/${match[1]}` : url;
    }

    function handleKeydown(event) {
        console.log("Key pressed:", event.key);
        if (event.key === "Escape") {
            console.log("Escape key pressed, closing lightbox");
            onClose();
        }
    }

    function handleBackgroundClick(event) {
        console.log("Background clicked", event.target, event.currentTarget);
        if (event.target === event.currentTarget) {
            console.log("Background click detected, closing lightbox");
            onClose();
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if videoUrl}
    <div
        class="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Video player"
        bind:this={dialogElement}
        tabindex="-1"
        onclick={handleBackgroundClick}
        transition:fade={{ duration: 200 }}
    >
        <div class="lightbox-background" aria-hidden="true" />
        <div class="lightbox-content">
            <div class="lightbox-toolbar">
                <button
                    class="close-button hover-opacity"
                    onclick={() => {
                        console.log("Close button clicked");
                        onClose();
                    }}
                    aria-label="Close video"
                >
                    ×
                </button>
            </div>
            <div class="video-wrapper">
                <iframe
                    src={`${getVimeoEmbedUrl(videoUrl)}?autoplay=1&title=0&byline=0&portrait=0`}
                    width="100%"
                    height="100%"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                    title="Video content"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    @import "../styles/variables";

    .lightbox {
        &-overlay {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: map-get($z-index, lightbox);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-background {
            position: absolute;
            inset: 0;
            background: map-get($lightbox, background);
            pointer-events: none;
        }

        &-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-toolbar {
            position: fixed;
            top: 0;
            right: 0;
            padding: $spacing-xs;
            z-index: map-get($z-index, lightbox) + 2;
        }
    }

    .close-button {
        $button: map-get($lightbox, close-button);

        width: map-get($button, size);
        height: map-get($button, size);
        padding: 0;
        margin: 0;
        border: 0;
        border-radius: map-get($button, border-radius);
        background: transparent;
        color: $color-text;
        cursor: pointer;
        font-size: map-get($button, font-size);
        line-height: map-get($button, size);
        text-align: center;
        transition: background-color map-get($lightbox, transition-duration)
            ease;

        &:hover {
            background-color: map-get($button, hover-bg);
        }

        @include focus-visible-outer;
    }

    .video-wrapper {
        $video: map-get($lightbox, video);

        width: map-get($video, width);
        height: map-get($video, height);
        max-width: map-get($video, max-width);
        z-index: map-get($z-index, lightbox) + 1;
        position: relative;
        background: $color-background;
        border-radius: map-get($video, border-radius);
        overflow: hidden;

        @media (max-width: map-get($breakpoints, mobile)) {
            width: map-get($video, mobile-width);
            height: map-get($video, mobile-height);
            margin: auto;
        }
    }

    :global(body.lightbox-active) {
        overflow: hidden;

        .main-content,
        .header-content {
            opacity: 0.8;
            pointer-events: none;
            transition: opacity map-get($lightbox, transition-duration) ease;
        }
    }
</style>
