import { FC, PropsWithChildren } from 'react'
import cn from 'clsx'

import { ButtonProps } from './Button.props'

import ArrowIcon from './arrow.svg'

import styles from './Button.module.scss'

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
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
