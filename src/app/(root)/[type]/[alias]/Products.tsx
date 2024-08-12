'use client'

import { FC, useReducer } from 'react'

import { declOfNum, priceRu } from '@/helpers/helpers'

import { IProductModel } from '@/shared/interfaces/product.interface'
import { ITopPageModel } from '@/shared/interfaces/page.interface'

import {
	Button,
	Card,
	Divider,
	HTag,
	Rating,
	Sort,
	SortEnum,
	Tag
} from '@/components/ui'

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

							<div className={styles.price}>
								{priceRu(product.price)}
								{product.oldPrice && (
									<Tag color='green' className='tw-ml-[5px]'>
										{priceRu(product.price - product.oldPrice)}
									</Tag>
								)}
							</div>

							<div className={styles.credit}>
								{priceRu(product.credit)}/
								<span className={styles.month}>мес</span>
							</div>

							<Rating
								className={styles.rating}
								rating={product.reviewAvg ?? product.initialRating}
							/>

							<div className={styles.tags}>
								{product.categories.map((c, i) => (
									<Tag key={`${c}_${i}`} color='ghost' className='tw-mt-[7px]'>
										{c}
									</Tag>
								))}
							</div>

							<div className={styles.price_title}>цена</div>
							<div className={styles.credit_title}>кредит</div>
							<div className={styles.review_title}>
								{product.reviewCount}{' '}
								{declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
							</div>

							<Divider className={styles.hr} />

							<div className={styles.description}>{product.description}</div>
							<div className={styles.feature}>
								{product.characteristics.map((c, i) => (
									<div key={`${c.name}_${i}`} className={styles.characteristic}>
										<span className={styles.characteristic_name}>{c.name}</span>
										<span className={styles.characteristic_dots} />
										<span className={styles.characteristic_value}>{c.value}</span>
									</div>
								))}
							</div>

							<div className={styles.adv_block}>
								{product.advantages && (
									<div className={styles.advantages}>
										<div className={styles.adv_title}>Преимущества</div>
										<div>{product.advantages}</div>
									</div>
								)}

								{product.disadvantages && (
									<div className={styles.disadvantages}>
										<div className={styles.adv_title}>Недостатки</div>
										<div>{product.disadvantages}</div>
									</div>
								)}
							</div>

							<Divider className={styles.hr} />

							<div className={styles.actions}>
								<Button appearance='primary'>Узнать подробнее</Button>
								<Button
									appearance='ghost'
									arrow='right'
									className='tw-ml-[20px]'
								>
									Читать отзывы
								</Button>
							</div>
						</Card>
					))}
			</div>
		</>
	)
}
