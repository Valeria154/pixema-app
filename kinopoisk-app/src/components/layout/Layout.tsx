import { Outlet } from 'react-router'
import { Header } from '../header/Header'
import { NavBar } from '../nav-bar/NavBar'
import { Container } from '../container/Container'
import { Footer } from '../footer/Footer'

export function Layout() {
	return (
		<div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
			<Header />
			<main className="flex flex-1 max-w-screen-xl mx-auto">
				<aside className="hidden lg:block w-64 p-4">
					<NavBar vertical />
				</aside>
				<section className="flex-1 p-4">
					<Container>
						<Outlet />
					</Container>
				</section>
			</main>
			<Footer />
		</div>
	)
}