import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Error.module.scss'

export interface IErrorProps extends HTMLAttributes<HTMLDivElement> {
	error: Error
	reset: () => void
}

const Error: FC<IErrorProps> = ({ error, reset, className, ...props }) => {
	return (
		<div className={cn(styles.error, className)} {...props}>
			Error something was wrong: <div>{JSON.stringify(error)}</div>
			<button type='button' onClick={() => reset()}>
				Again
			</button>
		</div>
	)
}

export default Error
