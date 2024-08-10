import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'

import { Header, Sidebar, Footer } from '@/components/layout'

import '@/assets/scss/global.scss'

import styles from './Layout.module.scss'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'
import { getMenu } from '@/api/menu'

const notoSans = Noto_Sans({
	display: 'swap',
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '700']
})

export default async function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	const firstCategory = TopLevelCategoryEnum.Courses
	const menu = await getMenu(firstCategory)

	return (
		<html lang='ru'>
			<body className={notoSans.className}>
				<div className={styles.layout}>
					<Header className={styles.header} />
					<Sidebar
						menu={menu}
						firstCategory={firstCategory}
						className={styles.sidebar}
					/>
					<main className={styles.content}>{children}</main>
					<Footer className={styles.footer} />
				</div>
			</body>
		</html>
	)
}
