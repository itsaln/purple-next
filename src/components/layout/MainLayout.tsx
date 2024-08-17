'use client'

import { FC, HTMLAttributes, PropsWithChildren, useState, KeyboardEvent, useRef } from 'react'
import cn from 'clsx'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import { Up } from '@/components/ui'
import { Header } from './header/Header'

import { Sidebar } from './sidebar/Sidebar'
import { Footer } from './footer/Footer'

import styles from './MainLayout.module.scss'

interface IMainLayout extends HTMLAttributes<HTMLDivElement> {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
}

export const MainLayout: FC<PropsWithChildren<IMainLayout>> = ({
	menu,
	firstCategory,
	className,
	children,
	...props
}) => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false)
	const mainRef = useRef<HTMLDivElement | null>(null)

	const skipContentAction = (key: KeyboardEvent<HTMLAnchorElement>) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault()
			mainRef.current?.focus()
		}

		setIsSkipLinkDisplayed(false)
	}

	return (
		<div className={cn(styles.main_layout, className)} {...props}>
			<a
				href='#'
				tabIndex={0}
				className={cn(styles.skip_link, {
					[styles.displayed]: isSkipLinkDisplayed
				})}
				onFocus={() => setIsSkipLinkDisplayed(true)}
				onKeyDown={skipContentAction}
			>Сразу к содержанию</a>

			<Header
				className={styles.header}
				menu={menu}
				firstCategory={firstCategory}
			/>
			<Sidebar
				className={styles.sidebar}
				menu={menu}
				firstCategory={firstCategory}
			/>
			<main
				ref={mainRef}
				tabIndex={0}
				className={styles.content}
				role='main'
			>{children}</main>
			<Footer className={styles.footer} />

			<Up />
		</div>
	)
}
