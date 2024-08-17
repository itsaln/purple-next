import type { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

import { Colors } from './src/shared/colors'

const colors = {
	...Colors,
	transparent: twColors.transparent
}

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	important: true,
	prefix: 'tw-',
	theme: {
		colors,
		extend: {
			fontSize: {
				// base: '16px'
				// '5xl': '2.85rem'
				// '7xl': '5rem',
				// '8xl': '6rem'
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
				4: '4',
				5: '5',
				6: '6',
				7: '7',
				8: '8',
				9: '9',
				10: '10'
			}
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				// 'sm': '100%',
				// 'md': '100%',
				lg: '990px',
				xl: '1280px',
				'2xl': '1536px'
			}
		}
	},
	plugins: [
		// require('@tailwindcss/forms'),
		// require('@tailwindcss/aspect-ratio'),
		plugin(({ addComponents, theme, addUtilities }) => {
			addComponents({
				'.truncate-1': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '1',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				},
				'.truncate-2': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '2',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				},
				'.truncate-3': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '3',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				},
				'.truncate-4': {
					display: '-webkit-box !important',
					'-webkit-line-clamp': '4',
					'-webkit-box-orient': 'vertical',
					textOverflow: 'ellipsis',
					overflow: 'hidden'
				},
				'.visually-hidden': {
					position: 'absolute',
					width: 0,
					height: 0,
					overflow: 'hidden'
				}
			})
			addUtilities({
				'.transition-colors': {
					transitionProperty:
						'color, background-color, border-color, text-decoration-color, fill, stroke',
					transitionTimingFunction: 'ease',
					transitionDuration: '.5s'
				},
				'.transition-opacity': {
					transition: 'opacity .5s ease'
				},
				'.transition-transform': {
					transition: 'transform .5s linear'
				},
				'.transition-filter': {
					transition: 'filter .5s ease'
				},
				'.transition-all': {
					transition: 'all .3s ease'
				},
				'.pointer-events-all': {
					pointerEvents: 'all'
				}
			})
		})
	]
}
export default config
