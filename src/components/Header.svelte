<script>
    import CategoryDropdown from "./CategoryDropdown.svelte";

    const {
        siteTitle = "Your Site Title",
        categories = ["all", "some"],
        categoryMap = {},
        selectedCategory = "some",
        currentPage = "home",
        showCategoryDropdown = true,
    } = $props();

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
</script>

<header>
    <div class="header-content">
        <h1
            class="site-title"
            onclick={scrollToTop}
            onkeydown={(e) => e.key === "Enter" && scrollToTop()}
            tabindex="0"
            role="button"
        >
            {siteTitle}
        </h1>
        <a
            href={currentPage === "list" ? "/" : "/list"}
            class="text-mode-link hover-opacity"
            aria-label={currentPage === "list" ? "Go home" : "View text list"}
        >
            {currentPage === "list" ? "not simple" : "simple"}
        </a>
        {#if showCategoryDropdown}
            <CategoryDropdown {categories} {categoryMap} {selectedCategory} />
        {/if}
    </div>
</header>

<style lang="scss">
    @import "../styles/variables";

    header {
        position: fixed;
        top: $spacing-sm;
        right: $spacing-sm;
        z-index: map-get($z-index, header);
    }

    .header-content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: $spacing-xxs;
    }

    .site-title {
        margin: 0;
        font-size: $spacing-sm * 1.5;
        font-weight: normal;
        cursor: pointer;
        transition: opacity 0.2s ease;

        &:hover {
            @include hover-opacity;
        }

        @include focus-visible;
    }

    .text-mode-link {
        color: $color-text;
        font-size: 1rem;
        font-weight: normal;
        text-decoration: none;
        transition: opacity 0.2s ease;
        font-family: "Tuffy";
        text-transform: lowercase;

        &:hover {
            @include hover-opacity;
        }

        @include focus-visible;
    }

    @media (max-width: map-get($breakpoints, mobile)) {
        header {
            top: $spacing-sm;
            right: $spacing-sm;
        }
    }

    :global(.lightbox-active) {
        header {
            pointer-events: none;
            z-index: -100;
        }
    }
</style>
