import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import cn from 'clsx'
import { format } from 'date-fns'

import styles from './Footer.module.scss'

interface IFooter extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer: FC<IFooter> = ({ className, ...props }) => {
	return (
		<footer className={cn(styles.footer, className)} {...props}>
			<div>
				OwlTop &copy; 2020 - {format(new Date(), 'yyyy')} Все права защищены
			</div>
			<a href='#' target='_blank'>Пользовательское соглашение</a>
			<a href='#' target='_blank'>Политика конфиденциальности</a>
		</footer>
	)
}
