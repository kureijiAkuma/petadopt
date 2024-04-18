import React from "react";
import { useEffect, useState } from "react";
import Adoptcardlist from "../templates/Adoptcardlist"
import Pagination from "../templates/Pagination"
import Navbar from "../templates/Navbar";
import Dropdown from "../templates/Dropdown"
import background from "../images/bg_2.jpg"
import dogfilter from "../images/dog_filter.png"
import dogpeek from "../images/dog_peek.png"
import data from "../lists/dogs";


export default function Shop() {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);


    return (
        <div div className="h-screen overflow-y-auto overflow-x-hidden bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />
            <div className="relative pt-20 flex justify-start w-full">
                {/*Sorting Side */}
                <div className=" w-3/12 h-fit pt-5">
                    <div className="fixed w-fit h-fit flex flex-col justify-start items-center gap-4">
                        <div className="flex flex-col items-center justify-start  gap-3">
                            <img className="" src={dogfilter} alt="" />
                            <button className="w-6 h-6 rounded-full bg-deep-orange-600">
                                <svg className=" mx-auto mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                        </div>

                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="font-Roboto font-medium text-base">BREED</h1>
                            <Dropdown />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="font-Roboto font-medium text-base">GENDER</h1>
                            <Dropdown />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="font-Roboto font-medium text-base">AGE</h1>
                            <Dropdown />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="font-Roboto font-medium text-base">COLOR</h1>
                            <Dropdown />
                        </div>
                        <img className="w-6/12 min-h-24 " src={dogpeek} alt="" />
                    </div>


                </div>
                {/*Cards Side */}
                <div className="relative py-6 flex justify-start flex-wrap gap-y-16 overflow-y-auto max-h-full w-9/12 ">
                    <Adoptcardlist adoptData={currentPosts} />

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