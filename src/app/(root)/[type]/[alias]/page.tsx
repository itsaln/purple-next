import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage } from '@/api/page'
import { getMenu } from '@/api/menu'
import { getProducts } from '@/api/products'

import { firstLevelMenu } from '@/helpers/helpers'

export const metadata: Metadata = {
	title: 'Course'
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

export default async function Course({
	params
}: {
	params: { alias: string, type: string }
}) {
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
	if (!firstCategoryItem) notFound()

	const menu = await getMenu(firstCategoryItem.id)
		// .then((data) => {
		// 	if (!data.length) notFound()
		// })
		// .catch(() => notFound())

	const page = await getPage(params.alias)
	if (!page) notFound()

	const products = await getProducts(page.category)
		// .then((data) => {
		// 	if (!data.length) notFound()
		// })
		// .catch(() => notFound())

	return (
		<div>
			<div>
				Menu: {menu.length}
			</div>
			<div>Course: {page.title}</div>
			<div>
				Products: {products.length}
			</div>
		</div>
	)
}
