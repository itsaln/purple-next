'use client'

import { FC } from 'react'

import { ITopPageAdvantage } from '@/shared/interfaces/page.interface'

import { HTag } from '@/components/ui'

import CheckIcon from '@/assets/icons/check.svg'

import styles from './Course.module.scss'

interface IAdvantages {
	advantages: ITopPageAdvantage[]
}

export const Advantages: FC<IAdvantages> = ({ advantages }) => {
	return (
		<div className={styles.advantages}>
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
