import { collection, addDoc, getDocs, serverTimestamp  } from "firebase/firestore";
import { DB, storage } from "../firebase";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { message } from 'antd';

export default function AddShop() {
    const [selectedSizes, setSelectedSizes] = useState([]); // State to hold selected sizes

    {/* Texts */ }
    const [productname, setNewProductName] = useState("");
    const [price, setNewPrice] = useState(0);
    const [rating, setNewRating] = useState(0);
    const [totalColor, setTotalColor] = useState(1);
    const [quantity, setNewQuantity] = useState(0);
    const [description, setNewDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState(""); // State to store thumbnail URL
    const [colorValues, setColorValues] = useState(["#000000"]); // Array to hold color values

    {/* Load List of items in database */ }
    const shopItemsCollectionRef = collection(DB, "shopitems");
    const [shopitems, setShopItems] = useState([]);

    const createShopItem = async () => {
        try {
            // Upload thumbnail image
            const thumbnailUrl = await uploadThumbnail(thumbnailUpload);
            // Upload featured images
            const imageUrls = await Promise.all(imageUploads.map(uploadFile));
            // Save document with image URLs
            await addDoc(shopItemsCollectionRef, {
                name: productname,
                price: Number(price),
                quantity: Number(quantity),
                description: description,
                rating: rating,
                thumbnailUrl: thumbnailUrl,
                imgUrls: imageUrls,
                colorValues: colorValues, // Save color values to the database
                sizes: selectedSizes, // Save selected sizes to the database
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

    {/* Images */ }
    const [thumbnailUpload, setThumbnailUpload] = useState(null);
    const [imageUploads, setImageUploads] = useState([]);
    const [error, setError] = useState("");

    const handleTotalColorChange = (event) => {
        const newTotal = parseInt(event.target.value);
        if (newTotal < totalColor) {
            // If the new total is less than the previous total,
            // remove the extra color values from the array
            setColorValues(colorValues.slice(0, newTotal));
        } else if (newTotal > totalColor) {
            // If the new total is greater than the previous total,
            // add default color values for the new colors
            setColorValues([...colorValues, ...Array.from({ length: newTotal - totalColor }, () => "#000000")]);
        }
        setTotalColor(newTotal); // Update the total color state
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

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length !== 4) {
            message.error("Please select 4 featured images")
        } else {
            setImageUploads(files);
        }
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
        // Check if any input field is empty
        if (
            !productname ||
            !price ||
            !quantity ||
            !description ||
            !thumbnailUpload ||
            imageUploads.length !== 4
        ) {
            message.error("Please fill out all fields")
            return;
        }

        // Check if no featured images are selected
        if (imageUploads.length === 0) {
            message.error("Please select at least one featured image");
            return;
        }

        // If all conditions are met, proceed with creating the shop item
        createShopItem();
    };

    return (

        <div className=" h-fit w-3/4 p-5 mt-24 mb-5 flex gap-4 flex-col justify-around rounded-lg bg-gray-300 border-2 border-solid border-black/80 shadow-xl shadow-black ">
            <h1 className="font-Roboto text-lg font-medium">Product Name</h1>
            <input onChange={(event) => { setNewProductName(event.target.value) }} className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" type="text" required />

            <h1 className="font-Roboto text-lg font-medium">Price (₱)</h1>
            <input onChange={(event) => { setNewPrice(event.target.value) }} type="number" required className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" />

            <h1 className="font-Roboto text-lg font-medium">Quantity</h1>
            <input onChange={(event) => { setNewQuantity(event.target.value) }} type="number" required className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" />

            <h1 className="font-Roboto text-lg font-medium">Total color available</h1>
            <input type="number" onChange={handleTotalColorChange} value={totalColor} className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base" />
            <div className="flex justify-start items-center gap-2 flex-wrap">
                {colorInputs}
            </div>

            <h1 className="font-Roboto text-lg font-medium">Description</h1>
            <textarea onChange={(event) => { setNewDescription(event.target.value) }} cols="30" rows="5" required className="bg-white rounded-lg border border-solid border-black p-2 font-Roboto text-base"></textarea>

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

            <h1 className="font-Roboto text-lg font-medium">Thumbnail (Single Image)</h1>
            <input type="file" accept="image/*" onChange={handleThumbnailChange} required />

            <h1 className="font-Roboto text-lg font-medium">Featured Images (4 images)</h1>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} required />

            <button onClick={handleSubmit} type="submit" className="w-1/2 px-5 py-2 self-center rounded-lg border border-solid border-black/70 hover:bg-red-200/80 active:bg-red-300/80 bg-red-200 font-Roboto font-medium text-black">Submit</button>

        </div>

    )
}

