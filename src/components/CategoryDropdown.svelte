<script>
    import { onMount } from "svelte";
    import DropdownItem from "./DropdownItem.svelte";

    const {
        categories = ["all", "some"],
        categoryMap = {},
        selectedCategory = "some",
    } = $props();

    let isOpen = $state(false);
    let dropdownRef;
    let currentCategory = $state(selectedCategory);

    function toggleDropdown(event) {
        event.stopPropagation();
        isOpen = !isOpen;
    }

    function handleCategorySelect(event, category) {
        event.stopPropagation();
        // Dispatch a custom event instead of calling a function
        window.handleCategoryChange(category);
        currentCategory = category;
    }

    function getDisplayName(category) {
        return categoryMap[category] || category;
    }

    onMount(() => {
        function handleCategoryChange(event) {
            if (event.detail?.category) {
                currentCategory = event.detail.category;
            }
        }

        document.addEventListener("categoryChanged", handleCategoryChange);

        return () => {
            document.removeEventListener(
                "categoryChanged",
                handleCategoryChange,
            );
        };
    });
</script>

<div class="dropdown-container" bind:this={dropdownRef}>
    <button
        class="dropdown-toggle hover-opacity"
        onclick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
    >
        {isOpen ? "−" : "+"}
        {getDisplayName(currentCategory)}
    </button>

    {#if isOpen}
        <div class="dropdown-menu" role="listbox">
            {#each categories as category}
                <DropdownItem
                    {category}
                    displayName={getDisplayName(category)}
                    isActive={category === currentCategory}
                    onSelect={(event) => handleCategorySelect(event, category)}
                />
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    @import "../styles/variables";

    .dropdown {
        &-container {
            position: relative;
            display: inline-block;
            z-index: 100;
        }

        &-toggle {
            font-family: "Tuffy";
            background: none;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            padding: 0;
            text-transform: lowercase;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        &-menu {
            font-family: "Tuffy";
            position: absolute;
            top: 100%;
            right: 0;
            background: black;
            border: none;
            min-width: 120px;
            margin-top: 0;
            z-index: 101;
            pointer-events: auto;
        }
    }

    :global(.lightbox-active) {
        .dropdown-container,
        .dropdown-toggle,
        .dropdown-menu {
            pointer-events: none;
            z-index: -1000;
        }
    }
</style>
