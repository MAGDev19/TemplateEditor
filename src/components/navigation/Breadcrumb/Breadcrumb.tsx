import type { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm text-black dark:text-white list-none p-0 m-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {isLast || !item.href ? (
                <span className="text-black dark:text-white font-bold">{item.label}</span>
              ) : (
                <a href={item.href} className="text-black dark:text-white opacity-70 hover:opacity-100 hover:text-[#FF644B] transition-colors no-underline">
                  {item.label}
                </a>
              )}
              {!isLast && <span className="text-[#CDCDCD] font-bold">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
