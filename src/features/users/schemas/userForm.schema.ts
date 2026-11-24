import { z } from 'zod';

/**
 * Esquema de validación exhaustivo con Zod demostrando validaciones para cada tipo de dato común:
 * - Texto (string min/max)
 * - Email (format validation)
 * - Números (number min/max)
 * - Selección Enum (select)
 * - Fecha (date string)
 * - Texto extenso (textarea)
 * - Arreglos (array min items)
 * - Booleano requerido (checkbox accept terms)
 * - Booleano opcional (switch toggle)
 */
export const userFormSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres'),

  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Ingresa un correo electrónico válido (ej. usuario@dominio.com)'),

  age: z
    .number({ message: 'Ingresa una edad válida' })
    .min(18, 'La edad mínima permitida es 18 años')
    .max(99, 'La edad máxima permitida es 99 años'),

  role: z.enum(['admin', 'user', 'editor'], {
    message: 'Selecciona un rol válido de la lista',
  }),

  birthDate: z
    .string()
    .min(1, 'Selecciona la fecha de nacimiento'),

  bio: z
    .string()
    .min(10, 'La biografía o perfil debe tener al menos 10 caracteres')
    .max(300, 'La biografía no puede exceder los 300 caracteres'),

  salary: z
    .number({ message: 'Ingresa un monto de salario válido' })
    .min(500, 'El salario mínimo es de $500 USD'),

  skills: z
    .array(z.string())
    .min(1, 'Debes seleccionar al menos una habilidad o tecnología'),

  terms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos de la plataforma para continuar',
  }),

  notifications: z.boolean(),
});

export type UserFormData = z.infer<typeof userFormSchema>;
