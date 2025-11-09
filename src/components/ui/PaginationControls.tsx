import React from 'react';
import { Button } from './button';

interface PaginationControlsProps {
  offset: number;
  limit: number;
  total: number;
  onPageChange: (nextOffset: number) => void;
  isFetching?: boolean;
}

const getPageData = (offset: number, limit: number, total: number) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { currentPage, totalPages };
};

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  offset,
  limit,
  total,
  onPageChange,
  isFetching,
}) => {
  const { currentPage, totalPages } = getPageData(offset, limit, total);
  const prevDisabled = offset === 0 || isFetching;
  const nextDisabled = offset + limit >= total || isFetching;

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={prevDisabled}
          onClick={() => onPageChange(Math.max(0, offset - limit))}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={nextDisabled}
          onClick={() =>
            onPageChange(
              nextDisabled ? offset : Math.min(total - limit, offset + limit)
            )
          }
        >
          Próxima
        </Button>
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Página {currentPage} de {totalPages}{' '}
        <span className="ml-2 text-xs text-neutral-500">
          {isFetching ? 'Atualizando…' : ''}
        </span>
      </div>
    </div>
  );
};
