import { Metadata } from 'next'

import Home from '@/screens/home/Home'

export const metadata: Metadata = {
	title: 'Home page'
}

export default async function HomePage() {
	return <Home />
}
