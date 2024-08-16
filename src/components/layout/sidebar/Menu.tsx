import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, HTMLAttributes, useState, KeyboardEvent } from 'react'
import cn from 'clsx'
import { motion } from 'framer-motion'

import { firstLevelMenu } from '@/helpers/helpers'

import {
	IFirstLevelMenuItem,
	IMenuItem,
	IPageItem
} from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import styles from './Sidebar.module.scss'

interface IMenuProps extends HTMLAttributes<HTMLDivElement> {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
}

export const Menu: FC<IMenuProps> = ({
	menu,
	firstCategory,
	className,
	...props
}) => {
	const pathname = usePathname()

	const variants = {
		visible: {
			// marginBottom: 20,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: {
			// marginBottom: 0
		}
	}

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: {
			opacity: 0,
			height: 0
		}
	}

	const [menuState, setMenuState] = useState(menu)

	const openSecondLevel = (secondCategory: string) => {
		setMenuState(
			menuState.map((m) => {
				if (m._id.secondCategory === secondCategory) m.isOpened = !m.isOpened

				return m
			})
		)
	}

	const openSecondLevelKey = (key: KeyboardEvent<HTMLDivElement>, secondaryCategory: string) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault()
			openSecondLevel(secondaryCategory)
		}
	}

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m, index) => (
					<div key={`${m.id}_${index}`}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.first_level, {
									[styles.active]: m.id === firstCategory
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		)
	}

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<div className={styles.second_block}>
				{menuState.map((m, i) => {
					if (m.pages.map((p) => p.alias).includes(pathname.split('/')[2])) {
						m.isOpened = true
					}

					return (
						<div key={`${m._id.secondCategory}_${i}`}>
							<div
								tabIndex={0}
								onKeyDown={(key: KeyboardEvent<HTMLDivElement>) => openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.second_level}
								onClick={() => openSecondLevel(m._id.secondCategory)}
							>
								{m._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.second_level_block)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.div>
						</div>
					)
				})}
			</div>
		)
	}

	const buildThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean) => {
		return pages.map((p, i) => (
			<motion.div key={`${p._id}_${i}`} variants={variantsChildren}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${p.alias}`}
					className={cn(styles.third_level, {
						[styles.active]: `/${route}/${p.alias}` === pathname
					})}
				>
					{p.category}
				</Link>
			</motion.div>
		))
	}

	return (
		<div className={cn(styles.menu, className)} {...props}>
			{buildFirstLevel()}
		</div>
	)
}
