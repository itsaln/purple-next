import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'

import { Header, Sidebar, Footer } from '@/components/layout'

import '@/assets/scss/global.scss'

const notoSans = Noto_Sans({
	display: 'swap',
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
	title: 'RootLayout'
}

export default function RootLayout({
																		 children
																	 }: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru'>
		<body className={notoSans.className}>
		<Header />
		<div className='app-content'>
			<Sidebar />
			<main className='content'>
				{children}
			</main>
		</div>
		<Footer />
		</body>
		</html>
	)
}
