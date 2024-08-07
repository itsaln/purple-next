import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'

import '@/assets/scss/global.scss'

const notoSans = Noto_Sans({
	display: 'swap',
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
	title: 'Purple Next',
	description: 'The purple next application'
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={notoSans.className}>{children}</body>
		</html>
	)
}
