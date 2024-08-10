import { createContext, ReactNode, useState } from 'react'

import { IMenuItem } from '@/shared/interfaces/menu.interface'
import { TopLevelCategoryEnum } from '@/shared/interfaces/page.interface'

export interface IAPPContext {
	menu: IMenuItem[]
	firstCategory: TopLevelCategoryEnum
	setMenu?: (newMenu: IMenuItem[]) => void
}

export const AppContext = createContext<IAPPContext>({
	menu: [],
	firstCategory: TopLevelCategoryEnum.Courses
})

export const AppContextProvider = ({
	menu,
	firstCategory,
	children
}: IAPPContext & { children: ReactNode }) => {
	const [menuState, setMenuState] = useState<IMenuItem[]>(menu)

	const setMenu = (newMenu: IMenuItem[]) => setMenuState(newMenu)

	return (
		<AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
			{children}
		</AppContext.Provider>
	)
}
