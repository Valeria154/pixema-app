//Movies
export interface MovieType {
	kinopoiskId: number
	ratingImdb?: number
	filmLength?: number
	nameRu?: string
	nameEn: string
	posterUrl?: string
	posterUrlPreview: string
	ratingKinopoisk: number
	genres: { genre: string }[]
	year: number
	countries: { country: string }[]
	description?: string
	ratingAgeLimits?: string
	query: string
}

export interface MoviesListResponse {
	totalPages: number
	items: MovieType[]
}

export interface SearchResponse {
	totalPages: number
	films: MovieType[]
}

export interface SearchState {
	results: MovieType[]
	totalPages: number
	isLoading: boolean
	error: string | null
}

//Movies-slice
export type MovieFilterType = 'movie' | 'series' | 'episode' | 'game'

export interface Filters {
	type?: MovieFilterType
	year?: number
	page?: number
}

export interface MovieState {
	list: MovieType[]
	totalPages: number
	current: MovieType | null
	isLoading: boolean
	error: string | null
	search: SearchState
	items: MovieType[]
	filters: Filters
}
//Footer
export type FooterProps = {
	appName?: string
	className?: string
}