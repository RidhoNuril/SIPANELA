import { useState, useMemo } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table';
import Icon from './Icon';

export default function DataTable({
	data,
	columns,
	searchPlaceholder,
	pageSizeOptions = [],
	initialPageSize = 5,
	emptyMessage = 'Tidak ada data yang ditemukan.',
	infoLabel = 'data'
}) {
	const [globalFilter, setGlobalFilter] = useState('');
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: initialPageSize,
	});

	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
			pagination,
		},
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const totalRows = table.getFilteredRowModel().rows.length;
    const pageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    
    const visiblePageNumbers = useMemo(() => {
        
        if (pageCount <= 4) {
            return Array.from({ length: pageCount }, (_, i) => i);
        }

        if (pageIndex < 3) {
            return [0, 1, 2, pageCount - 1];
        } 
        
        const start = Math.max(1, Math.min(pageIndex - 2, pageCount - 4));
        return [start, start + 1, start + 2, pageCount - 1];
    // Ubah dependensi dari [ table, pageIndex, totalRows] menjadi [pageCount, pageIndex]
    }, [pageCount, pageIndex]);

	return (
		<>
			{/* Filter Controls Bar */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

				{/* Tampilkan Dropdown */}
				{pageSizeOptions.length > 0 && (
					<div className="flex items-center space-x-3 text-sm text-gray-500 mb-5">
						<span>Tampilkan:</span>
						<select
							value={table.getState().pagination.pageSize}
							onChange={(e) => {
								table.setPageSize(Number(e.target.value));
								table.setPageIndex(0); // Reset ke halaman pertama agar langsung menyesuaikan
							}}
							className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:border-[#0B3C65] bg-white"
						>
							{pageSizeOptions.map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
					</div>
				)}

				{/* Search Input */}
				{searchPlaceholder && (
					<div className="relative w-full md:w-80 mb-5">
						<span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
							<Icon name="search" className="text-sm" />
						</span>
						<input
							type="text"
							placeholder={searchPlaceholder}
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0B3C65] transition-colors"
						/>
					</div>
				)}
			</div>
			<div className="bg-white rounded-2xl border border-gray-100 shadow-xs max-w-screen overflow-auto">

				{/* Table Container */}
				<table className="w-full text-left border-collapse">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400 tracking-wider">
								{headerGroup.headers.map((header) => {
									const headerValue = header.column.columnDef.header;

									// Cek kondisi: jika header kosong (''), jangan tampilkan th
									if (headerValue === '') {
										return null;
									}

									return (
										<th key={header.id} className="p-4 text-xs font-bold text-slate-600">
											{flexRender(headerValue, header.getContext())}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-100 text-sm">
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="py-4 px-5">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td colSpan={columns.length} className="py-8 text-center text-gray-400 text-sm">
									{emptyMessage}
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{/* Pagination Footer */}
				<div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 gap-4">
					<p className="text-xs text-gray-500">
						Menampilkan {totalRows > 0 ? pageIndex * table.getState().pagination.pageSize + 1 : 0}–{' '}
                        {Math.min((pageIndex + 1) * table.getState().pagination.pageSize, totalRows)}{' '}
                        dari {totalRows} {infoLabel}
					</p>

					<div className="flex items-center space-x-1.5">
						<button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
						>
							<Icon name="chevron-left" className="text-xs" />
						</button>
						{ visiblePageNumbers.map((page, index) => (
                            <div key={page}>
                                {index >= 0 && page - visiblePageNumbers[index - 1] > 1 && <span className="text-slate-400 mr-2">…</span>}
                                <button
                                    type="button"
                                    onClick={() => table.setPageIndex(page)}
                                    aria-current={pageIndex === page ? 'page' : undefined}
                                    className={`min-w-8 cursor-pointer rounded-lg border text-[12px] px-2 py-1.5 transition-colors disabled:opacity-40 ${pageIndex === page ? 'border-[#0B3C65] bg-[#0B3C65] text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}
                                >
                                    {page + 1}
                                </button>
                            </div>
                        ))}
						<button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
						>
							<Icon name="chevron-right" className="text-xs" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
