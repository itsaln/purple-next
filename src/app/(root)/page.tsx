import { Metadata } from 'next'

import Menu from './components/Menu'

import styles from './Home.module.scss'

export const metadata: Metadata = {
	title: 'Home'
}

export default async function Home() {
	return (
		<div className={styles.home}>
			Home page
			<Menu />
		</div>
	)
}
