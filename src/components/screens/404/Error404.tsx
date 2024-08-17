import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import { HTag } from '@/components/ui'

import styles from './Error404.module.scss'

export interface IError404Props extends HTMLAttributes<HTMLDivElement> {}

const Error404: FC<IError404Props> = ({ className, ...props }) => {
	return (
		<div className={cn(styles.error, className)} {...props}>
			<HTag tag='h1'>Ошибка 404</HTag>
		</div>
	)
}

export default Error404
