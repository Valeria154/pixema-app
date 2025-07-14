import { useParams } from 'react-router'
import { useAppSelector } from '../hooks/useAppSelector'
import { MovieGrid } from '../components/movie-grid/MovieGrid'
import { Pagination } from '../components/pagination/Pagination'

export function Home() {
	const { currentPage } = useParams<{ currentPage?: string }>()
	const { items, list, filters, totalPages } = useAppSelector(state => state.movie)
	const pageNum = Number(currentPage) || 1

	const moviesToShow = items.length > 0 ? items : list

	return (
		<>
			<MovieGrid />
			<Pagination
				currentPage={pageNum}
				totalPages={totalPages}
				basePath={filters.type || filters.year ? '/movies/filtered' : '/movies/all'}
			/>
		</>
	)
}