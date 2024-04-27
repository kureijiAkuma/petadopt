import React, { useState, useEffect, useRef } from "react";
import { GetProduct } from "../API/GetItems";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { DB, storage } from "../firebase";
import { message } from 'antd';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Spinner } from "@material-tailwind/react";
import ReactQuill from "react-quill";

const ProductTable = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [editedData, setEditedData] = useState({ description: "" });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [totalColor, setTotalColor] = useState(0);
  const [colorValues, setColorValues] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [featuredImageNames, setFeaturedImageNames] = useState([]);
  const [thumbnailName, setThumbnailName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [totalVarieties, setTotalVarieties] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const result = await GetProduct();
      if (result.success) {
        const modifiedData = result.data.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description,
          thumbnailUrl: item.thumbnailUrl,
          imgUrls: item.imgUrls,
          colorValues: item.colorValues,
          sizes: item.sizes,
          createdAt: formatDate(item.createdAt),
          id: item.id,
        }));
        setProductData(modifiedData);
        // Extract categories from product data
        const uniqueCategories = Array.from(new Set(modifiedData.map(item => item.category)));
        setCategories(uniqueCategories);
        // Set default category if available
        if (uniqueCategories.length > 0) {
          setCategory(uniqueCategories[0]);
        }
      } else {
        console.error("Error fetching product data:", result.error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setTotalColor(selectedProduct.colorValues.length);
      setColorValues(selectedProduct.colorValues);
    }
  }, [selectedProduct]);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const dateObject = timestamp.toDate();
      const options = {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Intl.DateTimeFormat("en-US", options).format(dateObject);
    } else {
      return "";
    }
  };

  const handleQuillChange = (content) => {
    setEditedData((prevData) => ({
      ...prevData,
      description: content.toString(), // Convert content to string if needed
    }));
  };

  const handleRowClick = (product) => {
    console.log("Selected product:", product); // Add this line for debugging
    setSelectedProduct(product);
    setSelectedSizes(product.sizes || []);
    setSelectedImageIndex(null); // Reset selected image index
    setModalOpen(true);
    setEditedData({ ...product });
    setCategory(product.category); // Set the category state to the category of the selected product
    console.log("Category state after row click:", category); // Add this line for debugging

    // Extract filenames of featured images and thumbnail
    const featuredImageNames = product.imgUrls.map(url => getFileName(url));
    const thumbnailName = getFileName(product.thumbnailUrl);
    setFeaturedImageNames(featuredImageNames);
    setThumbnailName(thumbnailName);
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };
  const handleThumbnailClick = () => {
    document.getElementById("thumbnailInput").click();
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData((prevData) => ({
          ...prevData,
          thumbnailUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeaturedImageClick = (index) => {
    setSelectedImageIndex(index);
    document.getElementById("featuredImageInput").click();
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData((prevData) => {
          const imgUrls = [...prevData.imgUrls];
          imgUrls[selectedImageIndex] = reader.result;
          console.log("imgUrls before updating:", imgUrls); // Add this line
          return {
            ...prevData,
            imgUrls,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    if (!e || !e.target) {
      console.error("Event object or target property is undefined");
      return;
    }

    const { name, value } = e.target;

    // Handle description separately
    if (name === "description") {
      setEditedData((prevData) => ({
        ...prevData,
        description: value,
      }));
    } else {
      // For other input fields
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };




  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((prevSize) => prevSize !== size)
        : [...prevSizes, size]
    );
    setEditedData((prevData) => ({
      ...prevData,
      sizes: selectedSizes.includes(size)
        ? selectedSizes.filter((prevSize) => prevSize !== size)
        : [...selectedSizes, size],
    }));
  };

  const handleTotalColorChange = (e) => {
    const value = parseInt(e.target.value);
    setTotalColor(value);
    setColorValues((prevValues) =>
      prevValues.length < value ? [...prevValues, ""] : prevValues.slice(0, value)
    );
  };

  const handleColorChange = (index, value) => {
    setColorValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  const saveChanges = async () => {
    try {
      // Check if editedData.description is defined and a string
      if (typeof editedData.description === 'string') {
        // Continue with the update process
        const updatedData = { ...editedData };
        updatedData.description = updatedData.description || ""; // Set a default value if description is null or undefined
        updatedData.description = String(updatedData.description); // Convert description to string if needed
        updatedData.totalVarieties = totalVarieties;

        // Upload the updated thumbnail image to Firebase Storage if it has been modified
        if (editedData.thumbnailUrl.startsWith("data:image")) {
          const thumbnailFile = await uploadImageToStorage(editedData.thumbnailUrl, "thumbnail", thumbnailName);
          updatedData.thumbnailUrl = await getDownloadURL(thumbnailFile);
        }

        const updatedImgUrls = await Promise.all(editedData.imgUrls.map(async (imageUrl, index) => {
          if (imageUrl.startsWith("data:image")) {
            const featuredImageFile = await uploadImageToStorage(imageUrl, "featured", featuredImageNames[index]);
            console.log("FEATURED IMAGE FILE:", featuredImageFile);
            return await getDownloadURL(featuredImageFile);
          }
          return imageUrl;
        }));

        updatedData.imgUrls = updatedImgUrls;

        // Update the Firestore document with the new data
        const productDocRef = doc(DB, "shopitems", selectedProduct.id);
        const productDocSnapshot = await getDoc(productDocRef); // Retrieve the document snapshot
        if (productDocSnapshot.exists()) {
          const productData = productDocSnapshot.data();
          await updateDoc(productDocRef, {
            ...updatedData,
            colorValues,
            category, // Add the category field
            createdAt: productData.createdAt, // Use the original createdAt timestamp from the document snapshot
          });
          message.success("Document successfully updated!");
          closeModal();

          setProductData((prevProductData) =>
            prevProductData.map((item) =>
              item.id === selectedProduct.id ? updatedData : item
            )
          );
        } else {
          console.error("Document does not exist.");
        }
      } else {
        // Handle the case where description is not defined or not a string
        console.error("Description is not defined or not a string.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };









  const uploadImageToStorage = async (imageDataUrl, type, folderandimgname) => {
    // Convert base64 data URL to Blob
    const base64String = imageDataUrl.split(",")[1];
    const bytes = atob(base64String);
    const byteArray = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      byteArray[i] = bytes.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // Upload Blob to Firebase Storage
    const storageRef = ref(storage, `${folderandimgname}`);
    await uploadBytes(storageRef, blob);
    return storageRef;
  };

  const getFileName = (url) => {
    // Split the URL by '/'
    const parts = url.split("/");

    // Find the part containing the filename
    let filenamePart = parts[parts.length - 1];

    // Remove any additional parameters after '?' if present
    const indexOfQuestionMark = filenamePart.indexOf("?");
    if (indexOfQuestionMark !== -1) {
      filenamePart = filenamePart.substring(0, indexOfQuestionMark);
    }

    // Replace any encoded characters
    filenamePart = decodeURIComponent(filenamePart);
    console.log("THIS IS FILENAMEPART")
    console.log(filenamePart)
    return filenamePart;
  };


  return (
    <div className="mt-24">

      {loading ? (
        <div className="flex justify-center items-center w-full h-full z-50">
          <Spinner color="gray" className="w-96 h-96 animate-spin mt-16" />
        </div>

      ) : (

        <table className="w-full mt-4">

          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => handleRowClick(item)}
              >
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <div className=" fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-white p-4 rounded-lg shadow-lg mt-64 mb-5"
            ref={modalRef}
          >
            <span
              className="absolute top-0 right-0 m-4 text-lg cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>

            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="py-1 px-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editedData.price}
                  onChange={handleInputChange}
                  className="p-1 px-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={editedData.quantity}
                  onChange={handleInputChange}
                  className="p-1 px-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-1 px-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Pet Foods">Pet Foods</option>
                  <option value="Medicines">Medicines</option>
                  <option value="Hygiene">Hygiene</option>
                  <option value="Toys">Toys</option>

                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="totalVarieties"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Varieties
                </label>
                <input
                  type="number"
                  id="totalVarieties"
                  value={totalVarieties}
                  onChange={(e) => setTotalVarieties(parseInt(e.target.value))}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>


              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <ReactQuill
                  id="description"
                  value={editedData.description}
                  onChange={handleQuillChange} // Bind the onChange event to handleQuillChange function
                  className="p-1 px-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>


              <div className="mb-4">
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sizes
                </label>
                <div className="flex justify-start items-start gap-x-5">
                  {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(
                    (size, index) => (
                      <div
                        key={index}
                        className="flex justify-start items-center gap-x-1"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                          className="w-4 h-4"
                        />
                        <h2 className="font-Roboto font-normal text-lg ">
                          {size}
                        </h2>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Thumbnail
                </label>
                <img
                  src={editedData.thumbnailUrl}
                  alt="Thumbnail"
                  className="w-20 h-20 cursor-pointer"
                  onClick={handleThumbnailClick}
                />
                <input
                  type="file"
                  id="thumbnailInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleThumbnailChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="featuredImages"
                  className="block text-sm font-medium text-gray-700"
                >
                  Featured Images
                </label>
                <div className="flex gap-4">
                  {editedData.imgUrls.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Featured ${index + 1}`}
                      className="w-20 h-20 cursor-pointer"
                      onClick={() => handleFeaturedImageClick(index)}
                    />
                  ))}
                </div>
                <input
                  type="file"
                  id="featuredImageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFeaturedImageChange}
                />
              </div>
              <div className="mb-4">
                <h1 className="block text-sm font-medium text-gray-700">
                  Total color available
                </h1>
                <input
                  type="number"
                  onChange={handleTotalColorChange}
                  value={totalColor}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <div className="flex justify-start items-center gap-2 flex-wrap">
                  {colorValues.map((color, index) => (
                    <input
                      key={index}
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className=""
                    />
                  ))}
                </div>
              </div>
            </form>
            <div className="mt-4">
              <button
                type="button"
                onClick={saveChanges}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
