'use client'

import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Input.module.scss'

interface IInput
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {}

export const Input: FC<IInput> = ({ type = 'text', className, ...props }) => {
	return (
		<input type={type} className={cn(styles.input, className)} {...props} />
	)
}
