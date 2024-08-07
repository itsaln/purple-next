import { FC, PropsWithChildren } from 'react'
import cn from 'clsx'

import { PTagProps } from './PTag.props'

import styles from './PTag.module.scss'

export const PTag: FC<PropsWithChildren<PTagProps>> = ({
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
