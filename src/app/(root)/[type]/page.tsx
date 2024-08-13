import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getMenu } from '@/api/menu'

import { firstLevelMenu } from '@/helpers/helpers'

import Modules from '@/screens/modules/Modules'

export const metadata: Metadata = {
	title: 'Modules page'
}

interface IModulesPage {
	params: { type: string }
}

export async function generateStaticParams() {
	return firstLevelMenu.map((m) => `/${m.route}`)
}

export default async function ModulePage({ params }: IModulesPage) {
	const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type)
	if (!firstCategoryItem) notFound()

	const menu = await getMenu(firstCategoryItem.id)

	return <Modules menu={menu} firstCategory={firstCategoryItem.id} />
}
