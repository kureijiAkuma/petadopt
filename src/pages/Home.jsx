import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../templates/Navbar";
import background from "../images/bg_1.jpg"
import leftarrow from "../icons/left-arrow.svg"
import cat from "../images/cat_peek.png"
import dog from "../images/dog_1.png"


export default function Home() {
    return (
        <div className="relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />

            
            <div className=" flex w-screen h-full ">

                <div className=" flex flex-col justify-between items-center w-5/12 h-full">
                    <div className=" w-9/12 mt-24">
                    
                        <h1 className=" font-Familjen_Grotesk font-semibold text-6xl text-black">Get your family a new member.</h1>
                        <h2 className=" font-Roboto text-2xl mt-2 text-black">Open your doors and hearts to pets in need of a home and it will be thankful to you for the rest of their lives.</h2>

                    </div>

                    <NavLink to="/adopt" className="mt-5 self-center flex justify-center items-center w-40 h-12 bg-white rounded-full shadow-md shadow-zinc-950/50 hover:bg-red-200/50 active:bg-red-200">
                        <h2 className="font-Familjen_Grotesk font-semibold text-xl text-black">ADOPT</h2>
                        <img className="w-8 ml-2" src={leftarrow} alt="" />
                    </NavLink>

                    <img className="w-96 h-36 self-start" src={cat} alt="" />

                </div>

                <div className=" flex justify-end items-center w-7/12 h-full ">
                    <img className="absolute mb-20 w-1/2 h-1/2" src={dog} alt="" />
                    <div className=" flex justify-around items-center w-11/12 h-44 bg-white bg-opacity-70 z-10 mt-44 ml-auto rounded-l-3xl shadow-md shadow-zinc-950/50">
                        <div className="text-center">
                            <h1 className="mb-4 font font-Roboto font-bold text-3xl text-black">544</h1>
                            <h2 className="font-Roboto font-semibold text-zinc-600 text-black">Waiting for home</h2>
                        </div>
                        <div className="text-center">
                            <h1 className="mb-4 font font-Roboto font-bold text-3xl text-black">756</h1>
                            <h2 className="font-Roboto font-semibold text-zinc-600 text-black">Adopted last year</h2>
                        </div>
                        <div className="text-center">
                            <h1 className="mb-4 font-Roboto font-bold text-3xl text-black">422</h1>
                            <h2 className="font-Roboto font-semibold text-zinc-600 text-black">Rescued</h2>
                        </div>
                    </div>
                </div>

            </div>


        </div>


    )

}
