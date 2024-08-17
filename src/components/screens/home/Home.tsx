import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Home.module.scss'

interface IHomeProps extends HTMLAttributes<HTMLDivElement> {}

const Home: FC<IHomeProps> = ({ className, ...props }) => {
	return (
		<div className={cn(styles.home, className)} {...props}>
			Home
		</div>
	)
}

export default Home
