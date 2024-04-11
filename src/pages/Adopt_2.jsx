import Navbar from "../templates/Navbar"
import background from "../images/bg_2.jpg"
import placeholder from "../images/dog_peek.png"
import placeholder2 from "../images/dog_1.png"
import placeholder3 from "../images/dog_placeholder.png"
import placeholder4 from "../images/shop_placeholder.png"
import placeholder5 from "../images/bg_2.jpg"
import { Carousel } from "@material-tailwind/react";

export default function Adopt_2() {
    return (
        <div className="bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />
            <div className="pt-48 flex w-full h-5/6 ">

                <div className="flex flex-col justify-center items-center w-5/12  ">
                    <div className="flex flex-col justify-center items-center w-fit h-fit bg-red-100 rounded-3xl p-3 shadow-custom border border-solid border-black">
                        <Carousel className="h-52 w-96 rounded-t-3xl border-solid border border-gray-700/70 bg-white shadow-custom-2">
                            <img className="h-full w-full object-cover" src={placeholder} alt="" />
                            <img className="h-full w-full object-cover" src={placeholder2} alt="" />
                            <img className="h-full w-full object-cover" src={placeholder3} alt="" />
                            <img className="h-full w-full object-cover" src={placeholder4} alt="" />
                            <img className="h-full w-full object-cover" src={placeholder5} alt="" />
                        </Carousel>
                        <div className="flex flex-col justify-around items-start w-96 py-4 gap-y-4 max-h-full">
                            <h1 className=" m-0 font-Roboto font-semibold text-xl">Name (Breed)</h1>
                            <div className="flex justify-center items-start gap-3 flex-wrap m-0">

                                <div className="flex flex-col justify-center items-center w-28 h-14 bg-white rounded-md border border-solid border-black shadow-custom-2">
                                    <h1 className="font-Roboto font-normal text-sm">Gender</h1>
                                    <h1 className="font-Roboto font-semibold text-base">Male</h1>
                                </div>

                                <div className="flex flex-col justify-center items-center w-28 h-14 bg-white rounded-md border border-solid border-black shadow-custom-2">
                                    <h1 className="font-Roboto font-normal text-sm">Age</h1>
                                    <h1 className="font-Roboto font-semibold text-base">3 Years</h1>
                                </div>

                                <div className="flex flex-col justify-center items-center w-28 h-14 bg-white rounded-md border border-solid border-black shadow-custom-2">
                                    <h1 className="font-Roboto font-normal text-sm">Color</h1>
                                    <h1 className="font-Roboto font-semibold text-base">Gray/Black</h1>
                                </div>

                                <div className="flex flex-col justify-center items-center w-28 h-14 bg-white rounded-md border border-solid border-black shadow-custom-2">
                                    <h1 className="font-Roboto font-normal text-sm">Birthdate</h1>
                                    <h1 className="font-Roboto font-semibold text-base">1/1/2000</h1>
                                </div>

                                <div className="flex flex-col justify-center items-center w-28 h-14 bg-white rounded-md border border-solid border-black shadow-custom-2">
                                    <h1 className="font-Roboto font-normal text-sm">Vaccinated</h1>
                                    <h1 className="font-Roboto font-semibold text-base">Yes</h1>
                                </div>
                            </div>

                        </div>
                        <button className="mt-1 mb-2 w-32 h-14 bg-green-500 rounded-md border border-solid border-black shadow-custom-2 active:bg-green-600">
                            <h1 className="font-Roboto font-semibold tracking-wide">ADOPT</h1>
                        </button>


                    </div>


                </div>
                <div className="flex flex-col justify-center items-center gap-5  w-7/12 h-full">
                    <div className="flex flex-col h-fit max-h-80 w-11/12 py-5 px-7 gap-2 rounded-3xl bg-red-100 border border-solid border-black shadow-custom-2">

                        <div className="flex justify-start items-center gap-2">
                            <img className="w-12 h-12 border-solid border border-black/80 rounded-full object-cover shadow-custom-2" src={placeholder} alt="" />
                            <h1 className="font-Roboto text-lg font-semibold">Petsland</h1>
                        </div>

                        <div className="flex justify-start items-start h-fit max-h-56 w-full ">
                            <h1 className="font-Roboto text-justify max-h-full overflow-y-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra a dui vel tincidunt.
                                Quisque ac consectetur diam, vitae tempus libero. Quisque non arcu volutpat, auctor enim sit amet, pulvinar justo.
                                Praesent vestibulum nisl placerat sem pulvinar, nec commodo erat pulvinar.
                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti.
                                Nam in bibendum nisl. Nam semper euismod eros, eget dapibus mi placerat vitae. Fusce et semper mauris. Vestibulum non lorem mauris.
                                Nunc volutpat semper eros et euismod.

                                Praesent vestibulum nisl placerat sem pulvinar, nec commodo erat pulvinar.
                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti.
                                Nam in bibendum nisl. Nam semper euismod eros, eget dapibus mi placerat vitae. Fusce et semper mauris. Vestibulum non lorem mauris.
                                Nunc volutpat semper eros et euismod.
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start h-fit max-h-44 bg-red-100 w-11/12 py-3 px-10 gap-2 rounded-3xl border border-solid border-black shadow-custom-2">
                        <h1 className="text-center text-lg font-Roboto font-semibold italic">Special Traits</h1>
                        <ul className="flex justify-evenly items-center flex-wrap list-disc gap-x-5 gap-y-1 w-full max-h-full mb-2 overflow-y-auto">
                           
                            <li className="">Lorem</li>
                            <li className="">Lorem</li>
                            <li className="">Lorem</li>






                        </ul>

                    </div>
                </div>
            </div>


        </div>
    )
}