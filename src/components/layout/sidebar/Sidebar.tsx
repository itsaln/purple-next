'use client'

import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import Logo from '@/assets/images/logo.svg'

import { Search } from '@/components/ui'

import { Menu } from './Menu'

import styles from './Sidebar.module.scss'

interface ISidebarProps extends HTMLAttributes<HTMLDivElement> {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
}

export const Sidebar: FC<ISidebarProps> = ({
	menu,
	firstCategory,
	className,
	...props
}) => {
	return (
		<div className={cn(styles.sidebar, className)} {...props}>
			<Logo className={styles.logo} />
			<Search />
			<Menu menu={menu} firstCategory={firstCategory} />
		</div>
	)
}
