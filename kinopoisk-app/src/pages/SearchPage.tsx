import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { fetchMovieSearch } from '../redux/movie-slice'
import { MovieCard } from '../components/movie-card/MovieCard'
import { Pagination } from '../components/pagination/pagination'
import type { RootState } from '../app/store'
import type { SearchState } from '../types/movie'

export function SearchPage() {
	const { query, currentPage } = useParams<{ query: string; currentPage?: string }>()
	if (!query) return null

	const pageNum = Number(currentPage) || 1

	const dispatch = useAppDispatch()
	const { results, totalPages, isLoading, error } = useAppSelector((state: RootState) => state.movie.search)

	useEffect(() => {
		dispatch(fetchMovieSearch({ query, page: pageNum }))
	}, [dispatch, query, pageNum])

	if (isLoading) return <p className="p-4">Loading search…</p>
	if (error) return <p className="p-4 text-red-500">{error}</p>

	return (
		<div className="p-4">
			<h2 className="mb-4 text-xl">Results for “{query}”</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{results.map(m => (
					<MovieCard key={m.kinopoiskId ?? `${m.nameEn}-${m.year}`} movie={m} />
				))}
			</div>
			<Pagination
				currentPage={pageNum}
				totalPages={totalPages}
				basePath={`/movies/search/${encodeURIComponent(query)}`}
			/>
		</div>
	)
}