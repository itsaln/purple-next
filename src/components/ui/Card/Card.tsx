'use client'

import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Card.module.scss'

interface ICardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	color?: 'white' | 'blue'
}

export const Card = forwardRef<HTMLDivElement, ICardProps>(
	({ color = 'white', className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(styles.card, className, {
					[styles.white]: color === 'white',
					[styles.blue]: color === 'blue'
				})}
				{...props}
			>
				{children}
			</div>
		)
	}
)

Card.displayName = 'Card'
