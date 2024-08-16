'use client'

import {
	ReactNode,
	useEffect,
	useState,
	KeyboardEvent,
	forwardRef,
	HTMLAttributes
} from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'clsx'

import StarIcon from '@/assets/icons/star.svg'

import styles from './Rating.module.scss'

interface IFieldProps {
	error?: FieldError
}

type TypeRatingPropsField = HTMLAttributes<HTMLDivElement> & IFieldProps

interface IRatingProps extends TypeRatingPropsField {
	isEditable?: boolean
	rating: number
	setRating?: (rating: number) => void
}

export const Rating = forwardRef<HTMLDivElement, IRatingProps>(
	(
		{ isEditable = false, rating, setRating, error, className, ...props },
		ref
	) => {
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
						onKeyDown={(e: KeyboardEvent<SVGElement>) =>
							isEditable && handleSpace(i + 1, e)
						}
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
		}, [rating])

		return (
			<div
				ref={ref}
				className={cn(styles.rating, className, {
					[styles.invalid]: error
				})}
				{...props}
			>
				{ratingArray.map((r, i) => (
					<span key={`${r}_${i}`}>{r}</span>
				))}

				{error && <span className={styles.error}>{error.message}</span>}
			</div>
		)
	}
)

Rating.displayName = 'Rating'
