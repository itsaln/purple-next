import { useState, useRef, forwardRef, HTMLAttributes } from 'react'
import Image from 'next/image'
import cn from 'clsx'
import axios from 'axios'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'

import { API } from '@/app/api'

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

interface IReviewSentResponse {
	message: string
}

interface IProductProps extends HTMLAttributes<HTMLDivElement> {
	product: IProductModel
}

const Product = motion(
	forwardRef<HTMLDivElement, IProductProps>(
		({ product, className, ...props }, ref) => {
			const [isReviewOpened, setIsReviewOpened] = useState(false)
			const [isSuccess, setIsSuccess] = useState(false)
			const [error, setError] = useState('')

			const reviewRef = useRef<HTMLDivElement | null>(null)

			const variants = {
				visible: { opacity: 1, height: 'auto' },
				hidden: { opacity: 0, height: 0 }
			}

			const {
				register,
				control,
				handleSubmit,
				formState: { errors },
				reset,
				clearErrors
			} = useForm<IReviewForm>({
				mode: 'onTouched'
			})

			const onSubmit: SubmitHandler<IReviewForm> = async (formData) => {
				try {
					const { data } = await axios.post<IReviewSentResponse>(
						API.review.createDemo,
						{
							...formData,
							productId: product._id
						}
					)

					if (data.message) {
						setIsSuccess(true)
						reset()
					} else setError('Что-то пошло не так')

					// eslint-disable-next-line  @typescript-eslint/no-explicit-any
				} catch (error: any) {
					setError(error.message)
				}
			}

			const scrollToReview = () => {
				setIsReviewOpened(true)
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
				reviewRef.current?.focus()
			}

			return (
				<div ref={ref} className={cn(styles.product, className)} {...props}>
					<Card
						className={cn(styles.product_card, {
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
							<span>
								<span className='tw-visually-hidden'>Цена</span>
								{priceRu(product.price)}
							</span>
							{product.oldPrice && (
								<Tag color='green' className='tw-ml-[5px]'>
									<span className='tw-visually-hidden'>Скидка</span>
									{priceRu(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>

						<div className={styles.credit}>
							<span className='tw-visually-hidden'>Кредит</span>
							{priceRu(product.credit)}/
							<span className={styles.month}>мес</span>
						</div>

						<span className='tw-visually-hidden'>
							{'Рейтинг' +
								Math.ceil(product.reviewAvg ?? product.initialRating)}
						</span>
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

						<div className={styles.price_title} aria-hidden={true}>
							цена
						</div>
						<div className={styles.credit_title} aria-hidden={true}>
							кредит
						</div>
						<div className={styles.review_title}>
							<a href='#reviews' onClick={scrollToReview}>
								{product.reviewCount}{' '}
								{declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
							</a>
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
								onClick={() => setIsReviewOpened(!isReviewOpened)}
								aria-expanded={isReviewOpened}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>

					<motion.div
						animate={isReviewOpened ? 'visible' : 'hidden'}
						variants={variants}
						initial='hidden'
					>
						<Card
							ref={reviewRef}
							tabIndex={isReviewOpened ? 0 : -1}
							color='blue'
							className={styles.product_reviews}
						>
							{product.reviews.length ? (
								product.reviews.map((review, index) => (
									<div key={`${review._id}_${index}`} className={styles.review}>
										<UserIcon className={styles.review_user} />
										<div className={styles.review_title}>
											<span className={styles.name}>{review.name}</span>
											&nbsp;&nbsp;
											<span>{review.title}</span>
										</div>
										<div className={styles.review_date}>
											{format(new Date(review.createdAt), 'dd MMMM yyyy', {
												locale: ru
											})}
										</div>
										<Rating
											rating={review.rating}
											className={styles.review_rating}
										/>
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
										tabIndex={isReviewOpened ? 0 : -1}
										aria-invalid={!!errors.name}
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
										tabIndex={isReviewOpened ? 0 : -1}
										aria-invalid={!!errors.title}
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
													tabIndex={isReviewOpened ? 0 : -1}
													aria-invalid={!!fieldState.error}
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
										tabIndex={isReviewOpened ? 0 : -1}
										aria-label='Текст отзыва'
										aria-invalid={!!errors.description}
									/>
									<div className={styles.form_submit}>
										<Button
											type='submit'
											appearance='primary'
											tabIndex={isReviewOpened ? 0 : -1}
											onClick={() => clearErrors()}
										>
											Отправить
										</Button>
										<span className='tw-ml-[15px]'>
											* Перед публикацией отзыв пройдет предварительную
											модерацию и проверку
										</span>
									</div>
								</form>

								{isSuccess && (
									<div className={styles.success} role='alert'>
										<div className={styles.success_title}>
											Ваш отзыв отправлен
										</div>
										<div>
											Спасибо, ваш отзыв будет опубликован после проверки.
										</div>

										<button
											type='button'
											className={styles.close_btn}
											onClick={() => setIsSuccess(false)}
											aria-label='Закрыть оповищение'
										>
											<CloseIcon />
										</button>
									</div>
								)}

								{error && (
									<div className={styles.error} role='alert'>
										Что-то пошло не так, попробуйте обновить страницу
										<button
											type='button'
											className={styles.close_btn}
											onClick={() => setError('')}
											aria-label='Закрыть оповищение'
										>
											<CloseIcon />
										</button>
									</div>
								)}
							</>
						</Card>
					</motion.div>
				</div>
			)
		}
	)
)

export default Product

Product.displayName = 'Product'
