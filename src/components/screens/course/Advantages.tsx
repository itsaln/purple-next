'use client'

import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import { ITopPageAdvantage } from '@/shared/interfaces/page.interface'

import { HTag } from '@/components/ui'

import CheckIcon from '@/assets/icons/check.svg'

import styles from './Course.module.scss'

interface IAdvantagesProps extends HTMLAttributes<HTMLDivElement> {
	advantages: ITopPageAdvantage[]
}

export const Advantages: FC<IAdvantagesProps> = ({
	advantages,
	className,
	...props
}) => {
	return (
		<div className={cn(styles.advantages, className)} {...props}>
			<HTag tag='h2' className={styles.title}>
				Преимущества
			</HTag>

			<div className={styles.list}>
				{advantages.map((a, i) => (
					<div key={`${a._id}_${i}`} className={styles.advantage}>
						<CheckIcon />
						<div className={styles.advantage_title}>{a.title}</div>
						<div className={styles.advantage_vline}>
							<hr />
						</div>
						<div className={styles.advantage_description}>{a.description}</div>
					</div>
				))}
			</div>
		</div>
	)
}
