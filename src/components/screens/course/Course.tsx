'use client'

import { FC, useReducer } from 'react'

import {
	ITopPageModel,
	TopLevelCategoryEnum
} from '@/shared/interfaces/page.interface'
import { IProductModel } from '@/shared/interfaces/product.interface'

import { HTag, Sort, SortEnum, Tag } from '@/components/ui'

import { sortReducer } from './sort.reducer'

import Product from './Product'
import { Hh } from './Hh'
import { Advantages } from './Advantages'

import styles from './Course.module.scss'

interface ICourseProps {
	page: ITopPageModel
	products: IProductModel[]
	firstCategory: TopLevelCategoryEnum
}

const Course: FC<ICourseProps> = ({ page, products, firstCategory }) => {
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
		<div className={styles.course}>
			<div className={styles.products}>
				<div className={styles.title}>
					<HTag tag='h1'>{page.title}</HTag>
					{!!products.length && (
						<Tag color='grey' size='m'>
							{products.length}
						</Tag>
					)}

					<Sort sort={sort} setSort={setSort} />
				</div>

				{!!sortedProducts.length && (
					<div className={styles.list}>
						{sortedProducts.map((product, index) => (
							<Product key={`${product._id}_${index}`} product={product} />
						))}
					</div>
				)}
			</div>

			<Hh page={page} firstCategory={firstCategory} />

			{page.advantages && <Advantages advantages={page.advantages} />}

			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{
						__html: page.seoText
					}}
				/>
			)}

			<HTag tag='h2' className='tw-mt-[50px] tw-mb-[25px]'>
				Получаемые навыки
			</HTag>

			{page.tags.map((tag, index) => (
				<Tag key={`${tag}_${index}`} color='primary'>
					{tag}
				</Tag>
			))}
		</div>
	)
}

export default Course
