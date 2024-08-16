'use client'

import { FC, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

import { useScrollY } from '@/hooks/useScrollY'

import { ButtonIcon } from '@/components/ui'

import styles from './Up.module.scss'

export const Up: FC = () => {
	const controls = useAnimation()
	const scrollY = useScrollY()

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	useEffect(() => {
		controls.start({
			opacity: scrollY / document.body.scrollHeight
		})
	}, [scrollY, controls])

	return (
		<motion.div
			className={styles.up}
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<ButtonIcon
				title='Up'
				icon='up'
				appearance='primary'
				onClick={scrollToTop}
			/>
		</motion.div>
	)
}
