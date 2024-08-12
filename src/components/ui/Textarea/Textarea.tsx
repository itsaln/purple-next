'use client'

import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Textarea.module.scss'

interface ITextarea
	extends DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {}

export const Textarea: FC<ITextarea> = ({ className, ...props }) => {
	return (
		<textarea className={cn(styles.textarea, className)} {...props} />
	)
}
