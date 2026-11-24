import clsx from 'clsx';
import type { FooterProps } from './Footer.types';

export const Footer = ({
  copyrightText = '© 2026 ReactJS Base Architecture v2.0. Todos los derechos reservados.',
  links,
  children,
  className,
}: FooterProps) => {
  return (
    <footer className={clsx('p-6 bg-white dark:bg-slate-800 border-t border-[#CDCDCD] dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between text-xs text-black dark:text-white mt-auto gap-4', className)}>
      <div>{children || copyrightText}</div>
      {links && (
        <ul className="flex items-center gap-4 list-none p-0 m-0">
          {links.map((link, idx) => (
            <li key={idx}>
              <a href={link.href} className="text-black dark:text-white hover:text-[#FF644B] transition-colors no-underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
};

export default Footer;
