'use client'

import { FC } from 'react'
import cn from 'clsx'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import Logo from '@/assets/images/logo.svg'

import { Search } from '@/components/ui'

import { Menu } from './Menu'

import styles from './Sidebar.module.scss'

interface ISidebar {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
	className?: string
}

export const Sidebar: FC<ISidebar> = ({ menu, firstCategory, className }) => {
	return (
		<div className={cn(styles.sidebar, className)}>
			<Logo className={styles.logo} />
			<Search />
			<Menu menu={menu} firstCategory={firstCategory} />
		</div>
	)
}
