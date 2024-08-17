'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import ym from 'react-yandex-metrika'

export function YandexMetrika() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const url = `${pathname}?${searchParams}`
		ym('routeChangeComplete', 'hit', url)

	}, [pathname, searchParams])

	return null
}

// user_id: 98093650
