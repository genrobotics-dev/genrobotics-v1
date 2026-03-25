

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-24 flex justify-center items-center gap-3 md:gap-6">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="text-zinc-500 hover:text-yellow-400 disabled:opacity-20 flex items-center gap-1 md:gap-2 transition-all font-medium uppercase text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] cursor-pointer whitespace-nowrap"
            >
                <span className="text-base md:text-lg">←</span>
                <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center gap-1.5 md:gap-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        aria-label={`Go to page ${page}`}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 border text-xs md:text-sm ${currentPage === page
                            ? "bg-yellow-400 border-yellow-300 text-black font-bold scale-105 md:scale-110 shadow-[0_0_15px_rgba(250,204,21,0.2)] md:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                            : "bg-transparent border-zinc-800 text-zinc-500 hover:border-yellow-400/50 hover:text-white"
                            } cursor-pointer `}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="text-zinc-500 hover:text-yellow-400 disabled:opacity-20 flex items-center gap-1 md:gap-2 transition-all font-medium uppercase text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] cursor-pointer whitespace-nowrap"
            >
                <span className="hidden sm:inline">Next</span>
                <span className="text-base md:text-lg">→</span>
            </button>
        </div>
    );
};

export default Pagination;
