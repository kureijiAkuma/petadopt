import React, { useEffect, useState } from "react";
import Navbar from "../templates/Navbar";
import Review from "../templates/Review";
import star_fill from "../icons/star_fill.svg";
import star_half from "../icons/star-half_2.svg";
import star_empty from "../icons/star.svg";
import round_check from "../icons/round_check.svg";
import background from "../images/bg_2.jpg";
import { useLocation } from "react-router-dom";
import Comment from "../templates/Comment";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "../firebase";

export default function Shop_2(props) {
  const [quantity, changeQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [productData, setProductData] = useState(null);
  const [docId, setDocId] = useState(null); // State to store the document ID
  const [reviews, setReviews] = useState([]); // State to store reviews
  const location = useLocation();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docid = location.state.docid;
        setDocId(docid); // Set the document ID state
        const docRef = doc(DB, "shopitems", docid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProductData(docSnap.data());
          // Load reviews for the product
          const reviewsRef = doc(DB, "reviews", docid);
          const reviewsDoc = await getDoc(reviewsRef);
          if (reviewsDoc.exists()) {
            setReviews(reviewsDoc.data().reviews || []);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [location.state.docid]);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickOutsideModal = (event) => {
    if (event.target.classList.contains("bg-black")) {
      setModalOpen(false);
    }
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
      <Navbar />
      <div className="pt-24 flex w-screen flex-wrap gap-y-5">
        <div className="flex justify-end items-start flex-wrap gap-5 w-6/12 h-fit  p-5">
          {productData.imgUrls.map((imageUrl, index) => (
            <div key={index} className="basis-5/12 h-64 bg-red-50 shadow-custom border border-solid border-black " onClick={() => openModal(index)}>
              <img className="w-full h-full object-cover cursor-pointer" src={imageUrl} alt="" />
            </div>
          ))}
        </div>
        <div className="flex justify-center w-6/12 h-fit p-5">
          <div className="flex flex-wrap flex-col items-start gap-x-3 gap-y-4 w-9/12 h-fit bg-red-100 p-10 border border-solid border-black shadow-custom">
            <div className="flex justify-between w-full">
              <h1 className="font-Roboto font-extrabold text-2xl">{productData.name}</h1>
              <div className="flex justify-center items-center gap-2 w-fit">
                <img className="w-8 h-8" src={round_check} alt="" />
                <h2 className="font-Roboto font-semibold text-xl text-gray-800">In Stock</h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 justify-start items-center w-full">
              <h2 className=" font-Roboto text-xl font-bold text-deep-orange-700">P{productData.price}</h2>
              <div className="flex justify-center items-center gap-x-1">
                {[...Array(5)].map((_, index) => {
                  if (index < Math.floor(productData.rating)) {
                    return <img key={index} className="w-5 h-5" src={star_fill} alt="" />;
                  } else if (index === Math.floor(productData.rating) && productData.rating % 1 !== 0) {
                    return <img key={index} className="w-5 h-5" src={star_half} alt="" />;
                  } else {
                    return <img key={index} className="w-5 h-5" src={star_empty} alt="" />;
                  }
                })}
              </div>
              <h2 className="ml-auto font-Roboto text-xl text-gray-800 font-bold">{productData.quantity} available</h2>
            </div>
            {productData.colorValues && productData.colorValues.length > 0 && (
              <div>
                <h2 className="font-Roboto text-lg font-medium">Color</h2>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {productData.colorValues.map((color, index) => (
                    <button key={index} className="flex justify-center items-center w-10 h-10 rounded-full ">
                      <div className={`w-10 h-10 p-1 rounded-full ring-2 ring-blue-gray-300 active:ring-blue-gray-800 dark:ring-gray-500`} style={{ backgroundColor: color }}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {productData.sizes && productData.sizes.length > 0 && (
              <div>
                <h2 className="mt-2 font-Roboto text-lg font-medium">Size</h2>
                <div className="flex gap-1 flex-wrap">
                  {productData.sizes.map((size, index) => (
                    <button key={index} className="w-fit h-fit px-5 bg-white border border-solid border-black text-center shadow-custom-2 active:bg-gray-400">
                      <h1 className="font-Roboto font-medium text-base">{size}</h1>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
        <div className="m-auto w-10/12 py-5 px-8 bg-red-100 border border-solid border-black shadow-custom">
          <h1 className="font-Roboto font-extrabold text-2xl">Description</h1>
          <h2 className="font-Roboto font-normal text-base mt-1">{productData.description}</h2>
        </div>
        <div className="flex gap-5 flex-col justify-start w-7/12  p-5">
          <h1 className="font-Roboto font-extrabold text-xl">Customer Reviews ({reviews.length})</h1>
          {reviews.map((review, index) => (
            <Comment key={index} review={review} />
          ))}
        </div>
        <div className="flex flex-col justify-start items-center w-5/12  p-5">
          <Review docId={docId} />
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={handleClickOutsideModal}>
          <div className="w-7/12 max-w-fit h-7/12 max-h-fit flex justify-center items-center border border-solid rounded-xl p-3 bg-white">
            <button className="absolute top-2 right-2 text-gray-700 hover:text-gray-900" onClick={closeModal}>X</button>
            <img className="w-fit h-fit" src={productData.imgUrls[selectedImageIndex]} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
