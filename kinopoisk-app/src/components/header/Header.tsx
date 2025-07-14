import { Link } from 'react-router'
import logo from '../../assets/pixema-logo.png'
import { SearchBar } from '../search-bar/SearchBar'
import { ThemeToggle } from '../theme-toggle/ThemeToggle'
import { BurgerMenu } from '../burger-menu/BurgerMenu'

interface HeaderProps {
	onSearch?: (query: string) => void
	userName?: string
	avatarUrl?: string
}

export function Header() {
	return (
		<header className="bg-gray-950 sticky top-0 z-50 shadow-md">
			<div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto px-4">
				<BurgerMenu />

				<Link to="/">
					<img src={logo} alt="Pixema Logo" className="h-8 w-auto" />
				</Link>
				<SearchBar />
				<ThemeToggle />
			</div>
		</header >
	)
}