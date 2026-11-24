import clsx from 'clsx';
import type { ToastProps } from './Toast.types';

export const Toast = ({ type = 'info', title, message, onClose }: ToastProps) => {
  const borderClasses = {
    info: 'border-l-[#FF644B]',
    success: 'border-l-emerald-500',
    warning: 'border-l-amber-500',
    error: 'border-l-red-500',
  };

  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 text-black dark:text-white shadow-xl border border-[#CDCDCD] dark:border-slate-700 border-l-4 min-w-[300px] max-w-[450px] animate-slide-in-right',
        borderClasses[type]
      )}
    >
      <div className="flex-1">
        {title && <div className="font-bold text-sm mb-0.5">{title}</div>}
        <div className="text-xs text-black dark:text-white opacity-80 font-medium">{message}</div>
      </div>
      {onClose && (
        <button
          className="text-black dark:text-white opacity-60 hover:opacity-100 text-lg leading-none p-1 rounded-md hover:bg-[#EBEBEB] dark:hover:bg-slate-700 transition-colors font-bold"
          onClick={onClose}
          aria-label="Cerrar notificación"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Toast;
