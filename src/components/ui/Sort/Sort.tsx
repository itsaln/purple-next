'use client'

import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import SortIcon from '@/assets/icons/sort.svg'

import styles from './Sort.module.scss'

export enum SortEnum {
	Rating,
	Price
}

interface ISortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	sort: SortEnum
	setSort: (sort: SortEnum) => void
}

export const Sort: FC<ISortProps> = ({sort, setSort, className, ...props}) => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
				onClick={() => setSort(SortEnum.Rating)}
			>
				<SortIcon className={styles.sort_icon} /> По рейтингу
			</span>

			<span
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
				onClick={() => setSort(SortEnum.Price)}
			>
				<SortIcon className={styles.sort_icon} /> По цене
			</span>
		</div>
	)
}
