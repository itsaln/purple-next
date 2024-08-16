'use client'

import { FC, HTMLAttributes, PropsWithChildren } from 'react'
import cn from 'clsx'

import styles from './PTag.module.scss'

interface IPTagProps extends HTMLAttributes<HTMLParagraphElement> {
	size?: 's' | 'm' | 'l'
}

export const PTag: FC<PropsWithChildren<IPTagProps>> = ({
	size = 'm',
	className,
	children,
	...props
}) => {
	return (
		<p
			className={cn(styles.p, className, {
				[styles.s]: size === 's',
				[styles.m]: size === 'm',
				[styles.l]: size === 'l'
			})}
			{...props}
		>
			{children}
		</p>
	)
}
