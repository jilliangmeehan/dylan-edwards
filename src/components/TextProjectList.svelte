<script>
    import { onMount, onDestroy } from "svelte";
    import VideoLightbox from "./VideoLightbox.svelte";

    const { projects = [] } = $props();

    let displayedProjects = $state(projects);
    let isLightboxOpen = $state(false);
    let selectedProject = $state(null);
    let hoveredIndex = $state(-1);

    function openLightbox(project) {
        if (project.video) {
            selectedProject = project;
            isLightboxOpen = true;
        }
    }

    function closeLightbox() {
        isLightboxOpen = false;
        selectedProject = null;
    }

    function handleProjectsFiltered(event) {
        displayedProjects = event.detail.projects;
    }

    onMount(() => {
        if (typeof document !== "undefined") {
            document.addEventListener(
                "projectsFiltered",
                handleProjectsFiltered,
            );
        }
    });

    onDestroy(() => {
        if (typeof document !== "undefined") {
            document.removeEventListener(
                "projectsFiltered",
                handleProjectsFiltered,
            );
        }
    });
</script>

<table class="text-project-list">
    {#each displayedProjects as project, i}
        <tr
            class="project-item"
            class:dimmed={hoveredIndex !== -1 && hoveredIndex !== i}
            onmouseenter={() => (hoveredIndex = i)}
            onmouseleave={() => (hoveredIndex = -1)}
            onclick={() => openLightbox(project)}
        >
            <td class="project-title">{project.subtitle || project.title}</td>
            <td class="project-title hide-on-mobile"
                >{project.subtitle ? project.title : ""}</td
            >
            <td class="project-title">{project.director || ""}</td>
            <td class="project-title hide-on-mobile">{project.agency || ""}</td>
        </tr>
    {/each}
</table>

{#if isLightboxOpen && selectedProject}
    <VideoLightbox videoUrl={selectedProject.video} onClose={closeLightbox} />
{/if}

<style lang="scss">
    @import "../styles/variables";

    .text-project-list {
        border-collapse: collapse;
        padding: $spacing-lg;
        margin: 0;
        min-height: 100vh;
        padding-top: 8rem;
        width: 70%;

        @media (max-width: map-get($breakpoints, mobile)) {
            padding: 6rem $spacing-md $spacing-lg $spacing-md;
        }
    }

    .project-item {
        cursor: pointer;
        transition: opacity 0.3s ease;
        border: none;
        border-bottom: 1px solid transparent;

        &:hover {
            opacity: 1;
        }

        &.dimmed {
            opacity: 0.3;
        }

        &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
    }

    .project-title {
        font-size: $spacing-xs * 1.6;
        font-weight: normal;
        color: inherit;
        text-transform: lowercase;
        line-height: 1.4;
        padding: $spacing-xs $spacing-sm;
        text-align: left;

        @media (max-width: map-get($breakpoints, mobile)) {
            font-size: $spacing-xs * 1.4;
            padding: $spacing-xs;
        }

        &.hide-on-mobile {
            @media (max-width: map-get($breakpoints, mobile)) {
                display: none;
            }
        }
    }

    .project-subtitle {
        font-size: $spacing-sm * 1.2;
        font-weight: normal;
        color: inherit;
        text-transform: lowercase;
        line-height: 1.4;
        padding: $spacing-xs $spacing-sm;
        text-align: right;
        opacity: 0.7;

        @media (max-width: map-get($breakpoints, mobile)) {
            font-size: $spacing-sm;
            padding: $spacing-xs;
        }
    }
</style>
