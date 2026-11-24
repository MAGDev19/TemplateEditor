import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardMediaProps,
  CardBadgeProps,
  StatCardProps,
  MediaCardProps,
  ProfileCardProps,
} from './Card.types';

export const Card = ({
  children,
  variant = 'default',
  hoverable = false,
  padding = 'none',
  className,
  ...props
}: CardProps) => {
  const variantClasses = {
    default: 'bg-white dark:bg-slate-800 border border-[#CDCDCD] dark:border-slate-700 shadow-sm',
    outlined: 'bg-white dark:bg-slate-800 border border-[#CDCDCD] dark:border-slate-700',
    flat: 'bg-[#EBEBEB] dark:bg-slate-800/60 border-0',
    elevated: 'bg-white dark:bg-slate-800 shadow-lg border border-[#CDCDCD]/60 dark:border-slate-700/50',
    glass: 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-md',
    gradient: 'bg-gradient-to-br from-[#FF644B] to-[#E54E36] text-white border-0 shadow-lg',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  return (
    <div
      className={clsx(
        'relative rounded-xl text-black dark:text-white transition-all duration-200 overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && 'hover:-translate-y-1 hover:shadow-xl cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, action, subtitle, className, ...props }: CardHeaderProps) => (
  <div className={clsx('flex items-center justify-between px-6 py-4 border-b border-[#CDCDCD] dark:border-slate-700/80', className)} {...props}>
    <div>
      <div className="text-lg font-semibold text-black dark:text-white leading-snug">{children}</div>
      {subtitle && <div className="text-xs text-black dark:text-white opacity-80 mt-0.5">{subtitle}</div>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const CardBody = ({ children, className, ...props }: CardBodyProps) => (
  <div className={clsx('p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }: CardFooterProps) => (
  <div className={clsx('flex items-center justify-end gap-3 px-6 py-4 border-t border-[#CDCDCD] dark:border-slate-700/80 bg-[#EBEBEB]/40 dark:bg-slate-900/30', className)} {...props}>
    {children}
  </div>
);

export const CardMedia = ({
  src,
  alt = '',
  height = '180px',
  aspectRatio = 'auto',
  overlay,
  className,
  ...props
}: CardMediaProps) => {
  const aspectClasses = {
    auto: '',
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  };

  return (
    <div className={clsx('relative overflow-hidden w-full bg-[#EBEBEB] dark:bg-slate-900', aspectClasses[aspectRatio], className)} {...props}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        style={aspectRatio === 'auto' ? { height } : undefined}
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">{overlay}</div>}
    </div>
  );
};

export const CardBadge = ({
  children,
  variant = 'primary',
  position = 'top-right',
  className,
  ...props
}: CardBadgeProps) => {
  const positionClasses = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
  };

  const variantClasses = {
    primary: 'bg-[#FF644B] text-white',
    secondary: 'bg-[#666666] text-white',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-rose-600 text-white',
    info: 'bg-cyan-600 text-white',
  };

  return (
    <span
      className={clsx(
        'absolute px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm backdrop-blur-sm z-10',
        positionClasses[position],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  variant = 'default',
  badge,
  footerText,
  className,
  ...props
}: StatCardProps) => {
  const isTrendUp = trend?.direction === 'up';
  const isTrendDown = trend?.direction === 'down';

  return (
    <Card variant={variant} className={clsx('p-5', className)} {...props}>
      {badge && <div className="absolute top-4 right-4">{badge}</div>}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-black dark:text-white">{title}</span>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-[#FFF0ED] dark:bg-slate-700 text-[#FF644B] flex items-center justify-center text-lg">
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="text-2xl font-bold tracking-tight text-black dark:text-white">{value}</div>
        {trend && (
          <div
            className={clsx(
              'flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
              isTrendUp && 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
              isTrendDown && 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
              !isTrendUp && !isTrendDown && 'bg-slate-100 text-black dark:bg-slate-800 dark:text-white'
            )}
          >
            <FontAwesomeIcon icon={isTrendUp ? faArrowUp : isTrendDown ? faArrowDown : faMinus} className="text-[10px]" />
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      {(trend?.label || footerText) && (
        <div className="mt-3 text-xs text-black dark:text-white opacity-80 border-t border-[#CDCDCD] dark:border-slate-700/60 pt-2.5">
          {footerText || trend?.label}
        </div>
      )}
    </Card>
  );
};

export const MediaCard = ({
  image,
  title,
  description,
  category,
  date,
  action,
  variant = 'default',
  className,
  ...props
}: MediaCardProps) => (
  <Card variant={variant} hoverable className={className} {...props}>
    <CardMedia src={image} aspectRatio="video" />
    <CardBody className="p-5">
      {(category || date) && (
        <div className="flex items-center gap-2 text-xs text-[#FF644B] font-semibold mb-2">
          {category && <span>{category}</span>}
          {category && date && <span>•</span>}
          {date && <span className="text-black dark:text-white opacity-70 font-normal">{date}</span>}
        </div>
      )}
      <h3 className="text-lg font-bold text-black dark:text-white line-clamp-1">{title}</h3>
      <p className="mt-2 text-sm text-black dark:text-white opacity-90 line-clamp-2">{description}</p>
      {action && <div className="mt-4 pt-3 border-t border-[#CDCDCD] dark:border-slate-700/60">{action}</div>}
    </CardBody>
  </Card>
);

export const ProfileCard = ({
  avatar,
  name,
  role,
  bio,
  status = 'online',
  stats,
  actions,
  variant = 'default',
  className,
  ...props
}: ProfileCardProps) => {
  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-rose-500',
    away: 'bg-amber-500',
  };

  return (
    <Card variant={variant} className={clsx('text-center p-6', className)} {...props}>
      <div className="relative inline-block mx-auto mb-3">
        <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover ring-4 ring-[#CDCDCD] dark:ring-slate-700 shadow-md" />
        <span className={clsx('absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800', statusColors[status])} />
      </div>

      <h4 className="text-lg font-bold text-black dark:text-white">{name}</h4>
      <p className="text-xs font-semibold text-[#FF644B]">{role}</p>

      {bio && <p className="mt-3 text-xs text-black dark:text-white opacity-90 line-clamp-2">{bio}</p>}

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-3 gap-2 my-4 py-3 border-y border-[#CDCDCD] dark:border-slate-700/60 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-sm font-bold text-black dark:text-white">{stat.value}</div>
              <div className="text-[10px] text-black dark:text-white opacity-70 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {actions && <div className="mt-4 flex justify-center gap-2">{actions}</div>}
    </Card>
  );
};

export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Media: CardMedia,
  Badge: CardBadge,
  Stat: StatCard,
  MediaCard,
  ProfileCard,
});
