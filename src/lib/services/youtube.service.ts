import { VideoArraySchema, type Video } from '$lib/types/youtube';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCQ8JsbQeXHAQznVuM6PdgOw';

export const fetchChannelVideos = async (): Promise<Video[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=20`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data = await response.json();

    return VideoArraySchema.parse(
      data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        description: item.snippet.description,
        publishedAt: new Date(item.snippet.publishedAt),
      }))
    );
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    throw new Error('Failed to fetch videos');
  }
};
