<script lang="ts">
    export let color: string;
    export let size: string;
    export let width: string;
</script>

<div
    class="animate-spin inline-block border-current border-t-transparent rounded-full"
    role="status"
    aria-label="loading"
    style={`color: ${color}; width: ${size}; height: ${size}; border-width: ${width};`}
>
    <span class="sr-only">Loading...</span>
</div>
