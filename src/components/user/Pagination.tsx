interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
    const renderPaginationButtons = () => {
        const buttons = [];
        const showEllipsis = totalPages > 5;

        if (showEllipsis) {
            // Always show first page
            buttons.push(
                <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${currentPage === 1
                            ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    1
                </button>
            );

            // Show ellipsis or number
            if (currentPage > 3) {
                buttons.push(
                    <span key="ellipsis-1" className="px-2 py-1">
                        ...
                    </span>
                );
            }

            // Show current page and neighbors
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${currentPage === i
                                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {i}
                    </button>
                );
            }

            // Show ellipsis or number
            if (currentPage < totalPages - 2) {
                buttons.push(
                    <span key="ellipsis-2" className="px-2 py-1">
                        ...
                    </span>
                );
            }

            // Always show last page
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${currentPage === totalPages
                            ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    {totalPages}
                </button>
            );
        } else {
            // If less than 6 pages, show all numbers
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${currentPage === i
                                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {i}
                    </button>
                );
            }
        }

        return buttons;
    };

    return (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
            {renderPaginationButtons()}
        </div>
    );
}