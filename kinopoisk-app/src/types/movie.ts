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