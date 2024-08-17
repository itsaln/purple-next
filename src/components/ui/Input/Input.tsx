import { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'clsx'

import styles from './Input.module.scss'

interface IFieldProps {
	error?: FieldError
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IInputProps extends TypeInputPropsField {}

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

				{error && <span className={styles.error} role='alert'>{error.message}</span>}
			</div>
		)
	}
)

Input.displayName = 'Input'
