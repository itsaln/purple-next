'use client'

import { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from 'react'
import cn from 'clsx'

import ArrowIcon from './arrow.svg'

import styles from './Button.module.scss'

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	appearance?: 'primary' | 'ghost'
	arrow?: 'right' | 'down' | 'none'
}

export const Button: FC<PropsWithChildren<IButton>> = ({
	appearance = 'primary',
	arrow = 'none',
	className,
	children,
	...props
}) => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance === 'primary',
				[styles.ghost]: appearance === 'ghost'
			})}
			{...props}
		>
			{children}

			{arrow !== 'none' && <span className={cn(styles.arrow, {
				[styles.right]: arrow === 'right',
				[styles.down]: arrow === 'down',
			})}>
				<ArrowIcon />
			</span>}
		</button>
	)
}
