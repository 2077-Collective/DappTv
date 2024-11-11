<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchChannelVideos } from '$lib/services/youtube.service';
	import {
		videos,
		loading,
		error,
		setVideos,
		setLoading,
		setError
	} from '$lib/stores/youtube.svelte';

	async function loadVideos() {
		setLoading(true);
		setError(null);

		try {
			const fetchedVideos = await fetchChannelVideos();
			setVideos(fetchedVideos);
		} catch (err) {
			setError('Failed to fetch videos. Please try again later.');
		} finally {
			setLoading(false);
		}
	}

	onMount(() => {
		loadVideos();
	});
</script>

<div class="container mx-auto py-8">
	{#if $loading}
		<div class="flex min-h-64 items-center justify-center">
			<div class="text-lg text-gray-600">Loading videos...</div>
		</div>
	{:else if $error}
		<div class="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
			{$error}
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each $videos as video (video.id)}
				<div
					class="hover:scale-102 overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-200"
				>
					<div class="relative pt-[56.25%]">
						<iframe
							title={video.title}
							class="absolute left-0 top-0 h-full w-full"
							src={`https://www.youtube.com/embed/${video.id}`}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
					<div class="p-6">
						<h3 class="mb-2 line-clamp-2 text-xl font-semibold text-gray-900">
							{video.title}
						</h3>
						<p class="mb-4 line-clamp-3 text-gray-600">{video.description}</p>
						<div class="flex items-center text-sm text-gray-500">
							<span>Published: {video.publishedAt.toLocaleDateString()}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
