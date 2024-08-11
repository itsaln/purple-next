import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Header.module.scss'

interface IHeader extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header: FC<IHeader> = ({ className, ...props }) => {
	return (
		<div className={cn(styles.header, className)} {...props}>
			Header
		</div>
	)
}
