import type {
    ButtonHTMLAttributes,
    ReactNode
} from "react";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "ghost"
    | "link";

export type ButtonSize =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {

    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    rounded?: boolean;
    outlined?: boolean;
    ghost?: boolean;
    elevation?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}