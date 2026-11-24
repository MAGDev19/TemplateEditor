import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faTable,
  faSliders,
  faBell,
  faCode,
  faSearch,
  faPlus,
  faTrash,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faUsers,
  faLock,
  faChartLine,
  faUser,
  faStar,
  faImage,
  faCompass,
  faEllipsisV,
  faThLarge,
  faList,
  faChartBar,
  faDownload,
  faShareAlt,
  faCog,
  faSignOutAlt,
  faRocket,
  faShieldAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import {
  Button,
  Card,
  StatCard,
  MediaCard,
  ProfileCard,
  Carousel,
  Input,
  Checkbox,
  Switch,
  Modal,
  Table,
  Pagination,
  Toast,
  Icon,
  Tooltip,
  DatePicker,
  Spinner,
} from '../components/base';

import { MainLayout } from '../components/layout';
import { Breadcrumb, Tabs, Navbar, Stepper, SegmentedControl, DropdownMenu } from '../components/navigation';
import { useModal } from '../hooks/useModal';
import { useDebounce } from '../hooks/useDebounce';
import { useTheme } from '../hooks/useTheme';
import {
  showSuccessAlert,
  showErrorAlert,
  showConfirmDialog,
  showToastNotification,
  formatCurrency,
  formatDate,
} from '../utils';

interface SampleUser {
  id: number;
  name: string;
  role: string;
  status: 'Activo' | 'Inactivo';
  registered: string;
  salary: number;
}

const INITIAL_USERS: SampleUser[] = [
  { id: 1, name: 'Carolina Gómez', role: 'Fullstack Dev', status: 'Activo', registered: '2025-01-15', salary: 4500 },
  { id: 2, name: 'Alexander Torres', role: 'UX/UI Designer', status: 'Activo', registered: '2025-03-20', salary: 3800 },
  { id: 3, name: 'Mariana López', role: 'Product Owner', status: 'Inactivo', registered: '2024-11-05', salary: 5200 },
  { id: 4, name: 'David Benítez', role: 'DevOps Engineer', status: 'Activo', registered: '2025-06-10', salary: 4900 },
  { id: 5, name: 'Sofia Martínez', role: 'Frontend Lead', status: 'Activo', registered: '2024-08-12', salary: 5600 },
];

export const ShowcaseView = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const modalControls = useModal();
  
  // State for tabs
  const [activeNav, setActiveNav] = useState('components');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [currentPage, setCurrentPage] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(true);

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);

  // SegmentedControl state
  const [viewMode, setViewMode] = useState('grid');
  const [periodFilter, setPeriodFilter] = useState('month');

  // Complete Form State & Validation for "Formularios & Controls" panel
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPassword, setDemoPassword] = useState('');
  const [demoAge, setDemoAge] = useState('');
  const [demoRole, setDemoRole] = useState('developer');
  const [demoDate, setDemoDate] = useState('');
  const [demoBio, setDemoBio] = useState('');
  const [demoPreferences, setDemoPreferences] = useState<string[]>(['frontend']);
  const [demoErrors, setDemoErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    age?: string;
    role?: string;
    date?: string;
    bio?: string;
    preferences?: string;
    terms?: string;
  }>({});

  // State & Validation inside Modal
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDate, setFormDate] = useState('');
  const [modalErrors, setModalErrors] = useState<{ name?: string; email?: string; date?: string }>({});
  const [modalVariant, setModalVariant] = useState<'form' | 'confirm' | 'details'>('form');
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');

  const sidebarItems = [
    { key: 'components', label: 'Componentes Base', icon: faLayerGroup },
    { key: 'cards_carousel', label: 'Cards & Carrusel', icon: faImage },
    { key: 'navigation_suite', label: 'Navegación & Tabs', icon: faCompass },
    { key: 'tables', label: 'Tablas & Datos', icon: faTable },
    { key: 'controls', label: 'Formularios & Controls', icon: faSliders },
    { key: 'notifications', label: 'Alertas & Modales', icon: faBell },
    { key: 'architecture', label: 'Guía de Arquitectura', icon: faCode },
  ];

  // Validation Rules
  const validateEmailRule = (val: string): string | undefined => {
    if (!val) return 'El correo electrónico es requerido.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return 'Formato de correo inválido (ej. usuario@dominio.com).';
    return undefined;
  };

  const validateNameRule = (val: string): string | undefined => {
    if (!val || val.trim().length < 3) return 'El nombre completo debe tener al menos 3 caracteres.';
    return undefined;
  };

  const validatePasswordRule = (val: string): string | undefined => {
    if (!val || val.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    return undefined;
  };

  const validateAgeRule = (val: string): string | undefined => {
    if (!val || isNaN(Number(val)) || Number(val) < 18) return 'Ingresa una edad válida (mayor o igual a 18 años).';
    return undefined;
  };

  const validateBioRule = (val: string): string | undefined => {
    if (!val || val.trim().length < 10) return 'La biografía o observaciones deben tener al menos 10 caracteres.';
    return undefined;
  };

  const handleEmailChange = (val: string) => {
    setDemoEmail(val);
    setDemoErrors((prev) => ({ ...prev, email: validateEmailRule(val) }));
  };

  const handleNameChange = (val: string) => {
    setDemoName(val);
    setDemoErrors((prev) => ({ ...prev, name: validateNameRule(val) }));
  };

  const handlePasswordChange = (val: string) => {
    setDemoPassword(val);
    setDemoErrors((prev) => ({ ...prev, password: validatePasswordRule(val) }));
  };

  const handleAgeChange = (val: string) => {
    setDemoAge(val);
    setDemoErrors((prev) => ({ ...prev, age: validateAgeRule(val) }));
  };

  const handleBioChange = (val: string) => {
    setDemoBio(val);
    setDemoErrors((prev) => ({ ...prev, bio: validateBioRule(val) }));
  };

  const handleValidateDemoForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof demoErrors = {
      name: validateNameRule(demoName),
      email: validateEmailRule(demoEmail),
      password: validatePasswordRule(demoPassword),
      age: validateAgeRule(demoAge),
      date: demoDate ? undefined : 'Selecciona una fecha válida.',
      bio: validateBioRule(demoBio),
      preferences: demoPreferences.length > 0 ? undefined : 'Selecciona al menos una área de preferencia.',
      terms: checkboxChecked ? undefined : 'Debes aceptar los términos y condiciones para continuar.',
    };

    const activeErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v !== undefined)
    );

    setDemoErrors(activeErrors);

    if (Object.keys(activeErrors).length === 0) {
      showSuccessAlert(
        '¡Formulario Totalmente Válido!',
        'Se han comprobado satisfactoriamente los 10 tipos de controles del panel en tiempo real.'
      );
    } else {
      showErrorAlert('Errores en Formulario', 'Corrige los campos marcados en rojo antes de enviar.');
    }
  };

  const handleSaveModal = () => {
    const newErrors: { name?: string; email?: string; date?: string } = {
      name: validateNameRule(formName),
      email: validateEmailRule(formEmail),
      date: formDate ? undefined : 'Selecciona una fecha estimada.',
    };

    const activeModalErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v !== undefined)
    );

    setModalErrors(activeModalErrors);

    if (Object.keys(activeModalErrors).length === 0) {
      showSuccessAlert('Registro guardado', `Se guardó correctamente el registro: ${formName}`);
      setFormName('');
      setFormEmail('');
      setFormDate('');
      setModalErrors({});
      modalControls.close();
    } else {
      showErrorAlert('Campos Requeridos', 'Completa los campos obligatorios del formulario.');
    }
  };

  const handleSweetAlertSuccess = () => {
    showSuccessAlert('¡Operación Exitosa!', 'El componente SweetAlert2 ha sido integrado correctamente.');
  };

  const handleSweetAlertError = () => {
    showErrorAlert('Error de Validación', 'Ocurrió un problema al procesar la solicitud.');
  };

  const handleSweetAlertConfirm = async () => {
    const confirmed = await showConfirmDialog(
      '¿Eliminar registro?',
      'Esta acción no se puede deshacer. ¿Deseas continuar?',
      'Sí, eliminar'
    );
    if (confirmed) {
      showToastNotification('Registro eliminado exitosamente', 'success');
    }
  };

  const handleSimulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      showToastNotification('Carga finalizada', 'info');
    }, 2000);
  };

  const filteredUsers = INITIAL_USERS.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    user.role.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const columns = [
    { key: 'id', title: 'ID', width: '60px', align: 'center' as const },
    { key: 'name', title: 'Nombre', render: (u: SampleUser) => <strong className="font-semibold">{u.name}</strong> },
    { key: 'role', title: 'Rol' },
    {
      key: 'status',
      title: 'Estado',
      align: 'center' as const,
      render: (u: SampleUser) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            u.status === 'Activo'
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300'
          }`}
        >
          {u.status}
        </span>
      ),
    },
    { key: 'registered', title: 'Fecha Registro', render: (u: SampleUser) => formatDate(u.registered) },
    { key: 'salary', title: 'Salario', align: 'right' as const, render: (u: SampleUser) => formatCurrency(u.salary) },
  ];

  // Demo Carousel Slides
  const carouselSlides = [
    {
      id: 1,
      content: (
        <div className="w-full h-full bg-gradient-to-r from-[#FF644B] via-[#E54E36] to-[#A32E1B] p-8 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute right-6 -bottom-10 opacity-10 text-9xl font-extrabold select-none pointer-events-none text-white">
            VITE
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold w-max mb-3 uppercase tracking-wider text-white">
            Diseño UX/UI & Sistema Base
          </span>
          <h2 className="text-3xl font-extrabold mb-2 text-white">
            Vite + React 19 Architecture
          </h2>
          <p className="text-white/90 max-w-xl text-sm leading-relaxed mb-5 font-medium">
            Componentes optimizados con rendimiento ultra rápido, tipado estricto TypeScript y sistema de tokens de color personalizados.
          </p>
          <div>
            <button
              onClick={() => showToastNotification('Explorando documentación de la arquitectura', 'info')}
              className="px-5 py-2.5 bg-white text-[#FF644B] font-bold rounded-xl shadow-lg hover:bg-[#EBEBEB] transition-all cursor-pointer border-0 text-sm"
            >
              Explorar Documentación
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="w-full h-full bg-gradient-to-r from-[#121212] via-[#1E1E1E] to-[#2B2B2B] p-8 flex flex-col justify-center text-white relative border-l-4 border-[#FF644B]">
          <div className="absolute right-6 -bottom-10 opacity-10 text-9xl font-extrabold text-white select-none pointer-events-none">
            UX/UI
          </div>
          <span className="px-3 py-1 bg-[#FF644B]/20 border border-[#FF644B] text-[#FF644B] rounded-full text-xs font-bold w-max mb-3 uppercase tracking-wider">
            Estilos Tailwind v4 Engine
          </span>
          <h2 className="text-3xl font-extrabold mb-2 text-white">
            Diseño UI Premium & Glassmorphism
          </h2>
          <p className="text-[#CDCDCD] max-w-xl text-sm leading-relaxed mb-5 font-medium">
            Aprovecha utilidades CSS de última generación con animación fluida, soporte oscuro nativo e integración armónica de color.
          </p>
          <div>
            <button
              onClick={() => showToastNotification('Visualizando componentes UI creados', 'info')}
              className="px-5 py-2.5 bg-[#FF644B] text-white font-bold rounded-xl shadow-lg hover:bg-[#E54E36] transition-all cursor-pointer border-0 text-sm"
            >
              Ver Componentes UI
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="w-full h-full bg-gradient-to-r from-[#2B2B2B] via-[#4D4D4D] to-[#666666] p-8 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute right-6 -bottom-10 opacity-10 text-9xl font-extrabold text-white select-none pointer-events-none">
            ZOD
          </div>
          <span className="px-3 py-1 bg-[#EBEBEB]/20 backdrop-blur-md border border-[#CDCDCD] rounded-full text-xs font-bold w-max mb-3 uppercase tracking-wider text-white">
            Estado & Validación DDD
          </span>
          <h2 className="text-3xl font-extrabold mb-2 text-white">
            TanStack Query + Zod + HookForm
          </h2>
          <p className="text-white/90 max-w-xl text-sm leading-relaxed mb-5 font-medium">
            Manejo robusto de peticiones asíncronas, caché inteligente de datos y esquemas de validación de formularios en tiempo real.
          </p>
          <div>
            <button
              onClick={() => navigate('/users')}
              className="px-5 py-2.5 bg-white text-[#FF644B] font-bold rounded-xl shadow-lg hover:bg-[#FFF0ED] transition-all cursor-pointer border-2 border-[#FF644B] text-sm"
            >
              Probar Módulo Usuarios
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MainLayout
      sidebarItems={sidebarItems}
      activeNavKey={activeNav}
      onSelectNav={setActiveNav}
      logo={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF644B] flex items-center justify-center text-white font-bold text-lg shadow-md">
            V
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">Vision React Architecture</span>
        </div>
      }
    >
      <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Header Breadcrumb & Title */}
        <div>
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '#' },
              { label: 'Arquitectura Base', href: '#' },
              { label: 'Showcase Interactivo' },
            ]}
          />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                ReactJS Base Architecture v2.0
              </h1>
              <p className="text-sm text-black dark:text-white opacity-80 mt-1">
                Plantilla base empresarial construida con Vite, React 19, TypeScript, TailwindCSS v4 y componentes interactivos.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Button
                variant="secondary"
                onClick={() => navigate('/users')}
                leftIcon={<Icon icon={faUsers} />}
              >
                Módulo Users (TanStack + Zod)
              </Button>
              <Tooltip content={`Tema actual: ${theme}`}>
                <Button
                  variant="primary"
                  onClick={modalControls.open}
                  leftIcon={<Icon icon={faPlus} />}
                >
                  Nuevo Registro
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Tab Section Showcase */}
        <Tabs
          activeKey={activeNav}
          onChange={setActiveNav}
          variant="pills"
          items={[
            {
              key: 'components',
              label: 'Componentes Base',
              icon: faLayerGroup,
              content: (
                <div className="flex flex-col gap-6">
                  
                  {/* Buttons Section */}
                  <Card padding="lg" hoverable>
                    <Card.Header action={<span className="text-xs text-slate-500 dark:text-slate-400 font-normal">TailwindCSS v4</span>}>
                      Botones (`Button`)
                    </Card.Header>
                    <Card.Body>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-3 items-center">
                          <Button variant="primary">Primary</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="success">Success</Button>
                          <Button variant="danger">Danger</Button>
                          <Button variant="warning">Warning</Button>
                          <Button variant="info">Info</Button>
                          <Button variant="ghost">Ghost</Button>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center">
                          <Button variant="primary" size="sm">Small</Button>
                          <Button variant="primary" size="md">Medium</Button>
                          <Button variant="primary" size="lg">Large</Button>
                          <Button variant="primary" rounded>Rounded</Button>
                          <Button variant="primary" outlined>Outlined</Button>
                          <Button
                            variant="primary"
                            loading={btnLoading}
                            onClick={handleSimulateLoading}
                            leftIcon={<Icon icon={faCheckCircle} />}
                          >
                            {btnLoading ? 'Procesando' : 'Simular Carga'}
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Loaders & Spinners */}
                  <Card padding="lg">
                    <Card.Header>Loaders & Skeletons (`Loader`)</Card.Header>
                    <Card.Body>
                      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                        <div className="flex gap-4 items-center">
                          <Spinner size="sm" variant="primary" />
                          <Spinner size="md" variant="primary" />
                          <Spinner size="lg" variant="secondary" />
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Skeleton Placeholder:</span>
                          <div className="flex flex-col gap-2">
                            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
                            <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                </div>
              ),
            },
            {
              key: 'cards_carousel',
              label: 'Cards & Carrusel',
              icon: faImage,
              badge: 'Nuevo',
              content: (
                <div className="flex flex-col gap-8">
                  {/* Carousel Demo */}
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faImage} className="text-[#FF644B]" />
                      Carrusel Interactivo (`Carousel`)
                    </h3>
                    <Carousel
                      slides={carouselSlides}
                      autoPlay={true}
                      intervalMs={4500}
                      showIndicators={true}
                      showArrows={true}
                      showCounter={true}
                      height="320px"
                    />
                  </div>

                  {/* Card Variants Showcase */}
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                      Variantes de Tarjetas (`Card`)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <Card variant="default" padding="md">
                        <Card.Header>Card Default</Card.Header>
                        <Card.Body className="p-4 text-sm text-black dark:text-white">
                          Borde suave con sombra discreta para contenedores estándar.
                        </Card.Body>
                      </Card>

                      <Card variant="elevated" padding="md" hoverable>
                        <Card.Header>Card Elevated</Card.Header>
                        <Card.Body className="p-4 text-sm text-black dark:text-white">
                          Sombra elevada con efecto hover para elementos interactivos.
                        </Card.Body>
                      </Card>

                      <Card variant="glass" padding="md">
                        <Card.Header>Card Glassmorphism</Card.Header>
                        <Card.Body className="p-4 text-sm text-black dark:text-white">
                          Fondo translúcido con desenfoque de fondo elegante (Backdrop Blur).
                        </Card.Body>
                      </Card>
                    </div>
                  </div>

                  {/* KPI Stat Cards Presets */}
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                      Tarjetas de Métricas & KPI (`StatCard`)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <StatCard
                        title="Ventas Mensuales"
                        value="$48,250.00"
                        icon={faChartLine}
                        trend={{ value: '+14.5%', direction: 'up' }}
                        footerText="Comparado con el mes anterior"
                        variant="elevated"
                      />
                      <StatCard
                        title="Usuarios Activos"
                        value="1,280"
                        icon={faUser}
                        trend={{ value: '+8.2%', direction: 'up' }}
                        footerText="82 nuevos registrados hoy"
                        variant="default"
                      />
                      <StatCard
                        title="Tasa de Conversión"
                        value="3.42%"
                        icon={faStar}
                        trend={{ value: '-0.5%', direction: 'down' }}
                        footerText="Dentro del promedio esperado"
                        variant="glass"
                      />
                    </div>
                  </div>

                  {/* Rich Preset Cards (MediaCard & ProfileCard) */}
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                      Tarjetas de Multimedia & Perfiles (`MediaCard` / `ProfileCard`)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <MediaCard
                        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
                        title="Novedades de React 19 y Server Actions"
                        description="Descubre cómo los nuevos hooks y Server Components mejoran la velocidad y simplicidad de tu aplicación."
                        category="TECNOLOGÍA"
                        date="04 Ago 2026"
                        action={<Button variant="primary" size="sm" fullWidth>Leer Artículo</Button>}
                        variant="elevated"
                      />

                      <MediaCard
                        image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
                        title="Diseño UI con Glassmorphism & Tailwind v4"
                        description="Construye interfaces modernas de alto nivel combinando micro-interacciones y utilidades avanzadas."
                        category="DISEÑO UX"
                        date="02 Ago 2026"
                        action={<Button variant="secondary" size="sm" fullWidth>Ver Proyecto</Button>}
                        variant="default"
                      />

                      <ProfileCard
                        avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
                        name="Camila Valenzuela"
                        role="Lead Frontend Engineer"
                        bio="Especialista en arquitecturas React avanzadas, sistemas de diseño accesibles y optimización web."
                        status="online"
                        stats={[
                          { label: 'Proyectos', value: '34' },
                          { label: 'Commits', value: '1.2k' },
                          { label: 'Rating', value: '4.9' },
                        ]}
                        actions={
                          <>
                            <Button variant="primary" size="sm">Seguir</Button>
                            <Button variant="ghost" size="sm">Mensaje</Button>
                          </>
                        }
                        variant="glass"
                      />
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: 'navigation_suite',
              label: 'Navegación & Tabs',
              icon: faCompass,
              badge: 'Nuevo',
              content: (
                <div className="flex flex-col gap-8">
                  {/* Navbar Demo */}
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                      Barra de Navegación Superior (`Navbar`)
                    </h3>
                    <Card padding="none" className="overflow-visible">
                      <Navbar
                        brand={
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faRocket} className="text-[#FF644B] text-lg" />
                            <span className="text-black dark:text-white font-bold">VisionApp</span>
                          </div>
                        }
                        items={[
                          { key: 'home', label: 'Inicio', active: true },
                          { key: 'services', label: 'Servicios', children: [
                            { key: 's1', label: 'Desarrollo Web' },
                            { key: 's2', label: 'Consultoría Cloud' },
                            { key: 's3', label: 'Auditoría UX' },
                          ] },
                          { key: 'pricing', label: 'Precios' },
                          { key: 'contact', label: 'Contacto' },
                        ]}
                        actions={
                          <>
                            <Button variant="ghost" size="sm">Ingresar</Button>
                            <Button variant="primary" size="sm">Registrarse</Button>
                          </>
                        }
                      />
                    </Card>
                  </div>

                  {/* Stepper Process Wizard */}
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                      Navegador de Pasos / Wizard (`Stepper`)
                    </h3>
                    <Card padding="lg">
                      <Stepper
                        current={currentStep}
                        onChange={setCurrentStep}
                        steps={[
                          { title: '1. Configuración', description: 'Parámetros básicos del proyecto', icon: faCog },
                          { title: '2. Verificación', description: 'Revisión de datos y permisos', icon: faShieldAlt },
                          { title: '3. Procesamiento', description: 'Ejecución del pipeline automatizado', icon: faRocket },
                          { title: '4. Finalizado', description: 'Confirmación y resumen', icon: faCheck },
                        ]}
                      />

                      <div className="mt-6 pt-4 border-t border-[#CDCDCD] dark:border-slate-800 flex justify-between items-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={currentStep === 0}
                          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                        >
                          Paso Anterior
                        </Button>
                        <span className="text-xs text-black dark:text-white font-medium">
                          Paso {currentStep + 1} de 4
                        </span>
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={currentStep === 3}
                          onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
                        >
                          Siguiente Paso
                        </Button>
                      </div>
                    </Card>
                  </div>

                  {/* Segmented Control & Dropdown Menu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card padding="md">
                      <Card.Header>Selector de Vista (`SegmentedControl`)</Card.Header>
                      <Card.Body className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-black dark:text-white mb-2">
                            Vista de Datos:
                          </label>
                          <SegmentedControl
                            value={viewMode}
                            onChange={setViewMode}
                            fullWidth
                            options={[
                              { label: 'Cuadrícula', value: 'grid', icon: faThLarge },
                              { label: 'Lista', value: 'list', icon: faList },
                              { label: 'Gráfico', value: 'chart', icon: faChartBar },
                            ]}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-black dark:text-white mb-2">
                            Filtro de Período:
                          </label>
                          <SegmentedControl
                            value={periodFilter}
                            onChange={setPeriodFilter}
                            size="sm"
                            options={[
                              { label: 'Día', value: 'day' },
                              { label: 'Semana', value: 'week' },
                              { label: 'Mes', value: 'month' },
                              { label: 'Año', value: 'year' },
                            ]}
                          />
                        </div>
                      </Card.Body>
                    </Card>

                    <Card padding="md">
                      <Card.Header>Menú Desplegable Popover (`DropdownMenu`)</Card.Header>
                      <Card.Body className="space-y-4">
                        <p className="text-xs text-black dark:text-white opacity-80">
                          Haz clic en los activadores para probar menús emergentes configurables:
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                          <DropdownMenu
                            trigger={
                              <Button variant="secondary" size="sm" rightIcon={<FontAwesomeIcon icon={faEllipsisV} />}>
                                Acciones Rápidas
                              </Button>
                            }
                            items={[
                              { key: 'export', label: 'Exportar Reporte', icon: faDownload },
                              { key: 'share', label: 'Compartir Enlace', icon: faShareAlt },
                              { key: 'd1', label: '', divider: true },
                              { key: 'settings', label: 'Configuración', icon: faCog },
                              { key: 'delete', label: 'Eliminar Elemento', icon: faTrash, danger: true },
                            ]}
                            onSelect={(k) => showToastNotification(`Opción seleccionada: ${k}`, 'info')}
                          />

                          <DropdownMenu
                            placement="bottom-right"
                            trigger={
                              <div className="w-10 h-10 rounded-full bg-[#FF644B] text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:ring-2 hover:ring-[#FF644B]/50 transition-all">
                                CV
                              </div>
                            }
                            items={[
                              { key: 'profile', label: 'Mi Perfil', icon: faUser },
                              { key: 'config', label: 'Ajustes de Cuenta', icon: faCog },
                              { key: 'd2', label: '', divider: true },
                              { key: 'logout', label: 'Cerrar Sesión', icon: faSignOutAlt, danger: true },
                            ]}
                            onSelect={(k) => showToastNotification(`Acción de usuario: ${k}`, 'info')}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>

                  {/* Tabs Variants Demo */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      Estilos de Pestañas (`Tabs` Variants)
                    </h3>
                    <Card padding="lg">
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Variante "Segmented":
                      </h4>
                      <Tabs
                        variant="segmented"
                        items={[
                          { key: 't1', label: 'General', content: <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm">Contenido de la pestaña General</div> },
                          { key: 't2', label: 'Seguridad', content: <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm">Contenido de la pestaña Seguridad</div> },
                          { key: 't3', label: 'Integraciones', badge: '3', content: <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm">Contenido de Integraciones</div> },
                        ]}
                      />

                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-3">
                        Variante "Underline" Vertical:
                      </h4>
                      <Tabs
                        variant="underline"
                        orientation="vertical"
                        items={[
                          { key: 'v1', label: 'Resumen Global', icon: faChartLine, content: <div className="text-sm text-slate-600 dark:text-slate-300">Panel de estadísticas globales del sistema.</div> },
                          { key: 'v2', label: 'Configuración Avanzada', icon: faCog, content: <div className="text-sm text-slate-600 dark:text-slate-300">Opciones avanzadas de la arquitectura base.</div> },
                        ]}
                      />
                    </Card>
                  </div>
                </div>
              ),
            },
            {
              key: 'tables',
              label: 'Tablas & Datos',
              icon: faTable,
              content: (
                <Card padding="lg">
                  <Card.Header
                    action={
                      <div className="w-64">
                        <Input
                          placeholder="Buscar usuario..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          leftIcon={<Icon icon={faSearch} />}
                          inputSize="sm"
                        />
                      </div>
                    }
                  >
                    Tabla de Usuarios Demo (`Table`)
                  </Card.Header>
                  <Card.Body>
                    <Table
                      columns={columns}
                      data={filteredUsers}
                      keyExtractor={(u) => u.id}
                      striped
                      hoverable
                    />
                  </Card.Body>
                  <Card.Footer>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Mostrando {filteredUsers.length} de {INITIAL_USERS.length} registros
                      </span>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={3}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </Card.Footer>
                </Card>
              ),
            },
            {
              key: 'controls',
              label: 'Formularios & Controls',
              icon: faSliders,
              content: (
                <Card padding="lg">
                  <Card.Header>Panel de Formularios Interactivo (Validación Instantánea en Tiempo Real al Escribir)</Card.Header>
                  <Card.Body>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                      Demostración completa con **validación reactiva en tiempo real**: al escribir en el correo u otros campos se evalúa instantáneamente el formato `usuario@dominio.com` y se muestran los errores inmediatamente.
                    </p>

                    <form onSubmit={handleValidateDemoForm} className="flex flex-col gap-6">
                      
                      {/* Fila 1: Texto, Email, Password */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                          label="1. Texto Corto: Nombre completo *"
                          placeholder="Ej. Juan Pérez"
                          value={demoName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          onBlur={(e) => handleNameChange(e.target.value)}
                          error={demoErrors.name}
                          helperText="Mínimo 3 caracteres"
                        />

                        <Input
                          label="2. Email: Correo institucional *"
                          type="email"
                          placeholder="correo@empresa.com"
                          value={demoEmail}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          onBlur={(e) => handleEmailChange(e.target.value)}
                          error={demoErrors.email}
                          helperText="Formato requerido: usuario@dominio.com"
                        />

                        <Input
                          label="3. Password: Contraseña segura *"
                          type="password"
                          placeholder="••••••••"
                          leftIcon={<Icon icon={faLock} />}
                          value={demoPassword}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          onBlur={(e) => handlePasswordChange(e.target.value)}
                          error={demoErrors.password}
                          helperText="Mínimo 8 caracteres"
                        />
                      </div>

                      {/* Fila 2: Número, Select, DatePicker */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                          label="4. Campo Numérico: Edad *"
                          type="number"
                          placeholder="28"
                          value={demoAge}
                          onChange={(e) => handleAgeChange(e.target.value)}
                          onBlur={(e) => handleAgeChange(e.target.value)}
                          error={demoErrors.age}
                          helperText="Edad mínima 18 años"
                        />

                        <div>
                          <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-200">
                            5. Desplegable / Enum: Área de desempeño *
                          </label>
                          <select
                            value={demoRole}
                            onChange={(e) => setDemoRole(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                          >
                            <option value="developer">Desarrollo de Software</option>
                            <option value="designer">Diseño UX/UI</option>
                            <option value="devops">DevOps e Infraestructura</option>
                            <option value="qa">Aseguramiento de Calidad (QA)</option>
                          </select>
                        </div>

                        <DatePicker
                          label="6. Fecha: Fecha de Ingreso *"
                          value={demoDate}
                          onChange={(e) => {
                            setDemoDate(e.target.value);
                            if (!e.target.value) {
                              setDemoErrors((prev) => ({ ...prev, date: 'Selecciona una fecha válida.' }));
                            } else {
                              setDemoErrors((prev) => ({ ...prev, date: undefined }));
                            }
                          }}
                          helperText="Selecciona la fecha válida"
                        />
                      </div>

                      {/* Fila 3: Textarea */}
                      <div>
                        <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-200">
                          7. Área de Texto Extenso: Comentarios u Observaciones *
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Escribe detalles adicionales (mínimo 10 caracteres)..."
                          value={demoBio}
                          onChange={(e) => handleBioChange(e.target.value)}
                          onBlur={(e) => handleBioChange(e.target.value)}
                          className={`w-full p-2.5 rounded-lg border text-sm transition-colors font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            demoErrors.bio
                              ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200'
                              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                          }`}
                        />
                        {demoErrors.bio ? (
                          <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                            {demoErrors.bio}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                            Mínimo 10 caracteres requeridos
                          </span>
                        )}
                      </div>

                      {/* Fila 4: Selección Múltiple Checkboxes */}
                      <div>
                        <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-200">
                          8. Selección Múltiple: Preferencias Tecnológicas *
                        </label>
                        <div className="flex flex-wrap gap-4 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                          {[
                            { id: 'frontend', label: 'Frontend (React/Vite)' },
                            { id: 'backend', label: 'Backend (Node/Python)' },
                            { id: 'cloud', label: 'Cloud (AWS/Azure)' },
                            { id: 'mobile', label: 'Mobile (React Native)' },
                          ].map((item) => {
                            const isChecked = demoPreferences.includes(item.id);
                            return (
                              <label key={item.id} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    let next: string[];
                                    if (e.target.checked) {
                                      next = [...demoPreferences, item.id];
                                    } else {
                                      next = demoPreferences.filter((p) => p !== item.id);
                                    }
                                    setDemoPreferences(next);
                                    setDemoErrors((prev) => ({
                                      ...prev,
                                      preferences: next.length > 0 ? undefined : 'Selecciona al menos una área de preferencia.',
                                    }));
                                  }}
                                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-slate-800"
                                />
                                {item.label}
                              </label>
                            );
                          })}
                        </div>
                        {demoErrors.preferences && (
                          <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                            {demoErrors.preferences}
                          </span>
                        )}
                      </div>

                      {/* Fila 5: Checkbox Requerido & Switch */}
                      <div className="flex flex-col gap-4 justify-center pt-1">
                        <div>
                          <Checkbox
                            label="9. Casilla de Verificación: Acepto los términos y condiciones del sistema *"
                            checked={checkboxChecked}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setCheckboxChecked(checked);
                              setDemoErrors((prev) => ({
                                ...prev,
                                terms: checked ? undefined : 'Debes aceptar los términos y condiciones para continuar.',
                              }));
                            }}
                          />
                          {demoErrors.terms && (
                            <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                              {demoErrors.terms}
                            </span>
                          )}
                        </div>

                        <Switch
                          label="10. Interruptor de Estado: Activar notificaciones de alertas"
                          checked={switchChecked}
                          onChange={(e) => setSwitchChecked(e.target.checked)}
                        />
                      </div>

                      {/* Botones de Envío y Limpieza */}
                      <div className="flex justify-start gap-4 pt-2">
                        <Button type="submit" variant="primary">
                          Validar Todos los Campos
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            setDemoName('');
                            setDemoEmail('');
                            setDemoPassword('');
                            setDemoAge('');
                            setDemoDate('');
                            setDemoBio('');
                            setDemoPreferences([]);
                            setDemoErrors({});
                          }}
                        >
                          Limpiar Formulario
                        </Button>
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              ),
            },
            {
              key: 'notifications',
              label: 'Alertas & Modales',
              icon: faBell,
              content: (
                <div className="flex flex-col gap-6">
                  {/* Card 1: Modales Showcase */}
                  <Card padding="lg">
                    <Card.Header subtitle="Diferentes tamaños y variantes de diálogo configurables">
                      Demostración de Componentes Modal (`Modal`)
                    </Card.Header>
                    <Card.Body>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="primary"
                          onClick={() => {
                            setModalVariant('form');
                            setModalSize('md');
                            modalControls.open();
                          }}
                          leftIcon={<Icon icon={faPlus} />}
                        >
                          Modal Formulario (Medium)
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setModalVariant('confirm');
                            setModalSize('sm');
                            modalControls.open();
                          }}
                          leftIcon={<Icon icon={faExclamationTriangle} />}
                        >
                          Modal Confirmación (Small)
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setModalVariant('details');
                            setModalSize('lg');
                            modalControls.open();
                          }}
                          leftIcon={<Icon icon={faInfoCircle} />}
                        >
                          Modal Detalle (Large)
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Card 2: Visualizador de Centro de Notificaciones */}
                  <Card padding="lg">
                    <Card.Header subtitle="Lista interactiva para previsualizar notificaciones de la plataforma">
                      Visualizador del Centro de Notificaciones (`Notification Center`)
                    </Card.Header>
                    <Card.Body>
                      <div className="flex flex-col gap-3">
                        {[
                          {
                            id: 1,
                            title: 'Actualización de Sistema Completada',
                            desc: 'Se han desplegado los nuevos tokens de color y tipografía en toda la app.',
                            time: 'Hace 2 minutos',
                            type: 'success',
                            badge: 'Sistema',
                          },
                          {
                            id: 2,
                            title: 'Nuevo Registro de Usuario',
                            desc: 'Carolina Gómez se ha registrado con el rol de Fullstack Dev.',
                            time: 'Hace 15 minutos',
                            type: 'info',
                            badge: 'Usuarios',
                          },
                          {
                            id: 3,
                            title: 'Advertencia de Límite de Peticiones',
                            desc: 'El uso de API ha alcanzado el 85% de la cuota mensual.',
                            time: 'Hace 1 hora',
                            type: 'warning',
                            badge: 'Alerta',
                          },
                          {
                            id: 4,
                            title: 'Error de Sincronización',
                            desc: 'No se pudo conectar con el servidor remoto. Reintentando...',
                            time: 'Hace 3 horas',
                            type: 'danger',
                            badge: 'Crítico',
                          },
                        ].map((item) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl border border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={clsx(
                                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5',
                                  item.type === 'success' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300',
                                  item.type === 'info' && 'bg-[#FFF0ED] text-[#FF644B]',
                                  item.type === 'warning' && 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300',
                                  item.type === 'danger' && 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300'
                                )}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    item.type === 'success'
                                      ? faCheckCircle
                                      : item.type === 'info'
                                      ? faInfoCircle
                                      : item.type === 'warning'
                                      ? faExclamationTriangle
                                      : faExclamationTriangle
                                  }
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-black dark:text-white">{item.title}</h4>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBEBEB] dark:bg-slate-700 text-black dark:text-white border border-[#CDCDCD]">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-black dark:text-white opacity-80 mt-1 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                              <span className="text-xs text-black dark:text-white opacity-60 font-medium">{item.time}</span>
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => showToastNotification(`Notificación #${item.id} atendida`, 'info')}
                              >
                                Atender
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Card 3: SweetAlert2 & Toast System */}
                  <Card padding="lg">
                    <Card.Header subtitle="Disparadores de alertas emergentes y notificaciones flotantes">
                      Integración SweetAlert2 & Toast System
                    </Card.Header>
                    <Card.Body>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="success" onClick={handleSweetAlertSuccess} leftIcon={<Icon icon={faCheckCircle} />}>
                          Alerta de Éxito
                        </Button>
                        <Button variant="danger" onClick={handleSweetAlertError} leftIcon={<Icon icon={faExclamationTriangle} />}>
                          Alerta de Error
                        </Button>
                        <Button variant="warning" onClick={handleSweetAlertConfirm} leftIcon={<Icon icon={faTrash} />}>
                          Diálogo de Confirmación
                        </Button>
                        <Button variant="info" onClick={() => showToastNotification('Notificación Toast flotante', 'info')} leftIcon={<Icon icon={faInfoCircle} />}>
                          Toast Notificación
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>

                  {toastVisible && (
                    <Toast
                      type="info"
                      title="Componente Toast Nativo"
                      message="Este toast está renderizado directamente con el componente Toast de TailwindCSS v4."
                      onClose={() => setToastVisible(false)}
                    />
                  )}
                </div>
              ),
            },
            {
              key: 'architecture',
              label: 'Guía de Arquitectura',
              icon: faCode,
              content: (
                <div className="flex flex-col gap-6">
                  {/* Card 1: Explicación Sencilla de Carpetas */}
                  <Card padding="lg" variant="elevated">
                    <Card.Header subtitle="Estructura clara y amigable explicada sin rodeos técnicos">
                      1. Organización del Proyecto (¿Qué se hace en cada carpeta?)
                    </Card.Header>
                    <Card.Body>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-3">
                          <h4 className="font-bold text-[#FF644B] text-base flex items-center gap-2">
                            🧩 Las Piezas y la Estructura (`src/`)
                          </h4>
                          <div className="space-y-2.5 text-black dark:text-white text-xs leading-relaxed">
                            <p>
                              <strong>`components/base/` (Las piezas de Lego)</strong>: Componentes UI pequeños reutilizables en cualquier parte (Botones, Cajas de texto, Modales, Tarjetas, Carrusel).
                            </p>
                            <p>
                              <strong>`components/navigation/` (La Señalización)</strong>: Elementos que guían al usuario por la app (Navbar, Stepper por pasos, SegmentedControl, Tabs, DropdownMenu).
                            </p>
                            <p>
                              <strong>`components/layout/` (El Esqueleto)</strong>: Encabezado general, barra lateral y pie de página que encierran las pantallas.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-bold text-purple-600 dark:text-purple-400 text-base flex items-center gap-2">
                            🏢 Los Módulos de Negocio (`features/`)
                          </h4>
                          <div className="space-y-2.5 text-black dark:text-white text-xs leading-relaxed">
                            <p>
                              <strong>`src/features/` (Los Departamentos)</strong>: Cada función de tu negocio (Usuarios, Productos, Ventas) tiene su propia carpeta aislada con sus tipos, validaciones y servicios.
                            </p>
                            <div className="p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-lg overflow-x-auto">
                              src/features/products/<br />
                              ├── services/ &nbsp;&nbsp;&nbsp;&nbsp;# Llamadas al servidor (Axios)<br />
                              ├── schemas/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Reglas de validación Zod<br />
                              ├── types/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Tipos (TypeScript)<br />
                              └── components/ &nbsp;&nbsp;# Tablas/formularios de productos
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Card 2: Ejemplos Prácticos Recomendados */}
                  <Card padding="lg" variant="default">
                    <Card.Header subtitle="Ejemplos de cómo combinar componentes y arquitectura">
                      2. Ejemplos de Uso Práctico
                    </Card.Header>
                    <Card.Body>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        {/* Ejemplo 1 */}
                        <div className="p-4 rounded-xl bg-[#EBEBEB]/50 dark:bg-slate-900/60 border border-[#CDCDCD] dark:border-slate-800 space-y-2">
                          <h4 className="font-bold text-black dark:text-white text-sm">
                            Ejemplo 1: Tarjetas de Métricas (`StatCard`)
                          </h4>
                          <p className="text-xs text-black dark:text-white opacity-80">
                            Para dashboards y paneles ejecutivos con porcentaje de cambio:
                          </p>
                          <div className="p-3 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded-lg overflow-x-auto">
                            {`<StatCard\n  title="Ventas Totales"\n  value="$24,500.00"\n  icon={faDollarSign}\n  trend={{ value: '+12.5%', direction: 'up' }}\n  variant="elevated"\n/>`}
                          </div>
                        </div>

                        {/* Ejemplo 2 */}
                        <div className="p-4 rounded-xl bg-[#EBEBEB]/50 dark:bg-slate-900/60 border border-[#CDCDCD] dark:border-slate-800 space-y-2">
                          <h4 className="font-bold text-black dark:text-white text-sm">
                            Ejemplo 2: Asistente por Pasos (`Stepper`)
                          </h4>
                          <p className="text-xs text-black dark:text-white opacity-80">
                            Para formularios guiados o procesos de registro en 3 o más etapas:
                          </p>
                          <div className="p-3 bg-slate-900 text-[#FF644B] font-mono text-[11px] rounded-lg overflow-x-auto">
                            {`<Stepper\n  current={pasoActual}\n  onChange={setPasoActual}\n  steps={[\n    { title: '1. Datos' },\n    { title: '2. Pago' },\n    { title: '3. Listo' }\n  ]}\n/>`}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ),
            },
          ]}
        />

        {/* Modal Dinámico con Múltiples Variantes y Tamaños */}
        <Modal
          isOpen={modalControls.isOpen}
          onClose={() => {
            setModalErrors({});
            modalControls.close();
          }}
          title={
            modalVariant === 'form'
              ? 'Nuevo Registro (Con Validación)'
              : modalVariant === 'confirm'
              ? 'Confirmar Eliminación de Registro'
              : 'Detalles Completos del Registro'
          }
          size={modalSize}
          footer={
            modalVariant === 'form' ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setModalErrors({});
                    modalControls.close();
                  }}
                >
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleSaveModal}>
                  Guardar Registro
                </Button>
              </>
            ) : modalVariant === 'confirm' ? (
              <>
                <Button variant="ghost" onClick={() => modalControls.close()}>
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    showToastNotification('Registro eliminado con éxito', 'success');
                    modalControls.close();
                  }}
                >
                  Sí, Eliminar
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => modalControls.close()}>
                Cerrar Vista
              </Button>
            )
          }
        >
          {modalVariant === 'form' && (
            <div className="flex flex-col gap-4">
              <Input
                label="Nombre del registro *"
                placeholder="Ej. Proyecto Alpha"
                value={formName}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormName(val);
                  setModalErrors((prev) => ({ ...prev, name: validateNameRule(val) }));
                }}
                onBlur={(e) => {
                  setModalErrors((prev) => ({ ...prev, name: validateNameRule(e.target.value) }));
                }}
                error={modalErrors.name}
                helperText="Requerido (mínimo 3 caracteres)"
              />
              <Input
                label="Correo de contacto *"
                type="email"
                placeholder="contacto@empresa.com"
                value={formEmail}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormEmail(val);
                  setModalErrors((prev) => ({ ...prev, email: validateEmailRule(val) }));
                }}
                onBlur={(e) => {
                  setModalErrors((prev) => ({ ...prev, email: validateEmailRule(e.target.value) }));
                }}
                error={modalErrors.email}
                helperText="Formato: contacto@empresa.com"
              />
              <DatePicker
                label="Fecha estimada *"
                value={formDate}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormDate(val);
                  setModalErrors((prev) => ({ ...prev, date: val ? undefined : 'Selecciona una fecha estimada.' }));
                }}
                helperText="Selecciona la fecha para el nuevo registro"
              />
              {modalErrors.date && (
                <span className="text-xs text-red-500 dark:text-red-400 font-medium">
                  {modalErrors.date}
                </span>
              )}
            </div>
          )}

          {modalVariant === 'confirm' && (
            <div className="flex flex-col items-center text-center py-4 gap-3">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center text-2xl font-bold">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white">¿Deseas eliminar este elemento?</h4>
              <p className="text-sm text-black dark:text-white opacity-80 max-w-sm">
                Esta acción no se puede deshacer. Todos los datos asociados serán eliminados permanentemente del servidor.
              </p>
            </div>
          )}

          {modalVariant === 'details' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-[#EBEBEB]/50 dark:bg-slate-900 border border-[#CDCDCD] dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-black dark:text-white text-base">Especificaciones Técnicas del Componente</h4>
                <p className="text-xs text-black dark:text-white opacity-80 leading-relaxed">
                  Los modales implementan bloqueo de scroll en el body, soporte para tecla Escape, desuso de overlay click cuando se configure y animación suave con TailwindCSS v4.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-[#CDCDCD] dark:border-slate-700">
                  <span className="font-bold text-black dark:text-white block mb-1">Estado de Animación:</span>
                  <span className="text-[#FF644B] font-bold">Slide Up + Backdrop Blur</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-[#CDCDCD] dark:border-slate-700">
                  <span className="font-bold text-black dark:text-white block mb-1">Accesibilidad:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">role="dialog" & aria-modal</span>
                </div>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </MainLayout>
  );
};

export default ShowcaseView;
