import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from 'prop-types';

const getButtonClass = (isDisabled) => {
    const disabledClass = 'bg-gray-300 cursor-not-allowed';
    const activeClass = 'bg-presloviny-blue text-white hover:bg-presloviny-gold';

    return isDisabled ? disabledClass : activeClass;
};

const Pagination = React.memo(({ page, totalPages, setPage }) => {
    return (
        <div className="flex gap-4 py-5 w-full items-center justify-end">
            <button
                onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-1 rounded-md ${getButtonClass(page === 1)}`}
                aria-label="Previous Page"
            >
                <IoIosArrowBack />
            </button>
            <p className="text-lg font-semibold dark:text-zinc-200" aria-live="polite">
                {page} / {totalPages}
            </p>
            <button
                onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-4 py-1 rounded-md ${getButtonClass(page === totalPages)}`}
                aria-label="Next Page"
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
});

Pagination.displayName = "Pagination";

export default Pagination;
