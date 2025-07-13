import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { requestMovieList, requestMovie, requestSearchMovies } from '../services/movies'
import type { MovieType, MoviesListResponse, SearchState } from '../types/movie'

interface MovieState {
	list: MovieType[]
	totalPages: number
	current: MovieType | null
	isLoading: boolean
	error: string | null
	search: SearchState
}

const initialSearchState: SearchState = {
	results: [],
	totalPages: 1,
	isLoading: false,
	error: null,
}

const initialState: MovieState = {
	list: [],
	totalPages: 1,
	current: null,
	isLoading: false,
	error: null,
	search: initialSearchState,
}

export const fetchMovieList = createAsyncThunk<MoviesListResponse, number, { rejectValue: string }>(
	'movie/fetchList',
	async (page, { rejectWithValue }) => {
		try {
			const data = await requestMovieList(page)
			return data || []
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const fetchMovieById = createAsyncThunk<MovieType, string, { rejectValue: string }>(
	'movie/fetchById',
	async (id, { rejectWithValue }) => {
		try {
			const data = await requestMovie(id)
			return data!
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const fetchMovieSearch = createAsyncThunk<
	{ items: MovieType[]; totalPages: number },
	{ query: string; page: number },
	{ rejectValue: string }
>
	(
		'movie/fetchSearch',
		async ({ query, page }, { rejectWithValue }) => {
			try {
				return await requestSearchMovies(query, page)
			} catch (error: any) {
				return rejectWithValue(error.message)
			}
		}
	)

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovieList.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchMovieList.rejected, (state, action) => {
				state.error = action.payload ?? action.error.message ?? null
				state.isLoading = false
			})
			.addCase(fetchMovieList.fulfilled, (state, action: PayloadAction<MoviesListResponse>) => {
				state.list = action.payload.items
				state.totalPages = action.payload.totalPages
				state.isLoading = false
			})
			.addCase(fetchMovieById.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchMovieById.rejected, (state, action) => {
				state.error = action.payload ?? action.error.message ?? null
				state.isLoading = false
			})
			.addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<MovieType>) => {
				state.current = action.payload
				state.isLoading = false
			})
			.addCase(fetchMovieSearch.pending, (state) => {
				state.search.isLoading = true
				state.search.error = null
			})
			.addCase(fetchMovieSearch.rejected, (state, action) => {
				state.search.isLoading = false
				state.search.error = action.payload ?? action.error.message ?? null
			})
			.addCase(
				fetchMovieSearch.fulfilled, (state, action: PayloadAction<{ items: MovieType[]; totalPages: number }>) => {
					state.search.isLoading = false
					state.search.results = action.payload.items
					state.search.totalPages = action.payload.totalPages
				}
			)

	}
})

export const movieReducer = movieSlice.reducer