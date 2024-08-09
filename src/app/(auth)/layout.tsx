import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'

import '@/assets/scss/global.scss'

const notoSans = Noto_Sans({
	display: 'swap',
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '700']
})

export default function AuthLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={notoSans.className}>
				<main className='tw-flex tw-flex-col tw-justify-between tw-items-center tw-p-24 tw-min-h-screen'>
					<h2>Authorization</h2>
					{children}
				</main>
			</body>
		</html>
	)
}
