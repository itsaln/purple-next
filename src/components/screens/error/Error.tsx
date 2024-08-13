import { FC } from 'react'

import styles from './Error.module.scss'

export interface IErrorProps {
	error: Error
	reset: () => void
}

const Error: FC<IErrorProps> = ({ error, reset }) => {
	return (
		<div className={styles.error}>
			Error something was wrong: <div>{JSON.stringify(error)}</div>
			<button type='button' onClick={() => reset()}>
				Again
			</button>
		</div>
	)
}

export default Error
