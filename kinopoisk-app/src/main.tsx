import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

	// ставим класс dark/light на <html> до монтирования React
	; (() => {
		const theme = localStorage.getItem('theme')
		document.documentElement.classList.toggle('dark', theme === 'dark')
	})()

const rootElement: HTMLElement | null = document.querySelector('#root')

if (!rootElement) {
	throw new Error('Root element not found')
}

const root = createRoot(rootElement)

const app: React.ReactElement = <App />
root.render(app)