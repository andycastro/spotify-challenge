import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  title = 'Ocorreu um erro',
}) => {
  return (
    <div
      className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 space-y-2 text-sm"
      role="alert"
      aria-live="assertive"
    >
      <h4 className="font-semibold text-red-400">{title}</h4>
      <p className="text-red-300 break-words">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/20 text-red-200 hover:bg-red-500/30 transition text-xs"
          aria-label="Tentar novamente"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorState;
