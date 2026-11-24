import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        primary: 'bg-[#FF644B] hover:bg-[#E54E36] active:bg-[#CC3F29] text-white shadow-sm',
        secondary: 'bg-[#666666] hover:bg-[#4D4D4D] active:bg-[#333333] text-white shadow-sm',
        success: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm',
        danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm',
        warning: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-sm',
        info: 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white shadow-sm',
        light: 'bg-white hover:bg-[#EBEBEB] text-black border border-[#CDCDCD]',
        dark: 'bg-[#1F1F1F] hover:bg-black text-white',
        ghost: 'bg-transparent hover:bg-[#EBEBEB] dark:hover:bg-slate-800 text-black dark:text-white',
        link: 'bg-transparent text-[#FF644B] hover:underline p-0',
      },

      size: {
        xs: 'px-2.5 py-1 text-xs rounded-md',
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-sm rounded-lg',
        lg: 'px-5 py-2.5 text-base rounded-lg',
        xl: 'px-6 py-3 text-lg rounded-xl',
      },

      rounded: {
        true: '!rounded-full',
      },

      fullWidth: {
        true: 'w-full',
      },

      outlined: {
        true: '!bg-transparent border hover:!bg-[#EBEBEB] dark:hover:!bg-slate-800 text-black dark:text-white',
      },

      elevation: {
        true: 'shadow-lg hover:shadow-xl',
      },
    },

    compoundVariants: [
      { variant: 'primary', outlined: true, className: '!text-[#FF644B] border-[#FF644B]' },
      { variant: 'secondary', outlined: true, className: '!text-black dark:!text-white border-[#CDCDCD]' },
      { variant: 'success', outlined: true, className: '!text-emerald-600 dark:!text-emerald-400 border-emerald-600 dark:border-emerald-500' },
      { variant: 'danger', outlined: true, className: '!text-red-600 dark:!text-red-400 border-red-600 dark:border-red-500' },
      { variant: 'warning', outlined: true, className: '!text-amber-600 dark:!text-amber-400 border-amber-600 dark:border-amber-500' },
      { variant: 'info', outlined: true, className: '!text-sky-600 dark:!text-sky-400 border-sky-600 dark:border-sky-500' },
    ],

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);