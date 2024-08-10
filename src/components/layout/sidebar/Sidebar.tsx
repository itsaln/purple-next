import { FC } from 'react'
import cn from 'clsx'

import {
	IFirstLevelMenuItem,
	IMenuItem,
	IPageItem
} from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import CoursesIcon from '@/assets/icons/courses.svg'
import ServicesIcon from '@/assets/icons/services.svg'
import BooksIcon from '@/assets/icons/books.svg'
import ProductsIcon from '@/assets/icons/products.svg'

import styles from './Sidebar.module.scss'

interface ISidebar {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
	className?: string
}

const firstLevelMenu: IFirstLevelMenuItem[] = [
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

export const Sidebar: FC<ISidebar> = ({ menu, firstCategory, className }) => {
	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m, index) => (
					<div key={`${m.id}_${index}`}>
						<a href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.active]: m.id === firstCategory
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</a>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		)
	}

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map((m, i) => (
					<div key={`${m._id.secondCategory}_${i}`}>
						<div className={styles.secondLevel}>{m._id.secondCategory}</div>
						<div
							className={cn(styles.secondLevelBlock, {
								[styles.opened]: m.isOpened
							})}
						>
							{buildThirdLevel(m.pages, menuItem.route)}
						</div>
					</div>
				))}
			</div>
		)
	}

	const buildThirdLevel = (pages: IPageItem[], route: string) => {
		return pages.map((p, i) => (
			<a
				key={`${p._id}_${i}`}
				href={`/${route}/${p.alias}`}
				className={cn(styles.thirdLevel, {
					[styles.active]: false
				})}
			>
				{p.category}
			</a>
		))
	}

	return (
		<div className={cn(styles.sidebar, className)}>{buildFirstLevel()}</div>
	)
}
