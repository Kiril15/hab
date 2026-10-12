import type { ComponentPropsWithRef, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface IButtonProps extends ComponentPropsWithRef<'button'> {
    variant?: ButtonVariant
    size?: ButtonSize,
    children: ReactNode
}
