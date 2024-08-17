import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'
import NextTopLoader from 'nextjs-toploader'

import { getMenu } from '@/api/menu'

import { Colors } from '@/shared/colors'
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

		<NextTopLoader
			color={Colors.primary}
			initialPosition={0.1}
			crawlSpeed={200}
			height={3}
			crawl
			showSpinner
			easing='ease'
			speed={200}
		/>

		<MainLayout menu={menu} firstCategory={firstCategory}>{children}</MainLayout>
		</body>
		</html>
	)
}
