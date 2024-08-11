'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, FC, useState } from 'react'
import cn from 'clsx'

import { firstLevelMenu } from '@/helpers/helpers'

import {
	IFirstLevelMenuItem,
	IMenuItem,
	IPageItem
} from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import styles from './Sidebar.module.scss'

interface ISidebar {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
	className?: string
}

const SidebarContext = createContext({})

export const Sidebar: FC<ISidebar> = ({ menu, firstCategory, className }) => {
	const pathname = usePathname()

	const [menuState, setMenuState] = useState(menu)

	const openSecondLevel = (secondCategory: string) => {
		setMenuState(
			menuState.map((m) => {
				if (m._id.secondCategory === secondCategory) m.isOpened = !m.isOpened

				return m
			})
		)
	}

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m, index) => (
					<div key={`${m.id}_${index}`}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
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
			<div className={styles.secondBlock}>
				{menuState.map((m, i) => {
					if (m.pages.map((p) => p.alias).includes(pathname.split('/')[2])) {
						m.isOpened = true
					}

					return (
						<div key={`${m._id.secondCategory}_${i}`}>
							<div
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
							>
								{m._id.secondCategory}
							</div>
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.opened]: m.isOpened
								})}
							>
								{buildThirdLevel(m.pages, menuItem.route)}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	const buildThirdLevel = (pages: IPageItem[], route: string) => {
		return pages.map((p, i) => (
			<Link
				key={`${p._id}_${i}`}
				href={`/${route}/${p.alias}`}
				className={cn(styles.thirdLevel, {
					[styles.active]: `/${route}/${p.alias}` === pathname
				})}
			>
				{p.category}
			</Link>
		))
	}

	return (
		<SidebarContext.Provider value={{}}>
			<div className={cn(styles.sidebar, className)}>{buildFirstLevel()}</div>
		</SidebarContext.Provider>
	)
}
