import { cn } from '@/lib';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';

export function Pagination({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      role="navigation"
      aria-label="Paginação"
      className={cn(
        'mx-auto flex w-full items-center justify-center',
        className
      )}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn('flex flex-wrap items-center gap-1', className)}
      {...props}
    />
  );
}

export function PaginationItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('flex', className)} {...props} />;
}

interface PaginationLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  disabled?: boolean;
}

export function PaginationLink({
  className,
  isActive,
  disabled,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'secondary' : 'outline'}
      size="sm"
      aria-current={isActive ? 'page' : undefined}
      disabled={disabled}
      className={cn('h-8 min-w-8 px-2', isActive && 'font-semibold', className)}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled}
      aria-label="Página anterior"
      className={cn('h-8 px-2', className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}

export function PaginationNext({
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled}
      aria-label="Próxima página"
      className={cn('h-8 px-2', className)}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
}

export function PaginationEllipsis() {
  return (
    <span
      className="flex h-8 w-8 items-center justify-center"
      aria-hidden="true"
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Mais páginas</span>
    </span>
  );
}

interface GeneratedPaginationProps {
  page: number; // 1-based
  totalPages: number;
  onChange: (page: number) => void;
  isFetching?: boolean;
  maxNumbers?: number;
  hasNext?: boolean;
}

export function GeneratedPagination({
  page,
  totalPages,
  onChange,
  isFetching,
  maxNumbers = 5,
  hasNext,
}: GeneratedPaginationProps) {
  if (totalPages <= 1) return null;
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const showAll = totalPages <= maxNumbers;

  const full = Array.from({ length: totalPages }, (_, i) => i + 1);

  let pages: number[];
  if (showAll) {
    pages = full;
  } else {
    const half = Math.floor(maxNumbers / 2);
    let windowStart = safePage - half;
    let windowEnd = safePage + half;

    if (maxNumbers % 2 === 0) {
      windowEnd = safePage + half - 1;
    }

    if (windowStart < 1) {
      windowEnd += 1 - windowStart;
      windowStart = 1;
    }
    if (windowEnd > totalPages) {
      const overshoot = windowEnd - totalPages;
      windowStart = Math.max(1, windowStart - overshoot);
      windowEnd = totalPages;
    }

    const desiredLength = maxNumbers;
    const currentLength = windowEnd - windowStart + 1;
    if (currentLength < desiredLength) {
      const deficit = desiredLength - currentLength;
      windowStart = Math.max(1, windowStart - deficit);
    }

    pages = full.slice(windowStart - 1, windowStart - 1 + maxNumbers);
  }

  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];
  const showStartEllipsis = !showAll && firstPage > 2;
  const showEndEllipsis = !showAll && lastPage < totalPages - 1;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={safePage === 1 || isFetching}
            onClick={() => onChange(safePage - 1)}
          />
        </PaginationItem>

        {firstPage > 1 && !showAll && (
          <PaginationItem>
            <PaginationLink onClick={() => onChange(1)}>1</PaginationLink>
          </PaginationItem>
        )}
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map(p => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === safePage}
              onClick={() => onChange(p)}
              disabled={isFetching}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {lastPage < totalPages && !showAll && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onChange(totalPages)}
              disabled={isFetching}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            disabled={(safePage === totalPages && !hasNext) || isFetching}
            onClick={() => onChange(safePage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
