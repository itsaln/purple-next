import type { Metadata } from 'next'

import Search from '@/screens/search/Search'

export const metadata: Metadata = {
	title: 'Search page'
}

export default function SearchPage() {
	return <Search />
}
