import React from "react";


const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }


    return (
        
            <div className='w-fit h-fit p-1 flex bg-pink-100/50 rounded-full border-solid border border-gray-400 shadow-md shadow-black/50'>
                {pages.map((page, index) => {
                    return (
                        <button key={index} onClick={() => setCurrentPage(page)}
                            className={page == currentPage ? "mx-1 flex justify-center items-center size-9 p-1.5 bg-red-200 rounded-full border-solid border border-gray-400" : "mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50 "}>
                            {page}
                        </button>
                    );
                })}
            </div>
        
    );
};

export default Pagination;