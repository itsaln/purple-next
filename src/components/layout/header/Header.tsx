import { FC } from 'react'
import cn from 'clsx'

import styles from './Header.module.scss'

export const Header: FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={cn(styles.header, className)}>
			Header
		</div>
	)
}
