import { useParams } from 'react-router'
import { MovieCard } from '../components/movie-card/MovieCard'
import { useAppSelector } from '../hooks/useAppSelector'
import { Pagination } from '../components/pagination/Pagination'

export function FavoritePage() {
	const { currentPage } = useParams<{ currentPage?: string }>()
	const pageNum = Number(currentPage) || 1

	const favoriteIds = useAppSelector(state => state.favorites.favorites)
	const allMovies = useAppSelector(state => [
		...state.movie.list,
		...state.movie.items,
		...state.movie.search.results,
	])
	const perPage = 20
	const start = (pageNum - 1) * perPage
	const pagedIds = favoriteIds.slice(start, start + perPage)
	const movies = allMovies.filter(m => pagedIds.includes(m.kinopoiskId))

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
				{movies.map(m => (
					<MovieCard key={m.kinopoiskId} movie={m} />
				))}
			</div>
			<Pagination currentPage={pageNum} basePath="/movies/favorite" />
		</>
	)
}