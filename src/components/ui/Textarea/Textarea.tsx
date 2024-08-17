'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'clsx'

import styles from './Textarea.module.scss'

interface IFieldProps {
	error?: FieldError
}

type TypeInputPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> & IFieldProps

export interface ITextareaProps extends TypeInputPropsField {}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ error, className, ...props }, ref) => {
		return (
			<div className={cn(styles.field, className)}>
				<textarea
					ref={ref}
					className={cn(styles.textarea, {
						[styles.invalid]: error
					})}
					{...props}
				/>

				{error && <span className={styles.error} role='alert'>{error.message}</span>}
			</div>
		)
	}
)

Textarea.displayName = 'Textarea'
