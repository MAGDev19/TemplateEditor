import { cva } from 'class-variance-authority';
import styles from './Card.module.css';

export const cardVariants = cva(styles.card, {
  variants: {
    variant: {
      default: styles.variantDefault,
      outlined: styles.variantOutlined,
      flat: styles.variantFlat,
    },
    padding: {
      none: styles.paddingNone,
      sm: styles.paddingSm,
      md: styles.paddingMd,
      lg: styles.paddingLg,
    },
    hoverable: {
      true: styles.hoverable,
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'none',
  },
});
