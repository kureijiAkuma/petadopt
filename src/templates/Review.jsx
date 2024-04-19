import React, { useState } from "react";
import { auth } from "../firebase"; // Import the auth object from your Firebase initialization file
import star_fill from "../icons/star_fill.svg";
import star_half from "../icons/star-half_2.svg";
import star_empty from "../icons/star.svg";
import { Progress } from "@material-tailwind/react";

export default function Review() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Firebase listener to check if user is authenticated
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      setUser(user);
    } else {
      // No user is signed in.
      setUser(null);
    }
  });

  const handleWriteReview = () => {
    if (user) {
      setShowModal(true);
    } else {
      // Redirect to login page
      window.location.href = "/signin"; // Replace "/login" with your login page URL
    }
  };

  return (
    <div className="flex flex-col w-11/12 py-5 px-8 bg-red-100 border border-solid border-black shadow-custom gap-5">
      <h1 className="font-Roboto font-extrabold text-2xl">Overall Rating</h1>
      {/* Your existing rating display code */}
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
                <img className="w-5 h-5" src={star_fill} alt="" />
                <h2 className="font-Roboto font-medium">5</h2>
                <Progress className="w-80 bg-gray-500" value={70} />
                <h2 className="font-Roboto font-medium">198</h2>
              </div>
              <div className="flex justify-start items-center gap-2">
                <img className="w-5 h-5" src={star_fill} alt="" />
                <h2 className="font-Roboto font-medium">4</h2>
                <Progress className="w-80 bg-gray-500" value={48} />
                <h2 className="font-Roboto font-medium">198</h2>
              </div>
              <div className="flex justify-start items-center gap-2">
                <img className="w-5 h-5" src={star_fill} alt="" />
                <h2 className="font-Roboto font-medium">3</h2>
                <Progress className="w-80 bg-gray-500" value={25} />
                <h2 className="font-Roboto font-medium">198</h2>
              </div>
              <div className="flex justify-start items-center gap-2">
                <img className="w-5 h-5" src={star_fill} alt="" />
                <h2 className="font-Roboto font-medium">2</h2>
                <Progress className="w-80 bg-gray-500" value={0} />
                <h2 className="font-Roboto font-medium">198</h2>
              </div>
              <div className="flex justify-start items-center gap-2">
                <img className="w-5 h-5" src={star_fill} alt="" />
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
        <button
          onClick={handleWriteReview}
          className="py-2 px-3 w-fit h-fit border border-solid border-black text-base font-Roboto font-bold bg-pink-100 shadow-custom-2 active:bg-pink-200/50"
        >
          Write a review
        </button>
      </div>
      {/* Modal for writing review */}
      {showModal && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-xl font-bold mb-4">Write Your Review</h1>
            {/* Input fields for review */}
            {/* Add your input fields for the review here */}
            <button onClick={() => setShowModal(false)} className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}