<script>
    import { onMount } from "svelte";
    import VideoLightbox from "./VideoLightbox.svelte";
    import ProjectTitle from "./ProjectTitle.svelte";
    import ProjectThumbnail from "./ProjectThumbnail.svelte";
    import ProjectCredits from "./ProjectCredits.svelte";
    import { filterProjects } from "../utils/categoryUtils";

    const {
        projects = [],
        scrollTriggerOffset = 45,
        thumbnailHeight = "60vh",
        initialCategory = "all",
    } = $props();

    let isMobile = $state(false);
    let responsiveScrollOffset = $state(scrollTriggerOffset);

    let displayedProjects = $state(filterProjects(initialCategory, projects));
    let activeProjectIndex = $state(0);
    let isLightboxOpen = $state(false);
    const observers = [];

    function openLightbox() {
        if (activeProjectIndex >= 0 && projects[activeProjectIndex].video) {
            isLightboxOpen = true;
        }
    }

    function closeLightbox() {
        isLightboxOpen = false;
    }

    onMount(() => {
        // Check if mobile and set responsive offset
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768;
            responsiveScrollOffset = isMobile ? 35 : scrollTriggerOffset;
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const setupObservers = () => {
            const projectElements = document.querySelectorAll(".project-title");
            const sentinel = document.querySelector("#project-sentinel");

            // Set up intersection observers for projects
            projectElements.forEach((element, index) => {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            const threshold = 0.5;
                            if (
                                entry.isIntersecting &&
                                entry.intersectionRatio > threshold
                            ) {
                                activeProjectIndex = index;
                            }
                        });
                    },
                    {
                        threshold: 0.5,
                        rootMargin: `-${responsiveScrollOffset}% 0px -${responsiveScrollOffset}% 0px`,
                    },
                );

                observer.observe(element);
                observers.push(observer);
            });

            // Add sentinel observer
            const sentinelObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            activeProjectIndex = -1; // Deselect all projects
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: `-${responsiveScrollOffset}% 0px -${responsiveScrollOffset}% 0px`,
                },
            );

            if (sentinel) {
                sentinelObserver.observe(sentinel);
                observers.push(sentinelObserver);
            }
        };

        setupObservers();

        // Add listener for category changes
        const handleProjectsFiltered = (event) => {
            console.log("Filtering projects...", event.detail.projects);
            displayedProjects = event.detail.projects;

            // Disconnect existing observers
            observers.forEach((observer) => observer.disconnect());
            observers.length = 0;

            // Reset active index
            activeProjectIndex = displayedProjects.length > 0 ? 0 : -1;

            // Re-setup observers after a short delay to allow DOM to update
            setTimeout(() => {
                const newProjectElements =
                    document.querySelectorAll(".project-title");
                newProjectElements.forEach((element, index) => {
                    const observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                const threshold = 0.5;
                                if (
                                    entry.isIntersecting &&
                                    entry.intersectionRatio > threshold
                                ) {
                                    activeProjectIndex = index;
                                }
                            });
                        },
                        {
                            threshold: 0.5,
                            rootMargin: `-${responsiveScrollOffset}% 0px -${responsiveScrollOffset}% 0px`,
                        },
                    );

                    observer.observe(element);
                    observers.push(observer);
                });
            }, 100);
        };

        document.addEventListener("projectsFiltered", handleProjectsFiltered);

        return () => {
            observers.forEach((observer) => observer.disconnect());
            window.removeEventListener("resize", checkMobile);
            document.removeEventListener(
                "projectsFiltered",
                handleProjectsFiltered,
            );
        };
    });
</script>

<div class="container">
    <div class="project-list">
        {#each displayedProjects as project, i}
            <ProjectTitle
                index={i}
                title={project.title}
                subtitle={project.subtitle}
                isActive={activeProjectIndex === i}
            />
        {/each}
        <div class="project-sentinel" id="project-sentinel"></div>
    </div>

    <div class="media-wrapper">
        {#if activeProjectIndex >= 0 && displayedProjects[activeProjectIndex]}
            <ProjectThumbnail
                project={displayedProjects[activeProjectIndex]}
                height={thumbnailHeight}
                onClick={openLightbox}
            />
            <ProjectCredits project={projects[activeProjectIndex]} />
        {/if}
    </div>
</div>

{#if isLightboxOpen && activeProjectIndex >= 0}
    <VideoLightbox
        videoUrl={projects[activeProjectIndex].video}
        onClose={closeLightbox}
    />
{/if}

<style lang="scss">
    @import "../styles/variables";

    .container {
        display: grid;
        grid-template-columns: 1.5fr 0.5fr;
        gap: $spacing-md;
        margin: 0 auto;
        min-height: 100vh;
        position: relative;

        @media (max-width: map-get($breakpoints, tablet)) {
            grid-template-columns: 1fr;
            gap: $spacing-sm;
        }
    }

    .project {
        &-list {
            padding: 50vh $spacing-sm $spacing-sm $spacing-sm;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            gap: $spacing-lg;
            position: relative;
            z-index: map-get($z-index, content);
            width: 100%; // Ensure it takes full width
            // max-width: 800px; // Optional: set a max-width to prevent extremely wide text

            @media (max-width: map-get($breakpoints, tablet)) {
                padding: 50vh $spacing-sm $spacing-sm $spacing-sm;
                gap: $spacing-md;
            }

            @media (max-width: map-get($breakpoints, mobile)) {
                padding: 50vh $spacing-xs $spacing-xs $spacing-xs;
                gap: $spacing-sm;
                width: 60%;
            }
        }

        &-sentinel {
            height: 25vh;
            pointer-events: none;
            opacity: 0;
        }
    }
</style>
