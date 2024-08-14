'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import cn from 'clsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { declOfNum, priceRu } from '@/helpers/helpers'

import { IProductModel } from '@/shared/interfaces/product.interface'

import {
	Button,
	Card,
	Divider,
	Input,
	Rating,
	Tag,
	Textarea
} from '@/components/ui'

import UserIcon from '@/assets/icons/user.svg'
import CloseIcon from '@/assets/icons/close.svg'

import styles from './Course.module.scss'

interface IReviewForm {
	name: string
	title: string
	description: string
	rating: number
}

const Product: FC<{ product: IProductModel }> = ({ product }) => {
	const [isReviewOpened, setIsReviewOpened] = useState(false)

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IReviewForm>()

	const onSubmit: SubmitHandler<IReviewForm> = (data) => {
		console.log('data:---', data)
	}

	return (
		<>
			<Card
				className={cn(styles.product, {
					[styles.opened]: isReviewOpened
				})}
			>
				<div className={styles.logo}>
					<Image
						src={product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>

				<div className={styles.title}>{product.title}</div>

				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && (
						<Tag color='green' className='tw-ml-[5px]'>
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>

				<div className={styles.credit}>
					{priceRu(product.credit)}/<span className={styles.month}>мес</span>
				</div>

				<Rating
					className={styles.rating}
					rating={product.reviewAvg ?? product.initialRating}
				/>

				<div className={styles.tags}>
					{product.categories.map((c, i) => (
						<Tag key={`${c}_${i}`} color='ghost' className='tw-mt-[7px]'>
							{c}
						</Tag>
					))}
				</div>

				<div className={styles.price_title}>цена</div>
				<div className={styles.credit_title}>кредит</div>
				<div className={styles.review_title}>
					{product.reviewCount}{' '}
					{declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
				</div>

				<Divider className={styles.hr} />

				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map((c, i) => (
						<div key={`${c.name}_${i}`} className={styles.characteristic}>
							<span className={styles.characteristic_name}>{c.name}</span>
							<span className={styles.characteristic_dots} />
							<span className={styles.characteristic_value}>{c.value}</span>
						</div>
					))}
				</div>

				<div className={styles.adv_block}>
					{product.advantages && (
						<div className={styles.advantages}>
							<div className={styles.adv_title}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					)}

					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.adv_title}>Недостатки</div>
							<div>{product.disadvantages}</div>
						</div>
					)}
				</div>

				<Divider className={cn(styles.hr, styles.hr2)} />

				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						className='tw-ml-[20px]'
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>

			<Card
				color='blue'
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened
				})}
			>
				{product.reviews.length ? (
					product.reviews.map((review, index) => (
						<div key={`${review._id}_${index}`} className={styles.review}>
							<UserIcon className={styles.review_user} />
							<div className={styles.review_title}>
								<span className={styles.name}>{review.name}</span>&nbsp;&nbsp;
								<span>{review.title}</span>
							</div>
							<div className={styles.review_date}>
								{format(new Date(review.createdAt), 'dd MMMM yyyy', {
									locale: ru
								})}
							</div>
							<Rating rating={review.rating} className={styles.review_rating} />
							<div className={styles.review_description}>
								{review.description}
							</div>
						</div>
					))
				) : (
					<div className={styles.not_found}>
						<span className='tw-text-red'>Пока нет отзывов.</span>{' '}
						<span className='tw-text-primary'>Оставьте первую</span>
					</div>
				)}
				<>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<Input
							{...register('name', {
								required: {
									value: true,
									message: 'Заполните имя'
								}
							})}
							placeholder='Имя'
							className={styles.form_input}
							error={errors.name}
						/>
						<Input
							{...register('title', {
								required: {
									value: true,
									message: 'Заполните заголовок'
								}
							})}
							placeholder='Заголовок отзыва'
							className={styles.form_input}
							error={errors.title}
						/>
						<div className={styles.form_rating}>
							<span>Оценка:</span>
							<Controller
								control={control}
								name={'rating'}
								rules={{
									required: {
										value: true,
										message: 'Укажите рейтинг'
									}
								}}
								render={({ field, fieldState }) => (
									<Rating
										ref={field.ref}
										isEditable
										rating={field.value}
										setRating={field.onChange}
										error={fieldState.error}
									/>
								)}
							/>
						</div>
						<Textarea
							{...register('description', {
								required: {
									value: true,
									message: 'Заполните описание'
								}
							})}
							placeholder='Текст отзыва'
							className={styles.form_description}
							error={errors.description}
						/>
						<div className={styles.form_submit}>
							<Button type='submit' appearance='primary'>
								Отправить
							</Button>
							<span className='tw-ml-[15px]'>
								* Перед публикацией отзыв пройдет предварительную модерацию и
								проверку
							</span>
						</div>
					</form>

					<div className={styles.success}>
						<div className={styles.success_title}>Ваш отзыв отправлен</div>
						<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
						<CloseIcon className={styles.close} />
					</div>
				</>
			</Card>
		</>
	)
}

export default Product
