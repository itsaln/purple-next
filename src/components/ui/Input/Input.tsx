'use client'

import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Input.module.scss'

export const Input: FC<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ type = 'text', className, ...props }) => {
	return (
		<input type={type} className={cn(styles.input, className)} {...props} />
	)
}
