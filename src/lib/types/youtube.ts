import { z } from 'zod';

// Video type definition
export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  description: z.string(),
  publishedAt: z.date(),
});

export const VideoArraySchema = z.array(VideoSchema);

export type Video = z.infer<typeof VideoSchema>;
