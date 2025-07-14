import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import type { MovieType } from '../../types/movie'

interface MovieDetailProps {
	movie: MovieType
}

export function MovieDetail({ movie }: MovieDetailProps) {
	const navigate = useNavigate()

	function goBack() {
		navigate(-1)
	}

	return (
		<div >
			<button
				onClick={goBack}
				className="m-4 flex items-center gap-2 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded hover:bg-opacity-90 transition"
			>
				<ArrowLeft size={16} />
				<span>go back</span>
			</button>
			<img
				src={movie.posterUrl}
				alt={movie.nameEn}
				className="w-full md:w-64 object-cover rounded shadow"
			/>
			<div className="flex-1 space-y-3">
				<div className="flex flex-wrap gap-2 mt-2 text-xs">
					{movie.genres.map((g, i) => (
						<span
							key={i}
							className=" px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-full"
						>
							{g.genre}
						</span>
					))}
				</div>
				<h1 className="text-2xl font-semibold">
					{movie.nameEn || movie.nameRu}
				</h1>
				<p className="text-yellow-600">
					Rate: {movie.ratingKinopoisk || '—'}
				</p>
				<p className="text-gray-700 dark:text-gray-200">
					{movie.description}
				</p>
				<p className="text-sm text-gray-400">
					{movie.year} •
				</p>
				<p className="text-sm text-gray-400">
					{movie.countries.map(c => c.country).join(', ')}
				</p>
			</div>
		</div>
	)
}