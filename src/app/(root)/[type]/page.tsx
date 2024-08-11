import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getMenu } from '@/api/menu'

import { firstLevelMenu } from '@/helpers/helpers'

import styles from './Type.module.scss'

export const metadata: Metadata = {
	title: 'Type'
}

export async function generateStaticParams() {
	return firstLevelMenu.map(m => `/${m.route}`)
}

export default async function TypePage({ params }: { params: { type: string } }) {
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
	if (!firstCategoryItem) notFound()

	const firstCategory = firstCategoryItem.id
	const menu = await getMenu(firstCategory)

	return (
		<div className={styles.type}>
			<div>Type: {firstCategory}</div>
			<div>Menu: {menu.length}</div>
		</div>
	)
}
