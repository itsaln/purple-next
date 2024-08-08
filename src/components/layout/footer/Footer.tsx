import { FC } from 'react'
import cn from 'clsx'
import { format } from 'date-fns'

import styles from './Footer.module.scss'

export const Footer: FC<{ className?: string }> = ({ className }) => {
	return (
		<footer className={cn(styles.footer, className)}>
			<div>
				OwlTop &copy; 2020 - {format(new Date(), 'yyyy')} Все права защищены
			</div>
			<a href='#' target='_blank'>Пользовательское соглашение</a>
			<a href='#' target='_blank'>Политика конфиденциальности</a>
		</footer>
	)
}
