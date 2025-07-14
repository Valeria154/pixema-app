import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { requestMovie } from '../services/movies'
import { MovieDetail } from '../components/movie-detail/MovieDetail'
import type { MovieType } from '../types/movie'

export function MoviePage() {
	const { id } = useParams<{ id: string }>()
	const [movie, setMovie] = useState<MovieType | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!id) return
		requestMovie(id).then((data) => {
			if (data) setMovie(data)
			setLoading(false)
		})
	}, [id])

	if (loading) return <p className="text-gray-500 p-4">Loading...</p>
	if (!movie) return <p className="text-red-500 p-4">Film not found</p>

	return <MovieDetail movie={movie} />
}