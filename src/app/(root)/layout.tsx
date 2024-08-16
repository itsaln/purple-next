import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'

import { getMenu } from '@/api/menu'

import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import '@/assets/scss/global.scss'

import { MainLayout } from '@/components/layout'

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
		<MainLayout menu={menu} firstCategory={firstCategory}>{children}</MainLayout>
		</body>
		</html>
	)
}
