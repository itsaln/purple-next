import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import { Input, Textarea } from '@/components/ui'

import styles from './Home.module.scss'

interface IHomeProps extends HTMLAttributes<HTMLDivElement> {}

const Home: FC<IHomeProps> = ({ className, ...props }) => {
	return (
		<div className={cn(styles.home, className)} {...props}>
			<Input placeholder='Text' />
			<Textarea placeholder='Text' />
		</div>
	)
}

export default Home
