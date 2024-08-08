import type { Metadata } from 'next'

import styles from './News.module.scss'

export const metadata: Metadata = {
	title: 'News'
}

export default function News() {
	return (
		<div className={styles.news}>
			News
		</div>
	)
}
