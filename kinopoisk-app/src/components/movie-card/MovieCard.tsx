import { Link } from 'react-router'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { toggleFavorite } from '../../redux/favorites-slice'
import { Bookmark } from 'lucide-react'
import type { MovieType } from '../../types/movie'

interface Props {
	movie: MovieType
}

export function MovieCard({ movie }: Props) {
	const dispatch = useAppDispatch()
	const favorites = useAppSelector(state => state.favorites.favorites)
	const isFavorite = favorites.includes(movie.kinopoiskId)

	function handleToggleFavorite(event: React.MouseEvent) {
		event.stopPropagation()
		dispatch(toggleFavorite(movie.kinopoiskId))
	}

	return (
		<div className="relative bg-white dark:bg-gray-900 rounded shadow overflow-hidden">
			<button
				onClick={handleToggleFavorite}
				className="absolute top-2 right-2 z-10 text-yellow-500 hover:text-yellow-400 transition text-lg"
				aria-label="Add favorite"
			>
				{isFavorite ? <Bookmark size={30} /> : <Bookmark size={24} />}
			</button>
			<Link to={`/movie/${movie.kinopoiskId}`}>
				<img
					src={movie.posterUrlPreview}
					alt={movie.nameEn || movie.nameRu || 'Film'}
					className="w-full h-72 object-cover"
				/>
				<div className="p-3">
					<h3 className="text-base font-medium truncate">{movie.nameEn || movie.nameRu || 'No name'}</h3>
					<p className="text-sm text-yellow-600">
						{movie.ratingKinopoisk ? movie.ratingKinopoisk.toFixed(1) : '—'}
					</p>
					<div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-500">
						{movie.genres.map((genre, idx) => (
							<span
								key={`${genre.genre}-${idx}`}
								className="px-2 py-0.5 border rounded-full bg-gray-100 dark:bg-gray-800"
							>
								{genre.genre}
							</span>
						))}
					</div>
				</div>
			</Link>
		</div>
	)
}