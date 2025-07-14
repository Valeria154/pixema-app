import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Input } from '../input/Input'
import { Search } from 'lucide-react'

export function SearchBar() {
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()
	const { pathname } = useLocation()

	function handleChangeSearchQuery(event: ChangeEvent<HTMLInputElement>) {
		setSearchQuery(event.target.value) //получаем данные, вводимые в инпут
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const term = searchQuery.trim() //убирает пробелы с начала и конца строки
		if (!term) return

		const encoded = encodeURIComponent(term)//кодирует строку
		navigate(`/movies/search/${encoded}/1`) //попадаем на 1 страницу поиска
		setSearchQuery('')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center bg-white dark:bg-gray-800 rounded shadow px-4 py-2 mx-8 w-full"
			role="search"
		>
			<Input
				className="w-full bg-transparent focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
				type="text"
				value={searchQuery}
				onChange={handleChangeSearchQuery}
				placeholder="Search..."
				icon={<Search className="text-gray-500 dark:text-gray-400 mr-2" size={16} />}
			/>
		</form>
	)
}