import { SpotifySetupInstructions } from '../SpotifySetupInstructions';

export const IsNotAuthSpotify: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Spotify Artist Search
        </h2>
        <p className="text-gray-600">
          Descubra artistas usando a API oficial do Spotify
        </p>
      </div>
      <SpotifySetupInstructions />
    </div>
  );
};
