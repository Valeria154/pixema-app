export function Footer() {
	const appName = 'Pixema App'

	return (
		<footer className="bg-gray-100 dark:bg-gray-900 text-center p-6 text-gray-700 dark:text-gray-300">
			© All Rights Reserved {new Date().getFullYear()} — {appName}
		</footer>
	)
}