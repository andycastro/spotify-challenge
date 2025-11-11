import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SpotifyArtistAlbumsResponse } from '../api/types/spotifyTypes';
import { cn } from '../lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Input } from './ui/input';

interface SaveAlbumDrawerProps {
  album?: SpotifyArtistAlbumsResponse['items'][number] | null;
  trigger?: React.ReactNode;
  onSaved?: (data: SavedAlbum) => void;
}

export interface SavedAlbum {
  id: string;
  name: string;
  artist: string;
  notes: string;
  savedAt: string;
}

const STORAGE_KEY = 'saved.albums';

export const SaveAlbumDrawer: React.FC<SaveAlbumDrawerProps> = ({
  album,
  trigger,
  onSaved,
}) => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (album && open) {
      setName(album.name || '');
      setArtist(album.artists?.map(a => a.name).join(', ') || '');
    }
  }, [album, open]);

  const reset = () => {
    setError(null);
    setSuccess(null);
    setNotes('');
  };

  const handleSave = () => {
    if (!album) return;
    if (!name.trim()) {
      setError(t('album.save.errorName'));
      return;
    }
    const entry: SavedAlbum = {
      id: album.id,
      name: name.trim(),
      artist: artist.trim(),
      notes: notes.trim(),
      savedAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: SavedAlbum[] = raw ? JSON.parse(raw) : [];
      const existingIndex = list.findIndex(x => x.id === entry.id);
      if (existingIndex >= 0) {
        list[existingIndex] = entry;
      } else {
        list.push(entry);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      setSuccess(t('album.save.success'));
      setError(null);
      onSaved?.(entry);
      setTimeout(() => {
        setOpen(false);
        reset();
      }, 900);
    } catch (e) {
      console.error('Failed saving album', e);
      setError(t('album.save.errorGeneric'));
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t('album.saveDrawer.title')}</DrawerTitle>
            <DrawerDescription>
              {t('album.saveDrawer.description')}
            </DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
            className="flex flex-col gap-4 p-4 pt-0"
          >
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">
                {t('album.fields.name')}
              </label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t('album.fields.namePlaceholder')}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">
                {t('album.fields.artist')}
              </label>
              <Input
                value={artist}
                onChange={e => setArtist(e.target.value)}
                placeholder={t('album.fields.artistPlaceholder')}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">
                {t('album.fields.notes')}
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={t('album.fields.notesPlaceholder')}
                className="min-h-24 resize-y rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              />
            </div>
            {error && (
              <p className="text-xs text-red-500" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="text-xs text-green-500" role="status">
                {success}
              </p>
            )}
            <DrawerFooter>
              <button
                type="submit"
                className={cn(
                  'px-3 py-1.5 text-xs rounded bg-green-600 hover:bg-green-700 text-white transition'
                )}
              >
                {t('album.actions.save')}
              </button>
              <DrawerClose asChild>
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-100 transition"
                >
                  {t('album.actions.cancel')}
                </button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SaveAlbumDrawer;
