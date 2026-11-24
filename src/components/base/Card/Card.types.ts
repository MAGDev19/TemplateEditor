import type { HTMLAttributes, ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type CardVariant = 'default' | 'outlined' | 'flat' | 'elevated' | 'glass' | 'gradient';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  action?: ReactNode;
  subtitle?: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  height?: string | number;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  overlay?: ReactNode;
}

export interface CardBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export interface StatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  value: ReactNode;
  icon?: IconDefinition;
  trend?: {
    value: string | number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  variant?: CardVariant;
  badge?: ReactNode;
  footerText?: ReactNode;
}

export interface MediaCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  image: string;
  title: ReactNode;
  description: ReactNode;
  category?: string;
  date?: string;
  action?: ReactNode;
  variant?: CardVariant;
}

export interface ProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  avatar: string;
  name: string;
  role: string;
  bio?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  stats?: Array<{ label: string; value: string | number }>;
  actions?: ReactNode;
  variant?: CardVariant;
}
