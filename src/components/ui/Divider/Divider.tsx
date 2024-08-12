import { FC } from 'react'
import cn from 'clsx'

import styles from './Divider.module.scss'

export const Divider: FC<{ className?: string }> = ({ className }) => {
	return <hr className={cn(styles.hr, className)} />
}
