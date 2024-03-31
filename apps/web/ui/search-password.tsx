'use client';

import { Button, Input } from '@pwd/ui';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, useRef, useState } from 'react';

const SearchPasswordInput = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	const [search, setSearch] = useState(searchParams?.get('search') || '')

	const debounced = useRef<ReturnType<typeof setTimeout>>()

	const onSearch = (term: string): URLSearchParams => {
		const params = new URLSearchParams(searchParams);
		if (term) params.set('search', term);
		else params.delete('search');

		return params
	}

	const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearch(e.target.value)
		const params = onSearch(e.target.value);

		clearTimeout(debounced.current);

		debounced.current = setTimeout(() => {
			replace(`${pathname}?${params.toString()}`)
		}, 700)
	}

	const handleClear = () => {
		setSearch('')
		const params = onSearch('')
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div className='flex gap-2 items-center'>
			<Input
				placeholder='Hostname'
				onChange={handleSearch}
				value={search}
			/>

			{!!searchParams?.get('search') && (
				<Button size="icon" variant="destructive" onClick={handleClear}><X /></Button>
			)}
		</div>
	)
}

export default SearchPasswordInput
