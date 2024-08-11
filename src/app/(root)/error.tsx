'use client'

import { Metadata } from 'next'

import styles from './Error.module.scss'

export const metadata: Metadata = {
	title: 'Error page'
}

interface IErrorPage {
	error: Error
	reset: () => void
}

export default function ErrorPage({ error, reset }: IErrorPage) {
	return (
		<div className={styles.error}>
			Error something was wrong: <div>{JSON.stringify(error)}</div>
			<button type='button' onClick={() => reset()}>Again</button>
		</div>
	)
}
