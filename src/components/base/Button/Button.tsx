import { forwardRef } from "react";
import clsx from "clsx";

import type { ButtonProps } from "./Button.types";

import { buttonVariants } from "./Button.utils";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            loading = false,
            disabled = false,
            fullWidth = false,
            rounded = false,
            outlined = false,
            elevation = false,
            leftIcon,
            rightIcon,
            className,
            type = "button",
            ...props
        },
        ref
    ) => {

        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                className={clsx(
                    buttonVariants({
                        variant,
                        size,
                        rounded,
                        fullWidth,
                        outlined,
                        elevation
                    }),
                    className
                )}
                {...props}
            >

                {leftIcon}

                {loading
                    ? "Cargando..."
                    : children
                }

                {rightIcon}

            </button>
        );

    }
);

Button.displayName = "Button";

export default Button;