'use client'

import { FC, useReducer } from 'react'

import { IProductModel } from '@/shared/interfaces/product.interface'
import { ITopPageModel } from '@/shared/interfaces/page.interface'

import { Button, Card, HTag, Rating, Sort, SortEnum, Tag } from '@/components/ui'

import { sortReducer } from './sort.reducer'

import styles from './Course.module.scss'

interface IProduct {
	page: ITopPageModel
	products: IProductModel[]
}

export const Products: FC<IProduct> = ({ page, products }) => {
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
		<>
			<div className={styles.products_title}>
				<HTag tag='h1'>{page.title}</HTag>
				{!!products.length && (
					<Tag color='grey' size='m'>
						{products.length}
					</Tag>
				)}

				<Sort sort={sort} setSort={setSort} />
			</div>

			<div className={styles.products_list}>
				{!!sortedProducts.length &&
					sortedProducts.map((product, index) => (
						<Card key={`${product._id}_${index}`} className={styles.product}>
							<div className={styles.logo}>
								<img src={product.image} alt={product.title} />
							</div>
							<div className={styles.title}>{product.title}</div>
							<div className={styles.price}>{product.price}</div>
							<div className={styles.credit}>{product.credit}</div>
							<div className={styles.rating}>
								<Rating rating={product.reviewAvg ?? product.initialRating} />
							</div>
							<div className={styles.tags}>
								{product.categories.map((c, i) => (
									<Tag key={`${c}_${i}`} color='ghost'>
										{c}
									</Tag>
								))}
							</div>
							<div className={styles.price_title}>цена</div>
							<div className={styles.credit_title}>кредит</div>
							<div className={styles.review_title}>
								{product.reviewCount} отзывов
							</div>
							<div className={styles.hr}>
								<hr className={styles.hr} />
							</div>
							<div className={styles.description}>{product.description}</div>
							<div className={styles.feature}>фичи</div>
							<div className={styles.adv_block}>
								<div className={styles.advantages}>
									<div>Преимущества</div>
									<div>{product.advantages}</div>
								</div>
								<div className={styles.disadvantages}>
									<div>Недостатки</div>
									<div>{product.disadvantages}</div>
								</div>
							</div>
							<div className={styles.hr}>
								<hr className={styles.hr} />
							</div>
							<div className={styles.actions}>
								<Button appearance='primary'>Узнать подробнее</Button>
								<Button appearance='ghost' arrow='right'>
									Читать отзывы
								</Button>
							</div>
						</Card>
					))}
			</div>
		</>
	)
}
