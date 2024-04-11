import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FirebaseStorage, FirestoreDatabase } from "../Auth/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { message } from "antd";
import MoonLoader from "react-spinners/MoonLoader"
export default function Product() {
    const [img, setImg] = useState(null);
    const [formState, setFormState] = useState({})

    const [loader, setLoader] = useState(false);
    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    };
    const handleSubmit = async (event) => { // Added event parameter to handleSubmit function
        event.preventDefault(); // Prevent form submission
        setLoader(true)
        if (!img) {
            // If no image is selected, display an error message
            message.error('Please select an image');
            setLoader(false)
            return;
        }

        const imgRef = ref(FirebaseStorage, `product/${formState.kind}/${uuidv4()}`);
        try {
            // Upload the image bytes to Firebase Storage
            const snapshot1 = await uploadBytes(imgRef, img);


            // Get the download URL for the uploaded image
            const downloadURL = await getDownloadURL(snapshot1.ref);


            // Now store image data in Firestore
            await addDoc(collection(FirestoreDatabase, 'products'), {
                ...formState,
                image: downloadURL,
            });

            // You can also display a success message if needed
            setLoader(false)
            message.success('Product uploaded successfully');
            //  navigate("/dashboard")
        } catch (error) {
            // Handle errors
            setLoader(false)
            console.error('Error uploading image:', error);
            message.error('Failed to upload image: ' + error.message);
        }
    };
    return (
        <div className="flex justify-center items-center">
            {loader ? <MoonLoader color="#000000" /> :

                <section className="rounded-md p-2 bg-white w-full">
                    <div className="flex items-center justify-center my-3">
                        <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <div className="mb-2"></div>
                            <h2 className="text-2xl font-bold leading-tight">
                                Add Product
                            </h2>
                            <p className="mt-2 text-base text-gray-600">
                                Add your pet product here
                            </p>
                            <form onSubmit={handleSubmit} className="mt-5">
                                <div class="space-y-4">
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={formState.name || ""}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                type="text"
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name="name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                value={formState.description || ""}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                type="text"
                                                className="flex h-16 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name="description"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-base font-medium text-gray-900 mr-32">
                                            Colors
                                        </label>
                                        <label className="text-base font-medium text-gray-900">
                                           Stock
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="mt-2">
                                                <input required
                                                    value={formState.color || "transparent"}
                                                    onChange={handleChange}
                                                    type="color"
                                                    className="cursor-pointer w-10 h-10 border border-black"
                                                    name="color"
                                                />
                                            </div>
                                            <div className="mt-2 mr-20">
                                                <input
                                                    value={formState.color2 || "transparent"}
                                                    onChange={handleChange}
                                                    type="color"
                                                    className="cursor-pointer w-10 h-10 border border-black"
                                                    name="color2"
                                                />
                                            </div>
                                            
                                            <div className="mt-2">
                                                <input
                                                    value={formState.stock || '10'}
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    name="stock"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={formState.price || ""}
                                                onChange={handleChange}
                                                placeholder="Price"
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name="price"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between">
                                            <div className="flex gap-4 mb-2">
                                                <div className="flex gap-2 flex-row-reverse font-semibold">
                                                    <label htmlFor="accessory">Accessory </label>
                                                    <input type="radio" name="kind" id="accessory" value="accessory" checked={formState.kind === "accessory"} onChange={handleChange} />
                                                </div>

                                                <div className="flex gap-2 flex-row-reverse font-semibold">
                                                    <label htmlFor="food">Food </label>
                                                    <input type="radio" name="kind" id="food" value="food" checked={formState.kind === "food"} onChange={handleChange} />
                                                </div>

                                                <div className="flex gap-2 flex-row-reverse font-semibold">
                                                    <label htmlFor="medicine">Medicine </label>
                                                    <input type="radio" name="kind" id="medicine" value="medicine" checked={formState.kind === "medicine"} onChange={handleChange} />
                                                </div>

                                                <div className="flex gap-2 flex-row-reverse font-semibold">
                                                    <label htmlFor="toy">Toy </label>
                                                    <input type="radio" name="kind" id="toy" value="toy" checked={formState.kind === "toy"} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between mt-3">
                                            <label className="text-base font-medium text-gray-900">
                                                Product Image
                                            </label>
                                        </div>
                                        <div class="mt-2">
                                            <input
                                                className="file-input w-full max-w-xs"
                                                type="file"
                                                name="image"
                                                onChange={(e) => setImg(e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            type="submit"
                                        >
                                            Add Product
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>}
        </div>

    )
}