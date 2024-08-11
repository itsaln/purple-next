'use client'

import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react'
import cn from 'clsx'

import styles from './Card.module.scss'

interface ICard extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	color?: 'white' | 'blue'
}

export const Card: FC<PropsWithChildren<ICard>> = ({ color = 'white', className, children, ...props }) => {
	return (
		<div
			className={cn(styles.card, className, {
				[styles.white]: color === 'white',
				[styles.blue]: color === 'blue',
			})}
			{...props}
		>
			{children}
		</div>
	)
}
