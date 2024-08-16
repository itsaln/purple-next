import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import styles from './Search.module.scss'

interface ISearchProps extends HTMLAttributes<HTMLDivElement> {}

const Search: FC<ISearchProps> = ({ className, ...props }) => {
	return (
		<div className={cn(styles.search, className)} {...props}>
			Search
		</div>
	)
}

export default Search
