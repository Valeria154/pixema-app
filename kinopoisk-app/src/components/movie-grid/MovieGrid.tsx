import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import {
	fetchMovieList,
	fetchMoviesByFilters,
	setFilters
} from '../../redux/movie-slice'
import { MovieCard } from '../movie-card/MovieCard'
import { MovieFilters } from '../movie-filters/MovieFilters'
import { useParams } from 'react-router'
import { clearFilteredItems } from '../../redux/movie-slice'
import type { Filters } from '../../types/movie'

export function MovieGrid() {
	const dispatch = useAppDispatch()
	const {
		list,
		items,
		isLoading,
		error,
		filters
	} = useAppSelector(state => state.movie)

	const params = useParams<{ currentPage?: string }>() //Забираем currentPage из url 
	const pageNum = Number(params.currentPage) || 1 // приводим к number

	const moviesToShow = items.length > 0 ? items : list

	useEffect(() => {
		const hasFilter = filters.type || filters.year

		if (hasFilter) {
			dispatch(fetchMoviesByFilters({ ...filters, page: pageNum }))
		} else {
			dispatch(fetchMovieList(pageNum))
		}
	}, [dispatch, pageNum, filters])

	function handleFilterChange(newFilters: Filters) {
		const hasFilters = newFilters.type || newFilters.year

		if (hasFilters) {
			const fullFilters = { ...newFilters, page: 1 }
			dispatch(setFilters(fullFilters))
			dispatch(fetchMoviesByFilters(fullFilters))
		} else {
			dispatch(clearFilteredItems())
			dispatch(fetchMovieList(1))
		}
	}

	return (
		<section className="space-y-6">
			<MovieFilters onFilterChange={handleFilterChange} />

			{isLoading && <p className="text-gray-500 text-center">Loading...</p>}
			{error && <p className="text-red-500 text-center">{error}</p>}

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{moviesToShow.map(movie => (
					<MovieCard key={movie.kinopoiskId} movie={movie} />
				))}
			</div>
		</section>
	)
}