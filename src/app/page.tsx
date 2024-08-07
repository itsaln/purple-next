import { Metadata } from 'next'

import { Button, HTag } from '@/components'

import styles from './Home.module.scss'

export async function generateMetadata (): Promise<Metadata> {
	return {
		title: 'ComputedMeta',
		icons: {
			icon: '/afdsafsd.ico'
		}
	}
}

export default function Home() {
	return (
		<div className={styles.home}>
			<HTag tag='h2'>Текст</HTag>
			<Button appearance='primary' arrow='right'>Кнопка</Button>
			<Button appearance='ghost' arrow='down'>Кнопка</Button>
		</div>
	)
}
