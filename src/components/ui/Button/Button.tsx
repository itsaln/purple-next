'use client'

import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import cn from 'clsx'

import ArrowIcon from '@/assets/icons/arrow.svg'

import styles from './Button.module.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearance: 'primary' | 'ghost'
	arrow?: 'right' | 'down' | 'none'
}

export const Button: FC<PropsWithChildren<IButtonProps>> = ({
	appearance = 'primary',
	arrow = 'none',
	type,
	className,
	children,
	...props
}) => {
	return (
		<button
			type={type || 'button'}
			className={cn(styles.button, className, {
				[styles.primary]: appearance === 'primary',
				[styles.ghost]: appearance === 'ghost'
			})}
			{...props}
		>
			{children}

			{arrow !== 'none' && (
				<span
					className={cn(styles.arrow, {
						[styles.right]: arrow === 'right',
						[styles.down]: arrow === 'down'
					})}
				>
					<ArrowIcon />
				</span>
			)}
		</button>
	)
}
