import type { ButtonSize, ButtonVariant } from './button.type'

export const buttonBase = [
    'inline-flex items-center justify-center gap-2 rounded-md font-medium select-none',
    'transition-[color,background-color,border-color,box-shadow,translate,scale] duration-200 ease-out',
    'hover:-translate-y-0.5 hover:shadow-md',
    'active:translate-y-0 active:scale-[0.97] active:shadow-sm active:duration-75',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
].join(' ')

export const buttonVariant: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-transparent text-foreground hover:bg-muted hover:shadow-sm',
}

export const buttonSize: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
}
