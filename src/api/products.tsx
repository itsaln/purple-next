import { API } from '@/app/api'

import { IProductModel } from '@/shared/interfaces/product.interface'

export async function getProducts(category: string): Promise<IProductModel[]> {
	const res = await fetch(API.product.find, {
		method: 'POST',
		body: JSON.stringify({
			category,
			limit: 10
		}),
		headers: {
			'Content-Type': 'application/json'
		},
		next: { revalidate: 10 }
	})

	return res.json()
}
