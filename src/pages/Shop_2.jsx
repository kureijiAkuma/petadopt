
import { useEffect, useState } from "react"
import { Progress } from "@material-tailwind/react";
import Navbar from "../templates/Navbar"
import star from "../icons/star.svg"
import star_fill from "../icons/star_fill.svg"
import round_check from "../icons/round_check.svg"
import background from "../images/bg_2.jpg"
import dog_placeholder from "../images/dog_placeholder.png"
import shop_placeholder from "../images/shop_placeholder.png"
import bg_placeholder from "../images/signin_bg.png"
import dogtoy from "../images/dogtoy.jpg"
import dogtoy_2 from "../images/dogtoy_2.jpg"
export default function Shop_2(props) {
    const [quantity, changeQuantity] = useState(1);


    return (
        <div className="overflow-y-auto overflow-x-hidden bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />
            <div className="pt-24 flex w-screen flex-wrap gap-y-5">
                {/* Featured Images Section*/}
                <div className="flex justify-end items-start flex-wrap gap-5 w-6/12 h-fit  p-5">

                    <div className="basis-5/12 h-64 bg-red-50 shadow-custom border border-solid border-black ">
                        <img className="w-full h-full object-cover" src={dog_placeholder} alt="" />
                    </div>
                    <div className="basis-5/12 h-64 bg-red-50 shadow-custom border border-solid border-black">
                        <img className="w-full h-full object-cover" src={shop_placeholder} alt="" />
                    </div>
                    <div className="basis-5/12 h-64 bg-red-50 shadow-custom border border-solid border-black">
                        <img className="w-full h-full object-cover" src={dogtoy_2} alt="" />
                    </div>

                    <div className="basis-5/12 h-64 bg-red-50 shadow-custom border border-solid border-black">
                        <img className="w-full h-full object-cover" src={dogtoy} alt="" />
                    </div>

                </div>
                {/*Selection Box Area*/}
                <div className="flex justify-center w-6/12 h-fit p-5">
                    {/*Selection Box*/}
                    <div className="flex flex-wrap flex-col items-start gap-3 w-9/12 h-fit bg-red-100 p-10 border border-solid border-black shadow-custom">
                        <div className="flex justify-between w-full">
                            <h1 className="font-Roboto font-extrabold text-2xl">Jumbler Ball Dog Toy</h1>
                            <div className="flex justify-center items-center gap-2 w-fit">
                                <img className="w-8 h-8" src={round_check} alt="" />
                                <h2 className="font-Roboto font-semibold text-xl text-gray-800">In Stock</h2>
                            </div>

                        </div>
                        <div className="flex flex-wrap gap-5 justify-start items-center w-full">
                            <h2 className=" font-Roboto text-xl font-bold text-deep-orange-700">P300.00</h2>
                            <div className="flex gap-x-1">
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                            </div>
                            <h2 className="ml-auto font-Roboto text-xl text-gray-800 font-bold">200 available</h2>

                        </div>

                        <h2 className="mt-2 font-Roboto text-lg font-medium">Color</h2>
                        <div className="flex gap-1 flex-wrap">
                            <button className="flex justify-center items-center w-10 h-10 rounded-full bg-white border-solid border border-black ">
                                <div className="w-9 h-9 bg-black rounded-full"></div>
                            </button>
                            <button className="flex justify-center items-center w-10 h-10 rounded-full bg-white border-solid border border-black ">
                                <div className="w-9 h-9 bg-brown-600 rounded-full"></div>
                            </button>
                            <button className="flex justify-center items-center w-10 h-10 rounded-full bg-white border-solid border border-black ">
                                <div className="w-9 h-9 bg-blue-gray-500 rounded-full"></div>
                            </button>
                        </div>
                        <h2 className="mt-2 font-Roboto text-lg font-medium">Size</h2>
                        <div className="flex gap-1 flex-wrap">
                            <button className="w-fit h-fit px-5 bg-white border border-solid border-black text-center shadow-custom-2 active:bg-gray-400">
                                <h1 className="font-Roboto font-medium text-base">L</h1>
                            </button>
                            <button className="w-fit h-fit px-5 bg-white border border-solid border-black text-center shadow-custom-2 active:bg-gray-400">
                                <h1 className="font-Roboto font-medium text-base">M</h1>
                            </button>
                            <button className="w-fit h-fit px-5 bg-white border border-solid border-black text-center shadow-custom-2 active:bg-gray-400">
                                <h1 className="font-Roboto font-medium text-base">S</h1>
                            </button>
                        </div>
                        <h2 className="mt-2 font-Roboto text-lg font-medium">Quantity</h2>
                        <div className="flex flex-wrap w-fit h-fit gap-1">

                            <button onClick={() => changeQuantity(quantity > 1 ? quantity - 1 : 1)} className="w-fit h-fit px-5 bg-white border border-solid border-black text-center shadow-custom-2 active:bg-gray-400">
                                <h1 className="font-semibold">-</h1>
                            </button>

                            <input value={quantity} className="w-28 h-fit font-Roboto font-medium text-center bg-white border border-solid border-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-custom-2" />

                            <button onClick={() => changeQuantity(quantity + 1)} className="w-fit h-fit px-5 bg-white border border-solid border-black text-center shadow-custom-2 active:bg-gray-400">
                                <h1 className="font-semibold">+</h1>
                            </button>


                        </div>
                        <button className="mt-4 self-center border border-solid border-black w-1/2 p-2 font-Roboto font-semibold bg-pink-100 shadow-custom-2 active:bg-pink-200/50">Add to Cart</button>
                    </div>
                </div>
                {/*Description*/}
                <div className="m-auto w-10/12 py-5 px-8 bg-red-100 border border-solid border-black shadow-custom">
                    <h1 className="font-Roboto font-extrabold text-2xl">Description</h1>
                    <h2 className="font-Roboto font-normal text-base mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis obcaecati doloremque delectus ducimus repellendus distinctio, hic incidunt rerum similique, a maxime aut quidem saepe inventore aperiam illo tempore eos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit blanditiis qui aperiam? Facilis, impedit. Est officia dolores repudiandae, magnam sequi illo aperiam, fuga enim adipisci reiciendis distinctio eaque in. Aut. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime deserunt, soluta in, ipsum tempore veritatis voluptatibus, nesciunt saepe quas illum autem libero. Est amet quo ad officia, error incidunt rem!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis obcaecati doloremque delectus ducimus repellendus distinctio, hic incidunt rerum similique, a maxime aut quidem saepe inventore aperiam illo tempore eos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit blanditiis qui aperiam? Facilis, impedit. Est officia dolores repudiandae, magnam sequi illo aperiam, fuga enim adipisci reiciendis distinctio eaque in. Aut. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime deserunt, soluta in, ipsum tempore veritatis voluptatibus, nesciunt saepe quas illum autem libero. Est amet quo ad officia, error incidunt rem!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis obcaecati doloremque delectus ducimus repellendus distinctio, hic incidunt rerum similique, a maxime aut quidem saepe inventore aperiam illo tempore eos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit blanditiis qui aperiam? Facilis, impedit. Est officia dolores repudiandae, magnam sequi illo aperiam, fuga enim adipisci reiciendis distinctio eaque in. Aut. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime deserunt, soluta in, ipsum tempore veritatis voluptatibus, nesciunt saepe quas illum autem libero. Est amet quo ad officia, error incidunt rem!
                    </h2>
                </div>

                <div className="flex gap-5 flex-col justify-start w-7/12  p-5">
                    <h1 className="font-Roboto font-extrabold text-xl">Customer Reviews (243)</h1>
                    <div className="flex flex-col w-full h-fit py-8 px-10 gap-5 bg-red-100 border border-solid border-black shadow-custom">
                        <div className="flex gap-5">
                            <img className="w-20 h-20 rounded-full " src={dog_placeholder} alt="" />
                            <div className="flex flex-col justify-center items-start gap-1">
                                <h1 className="font-Roboto font-semibold text-lg">Kitcat2583</h1>
                                <h2 className="font-Roboto font-normal text-sm text-gray-800">18 August 2023</h2>
                                <div className="flex gap-x-1">
                                    <img src={star_fill} alt="" />
                                    <img src={star_fill} alt="" />
                                    <img src={star_fill} alt="" />
                                    <img src={star_fill} alt="" />
                                    <img src={star} alt="" />
                                </div>
                            </div>

                        </div>


                        <h2> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus.</h2>
                    
                    </div>
                    <div className="flex flex-col w-full h-fit py-8 px-10 gap-5 bg-red-100 border border-solid border-black shadow-custom">
                        <div className="flex gap-5">
                            <img className="w-20 h-20 rounded-full " src={dog_placeholder} alt="" />
                            <div className="flex flex-col justify-center items-start gap-1">
                                <h1 className="font-Roboto font-semibold text-lg">Kitcat2583</h1>
                                <h2 className="font-Roboto font-normal text-sm text-gray-800">18 August 2023</h2>
                                <div className="flex gap-x-1">
                                    <img src={star_fill} alt="" />
                                    <img src={star_fill} alt="" />
                                    <img src={star_fill} alt="" />
                                    <img src={star_fill} alt="" />
                                    <img src={star} alt="" />
                                </div>
                            </div>

                        </div>


                        <h2> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus.</h2>
                    
                    </div>
                </div>

                {/* Rating Section*/}
                <div className="flex flex-col justify-start items-center w-5/12  p-5">
                    {/* Rating Box*/}
                    <div className="flex flex-col w-11/12 py-5 px-8 bg-red-100 border border-solid border-black shadow-custom gap-5">
                        <h1 className="font-Roboto font-extrabold text-2xl">Overall Rating</h1>
                        <div className="flex justify-center items-center gap-2">
                            <img className="w-10 h-10" src={star_fill} alt="" />
                            <h1 className="font-Roboto font-extrabold text-5xl">4.5</h1>
                            <div className="flex flex-col">
                                <h2 className=" font-Roboto text-base font-medium">238 out of 243 (95%)</h2>
                                <h2 className=" font-Roboto text-base font-medium text-gray-800">Customers recommend this product</h2>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-start items-center gap-2">
                                <img src={star_fill} alt="" />
                                <h2 className="font-Roboto font-medium">5</h2>
                                <Progress className="w-80 bg-gray-500" value={70} />
                                <h2 className="font-Roboto font-medium">198</h2>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <img src={star_fill} alt="" />
                                <h2 className="font-Roboto font-medium">4</h2>
                                <Progress className="w-80 bg-gray-500" value={48} />
                                <h2 className="font-Roboto font-medium">198</h2>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <img src={star_fill} alt="" />
                                <h2 className="font-Roboto font-medium">3</h2>
                                <Progress className="w-80 bg-gray-500" value={25} />
                                <h2 className="font-Roboto font-medium">198</h2>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <img src={star_fill} alt="" />
                                <h2 className="font-Roboto font-medium">2</h2>
                                <Progress className="w-80 bg-gray-500" value={0} />
                                <h2 className="font-Roboto font-medium">198</h2>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <img src={star_fill} alt="" />
                                <h2 className="font-Roboto font-medium">1</h2>
                                <Progress className="w-80 bg-gray-500" value={5} />
                                <h2 className="font-Roboto font-medium">198</h2>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-start items-center">
                            <div className="flex justify-start items-center gap-2">
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <h1 className="font-Roboto font-extrabold text-base">Review this product</h1>
                                    <h2 className="font-Roboto font-normal text-sm text-gray-800">Share your thoughts with other customers</h2>
                                </div>
                            </div>
                            <button className="py-2 px-3 w-fit h-fit border border-solid border-black text-base font-Roboto font-bold bg-pink-100 shadow-custom-2 active:bg-pink-200/50">Write a review</button>
                        </div>



                    </div>

                </div>

            </div>

        </div>


    )
}