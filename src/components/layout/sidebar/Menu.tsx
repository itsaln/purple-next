import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, HTMLAttributes, useState, KeyboardEvent } from 'react'
import cn from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

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
	const shouldReduceMotion = useReducedMotion()

	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined)

	const variants = {
		visible: {
			// marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
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
			opacity: shouldReduceMotion ? 1 : 0,
			height: 0
		}
	}

	const [menuState, setMenuState] = useState(menu)

	const openSecondLevel = (secondCategory: string) => {
		setMenuState(
			menuState.map((m) => {
				if (m._id.secondCategory === secondCategory) {
					setAnnounce(m.isOpened ? 'closed' : 'opened')
					m.isOpened = !m.isOpened
				}

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
			<ul>
				{firstLevelMenu.map((m, index) => (
					<li key={`${m.id}_${index}`} aria-expanded={m.id === firstCategory}>
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
					</li>
				))}
			</ul>
		)
	}

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<ul className={styles.second_block}>
				{menuState.map((m, i) => {
					if (m.pages.map((p) => p.alias).includes(pathname.split('/')[2])) {
						m.isOpened = true
					}

					return (
						<li key={`${m._id.secondCategory}_${i}`}>
							<button
								type='button'
								onKeyDown={(key: KeyboardEvent<HTMLDivElement>) => openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.second_level}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.second_level_block)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					)
				})}
			</ul>
		)
	}

	const buildThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean) => {
		return pages.map((p, i) => (
			<motion.li key={`${p._id}_${i}`} variants={variantsChildren}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${p.alias}`}
					className={cn(styles.third_level, {
						[styles.active]: `/${route}/${p.alias}` === pathname
					})}
					aria-current={`/${route}/${p.alias}` === pathname ? 'page' : false}
				>
					{p.category}
				</Link>
			</motion.li>
		))
	}

	return (
		<nav className={cn(styles.menu, className)} {...props} role='navigation'>
			{announce && <span role='log' className='tw-visually-hidden'>{announce === 'opened' ? 'Развёрнуто' : 'Свёрнуто'}</span>}
			{buildFirstLevel()}
		</nav>
	)
}
