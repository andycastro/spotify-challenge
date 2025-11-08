import React from 'react';

export const SpotifySetupInstructions: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-yellow-800 mb-4">
          Ops! É necessário adicionar as chaves no .env
        </h3>
        <p className="text-gray-700 mb-6">
          Adicione no arquivo{' '}
          <code className="bg-white px-2 py-1 rounded">.env</code>:
        </p>
        <div className="p-4 bg-white border rounded-lg">
          <pre className="text-left text-sm text-gray-800">
            VITE_SPOTIFY_CLIENT_ID=seu_client_id_aqui{'\n'}
            VITE_SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
          </pre>
        </div>
      </div>
    </div>
  );
};
