import { getMenu } from '@/api/menu'

export default async function Menu() {
	const menu = await getMenu(0)

	return (
		<div>
			<div>{JSON.stringify(menu)}</div>
			<div>{menu.length}</div>
		</div>
	)
}
