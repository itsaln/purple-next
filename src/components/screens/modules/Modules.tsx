import { FC } from 'react'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

import styles from './Modules.module.scss'

interface IModulesProps {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
}

const Modules: FC<IModulesProps> = ({ menu, firstCategory }) => {
	return (
		<div className={styles.modules}>
			<div>Type: {firstCategory}</div>
			<div>Menu: {menu.length}</div>
		</div>
	)
}

export default Modules
