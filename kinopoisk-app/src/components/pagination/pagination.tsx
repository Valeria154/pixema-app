import type { FC } from 'react'
import { buildSchemePagination } from '../../utils/buildPagination'
import { Link } from 'react-router'

interface PaginationProps {
	currentPage: number
	totalPages?: number
	basePath: string
}

export const Pagination: FC<PaginationProps> = ({ currentPage, basePath }) => {
	const prevPage = currentPage > 1 ? currentPage - 1 : null
	const nextPage = currentPage + 1

	return (
		<div className="flex justify-center items-center gap-4 mt-6">
			{prevPage ? (
				<Link
					to={`${basePath}/${prevPage}`}
					className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
				>
					← Prev
				</Link>
			) : (
				<span className="px-3 py-1 text-gray-400">← Prev</span>
			)}

			<span className="px-4 py-1 font-medium">
				Page {currentPage}
			</span>

			<Link
				to={`${basePath}/${nextPage}`}
				className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
			>
				Next →
			</Link>
		</div>
	)
}
// export function renderPagination() {
// 	const pageCount = Math.ceil(total / perPage)
// 	const pagination = buildSchemePagination

// 	return (
// 		<div>
// 			{renderPagination()}
// 		</div>
// 	)
// }