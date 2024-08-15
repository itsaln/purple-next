'use client'

import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react'
import cn from 'clsx'

import styles from './Tag.module.scss'

interface ITagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 's' | 'm'
	color?: 'ghost' | 'red' | 'grey' | 'green' | 'primary'
	href?: string
}

export const Tag: FC<PropsWithChildren<ITagProps>> = ({
	size = 's',
	color = 'ghost',
	href,
	className,
	children,
	...props
}) => {
	return (
		<p
			className={cn(styles.tag, className, {
				[styles.s]: size === 's',
				[styles.m]: size === 'm',
				[styles.ghost]: color === 'ghost',
				[styles.red]: color === 'red',
				[styles.grey]: color === 'grey',
				[styles.green]: color === 'green',
				[styles.primary]: color === 'primary'
			})}
			{...props}
		>
			{href ? <a href={href}>{children}</a> : <>{children}</>}
		</p>
	)
}
