import Swal, { type SweetAlertOptions } from 'sweetalert2';

const getSwalThemeOptions = () => {
  const isDark =
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    document.documentElement.classList.contains('dark');
  return {
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#f8fafc' : '#0f172a',
  };
};

export const showSuccessAlert = (title: string, text?: string) => {
  const themeOpts = getSwalThemeOptions();
  return Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#2563eb',
    ...themeOpts,
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  const themeOpts = getSwalThemeOptions();
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#dc2626',
    ...themeOpts,
  });
};

export const showConfirmDialog = async (
  title: string,
  text: string,
  confirmButtonText = 'Confirmar'
): Promise<boolean> => {
  const themeOpts = getSwalThemeOptions();
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#64748b',
    confirmButtonText,
    cancelButtonText: 'Cancelar',
    ...themeOpts,
  });
  return result.isConfirmed;
};

export const showToastNotification = (
  title: string,
  icon: 'success' | 'error' | 'warning' | 'info' = 'success'
) => {
  const themeOpts = getSwalThemeOptions();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    ...themeOpts,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon,
    title,
  });
};

export const customAlert = (options: SweetAlertOptions) => {
  const themeOpts = getSwalThemeOptions();
  return Swal.fire({ ...themeOpts, ...options });
};
