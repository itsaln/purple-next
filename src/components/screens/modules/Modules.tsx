import { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import styles from './Modules.module.scss'

interface IModulesProps extends HTMLAttributes<HTMLDivElement> {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
}

const Modules: FC<IModulesProps> = ({
	menu,
	firstCategory,
	className,
	...props
}) => {
	return (
		<div className={cn(styles.modules, className)} {...props}>
			<div>Type: {firstCategory}</div>
			<div>Menu: {menu.length}</div>
		</div>
	)
}

export default Modules
