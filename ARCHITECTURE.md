# 📘 Guía Práctica de Arquitectura y Componentes (`ReactJSBaseLineV2`)

Bienvenido a la guía de arquitectura de **ReactJSBaseLineV2**. Esta guía explica de forma **sencilla, clara y visual** cómo está estructurado el proyecto, qué hace cada carpeta y cómo debes utilizar los componentes con ejemplos prácticos.

---

## 💡 1. ¿Cómo funciona la arquitectura? (Explicada sin rodeos)

Imagina el proyecto como la construcción de una casa:

```text
src/
├── components/base/        🧩 LAS PIEZAS DE LEGO (Botones, Cajas, Entradas de texto, Modales)
├── components/navigation/  🧭 LA SEÑALIZACIÓN (Menús, Barras de navegación, Pasos, Pestañas)
├── components/layout/      🏠 EL ESQUELETO DE LA CASA (Cabecera, Menú lateral, Pie de página)
├── features/               🏢 LOS DEPARTAMENTOS (Usuarios, Productos, Facturas, Reportes)
├── context/                🧠 LA MEMORIA GLOBAL (Tema Claro/Oscuro, Usuario Autenticado)
├── hooks/                  🛠️ LAS HERRAMIENTAS (Peticiones HTTP, temporizadores, modales)
├── routes/                 🗺️ EL MAPA DE RUTAS (Direcciones y URLs protegidas)
└── utils/                  🔌 LOS ADAPTADORES (Alertas bonitas, formateadores de dinero/fechas)
```

---

## 📂 2. ¿Qué se hace en cada carpeta y cuándo usarla?

### 1️⃣ `src/components/base/` (Las piezas de Lego)
- **¿Qué se hace aquí?**: Se guardan los elementos de diseño más pequeños y reutilizables. No saben nada sobre usuarios, ni productos, ni lógica de negocio; solo se encargan de verse y comportarse bien.
- **Ejemplos de componentes**:
  - `Button`: Botones de guardar, cancelar, eliminar con estados de carga.
  - `Input`: Cajas de texto con etiquetas y mensajes de error en rojo.
  - `Card`: Tarjetas para encerrar contenido (Normal, Elevada, Cristal/Glassmorphism).
  - `StatCard`: Tarjetas para mostrar cifras clave con porcentajes de aumento o disminución.
  - `MediaCard`: Tarjetas con foto, título, resumen y botón (ideal para noticias o artículos).
  - `ProfileCard`: Tarjetas para mostrar a un usuario con foto de perfil y estado (En línea/Ausente).
  - `Carousel`: Galería de imágenes o anuncios que pasan solos o con el dedo/swipe.
  - `Modal`: Ventana emergente flotante para confirmar o pedir datos.

---

### 2️⃣ `src/components/navigation/` (La Señalización)
- **¿Qué se hace aquí?**: Se guardan los componentes encargados de guiar al usuario por la aplicación.
- **Ejemplos de componentes**:
  - `Navbar`: La barra superior de la app con el logo, links, menús desplegables y foto de usuario.
  - `Stepper`: El indicador de pasos (Paso 1 ➔ Paso 2 ➔ Paso 3) para procesos largos.
  - `SegmentedControl`: El interruptor de opciones (Ej. Ver como "Lista" o como "Cuadrícula").
  - `DropdownMenu`: Menú flotante de acciones que aparece al hacer clic en tres puntos (`...`).
  - `Tabs`: Pestañas para cambiar entre diferentes secciones dentro de una misma pantalla.

---

### 3️⃣ `src/features/` (Los Departamentos de Negocio)
- **¿Qué se hace aquí?**: Aquí vive la lógica real de tu aplicación. Cada función principal (Usuarios, Productos, Ventas) tiene su propia carpeta aislada.
- **Ejemplo**: Si estás creando el módulo de **Productos**, tu carpeta será `src/features/products/` y dentro tendrá:
  - `services/`: Código que llama a la base de datos o servidor.
  - `schemas/`: Reglas de qué datos son obligatorios (ej. "El precio debe ser mayor a 0").
  - `types/`: Descripción del producto (id, nombre, precio, stock).
  - `components/`: Tablas o formularios específicos de productos.

---

## 🚀 3. Ejemplos Prácticos de Código (Copiar y Usar)

### 📊 Ejemplo 1: Mostrar Tarjetas de Métricas en un Dashboard (`StatCard`)
¿Quieres mostrar el total de ventas y los nuevos usuarios? Usa `StatCard`:

```tsx
import { StatCard } from '@/components/base';
import { faDollarSign, faUsers } from '@fortawesome/free-solid-svg-icons';

export const DashboardMetricas = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="Ventas Totales"
        value="$24,500.00"
        icon={faDollarSign}
        trend={{ value: '+12.5%', direction: 'up' }}
        footerText="Comparado con el mes pasado"
        variant="elevated"
      />
      <StatCard
        title="Nuevos Clientes"
        value="142"
        icon={faUsers}
        trend={{ value: '+5.1%', direction: 'up' }}
        footerText="Registrados esta semana"
        variant="glass"
      />
    </div>
  );
};
```

---

### 🖼️ Ejemplo 2: Crear un Carrusel de Noticias o Banners (`Carousel`)
Para mostrar anuncios flotantes con paso automático y soporte para deslizamiento con el dedo en celular:

```tsx
import { Carousel } from '@/components/base';

export const BannerPromocional = () => {
  const slides = [
    {
      id: 1,
      content: (
        <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold">¡Bienvenido a la Plataforma!</h2>
          <p className="text-sm opacity-90">Explora las nuevas funciones de la versión 2.0</p>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Modo Oscuro Disponible</h2>
          <p className="text-sm opacity-90">Cambia el tema visual con un solo clic</p>
        </div>
      ),
    },
  ];

  return (
    <Carousel
      slides={slides}
      autoPlay={true}
      intervalMs={4000}
      height="250px"
      showIndicators={true}
    />
  );
};
```

---

### 🧭 Ejemplo 3: Proceso de Varios Pasos / Wizard (`Stepper`)
Si tienes un registro de 3 pasos (1. Datos, 2. Pago, 3. Confirmación):

```tsx
import { useState } from 'react';
import { Stepper } from '@/components/navigation';
import { Button } from '@/components/base';

export const FormularioPasoAPaso = () => {
  const [pasoActual, setPasoActual] = useState(0);

  const pasos = [
    { title: '1. Datos Personales', description: 'Nombre y Correo' },
    { title: '2. Dirección', description: 'Ciudad y Dirección de Envío' },
    { title: '3. Confirmación', description: 'Revisión final' },
  ];

  return (
    <div className="space-y-6">
      <Stepper steps={pasos} current={pasoActual} onChange={setPasoActual} />

      <div className="p-6 border rounded-xl bg-white dark:bg-slate-800">
        {pasoActual === 0 && <p>Formulario de Datos Personales...</p>}
        {pasoActual === 1 && <p>Formulario de Dirección...</p>}
        {pasoActual === 2 && <p>Resumen y Confirmación Final...</p>}
      </div>

      <div className="flex justify-between">
        <Button
          disabled={pasoActual === 0}
          onClick={() => setPasoActual((p) => p - 1)}
          variant="ghost"
        >
          Anterior
        </Button>
        <Button
          disabled={pasoActual === 2}
          onClick={() => setPasoActual((p) => p + 1)}
          variant="primary"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
```

---

### 🎛️ Ejemplo 4: Cambiar de Vista Lista a Cuadrícula (`SegmentedControl`)
Para que el usuario elija cómo ver los datos:

```tsx
import { useState } from 'react';
import { SegmentedControl } from '@/components/navigation';
import { faThLarge, faList } from '@fortawesome/free-solid-svg-icons';

export const SelectorDeVista = () => {
  const [vista, setVista] = useState('grid');

  return (
    <div>
      <SegmentedControl
        value={vista}
        onChange={setVista}
        options={[
          { label: 'Cuadrícula', value: 'grid', icon: faThLarge },
          { label: 'Lista', value: 'list', icon: faList },
        ]}
      />
      <div className="mt-4">
        {vista === 'grid' ? <p>Mostrando en Cuadrícula...</p> : <p>Mostrando en Lista...</p>}
      </div>
    </div>
  );
};
```

---

## 📌 4. Reglas de Oro para Todo el Equipo

1. **Usa siempre la importación corta `@/`**:
   - ❌ Mal: `import Button from '../../../components/base/Button'`
   - ✅ Bien: `import { Button } from '@/components/base'`

2. **No inventes colores fijos raros en CSS**:
   - Usa las clases de Tailwind que ya soportan modo claro y oscuro.
   - ✅ Ejemplo: `text-slate-900 dark:text-white` (Texto oscuro en modo claro, texto blanco en modo oscuro).

3. **Valida la información inmediatamente**:
   - Si el usuario escribe mal un correo, muéstrale el mensaje en rojo inmediatamente en la caja de texto sin esperar a que envíe todo el formulario.
