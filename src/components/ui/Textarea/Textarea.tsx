'use client'

import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Textarea.module.scss'

export const Textarea: FC<
	DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>
> = ({ className, ...props }) => {
	return <textarea className={cn(styles.textarea, className)} {...props} />
}
