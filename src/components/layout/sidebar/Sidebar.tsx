import { FC } from 'react'
import cn from 'clsx'

import styles from './Sidebar.module.scss'

export const Sidebar: FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={cn(styles.sidebar, className)}>
			Sidebar
		</div>
	)
}
