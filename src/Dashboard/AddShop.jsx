import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { DB, storage } from "../firebase";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme CSS

export default function AddShop() {
    const [selectedSizes, setSelectedSizes] = useState([]); // State to hold selected sizes
    const [productname, setNewProductName] = useState("");
    const [price, setNewPrice] = useState(0);
    const [rating, setNewRating] = useState(0);
    const [totalColor, setTotalColor] = useState(1);
    const [quantity, setNewQuantity] = useState(0);
    const [description, setNewDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [colorValues, setColorValues] = useState(["#000000"]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [totalVarieties, setTotalVarieties] = useState(0);

    const shopItemsCollectionRef = collection(DB, "shopitems");
    const [shopitems, setShopItems] = useState([]);

    const createShopItem = async () => {
        try {
            const thumbnailUrl = await uploadThumbnail(thumbnailUpload);
            const imageUrls = await Promise.all(imageUploads.map(uploadFile));
            await addDoc(shopItemsCollectionRef, {
                name: productname,
                price: Number(price),
                quantity: Number(quantity),
                description: description,
                rating: rating,
                thumbnailUrl: thumbnailUrl,
                imgUrls: imageUrls,
                category: selectedCategory,
                colorValues: colorValues,
                sizes: selectedSizes,
                totalVarieties: totalVarieties,
                createdAt: serverTimestamp()
            });
            message.success("File Uploaded!");
        } catch (error) {
            console.error("Error uploading shop item:", error);
            message.error("Failed to upload file!");
        }
    };

    useEffect(() => {
        const getShopItems = async () => {
            const data = await getDocs(shopItemsCollectionRef);
            setShopItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getShopItems();
    }, []);

    const [thumbnailUpload, setThumbnailUpload] = useState(null);
    const [imageUploads, setImageUploads] = useState([]);

    const handleTotalColorChange = (event) => {
        let newTotal = parseInt(event.target.value);
        if (isNaN(newTotal) || newTotal < 0) {
            newTotal = 0;
        }
        setTotalColor(newTotal);
        setColorValues(colorValues.slice(0, newTotal));
    };

    const handleColorChange = (index, event) => {
        const newColorValues = [...colorValues];
        newColorValues[index] = event.target.value;
        setColorValues(newColorValues);
    };

    const colorInputs = Array.from({ length: totalColor }, (_, index) => (
        <input
            key={index}
            type="color"
            value={colorValues[index]}
            onChange={(event) => handleColorChange(index, event)}
            className="w-12 h-7"
        />
    ));

    const uploadThumbnail = async (file) => {
        if (!file) return "";
        const thumbnailRef = ref(storage, `thumbnails/${file.name + v4()}`);
        await uploadBytes(thumbnailRef, file);
        const url = await getDownloadURL(thumbnailRef);
        return url;
    };

    const uploadFile = (file) => {
        return new Promise((resolve, reject) => {
            const imageRef = ref(storage, `featured_images/${file.name + v4()}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    resolve(url);
                }).catch(reject);
            }).catch(reject);
        });
    };

    const handleThumbnailChange = (event) => {
        setThumbnailUpload(event.target.files[0]);
    };

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        setImageUploads(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[index] = file;
            return updatedImages;
        });
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSizeChange = (size) => {
        setSelectedSizes(prevSizes => {
            if (prevSizes.includes(size)) {
                return prevSizes.filter(item => item !== size);
            } else {
                return [...prevSizes, size];
            }
        });
    };

    const handleSubmit = () => {
        if (
            !productname ||
            !price ||
            !quantity ||
            !selectedCategory ||
            !description ||
            !totalVarieties||
            !thumbnailUpload ||
            imageUploads.some(image => !image)
        ) {
            message.error("Please fill out all fields")
            return;
        }
        createShopItem();
    };

    return (
        <div className=" h-fit w-3/4 p-5 mt-24 mb-5 flex gap-4 flex-col justify-around rounded-lg bg-gray-300 border-2 border-solid border-black/80 shadow-xl shadow-black ">
            <h1 className="font-Roboto text-lg font-medium">Product name</h1>
            <input onChange={(event) => { setNewProductName(event.target.value) }} className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" type="text" required />

            <h1 className="font-Roboto text-lg font-medium">Price (₱)</h1>
            <input onChange={(event) => { setNewPrice(event.target.value) }} type="number" required className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" />

            <h1 className="font-Roboto text-lg font-medium">Quantity</h1>
            <input onChange={(event) => { setNewQuantity(event.target.value) }} type="number" required className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" />

            <h1 className="font-Roboto text-lg font-medium">Category</h1>
            <select value={selectedCategory} onChange={handleCategoryChange} className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base">
                <option value="">Select Category</option>
                <option value="Accessories">Accessories</option>
                <option value="Medicines">Medicines</option>
                <option value="Pet Foods">Pet Foods</option>
                <option value="Hygiene">Hygiene</option>
                <option value="Toys">Toys</option>
            </select>

            <h1 className="font-Roboto text-lg font-medium">Number of varieties</h1>
            <input
                type="number"
                value={totalVarieties}
                onChange={(event) => {
                    const value = parseInt(event.target.value);
                    if (!isNaN(value) && value >= 0) {
                        setTotalVarieties(value);
                    }
                }}
                className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base"
            />

            <h1 className="font-Roboto text-lg font-medium">Total color available</h1>
            <input type="number" onChange={handleTotalColorChange} value={totalColor} className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" />
            <div className="flex justify-start items-center gap-2 flex-wrap">
                {colorInputs}
            </div>

            <h1 className="font-Roboto text-lg font-medium">Description</h1>
            <ReactQuill 
                theme="snow" 
                value={description} 
                onChange={setNewDescription} 
                className="bg-white border border-solid border-black font-Roboto text-base" 
            />

            <h1 className="font-Roboto text-lg font-medium">Size</h1>
            <div className="flex justify-start items-start gap-x-5">
                {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
                    <div key={index} className="flex justify-start items-center gap-x-1">
                        <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeChange(size)}
                            className="w-4 h-4"
                        />
                        <h2 className="font-Roboto font-normal text-lg ">{size}</h2>
                    </div>
                ))}
            </div>

            {/* Featured images placeholders */}
            <div className="flex gap-4">
                <div onClick={() => document.getElementById('thumbnailInput').click()} className="w-32 h-32 bg-gray-200 flex items-center justify-center cursor-pointer">
                    {thumbnailUpload ? (
                        <img src={URL.createObjectURL(thumbnailUpload)} alt={`Thumbnail`} className="w-full h-full object-cover" />
                    ) : (
                        `Thumbnail`
                    )}
                </div>
                {[...Array(4)].map((_, index) => (
                    <div key={index} onClick={() => document.getElementById(`featuredImageInput-${index}`).click()} className="w-32 h-32 bg-gray-200 flex items-center justify-center cursor-pointer">
                        {imageUploads[index] ? (
                            <img src={URL.createObjectURL(imageUploads[index])} alt={`Featured Image ${index + 1}`} className="w-full h-full object-cover" />
                        ) : (
                            `Featured Image ${index + 1}`
                        )}
                    </div>
                ))}
            </div>
            {[...Array(4)].map((_, index) => (
                <input key={index} type="file" accept="image/*" id={`featuredImageInput-${index}`} style={{ display: "none" }} onChange={(event) => handleFileChange(event, index)} required />
            ))}
            <input type="file" accept="image/*" id="thumbnailInput" style={{ display: "none" }} onChange={handleThumbnailChange} required />

            <button onClick={handleSubmit} type="submit" className="w-1/2 px-5 py-2 self-center rounded-lg border border-solid border-black/70 hover:bg-red-200/80 active:bg-red-300/80 bg-red-200 font-Roboto font-medium text-black">Submit</button>
        </div>
    );
}
