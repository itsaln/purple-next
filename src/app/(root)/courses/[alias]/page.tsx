import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage } from '@/api/page'
import { getMenu } from '@/api/menu'
import { getProducts } from '@/api/products'

import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

export const metadata: Metadata = {
	title: 'Course'
}

export async function generateStaticParams() {
	const menu = await getMenu(TopLevelCategoryEnum.Courses)

	return menu.flatMap((item) =>
		item.pages.map((page) => ({
			alias: page.alias
		}))
	)
}

export default async function Course({
	params
}: {
	params: { alias: string }
}) {
	const menu = await getMenu(TopLevelCategoryEnum.Courses)
	const page = await getPage(params.alias)
	if (!page) notFound()
	const products = await getProducts(page.category)

	return (
		<div>
			<div>
				Menu: {menu.length}
				<ul>
					{menu.map((m, i) => (
						<li key={`${m._id.secondCategory}_${i}`}>{m._id.secondCategory}</li>
					))}
				</ul>
			</div>
			<div>Course: {page.title}</div>
			<div>
				Products: {products.length}
				<ul>
					{products.map((p, i) => (
						<li key={`${p._id}_${i}`}>{p.title}</li>
					))}
				</ul>
			</div>
		</div>
	)
}
