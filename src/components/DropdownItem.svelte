<script>
    const { category, displayName, isActive, onSelect } = $props();
</script>

<button
    class="dropdown-item hover-opacity"
    class:active={isActive}
    onclick={onSelect}
    role="option"
    aria-selected={isActive}
>
    {displayName}
</button>

<style lang="scss">
    @import "../styles/variables";

    .dropdown-item {
        display: block;
        width: 100%;
        padding: $spacing-xxs;
        text-align: right;
        background: none;
        border: none;
        color: $color-text;
        cursor: pointer;
        text-transform: lowercase;
        transition: all 0.2s ease;

        &.active {
            opacity: 0.5;
        }

        @include focus-visible;
    }
</style>
