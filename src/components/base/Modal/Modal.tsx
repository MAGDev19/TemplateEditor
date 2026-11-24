import { useEffect } from 'react';
import clsx from 'clsx';
import type { ModalProps } from './Modal.types';

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in"
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          'relative w-full max-h-[90vh] flex flex-col bg-white dark:bg-slate-800 text-black dark:text-white rounded-2xl shadow-2xl border border-[#CDCDCD] dark:border-slate-700 overflow-hidden transition-all transform animate-slide-up',
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#CDCDCD] dark:border-slate-700">
            <h3 className="text-xl font-bold text-black dark:text-white">{title}</h3>
            <button
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-700 transition-colors font-bold text-lg"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              &times;
            </button>
          </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#EBEBEB]/50 dark:bg-slate-900/50 border-t border-[#CDCDCD] dark:border-slate-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
