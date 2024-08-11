import { API } from '@/app/api'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

export async function getMenu(firstCategory: TopLevelCategoryEnum): Promise<IMenuItem[]> {
	const res = await fetch(API.topPage.find, {
		method: 'POST',
		body: JSON.stringify({
			firstCategory
		}),
		headers: {
			'Content-Type': 'application/json'
		},
		next: { revalidate: 10 }
	})

	return res.json()
}
