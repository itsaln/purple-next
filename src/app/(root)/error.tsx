'use client'

import { Metadata } from 'next'

import Error, { IErrorProps } from '@/screens/error/Error'

export const metadata: Metadata = {
	title: 'Error page'
}

export default function ErrorPage({ error, reset }: IErrorProps) {
	return <Error error={error} reset={reset} />
}
