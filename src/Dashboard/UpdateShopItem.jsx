import React, { useState, useEffect, useRef } from "react";
import { GetProduct } from "../API/GetItems";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../firebase";

const ProductTable = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [editedData, setEditedData] = useState({});
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [totalColor, setTotalColor] = useState(0);
  const [colorValues, setColorValues] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetProduct();
      if (result.success) {
        const modifiedData = result.data.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          rating: item.rating,
          description: item.description,
          thumbnailUrl: item.thumbnailUrl,
          imgUrls: item.imgUrls,
          colorValues: item.colorValues,
          sizes: item.sizes,
          createdAt: formatDate(item.createdAt),
          id: item.id,
        }));
        setProductData(modifiedData);
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

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setSelectedSizes(product.sizes || []);
    setSelectedImageIndex(null); // Reset selected image index
    setModalOpen(true);
    setEditedData({ ...product });
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
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      const productDocRef = doc(DB, "shopitems", selectedProduct.id);
      await updateDoc(productDocRef, {
        ...editedData,
        colorValues,
      });
      console.log("Document successfully updated!");
      closeModal();

      setProductData((prevProductData) =>
        prevProductData.map((item) =>
          item.id === selectedProduct.id ? editedData : item
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Product Items Table</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Rating</th>
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
                <td className="border px-4 py-2">{item.rating}</td>
                <td className="border px-4 py-2">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-white p-4 rounded-lg shadow-lg"
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
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  readOnly
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
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <input
                  type="text"
                  id="rating"
                  name="rating"
                  value={editedData.rating}
                  onChange={handleInputChange}
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
                <textarea
                  id="description"
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                <h1 className="font-Roboto text-lg font-medium">
                  Total color available
                </h1>
                <input
                  type="number"
                  onChange={handleTotalColorChange}
                  value={totalColor}
                  className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base"
                />
                <div className="flex justify-start items-center gap-2 flex-wrap">
                  {colorValues.map((color, index) => (
                    <input
                      key={index}
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base"
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
