'use client'

import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import Logo from '@/assets/images/logo.svg'

import { Menu } from './Menu'

import styles from './Sidebar.module.scss'

interface ISidebar extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
}

export const Sidebar: FC<ISidebar> = ({ menu, firstCategory, className, ...props }) => {
	return (
		<div className={cn(styles.sidebar, className)} {...props}>
			<Logo className={styles.logo} />
			<div>search</div>
			<Menu menu={menu} firstCategory={firstCategory} />
		</div>
	)
}
