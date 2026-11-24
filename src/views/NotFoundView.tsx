import { useNavigate } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Icon } from '../components/base';

export const NotFoundView = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB] dark:bg-slate-900 p-6">
      <div className="max-w-md w-full text-center">
        <Card padding="lg">
          <div className="text-6xl font-extrabold text-[#FF644B]">
            404
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-2 text-black dark:text-white">
            Página No Encontrada
          </h2>
          <p className="text-black dark:text-white opacity-80 text-sm mb-6">
            La ruta a la que intentas acceder no existe o fue movida.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/', { replace: true })}
            leftIcon={<Icon icon={faHome} />}
          >
            Volver al Inicio
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundView;
