'use client'

import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import SortIcon from '@/assets/icons/sort.svg'

import styles from './Sort.module.scss'

export enum SortEnum {
	Rating,
	Price
}

interface ISortProps extends HTMLAttributes<HTMLDivElement> {
	sort: SortEnum
	setSort: (sort: SortEnum) => void
}

export const Sort: FC<ISortProps> = ({
	sort,
	setSort,
	className,
	...props
}) => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<button
				type='button'
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
				onClick={() => setSort(SortEnum.Rating)}
			>
				<SortIcon className={styles.sort_icon} /> По рейтингу
			</button>

			<button
				type='button'
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
				onClick={() => setSort(SortEnum.Price)}
			>
				<SortIcon className={styles.sort_icon} /> По цене
			</button>
		</div>
	)
}
