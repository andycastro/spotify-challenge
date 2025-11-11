import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useSpotifyArtistAlbums,
  useSpotifyArtistById,
} from '../api/queries/useSpotifyQueries';
import {
  ArtistAlbumsTable,
  ArtistDetailSkeleton,
  ArtistImageCard,
  ArtistInfo,
  ErrorState,
} from '../components';
import { AlbumsAreaChart } from '../components/AlbumsAreaChart';
import { HeaderDetails } from './components/HeaderDetails';

export const ArtistDetail: React.FC = () => {
  const { t } = useTranslation('common');
  const { id } = useParams<{ id: string }>();
  const { data: artist, isLoading, error } = useSpotifyArtistById(id, !!id);

  const DEFAULT_LIMIT = 20;
  const [albumsOffset, setAlbumsOffset] = useState(0);
  const {
    data: albumsData,
    isLoading: albumsLoading,
    isFetching: albumsFetching,
    error: albumsError,
  } = useSpotifyArtistAlbums(
    {
      id: id || '',
      limit: DEFAULT_LIMIT,
      offset: albumsOffset,
      include_groups: 'album,single,compilation,appears_on',
    },
    !!id && !isLoading && !!artist
  );

  if (error) {
    return <ErrorState message={error.message} title={t('error.loadArtist')} />;
  }

  if (isLoading) {
    return <ArtistDetailSkeleton />;
  }

  if (!artist) {
    return <p className="text-gray-500">{t('error.artistNotFound')}</p>;
  }

  const genres = (artist.genres ?? []).slice(0, 10);

  const currentAlbumPage = albumsData
    ? Math.floor(albumsData.offset / albumsData.limit) + 1
    : 1;
  const totalAlbumPages = albumsData
    ? Math.ceil(albumsData.total / albumsData.limit)
    : 1;
  const canPrevAlbums = !!albumsData && albumsData.offset > 0;
  const canNextAlbums =
    !!albumsData &&
    albumsData.next !== null &&
    albumsData.offset + albumsData.limit < albumsData.total;

  return (
    <div className="space-y-6 text-neutral-800 dark:text-neutral-100">
      <HeaderDetails artist={artist} />

      <div className="grid md:grid-cols-3 gap-8">
        <ArtistImageCard
          name={artist.name}
          imageUrl={artist.images?.[0]?.url}
          isLoading={isLoading}
        />
        <ArtistInfo artist={artist} genres={genres} isLoading={isLoading} />
      </div>

      <AlbumsAreaChart data={albumsData} loading={albumsLoading} />

      <ArtistAlbumsTable
        data={albumsData}
        loading={albumsLoading}
        fetching={albumsFetching}
        error={albumsError as Error | null}
        currentPage={currentAlbumPage}
        totalPages={totalAlbumPages}
        canPrev={canPrevAlbums}
        canNext={canNextAlbums}
        onPrev={() =>
          setAlbumsOffset(Math.max(albumsOffset - DEFAULT_LIMIT, 0))
        }
        onNext={() => setAlbumsOffset(albumsOffset + DEFAULT_LIMIT)}
      />
    </div>
  );
};

export default ArtistDetail;
