import { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'clsx'

import styles from './Textarea.module.scss'

interface IFieldProps {
	error?: FieldError
}

type TypeTextareaPropsField = InputHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export const Textarea = forwardRef<HTMLTextAreaElement, TypeTextareaPropsField>(
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

				{error && <span className={styles.error}>{error.message}</span>}
			</div>
		)
	}
)

Textarea.displayName = 'Textarea'
