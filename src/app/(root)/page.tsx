'use client'

import { useState } from 'react'

import { Button, HTag, PTag, Rating, Tag } from '@/components/ui'

import styles from './Home.module.scss'

export default function Home() {
	const [rating, setRating] = useState(4)

	return (
		<div className={styles.home}>
			<HTag tag='h2'>Текст</HTag>
			<Button appearance='primary' arrow='right'>Кнопка</Button>
			<Button appearance='ghost' arrow='down'>Кнопка</Button>
			<PTag size='l'>Большой</PTag>
			<PTag>Средний</PTag>
			<PTag size='s'>Маленький</PTag>
			<Tag size='s'>Ghost</Tag>
			<Tag size='m' color='red'>Red</Tag>
			<Tag size='s' color='green'>Green</Tag>
			<Tag color='primary'>Primary</Tag>
			<Rating rating={rating} setRating={setRating} isEditable />
		</div>
	)
}
