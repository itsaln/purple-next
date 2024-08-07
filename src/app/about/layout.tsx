import { ReactNode } from 'react'

export default function AboutLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<main
			className='tw-flex tw-flex-col tw-p-24 tw-min-h-screen'
		>
			{children}
		</main>
	)
}
