'use client'

import { useRouter } from "next/router"
import { useState } from "react"

const SearchInput = () => {
	const router = useRouter()
	const [value, setValue] = useState('')
	const debouncedValue = useDebounceValue(value, 500)
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}
	return (
		<div>SearchInput</div>
	)
}
export default SearchInput