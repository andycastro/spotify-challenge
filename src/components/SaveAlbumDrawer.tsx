import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SpotifyArtistAlbumsResponse } from '../api/types/spotifyTypes';
import { cn } from '../lib/utils';
import {
  SavedAlbumForm,
  savedAlbumSchema,
} from '../validation/savedAlbumSchema';
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
  trigger: React.ReactNode;
  onSaved?: (album: SavedAlbum) => void;
}

interface SavedAlbum {
  id: string;
  name: string;
  artist: string;
  savedAt: string;
}

const STORAGE_KEY = 'saved.albums';

export const SaveAlbumDrawer: React.FC<SaveAlbumDrawerProps> = ({
  album,
  trigger,
  onSaved,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SavedAlbumForm>({
    resolver: zodResolver(savedAlbumSchema),
    defaultValues: {
      name: '',
      artist: album?.artists?.[0]?.name || '',
    },
  });

  useEffect(() => {
    if (album && open) {
      form.reset({
        name: album.name || '',
        artist: album.artists?.[0]?.name || '',
      });
      setSuccess(null);
      setError(null);
    }
  }, [album, open, form]);

  const handleSave = () => {
    if (!album) return;
    const { name, artist } = form.getValues();
    const entry: SavedAlbum = {
      id: album.id,
      name: name.trim(),
      artist: artist.trim(),
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
        form.reset({ name: '', artist: '' });
        setOpen(false);
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
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2">
              {t('album.saveDrawer.title')}
            </DrawerTitle>
            <DrawerDescription className="text-neutral-400 text-sm">
              {t('album.saveDrawer.description')}
            </DrawerDescription>
            {/* helper text removed per request (localStorage/update sentences) */}
          </DrawerHeader>
          {success && (
            <p className="mt-2 text-xs text-green-500" role="status">
              {success}
            </p>
          )}
          {error && (
            <p className="mt-2 text-xs text-red-500" role="alert">
              {error}
            </p>
          )}
          <form
            onSubmit={form.handleSubmit(() => handleSave())}
            className="flex flex-col gap-6 p-4 pt-4"
          >
            <fieldset className="space-y-4">
              <legend className="text-xs uppercase tracking-wide text-neutral-400 font-medium">
                {t('album.section.details')}
              </legend>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">
                  {t('album.fields.name')}
                </label>
                <Input
                  {...form.register('name')}
                  placeholder={t('album.fields.namePlaceholder')}
                  className="h-9 text-sm border border-neutral-700 bg-neutral-900/30"
                  aria-invalid={!!form.formState.errors.name}
                />
                {form.formState.errors.name && (
                  <p className="text-[10px] text-red-500">
                    {t(
                      form.formState.errors.name.message ||
                        'album.save.errorName'
                    )}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">
                  {t('album.fields.artist')}
                </label>
                <Input
                  {...form.register('artist')}
                  placeholder={t('album.fields.artistPlaceholder')}
                  className="h-9 text-sm border border-neutral-700 bg-neutral-900/30"
                  aria-invalid={!!form.formState.errors.artist}
                />
                {form.formState.errors.artist && (
                  <p className="text-[10px] text-red-500">
                    {t(
                      form.formState.errors.artist.message ||
                        'album.save.errorArtist'
                    )}
                  </p>
                )}
              </div>
            </fieldset>
            <DrawerFooter>
              <button
                type="submit"
                className={cn(
                  'px-4 py-2 text-xs rounded bg-green-600 hover:bg-green-700 text-white transition shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
                )}
              >
                {t('album.actions.saveAndClose')}
              </button>
              <DrawerClose asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-xs rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
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
