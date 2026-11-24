import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEnvelope, faLock, faSignInAlt, faSun, faMoon, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Button, Input, Checkbox, Card, Icon } from '../components/base';
import { showSuccessAlert, showErrorAlert, showToastNotification } from '../utils';

export const LoginView = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('demo@vision.com');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setEmailError('Ingresa un correo electrónico válido');
      return;
    }
    setEmailError('');

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (password.length < 4) {
        showErrorAlert('Error de inicio de sesión', 'La contraseña debe tener al menos 4 caracteres');
        return;
      }

      const userData = {
        id: 'user-1',
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'Administrador',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=FF644B&color=fff`,
      };

      login('token-jwt-demo-999', userData);
      showToastNotification(`¡Bienvenido de nuevo, ${userData.name}!`, 'success');
      navigate('/', { replace: true });
    }, 1000);
  };

  const handleQuickLogin = (role: 'Admin' | 'Developer') => {
    const demoEmail = role === 'Admin' ? 'admin@vision.com' : 'dev@vision.com';
    const demoName = role === 'Admin' ? 'Administrador Vision' : 'Desarrollador Frontend';

    const userData = {
      id: role === 'Admin' ? 'admin-1' : 'dev-1',
      name: demoName,
      email: demoEmail,
      role: role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(demoName)}&background=FF644B&color=fff`,
    };

    login('token-jwt-demo-999', userData);
    showSuccessAlert('Acceso Demo Concedido', `Iniciaste sesión como ${demoName}`);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB] dark:bg-slate-900 p-6 relative transition-colors duration-200">
      {/* Top right theme toggle */}
      <div className="absolute top-6 right-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          leftIcon={<Icon icon={theme === 'dark' ? faSun : faMoon} />}
          className="text-black dark:text-white border border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
        >
          {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
        </Button>
      </div>

      <div className="w-full max-w-md">
        <Card padding="lg" variant="elevated" className="bg-white dark:bg-slate-800 border border-[#CDCDCD] dark:border-slate-700 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#FF644B] inline-flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
              V
            </div>
            <h1 className="text-2xl font-extrabold text-black dark:text-white">
              Iniciar Sesión
            </h1>
            <p className="text-sm font-medium text-black dark:text-white opacity-80 mt-1">
              Accede a la plataforma base ReactJS Baseline v2
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="demo@vision.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              leftIcon={<Icon icon={faEnvelope} />}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Icon icon={faLock} />}
              required
            />

            <div className="flex items-center justify-between">
              <Checkbox
                label="Recordar sesión"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); showToastNotification('Contacta al administrador', 'info'); }}
                className="text-xs font-bold text-[#FF644B] hover:text-[#E54E36] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              leftIcon={<Icon icon={faSignInAlt} />}
            >
              {loading ? 'Autenticando...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="mt-6 pt-5 border-t border-[#CDCDCD] dark:border-slate-700">
            <p className="text-xs font-bold text-black dark:text-white text-center mb-3">
              Acceso Rápido Demo:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                outlined
                size="sm"
                onClick={() => handleQuickLogin('Admin')}
                leftIcon={<Icon icon={faUserCheck} />}
              >
                Demo Admin
              </Button>
              <Button
                variant="secondary"
                outlined
                size="sm"
                onClick={() => handleQuickLogin('Developer')}
                leftIcon={<Icon icon={faUserCheck} />}
              >
                Demo Dev
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginView;
