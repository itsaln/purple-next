import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage } from '@/api/page'
import { getMenu } from '@/api/menu'
import { getProducts } from '@/api/products'

import { firstLevelMenu } from '@/helpers/helpers'

import { HTag, Tag } from '@/components/ui'

import styles from './Course.module.scss'

export const metadata: Metadata = {
	title: 'Top page'
}

interface ICoursePage {
	params: { alias: string, type: string }
}

export async function generateStaticParams() {
	let paths: string[] = []

	for (const m of firstLevelMenu) {
		const menu = await getMenu(m.id)

		paths = paths.concat(menu.flatMap(item => item.pages.map(page => `/${m.route}/${page.alias}`)))
	}

	return paths

	// return menu.flatMap((item) =>
	// 	item.pages.map((page) => ({
	// 		alias: page.alias
	// 	}))
	// )
}

export default async function CoursePage({ params }: ICoursePage) {
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
	if (!firstCategoryItem) notFound()

	const firstCategory = firstCategoryItem.id

	const page = await getPage(params.alias)
	if (!page) notFound()

	const products = await getProducts(page.category)

	return (
		<div className={styles.course}>
			<div className={styles.title}>
				<HTag tag='h1'>{page.title}</HTag>
				{products.length && <Tag color='grey' size='m'>{products.length}</Tag>}
				<span>Сортировка</span>
			</div>

			{products.length && products.map((product, index) => (
				<div key={`${product._id}_${index}`}>
					{product.title}
				</div>
			))}

			<div className={styles.hh_title}>
				<HTag tag='h2'>Вакансии - {page.category}</HTag>
				<Tag color='red' size='m'>hh.ru</Tag>
			</div>

			<div className={styles.hh}>
				
			</div>
		</div>
	)
}
