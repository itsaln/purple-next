import type { Metadata } from 'next'
import Link from 'next/link'
import { Noto_Sans } from 'next/font/google'
import { ReactNode } from 'react'

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
				<nav className='tw-border tw-border-solid tw-border-[darkcyan]'>
					<ul className='tw-flex tw-flex-nowrap tw-justify-center tw-items-center -tw-mx-4'>
						<li className='tw-px-4'>
							<Link href={'/courses'}>Курсы</Link>
						</li>
						<li className='tw-px-4'>
							<Link href={'/for-children'}>Для детей</Link>
						</li>
						<li className='tw-px-4'>
							<Link href={'/about'}>О нас</Link>
						</li>
					</ul>
				</nav>
			  <main
					className='tw-flex tw-flex-col tw-justify-between tw-items-center tw-p-24 tw-min-h-screen'
				>
					{children}
			  </main>
			</body>
		</html>
	)
}
