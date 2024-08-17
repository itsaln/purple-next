import { Metadata } from 'next'

import Error404 from '@/screens/404/Error404'

export const metadata: Metadata = {
	title: 'Error 404 page',
	description: 'Error 404 page description'
}

export default function ErrorPage() {
	return <Error404 />
}
