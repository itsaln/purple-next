import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Divider.module.scss'

interface IDividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export const Divider: FC<IDividerProps> = ({ className }) => {
	return <hr className={cn(styles.hr, className)} />
}
