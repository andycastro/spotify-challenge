import { z } from 'zod';

export const savedAlbumSchema = z.object({
  name: z.string().trim().min(1, { message: 'album.save.errorName' }),
  artist: z.string().trim().min(1, { message: 'album.save.errorArtist' }),
});
export type SavedAlbumForm = z.infer<typeof savedAlbumSchema>;

export const savedAlbumEntrySchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  artist: z.string().trim().min(1),
  savedAt: z.string().datetime().or(z.string()),
});
export type SavedAlbumEntry = z.infer<typeof savedAlbumEntrySchema>;

export const savedAlbumStorageSchema = z.array(savedAlbumEntrySchema);

export const SAVED_ALBUMS_KEY = 'saved.albums';

export function loadSavedAlbums(): SavedAlbumEntry[] {
  try {
    const raw = localStorage.getItem(SAVED_ALBUMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const result = savedAlbumStorageSchema.safeParse(parsed);
    if (!result.success) {
      console.warn(
        '[savedAlbumStorage] schema mismatch',
        result.error.format()
      );
      return [];
    }
    return result.data;
  } catch (e) {
    console.warn('[savedAlbumStorage] failed to parse', e);
    return [];
  }
}

export function saveAlbumToStorage(entry: SavedAlbumEntry): SavedAlbumEntry[] {
  const current = loadSavedAlbums();
  const idx = current.findIndex(a => a.id === entry.id);
  if (idx >= 0) {
    current[idx] = entry;
  } else {
    current.push(entry);
  }
  localStorage.setItem(SAVED_ALBUMS_KEY, JSON.stringify(current));
  return current;
}

export function removeAlbumFromStorage(id: string): SavedAlbumEntry[] {
  const current = loadSavedAlbums();
  const next = current.filter(a => a.id !== id);
  localStorage.setItem(SAVED_ALBUMS_KEY, JSON.stringify(next));
  return next;
}
