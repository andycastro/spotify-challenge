import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Artist {
  id: string;
  name: string;
  external_urls?: {
    spotify?: string;
  };
}

export const HeaderDetails: React.FC<{ artist: Artist }> = ({ artist }) => {
  const { t } = useTranslation('common');
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{artist.name}</h1>
      <div className="flex gap-3">
        {artist.external_urls?.spotify && (
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            aria-label={t('action.openSpotify')}
          >
            <span className="font-medium">{t('action.openSpotify')}</span>
          </a>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition"
          aria-label={t('action.back')}
        >
          {t('action.back')}
        </Link>
      </div>
    </div>
  );
};
