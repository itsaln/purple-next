import { Metadata } from 'next'

import { Input, Textarea } from '@/components/ui'

import styles from './Home.module.scss'

export const metadata: Metadata = {
	title: 'Home page'
}

export default async function HomePage() {
	return (
		<div className={styles.home}>
			<Input placeholder='Text' />
			<Textarea placeholder='Text' />
		</div>
	)
}
