import { get } from '../config/api/client'
import {
	baseUrl,
	moviesEndpoint,
	movieByIdEndpoint,
	searchByKeyWordEndpoint
} from '../config/api/api'
import type { MovieType, MoviesListResponse, SearchResponse, Filters } from '../types/movie'

// набор параметров для запроса списка фильмов
const defaultParams = {
	order: 'RATING',
	type: 'FILM',
	ratingFrom: 0,
	ratingTo: 10,
	yearFrom: 1000,
	yearTo: 3000,
}

const typeMap = {
	movie: 'FILM',
	series: 'TV_SERIES',
	episode: 'MINI_SERIES',
	game: 'TV_SHOW',
}

export async function requestMovieList(page = 1): Promise<Promise<MoviesListResponse>> {
	try {
		const response = await get<MoviesListResponse>(baseUrl + moviesEndpoint, {
			params: {
				...defaultParams,
				page,
			},
		})
		return response.data
	} catch (error: unknown) {
		console.error('requestMovieList error:', error)
		return { items: [], totalPages: 1 }
	}
}

export async function requestMovie(id: string | number): Promise<MovieType | void> {
	try {
		const response = await get<MovieType>(`${movieByIdEndpoint}/${id}`)
		return response.data
	} catch (error: unknown) {
		if (error instanceof Error) console.log(error.message)
	}
}

export async function requestSearchMovies(keyword: string, page = 1): Promise<{ items: MovieType[]; totalPages: number }> {
	try {
		const response = await get<SearchResponse>(searchByKeyWordEndpoint, {
			params: { keyword, page },
		})
		return {
			items: response.data.films,
			totalPages: response.data.totalPages,
		}
	} catch (error: unknown) {
		console.error('requestSearchMovies error:', error)
		return { items: [], totalPages: 1 }
	}
}

export async function fetchFilteredMovies({ type, year, page = 1 }: Filters & { page?: number }) {
	const response = await get(baseUrl + moviesEndpoint, {
		params: {
			type: type ? typeMap[type] : undefined,
			yearFrom: year,
			yearTo: year,
			page,
		},
	})

	return response.data
}