import { IFirstLevelMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import CoursesIcon from '@/assets/icons/courses.svg'
import ServicesIcon from '@/assets/icons/services.svg'
import BooksIcon from '@/assets/icons/books.svg'
import ProductsIcon from '@/assets/icons/products.svg'

export const firstLevelMenu: IFirstLevelMenuItem[] = [
	{
		id: TopLevelCategoryEnum.Courses,
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />
	},
	{
		id: TopLevelCategoryEnum.Services,
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesIcon />
	},
	{
		id: TopLevelCategoryEnum.Books,
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />
	},
	{
		id: TopLevelCategoryEnum.Products,
		route: 'products',
		name: 'Продукты',
		icon: <ProductsIcon />
	}
]

export const priceRu = (price: number) =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₽')
