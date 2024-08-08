import type { Metadata } from 'next'

import styles from './About.module.scss'

export const metadata: Metadata = {
	title: 'About'
}

export default function About() {
	return (
		<div className={styles.about}>
			About
		</div>
	)
}
