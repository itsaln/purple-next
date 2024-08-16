'use client'

import {
	ReactNode,
	useEffect,
	useState,
	KeyboardEvent,
	forwardRef,
	HTMLAttributes,
	useRef
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
		{ isEditable = false, rating, setRating, error, className, tabIndex, ...props },
		ref
	) => {
		const [ratingArray, setRatingArray] = useState<ReactNode[]>(
			new Array(5).fill(<></>)
		)
		const ratingArrayRef = useRef<HTMLSpanElement[]>([])

		const computeFocus = (r: number, i: number) => {
			if (!isEditable) return -1
			if (!rating && i === 0) return tabIndex ?? 0
			if (r === i + 1) return tabIndex ?? 0

			return -1
		}

		const constructorRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r, i) => (
				<span
					// @ts-ignore
					ref={(r) => ratingArrayRef.current?.push(r as HTMLSpanElement)}
					tabIndex={computeFocus(rating, i)}
					onKeyDown={handleKey}
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i + 1)}
				>
					<StarIcon />
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

		const handleKey = (key: KeyboardEvent<HTMLSpanElement>) => {
			if (!isEditable || !setRating) return

			if (key.code === 'ArrowRight' || key.code === 'ArrowUp') {
				if (!rating) {
					setRating(1)
				} else {
					key.preventDefault()
					setRating( rating < 5 ? rating + 1 : 5)
				}
				ratingArrayRef.current[rating]?.focus()
      }
			if (key.code === 'ArrowLeft' || key.code === 'ArrowDown') {
				key.preventDefault()
				setRating( rating > 1 ? rating - 1 : 1)
				ratingArrayRef.current[rating - 2]?.focus()
			}
		}

		useEffect(() => {
			constructorRating(rating)
		}, [rating, tabIndex]) // eslint-disable-next-line react-hooks/exhaustive-deps

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
