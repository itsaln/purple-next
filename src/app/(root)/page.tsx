import { Metadata } from 'next'

import styles from './Home.module.scss'

export const metadata: Metadata = {
	title: 'Home'
}

export default async function HomePage() {
	return (
		<div className={styles.home}>
			Home
		</div>
	)
}
