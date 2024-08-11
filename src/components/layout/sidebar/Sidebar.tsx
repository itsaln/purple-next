'use client'

import { createContext, FC } from 'react'
import cn from 'clsx'

import Logo from '@/assets/images/logo.svg'

import { Menu } from './Menu'

import styles from './Sidebar.module.scss'

interface ISidebar {
	className?: string
}

const SidebarContext = createContext({})

export const Sidebar: FC<ISidebar> = ({ menu, firstCategory, className }) => {
	return (
		<SidebarContext.Provider value={{}}>
			<div className={cn(styles.sidebar, className)}>
				<Logo className={styles.logo} />
				<div>search</div>
				<Menu menu={menu} firstCategory={firstCategory} />
			</div>
		</SidebarContext.Provider>
	)
}
