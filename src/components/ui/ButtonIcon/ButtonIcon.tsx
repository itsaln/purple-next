'use client'

import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import cn from 'clsx'

import close from './close.svg'
import menu from './menu.svg'
import up from './up.svg'

import styles from './ButtonIcon.module.scss'

export const icons = {
	close,
	menu,
	up
}

export type IconName = keyof typeof icons

interface IButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	icon: IconName
	appearance?: 'primary' | 'white'
}

export const ButtonIcon: FC<IButtonProps> = ({
	icon,
	appearance = 'primary',
	type,
	className,
	...props
}) => {
	const IconComp = icons[icon]

	return (
		<button
			type={type || 'button'}
			className={cn(styles.button_icon, className, {
				[styles.primary]: appearance === 'primary',
				[styles.white]: appearance === 'white'
			})}
			{...props}
		>
			<IconComp />
		</button>
	)
}
