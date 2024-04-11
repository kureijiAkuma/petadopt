import background from "../images/signin_bg.png"
import google from "../images/logo_google.png"
import logo from "../images/logo.png"
import { auth, provider } from "../firebase"
import { useNavigate,NavLink } from "react-router-dom"
import { signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"


export default function Signupselect() {

    const [value, setValue] = useState('')
    const history = useNavigate()

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
        })
    }
    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div className="flex w-screen h-screen">
            <div className="flex justify-center items-center w-5/12 h-full bg-red-200/90">
                <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 shadow-black">

                    <div className="w-full">

                        <div className="text-center">
                            <NavLink to="/">
                                <img className="mx-auto mb-3" src={logo} alt="" />
                            </NavLink>

                            <h1 className="text-3xl font-semibold text-gray-900">Create an account</h1>
                            <p className="mt-2 text-gray-500">Already have an account? <NavLink className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none" to="/signin">Log in</NavLink></p>
                        </div>
                        {value ? history("/") :
                            <div className="mt-7 mb-">
                                <button onClick={handleClick} type="submit" className="flex justify-center items-center gap-x-2 w-full rounded-md bg-white border border-solid border-black/30 px-3 py-3 text-black focus:bg-gray-400 focus:outline-none">
                                    <img className="size-7" src={google} alt="" />
                                    Continue With Google
                                </button>
                            </div>
                        }
                        <div className="">
                            <div action="">

                                <div className="w-full px-3 pt-3 flex justify-center items-center">
                                    <p
                                        className=" font-semibold text-gray-600  focus:text-gray-800 focus:outline-none">
                                        OR
                                    </p>
                                </div>

                                <div className="my-6">
                                    <NavLink to="/signup">
                                        <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Create an account</button>

                                    </NavLink>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-7/12 h-full bg-yellow-200">
                <img className="w-full h-screen" src={background} alt="" />
            </div>
        </div>
    )
}