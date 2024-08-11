'use client'

import styles from './Error.module.scss'

export default function ErrorPage({
	error,
	reset
}: {
	error: Error
	reset: () => void
}) {
	return (
		<div className={styles.error}>
			Error something was wrong: <div>{JSON.stringify(error)}</div>
			<button type='button' onClick={() => reset()}>Again</button>
		</div>
	)
}
