import { cn } from '@/lib'
import type { IButtonProps } from './button.type'
import { buttonBase, buttonSize, buttonVariant } from './button.variants'

export function Button({
    variant = 'primary',
    size = 'md',
    type = 'button',
    className,
    children,
    ...props
}: IButtonProps) {
    return (
        <button
            type={type}
            className={cn(buttonBase, buttonVariant[variant], buttonSize[size], className)}
            {...props}
        >
            {children}
        </button>
    )
}
