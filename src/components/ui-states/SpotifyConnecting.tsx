export const SpotifyConnecting: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Conectando com Spotify...</p>
      </div>
    </div>
  );
};
