import { API } from '@/app/api'

import { ITopPageModel } from '@/shared/interfaces/page.interface'

export async function getPage(alias: string): Promise<ITopPageModel | null> {
	const res = await fetch(API.topPage.byAlias + '/' + alias)

	if (!res.ok) return null

	return res.json()
}
