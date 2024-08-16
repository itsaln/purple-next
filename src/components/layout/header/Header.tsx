'use client'

import { FC, HTMLAttributes, useEffect, useState } from 'react'
import cn from 'clsx'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { Sidebar } from '@/components/layout'
import { ButtonIcon } from '@/components/ui'

import Logo from '@/assets/images/logo.svg'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import styles from './Header.module.scss'

interface IHeaderProps extends HTMLAttributes<HTMLDivElement> {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
}

export const Header: FC<IHeaderProps> = ({
	menu,
	firstCategory,
	className,
	...props
}) => {
	const pathname = usePathname()

	const [isOpened, setIsOpened] = useState(false)

	const variants = {
		opened: {
			opacity: 1,
			x: '0%',
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: 0,
			x: '100%'
		}
	}

	useEffect(() => {
		setIsOpened(false)
	}, [pathname])

	return (
		<header className={cn(styles.header, className)} {...props}>
			<Logo />
			<ButtonIcon
				appearance='white'
				icon='menu'
				onClick={() => setIsOpened(true)}
			/>
			<motion.div
				className={styles.menu}
				animate={isOpened ? 'opened' : 'closed'}
				variants={variants}
				initial='closed'
			>
				<Sidebar
					menu={menu}
					firstCategory={firstCategory}
					className={styles.sidebar}
				/>
				<ButtonIcon
					appearance='white'
					icon='close'
					className={styles.close}
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	)
}
