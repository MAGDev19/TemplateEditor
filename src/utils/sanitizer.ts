import DOMPurify from 'dompurify';

/**
 * Sanitiza cadenas de texto HTML para prevenir vulnerabilidades XSS (Cross-Site Scripting).
 */
export const sanitizeHtml = (dirtyHtml: string): string => {
  if (!dirtyHtml) return '';
  return DOMPurify.sanitize(dirtyHtml, {
    USE_PROFILES: { html: true },
  });
};

export default sanitizeHtml;
