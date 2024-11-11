<script lang="ts">
	import { searchQuery } from '$lib/stores/searchQuery.svelte';
</script>

<div
	class="sticky top-0 z-50 mx-auto flex max-w-screen-2xl items-center justify-between bg-white px-3 py-4 md:px-12 md:py-6"
>
	<a href="/">2077 DappTV</a>
	<div class="hidden gap-x-14 md:flex">
		<a href="#">Guides</a>
		<a href="#">Dapps</a>
		<a href="#">Learn</a>
		<a href="#">Submit</a>
	</div>
	<div class="flex items-center gap-4">
		<div class="mb-4">
			<input
				type="text"
				placeholder="Search for a video..."
				bind:value={$searchQuery}
				class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	</div>
</div>
