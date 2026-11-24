import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProps } from './Icon.types';

export const Icon = ({ icon, size = '1x', className, color, spin }: IconProps) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      className={className}
      style={color ? { color } : undefined}
      spin={spin}
    />
  );
};

export default Icon;
