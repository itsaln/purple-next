'use client'

import { FC, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

import { useScrollY } from '@/hooks/useScrollY'

import UpIcon from '@/assets/icons/up.svg'

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
		const ignore = controls.start({
			opacity: scrollY / document.body.scrollHeight
		})
	}, [scrollY, controls])

	return (
		<motion.button
			type='button'
			className={styles.up}
			onClick={scrollToTop}
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<UpIcon />
		</motion.button>
	)
}
