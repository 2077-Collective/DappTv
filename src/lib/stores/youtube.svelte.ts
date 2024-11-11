import { writable } from 'svelte/store';
import type { Video } from '$lib/types/youtube';

export const videos = writable<Video[]>([]);
export const loading = writable<boolean>(true);
export const error = writable<string | null>(null);

export function setVideos(newVideos: Video[]) {
  videos.set(newVideos);
}

export function setLoading(isLoading: boolean) {
  loading.set(isLoading);
}

export function setError(err: string | null) {
  error.set(err);
}
