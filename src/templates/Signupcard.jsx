import background from "../images/signin_bg.png"
import google from "../images/logo_google.png"
import logo from "../images/logo.png"
import { NavLink } from "react-router-dom"

export default function Signupcard() {
    return (
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 shadow-black">

            <div className="w-full">

                <div className="text-center">
                    <NavLink to="/">
                        <img className="mx-auto mb-3" src={logo} alt="" />
                    </NavLink>

                    <h1 className="text-3xl font-semibold text-gray-900">Create an account</h1>
                    <p className="mt-2 text-gray-500">Already have an account? <a className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none" href="#">Log in</a></p>
                </div>

                <div className="mt-7 mb-">
                    <button type="submit" className="flex justify-center items-center gap-x-2 w-full rounded-md bg-white border border-solid border-black/30 px-3 py-3 text-black focus:bg-gray-400 focus:outline-none">
                        <img className="size-7" src={google} alt="" />
                        Continue With Google
                    </button>
                </div>

                <div className="">
                    <div action="">

                        <div className="w-full px-3 pt-3 flex justify-center items-center">
                            <p
                                className=" font-semibold text-gray-600  focus:text-gray-800 focus:outline-none">
                                OR
                            </p>
                        </div>


                        <div className="w-full px-3 pt-3 flex justify-center items-center">
                            <p
                                className="text-center text-sm text-gray-500">
                                Enter your email address to create an account.
                            </p>
                        </div>

                        <div className="relative mt-6">
                            <input type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                            <label for="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transdiv text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                        </div>

                        <div className="my-6">
                            <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Create an account</button>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}

