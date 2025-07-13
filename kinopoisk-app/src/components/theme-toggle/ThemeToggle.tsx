import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(false)

	// сразу синхронизация стейт с localStorage
	useEffect(() => {
		setIsDark(localStorage.getItem('theme') === 'dark')
	}, [])

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark)
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
	}, [isDark])

	function handleToggleTheme() {
		setIsDark((dark) => !dark)
	}

	return (
		<button
			className="text-gray-300 p-2 rounded focus:outline-none focus:ring"
			onClick={handleToggleTheme}
		>
			{isDark ? <Sun size={20} /> : <Moon size={20} />}
		</button>
	)
}