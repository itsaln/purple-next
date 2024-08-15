'use client'

import { FC } from 'react'

import { priceRu } from '@/helpers/helpers'

import {
	ITopPageModel,
	TopLevelCategoryEnum
} from '@/shared/interfaces/page.interface'

import { Card, HTag, Tag } from '@/components/ui'

import RateIcon from '@/assets/icons/rate.svg'

import styles from './Course.module.scss'

interface IHhProps {
	page: ITopPageModel
	firstCategory: TopLevelCategoryEnum
}

export const Hh: FC<IHhProps> = ({ page, firstCategory }) => {
	return (
		<div className={styles.hh}>
			<div className={styles.title}>
				<HTag tag='h2'>Вакансии - {page.category}</HTag>
				<Tag color='red' size='m'>
					hh.ru
				</Tag>
			</div>

			{firstCategory === TopLevelCategoryEnum.Courses && page.hh && (
				<div className={styles.content}>
					<Card className={styles.stat}>
						<div className={styles.stat_title}>Всего вакансий</div>
						<div className={styles.stat_value}>{page.hh.count}</div>
					</Card>

					<Card className={styles.salary}>
						<div>
							<div className={styles.salary_title}>Начальный</div>
							<div className={styles.salary_value}>
								{priceRu(page.hh.juniorSalary)}
							</div>
							<div className={styles.salary_rate}>
								<RateIcon className={styles.filled} />
								<RateIcon />
								<RateIcon />
							</div>
						</div>

						<div>
							<div className={styles.salary_title}>Средний</div>
							<div className={styles.salary_value}>
								{priceRu(page.hh.middleSalary)}
							</div>
							<div className={styles.salary_rate}>
								<RateIcon className={styles.filled} />
								<RateIcon className={styles.filled} />
								<RateIcon />
							</div>
						</div>

						<div>
							<div className={styles.salary_title}>Профессионал</div>
							<div className={styles.salary_value}>
								{priceRu(page.hh.seniorSalary)}
							</div>
							<div className={styles.salary_rate}>
								<RateIcon className={styles.filled} />
								<RateIcon className={styles.filled} />
								<RateIcon className={styles.filled} />
							</div>
						</div>
					</Card>
				</div>
			)}
		</div>
	)
}
