import { FC } from 'react'

import { Input, Textarea } from '@/components/ui'

import styles from './Home.module.scss'

const Home: FC = () => {
	return (
		<div className={styles.home}>
			<Input placeholder='Text' />
			<Textarea placeholder='Text' />
		</div>
	)
}

export default Home
