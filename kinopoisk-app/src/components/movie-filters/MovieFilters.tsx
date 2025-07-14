import { useState } from 'react'
import type { MovieFilterType } from '../../types/movie'

type FilterProps = {
	onFilterChange: (filters: { type?: MovieFilterType; year?: number }) => void
}

export function MovieFilters({ onFilterChange }: FilterProps) {
	const [type, setType] = useState<MovieFilterType>('movie')
	const [year, setYear] = useState<number | ''>('')

	function handleApply() {
		onFilterChange({
			type,
			year: typeof year === 'number' ? year : undefined,
		})
	}

	function handleReset() {
		setType('movie')
		setYear('')
		onFilterChange({})
	}

	return (
		<div className="flex flex-wrap gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
			<select
				value={type}
				onChange={e => setType(e.target.value as MovieFilterType)}
				className="px-3 py-2 rounded border dark:bg-gray-900"
			>
				<option value="movie">Movie</option>
				<option value="series">Series</option>
				<option value="episode">Episode</option>
				<option value="game">Game</option>
			</select>

			<input
				type="number"
				placeholder="Year"
				value={year}
				onChange={e => setYear(Number(e.target.value))}
				className="px-3 py-2 rounded border dark:bg-gray-900"
			/>

			<button
				onClick={handleApply}
				className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
			>
				Apply
			</button>

			<button
				onClick={handleReset}
				className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
			>
				Reset
			</button>
		</div>
	)
}