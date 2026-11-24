import { cva } from 'class-variance-authority';
import styles from './Input.module.css';

export const inputVariants = cva(styles.input, {
  variants: {
    inputSize: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    error: {
      true: styles.inputError,
    },
  },
  defaultVariants: {
    inputSize: 'md',
  },
});
