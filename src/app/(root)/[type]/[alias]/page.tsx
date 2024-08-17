import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage } from '@/api/page'
import { getMenu } from '@/api/menu'
import { getProducts } from '@/api/products'

import { firstLevelMenu } from '@/helpers/helpers'

import Course from '@/screens/course/Course'

interface ICoursePage {
	params: { alias: string; type: string }
}

export async function generateMetadata({ params }: ICoursePage): Promise<Metadata> {
	const page = await getPage(params.alias)

	return {
		title: page.title,
		description: page.metaDescription,
		openGraph: {
			title: page.title,
			description: page.metaDescription
		}
	}
}

export async function generateStaticParams() {
	let paths: string[] = []

	for (const m of firstLevelMenu) {
		const menu = await getMenu(m.id)

		paths = paths.concat(
			menu.flatMap((item) =>
				item.pages.map((page) => `/${m.route}/${page.alias}`)
			)
		)
	}

	return paths

	// return menu.flatMap((item) =>
	// 	item.pages.map((page) => ({
	// 		alias: page.alias
	// 	}))
	// )
}

export default async function CoursePage({ params }: ICoursePage) {
	const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type)
	if (!firstCategoryItem) notFound()

	const page = await getPage(params.alias)
	if (!page) notFound()

	const products = await getProducts(page.category)

	return (
		<Course
			page={page}
			products={products}
			firstCategory={firstCategoryItem.id}
		/>
	)
}
