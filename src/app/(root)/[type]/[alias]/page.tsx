import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPage } from '@/api/page'
import { getMenu } from '@/api/menu'
import { getProducts } from '@/api/products'

import { firstLevelMenu, priceRu } from '@/helpers/helpers'

import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import { Card, HTag, Tag } from '@/components/ui'

import RateIcon from '@/assets/icons/rate.svg'
import CheckIcon from '@/assets/icons/check.svg'

import { Product } from './Product'

import styles from './Course.module.scss'

export const metadata: Metadata = {
	title: 'Top page'
}

interface ICoursePage {
	params: { alias: string; type: string }
}

export async function generateStaticParams() {
	let paths: string[] = []

	for (const m of firstLevelMenu) {
		const menu = await getMenu(m.id)

		paths = paths.concat(
			menu.flatMap((item) =>
				item.pages.map((page) => `/${m.route}/${page.alias}`)
			)
		)
	}

	return paths

	// return menu.flatMap((item) =>
	// 	item.pages.map((page) => ({
	// 		alias: page.alias
	// 	}))
	// )
}

export default async function CoursePage({ params }: ICoursePage) {
	const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type)
	if (!firstCategoryItem) notFound()

	const firstCategory = firstCategoryItem.id

	const page = await getPage(params.alias)
	if (!page) notFound()

	const products = await getProducts(page.category)

	return (
		<>
			<Product page={page} products={products} />

			<div className={styles.hh_title}>
				<HTag tag='h2'>Вакансии - {page.category}</HTag>
				<Tag color='red' size='m'>
					hh.ru
				</Tag>
			</div>

			{firstCategory === TopLevelCategoryEnum.Courses && page.hh && (
				<div className={styles.hh}>
					<Card className={styles.hh_stat}>
						<div className={styles.hh_stat_title}>Всего вакансий</div>
						<div className={styles.hh_stat_value}>{page.hh.count}</div>
					</Card>

					<Card className={styles.hh_salary}>
						<div>
							<div className={styles.hh_salary_title}>Начальный</div>
							<div className={styles.hh_salary_value}>
								{priceRu(page.hh.juniorSalary)}
							</div>
							<div className={styles.hh_salary_rate}>
								<RateIcon className={styles.filled} />
								<RateIcon />
								<RateIcon />
							</div>
						</div>

						<div>
							<div className={styles.hh_salary_title}>Средний</div>
							<div className={styles.hh_salary_value}>
								{priceRu(page.hh.middleSalary)}
							</div>
							<div className={styles.hh_salary_rate}>
								<RateIcon className={styles.filled} />
								<RateIcon className={styles.filled} />
								<RateIcon />
							</div>
						</div>

						<div>
							<div className={styles.hh_salary_title}>Профессионал</div>
							<div className={styles.hh_salary_value}>
								{priceRu(page.hh.seniorSalary)}
							</div>
							<div className={styles.hh_salary_rate}>
								<RateIcon className={styles.filled} />
								<RateIcon className={styles.filled} />
								<RateIcon className={styles.filled} />
							</div>
						</div>
					</Card>
				</div>
			)}

			{page.advantages && !!page.advantages.length && (
				<>
					<HTag tag='h2' className='tw-mt-[50px] tw-mb-[25px]'>
						Преимущества
					</HTag>

					{page.advantages.map((a, i) => (
						<div key={`${a._id}_${i}`} className={styles.advantage}>
							<CheckIcon />
							<div className={styles.title}>{a.title}</div>
							<hr className={styles.vline} />
							<div className={styles.description}>{a.description}</div>
						</div>
					))}
				</>
			)}

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
		</>
	)
}
