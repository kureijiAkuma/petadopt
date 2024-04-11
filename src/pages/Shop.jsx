import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../templates/Navbar";
import background from "../images/bg_2.jpg"
import catpeek from "../images/cat_peek.png"
import data from "../lists/items_shop.js"
import Shopcardlist from "../templates/Shopcardlist"
import Pagination from "../templates/Pagination"


export default function Shop() {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    return (
        <div div className="h-screen overflow-y-auto overflow-x-hidden bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />
            <div className="relative pt-20 flex justify-start w-full h-screen">

                <div className="h-full flex flex-col w-3/12 justify-between items-center ">

                    <div className=" pt-6 w-full flex flex-col justify-center items-center gap-5">

                        <div className="w-3/4 bg-pink-50 shadow-md shadow-zinc-950/50 border border-solid border-black/20 hover:bg-red-100  hover:cursor-pointer py-2 px-5 font-normal text-base text-gray-700">
                            <h1 className="font-semibold text-base">Sort Latest</h1>
                        </div>

                        <div className="p-5 pb-6 w-3/4 font-Roboto bg-pink-50 shadow-md shadow-zinc-950 border border-solid border-black/20">
                            <h1 className=" pb-2 border-b border-b-gray-700 font-semibold text-lg text-gray-700">PRODUCT CATEGORIES</h1>
                            <ul >
                                <li className=" hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700">Accessories</li>
                                <li className=" hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700">Pet Foods</li>
                                <li className=" hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700">Medicines</li>
                                <li className=" hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700">Toys</li>
                            </ul>
                        </div>

                    </div>


                    <img className="w-10/12 min-h-24 " src={catpeek} alt="" />

                </div>
                <div className="py-6 flex justify-start flex-wrap gap-x-4 gap-y-7 overflow-y-auto max-h-full w-9/12 ">
                    <Shopcardlist shopData={currentPosts} />


                    <div className="flex justify-center basis-full ">
                        <Pagination
                            totalPosts={data.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />

                    </div>

                </div>
            </div>
        </div>
    )
}