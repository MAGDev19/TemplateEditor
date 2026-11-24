import clsx from 'clsx';
import type { PaginationProps } from './Pagination.types';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav className={clsx('flex items-center gap-1.5 select-none', className)} aria-label="Navegación de páginas">
      <button
        className="inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-lg border border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white text-sm hover:bg-[#EBEBEB] dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={clsx(
              'inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-lg border text-sm font-bold transition-colors',
              page === currentPage
                ? 'bg-[#FF644B] border-[#FF644B] !text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border-[#CDCDCD] dark:border-slate-700 text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-700'
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-1 text-black dark:text-white opacity-60">
            ...
          </span>
        )
      )}

      <button
        className="inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-lg border border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white text-sm hover:bg-[#EBEBEB] dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
