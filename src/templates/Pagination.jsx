import React, { useEffect, useState } from "react";
import pawright from "../icons/paw-right.svg";
import pawleft from "../icons/paw-left.svg";

const Pagination = ({
    filteredPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    // State to hold the total number of pages
    const [totalPages, setTotalPages] = useState(1);

    // Update total number of pages whenever filteredPosts changes
    useEffect(() => {
        const totalPagesCount = Math.ceil(filteredPosts.length / postsPerPage);
        setTotalPages(totalPagesCount);
    }, [filteredPosts, postsPerPage]);

    // Function to handle next page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Array to store page numbers
    let pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    // Display fewer page numbers if total pages is greater than 6
    if (totalPages > 6) {
        if (currentPage <= 4) {
            pages = pages.slice(0, 5);
        } else if (currentPage >= totalPages - 3) {
            pages = pages.slice(totalPages - 5);
        } else {
            pages = pages.slice(currentPage - 3, currentPage + 2);
        }
    }

    return (
        <div className="w-fit h-fit p-1 flex bg-pink-100/50 rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
            <button
                onClick={prevPage}
                className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50"
                disabled={currentPage === 1} // Disable button if already on the first page
            >
                <img className="w-96" src={pawleft} alt="" />
            </button>
            {currentPage > 4 && totalPages > 6 && (
                <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={
                        currentPage === 1
                            ? "mx-1 flex justify-center items-center size-9 p-1.5 bg-red-200 rounded-full border-solid border border-gray-400"
                            : "mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50 "
                    }
                >
                    1
                </button>
            )}
            {currentPage > 4 && totalPages > 6 && <span className="mx-1">...</span>}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={
                        page === currentPage
                            ? "mx-1 flex justify-center items-center size-9 p-1.5 bg-red-200 rounded-full border-solid border border-gray-400"
                            : "mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50 "
                    }
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages - 3 && totalPages > 6 && <span className="mx-1">...</span>}
            {currentPage < totalPages - 3 && totalPages > 6 && (
                <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={
                        currentPage === totalPages
                            ? "mx-1 flex justify-center items-center size-9 p-1.5 bg-red-200 rounded-full border-solid border border-gray-400"
                            : "mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50 "
                    }
                >
                    {totalPages}
                </button>
            )}
            <button
                onClick={nextPage}
                className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50"
                disabled={currentPage === totalPages} // Disable button if already on the last page
            >
                <img className="w-96" src={pawright} alt="" />
            </button>
        </div>
    );
};

export default Pagination;
