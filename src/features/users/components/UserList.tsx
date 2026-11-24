import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormData } from '../schemas/userForm.schema';
import { useUsers } from '../hooks/useUsers';
import Button from '@/components/base/Button';
import Input from '@/components/base/Input';
import Card from '@/components/base/Card';
import Checkbox from '@/components/base/Checkbox';
import Switch from '@/components/base/Switch';
import Spinner from '@/components/base/Loader';
import { formatCurrency } from '@/utils/formatters';

const AVAILABLE_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'TailwindCSS',
  'Figma',
  'UI/UX',
  'Vitest',
  'Playwright',
];

export const UserList: React.FC = () => {
  const { users, isLoading, isError, createUser, isCreating, deleteUser } = useUsers();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 25,
      role: 'user',
      birthDate: '1998-05-10',
      bio: '',
      salary: 3000,
      skills: ['React', 'TypeScript'],
      terms: false,
      notifications: true,
    },
  });

  const selectedSkills = watch('skills') || [];

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser(data);
      reset({
        name: '',
        email: '',
        age: 25,
        role: 'user',
        birthDate: '1998-05-10',
        bio: '',
        salary: 3000,
        skills: ['React'],
        terms: false,
        notifications: true,
      });
    } catch {
      // Manejado en la mutación onError
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
        <span className="ml-3 text-slate-500 dark:text-slate-400 font-medium">
          Cargando usuarios de ejemplo...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Formulario Exhaustivo con Validaciones Zod Adaptado a Modo Claro y Oscuro */}
      <Card title="Formulario de Ejemplo con Validaciones Zod por Tipo de Dato">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Este formulario ilustra cómo Zod y React Hook Form validan cada tipo de dato (texto, email, números, enum, fechas, textareas, arreglos y booleanos) adaptable totalmente al Modo Oscuro.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          {/* Fila 1: Texto (string) & Email (string formatted) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="1. Texto (String): Nombre completo"
                placeholder="Ej. Ana María Pérez"
                {...register('name')}
                error={errors.name?.message}
                helperText="Mínimo 3 caracteres, máximo 50"
              />
            </div>

            <div>
              <Input
                label="2. Email (String Formatted): Correo electrónico"
                type="email"
                placeholder="ejemplo@empresa.com"
                {...register('email')}
                error={errors.email?.message}
                helperText="Formato válido usuario@dominio.com"
              />
            </div>
          </div>

          {/* Fila 2: Número Entero & Número Decimal / Moneda */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="3. Número Entero (Number): Edad"
                type="number"
                placeholder="25"
                {...register('age', { valueAsNumber: true })}
                error={errors.age?.message}
                helperText="Debe ser mayor o igual a 18 años"
              />
            </div>

            <div>
              <Input
                label="4. Número Decimal / Moneda (Number): Salario (USD)"
                type="number"
                step="100"
                placeholder="3000"
                {...register('salary', { valueAsNumber: true })}
                error={errors.salary?.message}
                helperText="Monto mínimo $500 USD"
              />
            </div>
          </div>

          {/* Fila 3: Enum (Select Dropdown) & Fecha (Date String) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold text-sm text-black dark:text-white">
                5. Selección Única / Enum (Select): Rol asignado
              </label>
              <select
                {...register('role')}
                className={`w-full p-2.5 rounded-lg border text-sm transition-colors focus:ring-2 focus:ring-[#FF644B] focus:outline-none ${
                  errors.role
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200'
                    : 'border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white'
                }`}
              >
                <option value="user" className="bg-white dark:bg-slate-900 text-black dark:text-white">
                  Usuario Estándar (user)
                </option>
                <option value="editor" className="bg-white dark:bg-slate-900 text-black dark:text-white">
                  Editor de Contenido (editor)
                </option>
                <option value="admin" className="bg-white dark:bg-slate-900 text-black dark:text-white">
                  Administrador Global (admin)
                </option>
              </select>
              {errors.role?.message ? (
                <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                  {errors.role.message}
                </span>
              ) : (
                <span className="text-xs text-black dark:text-white opacity-70 mt-1 block">
                  Opciones restringidas a tipos válidos de Zod Enum
                </span>
              )}
            </div>

            <div>
              <Input
                label="6. Fecha (Date String): Fecha de Nacimiento"
                type="date"
                {...register('birthDate')}
                error={errors.birthDate?.message}
                helperText="Formato AAAA-MM-DD"
              />
            </div>
          </div>

          {/* Fila 4: Texto Extenso (Textarea / Bio) */}
          <div>
            <label className="block mb-2 font-bold text-sm text-black dark:text-white">
              7. Texto Extenso (String Long / Textarea): Biografía o Resumen
            </label>
            <textarea
              rows={3}
              placeholder="Escribe una breve descripción del perfil (mínimo 10 caracteres)..."
              {...register('bio')}
              className={`w-full p-2.5 rounded-lg border text-sm transition-colors font-sans focus:ring-2 focus:ring-[#FF644B] focus:outline-none ${
                errors.bio
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200'
                  : 'border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white'
              }`}
            />
            {errors.bio?.message ? (
              <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                {errors.bio.message}
              </span>
            ) : (
              <span className="text-xs text-black dark:text-white opacity-70 mt-1 block">
                Entre 10 y 300 caracteres
              </span>
            )}
          </div>

          {/* Fila 5: Arreglo de Opciones (Array of Strings / Skills Checkboxes) */}
          <div>
            <label className="block mb-2 font-bold text-sm text-black dark:text-white">
              8. Arreglo / Opciones Múltiples (Array of Strings): Habilidades Tecnológicas
            </label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-3 p-3.5 rounded-lg border border-[#CDCDCD] dark:border-slate-800 bg-[#EBEBEB]/40 dark:bg-slate-900/60">
                  {AVAILABLE_SKILLS.map((skill) => {
                    const isChecked = field.value?.includes(skill);
                    return (
                      <label
                        key={skill}
                        className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white hover:text-[#FF644B] transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={skill}
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...(field.value || []), skill]);
                            } else {
                              field.onChange((field.value || []).filter((s: string) => s !== skill));
                            }
                          }}
                          className="rounded border-[#CDCDCD] dark:border-slate-700 text-[#FF644B] focus:ring-[#FF644B] dark:bg-slate-800"
                        />
                        {skill}
                      </label>
                    );
                  })}
                </div>
              )}
            />
            {errors.skills?.message ? (
              <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                {errors.skills.message}
              </span>
            ) : (
              <span className="text-xs text-black dark:text-white opacity-70 mt-1 block font-medium">
                Seleccionados ({selectedSkills.length}): {selectedSkills.join(', ') || 'Ninguno'}
              </span>
            )}
          </div>

          {/* Fila 6: Booleano Switch & Booleano Checkbox Requerido */}
          <div className="flex flex-col gap-3 mt-2">
            <Controller
              name="notifications"
              control={control}
              render={({ field }) => (
                <Switch
                  label="9. Booleano Opcional (Switch): Recibir notificaciones del sistema"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />

            <div>
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label="10. Booleano Requerido (Checkbox Refine): Acepto los términos y condiciones de la plataforma *"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              {errors.terms?.message && (
                <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                  {errors.terms.message}
                </span>
              )}
            </div>
          </div>

          {/* Botón Submit */}
          <div className="mt-4">
            <Button type="submit" variant="primary" size="lg" loading={isCreating}>
              Guardar Registro Validado
            </Button>
          </div>
        </form>
      </Card>

      {/* Vista de Usuarios con Datos de Ejemplo Inmediatos y Soporte Modo Oscuro */}
      <Card title={`Registros de Ejemplo y Usuarios Creados (${users.length})`}>
        {isError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg mb-4 text-red-700 dark:text-red-300 text-sm font-medium">
            ℹ️ Nota: Operando con almacenamiento local de respaldo.
          </div>
        )}

        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-2 p-4 rounded-xl border border-[#CDCDCD] dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <strong className="text-base font-bold text-black dark:text-white">{user.name}</strong>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      user.role === 'admin'
                        ? 'bg-[#FFF0ED] text-[#FF644B] border border-[#FF644B]/30'
                        : user.role === 'editor'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300'
                        : 'bg-[#EBEBEB] dark:bg-slate-800 text-black dark:text-white border border-[#CDCDCD]'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>
                  Eliminar
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-black dark:text-white">
                <span>📧 {user.email}</span>
                <span>🎂 {user.age} años ({user.birthDate})</span>
                <span>💰 Salario: <strong className="text-black dark:text-white">{formatCurrency(user.salary)}</strong></span>
                <span>🔔 Notificaciones: {user.notifications ? 'Sí' : 'No'}</span>
              </div>

              {user.bio && (
                <p className="text-sm text-black dark:text-white italic bg-[#EBEBEB]/50 dark:bg-slate-950/60 p-3 rounded-lg border border-[#CDCDCD] dark:border-slate-800/80 mt-1">
                  "{user.bio}"
                </p>
              )}

              {user.skills && user.skills.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-black dark:text-white opacity-80 font-bold">Tech Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-[#FFF0ED] text-[#FF644B] px-2 py-0.5 rounded font-bold border border-[#FF644B]/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserList;
