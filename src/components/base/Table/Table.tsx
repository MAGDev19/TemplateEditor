import clsx from 'clsx';
import type { TableProps } from './Table.types';
import { Spinner } from '../Loader';

export function Table<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyText = 'No hay datos disponibles',
  striped = false,
  hoverable = true,
  className,
}: TableProps<T>) {
  return (
    <div className={clsx('w-full overflow-x-auto rounded-xl border border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-800', className)}>
      <table className="w-full text-left text-sm text-black dark:text-white border-collapse">
        <thead>
          <tr className="bg-[#EBEBEB] dark:bg-slate-900/60 border-b border-[#CDCDCD] dark:border-slate-700">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={clsx(
                  'px-4 py-3 font-bold text-black dark:text-white select-none',
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                )}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#CDCDCD] dark:divide-slate-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-black dark:text-white opacity-70">
                <Spinner size="md" />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-black dark:text-white opacity-70 font-medium">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                className={clsx(
                  'transition-colors',
                  striped && index % 2 === 1 && 'bg-[#EBEBEB]/40 dark:bg-slate-900/30',
                  hoverable && 'hover:bg-[#EBEBEB]/70 dark:hover:bg-slate-700/50'
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx(
                      'px-4 py-3.5',
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    )}
                  >
                    {col.render
                      ? col.render(row, index)
                      : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
