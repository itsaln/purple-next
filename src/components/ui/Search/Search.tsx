'use client'

import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useState, KeyboardEvent } from 'react'
import cn from 'clsx'

import { Button, Input } from '@/components/ui'

import GlassIcon from '@/assets/icons/glass.svg'

import styles from './Search.module.scss'

interface ISearchProps extends HTMLAttributes<HTMLFormElement> {}

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
		<form className={cn(styles.search, className)} {...props} role='search'>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				aria-label='Искать по сайту'
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}
			>
				<GlassIcon />
			</Button>
		</form>
	)
}
