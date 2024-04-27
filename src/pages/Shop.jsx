import React from "react";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { DB } from "../firebase"
import Navbar from "../templates/Navbar";
import background from "../images/bg_2.jpg"
import catpeek from "../images/cat_peek.png"
import Shopcardlist from "../templates/Shopcardlist"
import Pagination from "../templates/Pagination"
import { GetProduct } from "../API/GetItems";



export default function Shop() {

    const [list, setList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(DB, "shopitems"));
            const productList = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    docid: doc.id
                };
            });
            setList(productList);
            console.log("List", list)
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };


    // Call the API when component mounts.
    useEffect(() => {
        fetchData();
    }, []);

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Filter the posts based on selected categories
    const filteredPosts = list.filter((post) =>
        selectedCategories.length === 0 || selectedCategories.some((category) => post.category === category)
    );



    // Number of posts per page
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);


    return (
        <div div className="h-screen overflow-y-auto overflow-x-hidden bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />
            <div className="relative pt-20 flex justify-start w-full h-screen">

                <div className="h-full flex flex-col w-3/12 justify-between items-center ">

                    <div className=" pt-6 w-full flex flex-col justify-center items-center gap-5">

                        {/*<div className="w-3/4 bg-pink-50 shadow-md shadow-zinc-950/50 border border-solid border-black/20 hover:bg-red-100  hover:cursor-pointer py-2 px-5 font-normal text-base text-gray-700">
                            <h1 className="font-semibold text-base">Sort by latest</h1>
                        </div>*/}

                        <div className="p-5 pb-6 w-3/4 font-Roboto bg-pink-50 shadow-md shadow-zinc-950 border border-solid border-black/20">
                            <h1 className=" pb-2 border-b border-b-gray-700 font-semibold text-lg text-gray-700">
                                PRODUCT CATEGORIES
                            </h1>
                            <ul>
                                <li
                                    className={`flex justify-between hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700 ${selectedCategories.includes("Accessories") ? "bg-gray-300" : ""
                                        }`}
                                    onClick={() => handleCategoryClick("Accessories")}
                                >
                                    Accessories{" "}
                                    <input
                                        className="cursor-pointer"
                                        value="Accessories"
                                        type="checkbox"
                                        checked={selectedCategories.includes("Accessories")}
                                        onChange={() => { }}
                                    />
                                </li>
                                <li
                                    className={`flex justify-between hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700 ${selectedCategories.includes("Pet Foods") ? "bg-gray-300" : ""
                                        }`}
                                    onClick={() => handleCategoryClick("Pet Foods")}
                                >
                                    Pet Foods{" "}
                                    <input
                                        className="cursor-pointer"
                                        value="Pet Foods"
                                        type="checkbox"
                                        checked={selectedCategories.includes("Pet Foods")}
                                        onChange={() => { }}
                                    />
                                </li>
                                <li
                                    className={`flex justify-between hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700 ${selectedCategories.includes("Medicines") ? "bg-gray-300" : ""
                                        }`}
                                    onClick={() => handleCategoryClick("Medicines")}
                                >
                                    Medicines{" "}
                                    <input
                                        className="cursor-pointer"
                                        value="Medicines"
                                        type="checkbox"
                                        checked={selectedCategories.includes("Medicines")}
                                        onChange={() => { }}
                                    />
                                </li>
                                <li
                                    className={`flex justify-between hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700 ${selectedCategories.includes("Hygiene") ? "bg-gray-300" : ""
                                        }`}
                                    onClick={() => handleCategoryClick("Hygiene")}
                                >
                                    Hygiene{" "}
                                    <input
                                        className="cursor-pointer"
                                        value="Hygiene"
                                        type="checkbox"
                                        checked={selectedCategories.includes("Hygiene")}
                                        onChange={() => { }}
                                    />
                                </li>
                                <li
                                    className={`flex justify-between hover:bg-red-100 hover:rounded-md hover:shadow-md shadow-black/50 hover:cursor-pointer px-2 py-2 border-b border-b-gray-700 font-normal text-base text-gray-700 ${selectedCategories.includes("Toys") ? "bg-gray-300" : ""
                                        }`}
                                    onClick={() => handleCategoryClick("Toys")}
                                >
                                    Toys{" "}
                                    <input
                                        className="cursor-pointer"
                                        value="Toys"
                                        type="checkbox"
                                        checked={selectedCategories.includes("Toys")}
                                        onChange={() => { }}
                                    />
                                </li>
                            </ul>
                        </div>

                    </div>


                    <img className="w-10/12 min-h-24 " src={catpeek} alt="" />

                </div>
                <div className="py-6 flex justify-start flex-wrap gap-x-4 gap-y-7 overflow-y-auto max-h-full w-9/12 ">
                    <Shopcardlist shopData={currentPosts} />


                    <div className="flex justify-center basis-full ">
                        <Pagination
                            totalPosts={list.length}
                            filteredPosts={filteredPosts} // Pass filteredPosts here
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