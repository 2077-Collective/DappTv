import { writable, derived } from 'svelte/store';
import type { Video } from '$lib/types/youtube';
/*
// Private writable stores
const videos = writable<Video[]>([]);
const loading = writable<boolean>(false); 
const error = writable<string | null>(null);

export const videosStore = { subscribe: videos.subscribe };
export const loadingStore = { subscribe: loading.subscribe };
export const errorStore = { subscribe: error.subscribe };

// Setter functions with validation and enhanced naming
export function setVideos(newVideos: Video[]) {
  if (!Array.isArray(newVideos)) {
    throw new Error('Videos must be an array');
  }
  videos.set(newVideos);
}

export function startLoading() {
  loading.set(true);
}

export function stopLoading() {
  loading.set(false);
}

export function setError(err: string | null) {
  if (err !== null && typeof err !== 'string') {
    throw new Error('Error must be a string or null');
  }
  error.set(err);
}

export function clearError() {
  error.set(null);
}

export const hasVideos = derived(videos, ($videos) => $videos.length > 0);
export const hasError = derived(error, ($error) => $error !== null);
*/
const videos = writable<Video[]>([]);
const loading = writable<boolean>(false);
const error = writable<string | null>(null);

export const videosStore = { subscribe: videos.subscribe };
export const loadingStore = { subscribe: loading.subscribe };
export const errorStore = { subscribe: error.subscribe };

// Derived stores for common states
export const hasVideos = derived(videos, $videos => $videos.length > 0);
export const hasError = derived(error, $error => $error !== null);

// Setter for videos with validation
export function setVideos(newVideos: Video[]) {
  if (!Array.isArray(newVideos)) {
    throw new Error('Videos must be an array');
  }
  videos.set(newVideos);
}

// Separate functions for starting and stopping the loading state
export function startLoading() {
  loading.set(true);
}

export function stopLoading() {
  loading.set(false);
}

// Setter for error with validation
export function setError(err: string | null) {
  if (err !== null && typeof err !== 'string') {
    throw new Error('Error must be a string or null');
  }
  error.set(err);
}

// Function to clear the error message
export function clearError() {
  error.set(null);
}

