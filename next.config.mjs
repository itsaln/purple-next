/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		// APP_URL: process.env.APP_URL,
		// APP_ENV: process.env.APP_ENV,
		// APP_SERVER_URL: process.env.APP_SERVER_URL
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack']
			}
		)
		fileLoaderRule.exclude = /\.svg$/i

		return config
	}
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*',
	// 			destination: `${process.env.APP_SERVER_URL}/api/:path*`
	// 			// destination: 'https://itsaln-api.onrender.com/api/:path*'
	// 		},
	// 		{
	// 			source: '/uploads/:path*',
	// 			destination: `${process.env.APP_SERVER_URL}/uploads/:path*`
	// 			// destination: 'https://itsaln-api.onrender.com/uploads/:path*'
	// 		}
	// 	]
	// }
}

export default nextConfig
