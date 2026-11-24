# React + TypeScript + Vite Architecture Baseline (`ReactJSBaseLineV2`)

Plantilla base y arquitectura inicial estandarizada para nuevos proyectos de frontend en React con Vite.js. Diseñada para proyectos empresariales escalables con buenas prácticas de tipado, diseño modular y rendimiento.

---

## 🛠️ Tecnologías y Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 8](https://vite.dev/)
- **Estilos & Componentes UI**: [TailwindCSS v4](https://tailwindcss.com/) + CSS Modules + [Class Variance Authority (CVA)](https://cva.style/) + [clsx](https://github.com/lukeed/clsx)
- **Navegación & Tabs**: Sub-sistema modular con `Navbar`, `Stepper`, `SegmentedControl`, `DropdownMenu` y `Tabs`.
- **Enrutamiento**: [React Router DOM v7](https://reactrouter.com/)
- **Iconografía**: [FontAwesome 7](https://fontawesome.com/)
- **Peticiones HTTP & Estado**: [Axios](https://axios-http.com/) con interceptores de Auth + [TanStack React Query v5](https://tanstack.com/query)
- **Formularios & Validación**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Notificaciones & Diálogos**: [SweetAlert2](https://sweetalert2.github.io/) + Toast Nativo
- **Testing & Storybook**: [Vitest](https://vitest.dev/), Testing Library, [Storybook 10](https://storybook.js.org/)

---

## 📁 Estructura del Proyecto

```text
ReactJSBaseLineV2/
├── .storybook/            # Configuración de Storybook
├── src/
│   ├── assets/            # Recursos estáticos (imágenes, logos, etc.)
│   ├── components/        # Sistema de componentes modular
│   │   ├── base/          # Componentes atómicos (Button, Input, Card, Carousel, Modal...)
│   │   ├── layout/        # Header, Sidebar, Footer, MainLayout
│   │   └── navigation/    # Navbar, Stepper, SegmentedControl, DropdownMenu, Tabs, Breadcrumb
│   ├── context/           # Contextos React (ThemeProvider, AuthProvider)
│   ├── features/          # Módulos por dominio de negocio (ej. users, dashboard...)
│   │   └── users/         # Componentes, hooks, servicios y esquemas Zod del módulo Users
│   ├── hooks/             # Custom Hooks (useApi, useAuth, useTheme, useModal, useDebounce...)
│   ├── routes/            # Configuración de rutas (AppRoutes, ProtectedRoute)
│   ├── services/          # Servicios de integración con APIs externas
│   ├── styles/            # Tokens de diseño CSS
│   ├── utils/             # Cliente Axios (api.ts), SweetAlert (sweetalert.ts), storage, formatters
│   └── views/             # Vistas de la aplicación (ShowcaseView, UsersView, LoginView)
├── vite.config.ts         # Configuración Vite + Aliases `@/`
├── tsconfig.app.json      # Configuración de TypeScript
└── ARCHITECTURE.md        # Guía técnica detallada de arquitectura y componentes
```

---

## 🏛️ Guía de Uso de la Arquitectura

### 1. ¿Cómo estructurar nuevos módulos?
Los nuevos módulos funcionales deben colocarse en `src/features/[featureName]/` organizados por dominio:
```text
src/features/products/
  ├── components/          # Componentes específicos de productos
  ├── hooks/               # Hooks de datos de productos (useProducts)
  ├── schemas/             # Validaciones Zod (productForm.schema.ts)
  ├── services/            # Llamadas a API (productService.ts)
  └── types/               # Tipos TypeScript (product.types.ts)
```

### 2. ¿Cómo y cuándo utilizar los componentes?

- **Componentes Atómicos (`src/components/base/`)**:
  - `Card`: Agrupador de contenido. Usa variantes (`glass`, `elevated`, `flat`) según la jerarquía visual.
  - `StatCard`: Para cuadros de mando y dashboards KPI con porcentajes e íconos.
  - `MediaCard` / `ProfileCard`: Para listados multimedia o tarjetas de miembros de equipo.
  - `Carousel`: Para banners interactivos, testimonios o promociones con soporte táctil swipe.
  - `Modal` & `Toast`: Para confirmaciones o mensajes emergentes.

- **Componentes de Navegación (`src/components/navigation/`)**:
  - `Navbar`: Encabezado principal. Usa `items` para enlaces/submenús y `actions` para autenticación o perfil.
  - `Stepper`: Para asistentes por etapas o formularios secuenciales.
  - `SegmentedControl`: Para conmutar vistas (ej. Lista vs Cuadrícula) de 2 a 4 opciones.
  - `DropdownMenu`: Menús flotantes en tablas o perfiles para optimizar el espacio.
  - `Tabs`: Para dividir secciones dentro de una vista (`line` para vistas, `pills` o `segmented` para filtros).

---

## ⚙️ Comandos Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local de Vite.
- `npm run build`: Compila TypeScript (`tsc -b`) y genera el bundle de producción (`vite build`).
- `npm run lint`: Ejecuta Oxlint para análisis estático de código.
- `npm run storybook`: Lanza el catálogo interactivo de componentes en Storybook (puerto 6006).

---

## 🔑 Aliases de Importación

El proyecto utiliza el alias `@/` apuntando a `src/`:

```ts
import { Button, Card, StatCard, Carousel } from '@/components/base';
import { Navbar, Stepper, SegmentedControl } from '@/components/navigation';
import { useAuth } from '@/hooks/useAuth';
import { api, showSuccessAlert } from '@/utils';
```
