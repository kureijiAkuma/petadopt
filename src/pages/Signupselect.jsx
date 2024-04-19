import { useNavigate, NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider, DB } from '../firebase'; // Import DB from firebase
import { collection, doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from 'firebase/auth';

import { message } from "antd";
import background from "../images/signin_bg.png"
import google from "../images/logo_google.png"
import logo from "../images/logo.png"

export default function Signupselect() {
    const [value, setValue] = useState('');
    const history = useNavigate();

    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                console.log("Sign-in successful:", data.user);
                const user = data.user;
                setValue(user.email);
                localStorage.setItem('email', user.email);
                // Check if the user signed up using Google
                if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                    console.log("New user signed up with Google:", user);
                    createUserProfile(user);
                } else {
                    console.log("Existing user signed in:", user);
                }
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    };
    

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);

    console.log(DB);
    const createUserProfile = (user) => {
        const username = user.displayName || 'Unknown'; // Use displayName or fallback to 'Unknown' if not available
        
        // Reference to the "users" collection
        const usersCollectionRef = collection(DB, "users");
    
        // Reference to the document within the "users" collection using the user's UID
        const userDocRef = doc(usersCollectionRef, user.uid);
    
        // Set data for the document
        setDoc(userDocRef, {
            uid: user.uid,
            username: username
        })
        .then(() => {
            console.log('User added to Firestore successfully');
        })
        .catch((error) => {
            console.error('Error adding user to Firestore:', error);
            // Handle error
        });
    };

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
                            <p className="mt-2 text-gray-500">
                                Already have an account?{' '}
                                <NavLink className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none" to="/signin">
                                    Log in
                                </NavLink>
                            </p>
                        </div>
                        {value ? (
                            // Redirect or render appropriate UI when user is signed in
                            history("/")
                        ) : (
                            <div className="mt-7 mb-">
                                <button
                                    onClick={handleClick}
                                    type="submit"
                                    className="flex justify-center items-center gap-x-2 w-full rounded-md bg-white border border-solid border-black/30 px-3 py-3 text-black focus:bg-gray-400 focus:outline-none"
                                >
                                    <img className="size-7" src={google} alt="" />
                                    Continue With Google
                                </button>
                            </div>
                        )}

                        <div className="">
                            <div action="">
                                <div className="w-full px-3 pt-3 flex justify-center items-center">
                                    <p className=" font-semibold text-gray-600  focus:text-gray-800 focus:outline-none">OR</p>
                                </div>
                                <div className="my-6">
                                    <NavLink to="/signup">
                                        <button

                                            type="button"
                                            className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                                        >
                                            Create an account
                                        </button>
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
    );
}
