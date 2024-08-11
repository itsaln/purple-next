'use client'

import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react'
import cn from 'clsx'

import styles from './HTag.module.scss'

interface IHTag extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	tag: 'h1' | 'h2' | 'h3'
}

export const HTag: FC<PropsWithChildren<IHTag>> = ({ tag, className, children }) => {
	switch (tag) {
		case 'h1':
			return <h1 className={cn(styles.h1, className)}>{children}</h1>
		case 'h2':
			return <h2 className={cn(styles.h2, className)}>{children}</h2>
		case 'h3':
			return <h3 className={cn(styles.h3, className)}>{children}</h3>
		default:
			return <></>
	}
}
