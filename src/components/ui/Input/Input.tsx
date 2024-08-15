import {
	DetailedHTMLProps,
	forwardRef,
	HTMLAttributes,
	InputHTMLAttributes
} from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'clsx'

import styles from './Input.module.scss'

interface IInputProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ type = 'text', error, className, ...props }, ref) => {
		return (
			<div className={cn(styles.field, className)}>
				<input
					ref={ref}
					type={type}
					className={cn(styles.input, {
						[styles.invalid]: error
					})}
					{...props}
				/>

				{error && <span className={styles.error}>{error.message}</span>}
			</div>
		)
	}
)

Input.displayName = 'Input'
