'use client'

import { FC, useReducer } from 'react'

import { IProductModel } from '@/shared/interfaces/product.interface'
import { ITopPageModel } from '@/shared/interfaces/page.interface'

import { HTag, Sort, SortEnum, Tag } from '@/components/ui'

import { sortReducer } from './sort.reducer'

import styles from './Course.module.scss'

interface IProduct {
	page: ITopPageModel
	products: IProductModel[]
}

export const Product: FC<IProduct> = ({ page, products }) => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{
			products,
			sort: SortEnum.Rating
		}
	)

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort })
	}

	return (
		<div className={styles.product}>
			<div className={styles.title}>
				<HTag tag='h1'>{page.title}</HTag>
				{!!products.length && (
					<Tag color='grey' size='m'>
						{products.length}
					</Tag>
				)}

				<Sort sort={sort} setSort={setSort} />
			</div>

			{!!sortedProducts.length &&
				sortedProducts.map((product, index) => (
					<div key={`${product._id}_${index}`}>{product.title}</div>
				))}
		</div>
	)
}
