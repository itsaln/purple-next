import { API } from '@/app/api'

import { IMenuItem } from '@/shared/interfaces/menu.interface'

export async function getMenu(firstCategory: number): Promise<IMenuItem[]> {
	const res = await fetch(API.topPage.find, {
		method: 'POST',
		body: JSON.stringify({
			firstCategory
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return res.json()
}
