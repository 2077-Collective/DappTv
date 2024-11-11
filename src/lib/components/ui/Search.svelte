<script lang="ts">
    import { searchQuery } from '$lib/stores/searchQuery.svelte';
</script>

<div class="mb-4">
	<input
		type="text"
		placeholder="Search for a video..."
		bind:value={$searchQuery}
		class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
	/>
</div>
