'use client'

import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { ChangeEvent, useEffect, useState } from 'react'

import Input from './Input'

const SearchInput = () => {
	const router = useRouter()
	const [value, setValue] = useState('')
	const debouncedValue = useDebouncedValue(value, 500)

	useEffect(() => {
		const query = { title: debouncedValue }
		const url = qs.stringifyUrl({ url: '/search', query })
		router.push(url)
	}, [router, debouncedValue])

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	return (
		<Input
			value={value}
			placeholder='What do you want to listen?'
			onChange={handleOnChange}
		/>
	)
}
export default SearchInput
