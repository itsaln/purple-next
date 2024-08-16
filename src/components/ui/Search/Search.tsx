'use client'

import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useState, KeyboardEvent } from 'react'
import cn from 'clsx'

import { Button, Input } from '@/components/ui'

import GlassIcon from '@/assets/icons/glass.svg'

import styles from './Search.module.scss'

interface ISearchProps extends HTMLAttributes<HTMLDivElement> {}

export const Search: FC<ISearchProps> = ({ className, ...props }) => {
	const router = useRouter()
	const [search, setSearch] = useState('')

	const goToSearch = () => {
		router.push(`/search?q=${search}`)
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') goToSearch()
	}

	return (
		<div className={cn(styles.search, className)} {...props}>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}
			>
				<GlassIcon />
			</Button>
		</div>
	)
}
