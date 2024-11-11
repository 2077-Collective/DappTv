<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchChannelVideos } from '$lib/services/youtube.service';
    import {
        videosStore,
        loadingStore,
        errorStore,
        setVideos,
        startLoading,
        stopLoading,
        setError
    } from '$lib/stores/youtube.svelte';
    import { searchQuery } from '$lib/stores/searchQuery.svelte';
    import { derived } from 'svelte/store';
    import type { Video } from '$lib/types/youtube';

    let filteredVideos: Video[] = [];

    const filteredVideosStore = derived(
        [videosStore, searchQuery],
        ([$videosStore, $searchQuery]) => {
            if ($searchQuery.trim() === '') {
                return $videosStore;
            }

            return $videosStore.filter((video: Video) =>
                video.title.toLowerCase().includes($searchQuery.toLowerCase())
            );
        }
    );

    async function loadVideos() {
        startLoading();
        setError(null);

        try {
            const fetchedVideos = await fetchChannelVideos();
            setVideos(fetchedVideos);
        } catch (err: unknown) {
            console.error('Error fetching videos:', err);
            setError(
                err instanceof Error
                    ? `Failed to fetch videos: ${err.message}`
                    : 'Failed to fetch videos. Please try again later.'
            );
        } finally {
            stopLoading();
        }
    }

    onMount(() => {
        loadVideos();
    });
</script>

<div class="container mx-auto py-8">
    {#if $loadingStore}
        <div class="flex min-h-64 items-center justify-center">
            <div class="text-lg text-gray-600">Loading videos...</div>
        </div>
    {:else if $errorStore}
        <div class="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {$errorStore}
        </div>
    {:else}
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {#each $filteredVideosStore as video (video.id)}
                <div class="hover:scale-102 overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-200">
                    <div class="relative pt-[56.25%]">
                        <iframe
                            title={video.title}
                            class="absolute left-0 top-0 h-full w-full"
                            src={`https://www.youtube.com/embed/${video.id}`}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-presentation"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            style="border: 0;"
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
