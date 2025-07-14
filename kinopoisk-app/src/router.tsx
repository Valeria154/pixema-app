import { Layout } from './components/layout/Layout'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'
import { Home } from './pages/Home'
import { MoviePage } from './pages/MoviePage'
import { FavoritePage } from './pages/FavoritePage'
import { SearchPage } from './pages/SearchPage'

const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Navigate to="/movies/all/1" replace />,
			},
			{
				path: '/movies',
				children: [
					{
						path: '/movies/all/:currentPage',
						element: <Home />,
					},
					{
						path: '/movies/filtered/:currentPage',
						element: <Home />
					},
					{
						path: '/movies/favorite/:currentPage',
						element: <FavoritePage />
					},
					{
						path: '/movies/search/:query/:currentPage',
						element: <SearchPage />
					},
				]
			},
			{
				path: '/favorites',
				element: <Navigate to="/movies/favorite/1" />,
			},
			{
				path: '/movie/:id',
				element: <MoviePage />,
			},
		],
	},
]

export const router = createBrowserRouter(routes)