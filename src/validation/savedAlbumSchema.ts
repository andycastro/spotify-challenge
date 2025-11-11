import { z } from 'zod';

export const savedAlbumSchema = z.object({
  name: z.string().trim().min(1, { message: 'album.save.errorName' }),
  artist: z.string().trim().min(1, { message: 'album.save.errorArtist' }),
});

export type SavedAlbumForm = z.infer<typeof savedAlbumSchema>;
