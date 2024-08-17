import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getMenu } from '@/api/menu'

import { firstLevelMenu } from '@/helpers/helpers'

import Modules from '@/screens/modules/Modules'

enum ModulesPagesEnum {
	Courses = 'courses',
	Services = 'services',
	Books = 'books',
	Products = 'products'
}

interface IModulesPage {
	params: { type: ModulesPagesEnum }
}

export async function generateMetadata({
	params
}: IModulesPage): Promise<Metadata> {
	switch (params.type) {
		case 'courses':
			return {
				title: 'Курсы',
				description: 'Курсы - purpleschool.ru',
				openGraph: {
					title: 'Курсы',
					description: 'Курсы - purpleschool.ru'
				}
			}
		case 'services':
			return {
				title: 'Сервисы',
				description: 'Сервисы - purpleschool.ru',
				openGraph: {
					title: 'Сервисы',
					description: 'Сервисы - purpleschool.ru'
				}
			}
		case 'books':
			return {
				title: 'Книги',
				description: 'Книги - purpleschool.ru',
				openGraph: {
					title: 'Книги',
					description: 'Книги - purpleschool.ru'
				}
			}
		case 'products':
			return {
				title: 'Продукты',
				description: 'Продукты - purpleschool.ru',
				openGraph: {
					title: 'Продукты',
					description: 'Продукты - purpleschool.ru'
				}
			}
		default:
			return {
				title: 'Modules page',
				description: 'Modules page description',
				openGraph: {
					title: 'Modules page',
					description: 'Modules page description'
				}
			}
	}
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
