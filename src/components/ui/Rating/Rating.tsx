'use client'

import { FC, ReactNode, useEffect, useState, KeyboardEvent } from 'react'
import cn from 'clsx'

import { RatingProps } from './Rating.props'

import StarIcon from './star.svg'

import styles from './Rating.module.scss'

export const Rating: FC<RatingProps> = ({
	isEditable = false,
	rating,
	setRating,
	className,
	...props
}) => {
	const [ratingArray, setRatingArray] = useState<ReactNode[]>(
		new Array(5).fill(<></>)
	)
	const constructorRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r, i) => (
			<span
				className={cn(styles.star, {
					[styles.filled]: i < currentRating,
					[styles.editable]: isEditable
				})}
				onMouseEnter={() => changeDisplay(i + 1)}
				onMouseLeave={() => changeDisplay(rating)}
				onClick={() => onClick(i + 1)}
			>
				<StarIcon
					tabIndex={isEditable ? 0 : -1}
					onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
				/>
			</span>
		))

		setRatingArray(updatedArray)
	}

	const changeDisplay = (i: number) => {
		if (!isEditable) return

		constructorRating(i)
	}

	const onClick = (i: number) => {
		if (!isEditable || !setRating) return

		setRating(i)
	}

	const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
		if (e.code !== 'Space' || !setRating) return

		setRating(i)
	}

	useEffect(() => {
		constructorRating(rating)
	}, [rating]) // eslint-disable-next-line react-hooks/exhaustive-deps

	return (
		<div className={cn(styles.rating, className)} {...props}>
			{ratingArray.map((r, i) => (
				<span key={`${r}_${i}`}>{r}</span>
			))}
		</div>
	)
}
