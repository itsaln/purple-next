import type { Metadata } from 'next'

import styles from './Search.module.scss'

export const metadata: Metadata = {
	title: 'Search page'
}

export default function SearchPage() {
	return (
		<div className={styles.search}>
			Search
		</div>
	)
}
