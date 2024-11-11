import { VideoArraySchema, type Video } from '$lib/types/youtube';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

interface YouTubeSearchResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
      description: string;
      publishedAt: string;
    };
  }>;
}

export const fetchChannelVideos = async (): Promise<Video[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=20`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data: YouTubeSearchResponse = await response.json();

    return VideoArraySchema.parse(
      data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        description: item.snippet.description,
        publishedAt: new Date(item.snippet.publishedAt),
      }))
    );
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        throw new Error('YouTube API quota exceeded. Please try again later.');
      }
      if (error.message.includes('invalid_grant')) {
        throw new Error('Authentication failed. Please check API key.');
      }
    }
    throw new Error('Failed to fetch videos: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

export const searchVideos = async (query: string): Promise<Video[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(query)}&part=snippet&type=video&maxResults=20`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data: YouTubeSearchResponse = await response.json();
    return VideoArraySchema.parse(
      data.items.map((item: {
        id: {
          videoId: string;
        };
        snippet: {
          title: string;
          thumbnails: {
            medium: {
              url: string;
            };
          };
          description: string;
          publishedAt: string;
        };
      }) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        description: item.snippet.description,
        publishedAt: new Date(item.snippet.publishedAt),
      }))
    );
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};
