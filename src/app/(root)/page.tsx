import { Metadata } from 'next'

import { getMenu } from '@/api/menu'

import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import styles from './Home.module.scss'

export const metadata: Metadata = {
	title: 'Home'
}

export default async function Home() {
	const firstCategory = TopLevelCategoryEnum.Courses
	const menu = await getMenu(firstCategory)

	return (
		<div className={styles.home}>
			<ul>
				{menu.map((m, i) => (
					<li key={`${m._id.secondCategory}_${i}`}>{m._id.secondCategory}</li>
				))}
			</ul>
		</div>
	)
}
