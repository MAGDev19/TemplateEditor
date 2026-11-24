import type { ReactNode } from 'react';

export interface FooterProps {
  copyrightText?: string;
  links?: { label: string; href: string }[];
  children?: ReactNode;
  className?: string;
}
