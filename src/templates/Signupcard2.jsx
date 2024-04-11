import google from "../images/logo_google.png"
import logo from "../images/logo.png"
import { NavLink } from "react-router-dom"

export default function Signupcard2() {
    return (
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 shadow-black">

            <div className="w-full">

                <div className="text-center">
                    <NavLink to="/">
                        <img className="mx-auto mb-3" src={logo} alt="" />
                    </NavLink>

                    <h1 className="text-3xl font-semibold text-gray-900">Create an account</h1>
                    <p className="mt-2 text-gray-500">Already have an account? <a className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none" href="#">Log in</a>
                    </p>
                </div>
                <div className="mt-5">
                    <div action="">
                        <div className="w-full mt-6 flex justify-start items-center">
                            <p
                                className="text-center text-sm text-gray-500">
                                What should we call you?
                            </p>
                        </div>

                        <div className="relative mt-3">
                            <input type="text" name="username" id="username" placeholder="Username" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                            <label for="username" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transdiv text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Username</label>
                        </div>

                        <div className="w-full mt-6 flex justify-start items-center">
                            <p
                                className="text-center text-sm text-gray-500">
                                Create a password
                            </p>
                        </div>

                        <div className="relative mt-3">
                            <input type="password" name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                            <label for="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transdiv text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                        </div>


                        <div className="my-6">
                            <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign up</button>
                        </div>

                        <p className="text-center text-sm text-gray-500">By creating an account, you agree to the <a
                            href="#!" className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Terms of use
                        </a> and <a href="#!" className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

