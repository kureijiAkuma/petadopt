import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Import the auth and firestore objects from your Firebase initialization file
import star_fill from "../icons/star_fill.svg";
import { Progress, Textarea, Rating } from "@material-tailwind/react";
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { DB } from "../firebase";

export default function Review(props) {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const [totalRating, setTotalRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [Rating_5, setRating_5] = useState(0);
  const [Rating_4, setRating_4] = useState(0);
  const [Rating_3, setRating_3] = useState(0);
  const [Rating_2, setRating_2] = useState(0);
  const [Rating_1, setRating_1] = useState(0);
  const [recpercent, setRecPercent] = useState(0);

  useEffect(() => {
    // Firebase listener to check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        fetchUsername(user.uid);
      } else {
        // No user is signed in.
        setUser(null);
        setUsername("");
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadReviewData = async () => {
      try {
        const reviewDocRef = doc(collection(DB, "reviews"), props.docId);
        const docSnap = await getDoc(reviewDocRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTotalRating(data.totalRating || 0);
          setTotalReviews(data.totalReviews || 0);
          setRating_5(data.rating[4]);
          setRating_4(data.rating[3]);
          setRating_3(data.rating[2]);
          setRating_2(data.rating[1]);
          setRating_1(data.rating[0]);
          setRecPercent(((Rating_4+Rating_5)/totalReviews)*100);
        }
      } catch (error) {
        console.error("Error loading review data:", error);
      }
    };

    loadReviewData();
  }, [props.docId]);

  // Function to fetch the username from Firestore
  const fetchUsername = async (uid) => {
    try {
      const userDoc = await getDoc(doc(collection(DB, "users"), uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      } else {
        console.error("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleWriteReview = () => {
    if (user) {
      setShowModal(true);
    } else {
      // Redirect to login page
      window.location.href = "/signin"; // Replace "/login" with your login page URL
    }
  };

  const handleSubmitReview = async () => {
    try {
      // Retrieve the existing reviews from Firestore
      const reviewsCollectionRef = collection(DB, "reviews");
      const reviewDocRef = doc(reviewsCollectionRef, props.docId);
      const docSnap = await getDoc(reviewDocRef);

      if (docSnap.exists()) {
        // Get the existing reviews array data
        const existingReviews = docSnap.data().reviews || [];
        // Get the existing totalRating
        const totalRating = docSnap.data().totalRating || 0;
        // Get the existing totalReviews
        const totalReviews = docSnap.data().totalReviews || 0;
        // Get the existing rating counts
        const ratingCounts = docSnap.data().rating || [0, 0, 0, 0, 0]; // Initialize to zeros if not exist

        // Calculate the new totalRating
        const newTotalRating = totalRating + rating;
        // Calculate the new totalReviews
        const newTotalReviews = totalReviews + 1;
        // Increment the corresponding rating count
        ratingCounts[rating - 1] += 1;

        // Append the new review to the existing array
        const updatedReviews = [
          ...existingReviews,
          {
            username: username,
            rating: rating,
            reviewText: reviewText,
            dateTime: new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }) // Display datetime in UTC+8 timezone
          }
        ];

        // Update the document with the updated reviews and rating arrays
        await setDoc(reviewDocRef, {
          reviews: updatedReviews,
          totalRating: newTotalRating,
          totalReviews: newTotalReviews,
          rating: ratingCounts
        }, { merge: true });
      } else {
        // Document does not exist, create a new one with the review and rating arrays
        await setDoc(reviewDocRef, {
          reviews: [{
            username: username,
            rating: rating,
            reviewText: reviewText,
            dateTime: new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }) // Display datetime in UTC+8 timezone
          }],
          totalRating: rating, // Initialize with the new review's rating
          totalReviews: 1, // Initialize with 1 for the new review
          rating: [rating === 1 ? 1 : 0, rating === 2 ? 1 : 0, rating === 3 ? 1 : 0, rating === 4 ? 1 : 0, rating === 5 ? 1 : 0] // Initialize the rating array with 1 for the new review
        });
      }

      setShowModal(false); // Close the modal after submitting the review
    } catch (e) {
      console.error("Error adding review: ", e);
    }
  };



  return (
    <div className="flex flex-col w-11/12 py-5 px-8 bg-red-100 border border-solid border-black shadow-custom gap-5">
      <h1 className="font-Roboto font-extrabold text-2xl">Overall Rating</h1>
      {/* Your existing rating display code */}
      <div className="flex justify-center items-center gap-2">
        <img className="w-10 h-10" src={star_fill} alt="" />
        <h1 className="font-Roboto font-extrabold text-5xl">{totalRating && totalReviews ? (totalRating / totalReviews).toFixed(1) : '0.0'}</h1>
        <div className="flex flex-col">
          <h2 className=" font-Roboto text-base font-medium">{Rating_4+Rating_5} out of {totalReviews} ({recpercent ? recpercent : 0})%</h2>
          <h2 className=" font-Roboto text-base font-medium text-gray-800">Customers recommend this product</h2>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center gap-2">
          <img className="w-5 h-5" src={star_fill} alt="" />
          <h2 className="font-Roboto font-medium">5</h2>
          <Progress className="w-80 bg-gray-500" value={(Rating_5/totalReviews)*100} />
          <h2 className="font-Roboto font-medium">{Rating_5}</h2>
        </div>
        <div className="flex justify-start items-center gap-2">
          <img className="w-5 h-5" src={star_fill} alt="" />
          <h2 className="font-Roboto font-medium">4</h2>
          <Progress className="w-80 bg-gray-500" value={(Rating_4/totalReviews)*100} />
          <h2 className="font-Roboto font-medium">{Rating_4}</h2>
        </div>
        <div className="flex justify-start items-center gap-2">
          <img className="w-5 h-5" src={star_fill} alt="" />
          <h2 className="font-Roboto font-medium">3</h2>
          <Progress className="w-80 bg-gray-500" value={(Rating_3/totalReviews)*100} />
          <h2 className="font-Roboto font-medium">{Rating_3}</h2>
        </div>
        <div className="flex justify-start items-center gap-2">
          <img className="w-5 h-5" src={star_fill} alt="" />
          <h2 className="font-Roboto font-medium">2</h2>
          <Progress className="w-80 bg-gray-500" value={(Rating_2/totalReviews)*100} />
          <h2 className="font-Roboto font-medium">{Rating_2}</h2>
        </div>
        <div className="flex justify-start items-center gap-2">
          <img className="w-5 h-5" src={star_fill} alt="" />
          <h2 className="font-Roboto font-medium">1</h2>
          <Progress className="w-80 bg-gray-500" value={(Rating_1/totalReviews)*100} />
          <h2 className="font-Roboto font-medium">{Rating_1}</h2>
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
          <div className="flex gap-4 flex-col bg-white p-8 rounded-lg w-1/2">
            <h1 className="text-xl font-bold mb-2 font-Roboto">Write Your Review</h1>
            <Rating value={rating} onChange={(value) => setRating(value)} unratedColor="deep-purple" ratedColor="deep-purple" />
            <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="" variant="outlined" label="Review" />
            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 active:bg-gray-500">Close</button>
              <button onClick={handleSubmitReview} className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 active:bg-gray-500">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}