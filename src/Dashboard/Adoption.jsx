import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FirebaseStorage, FirestoreDatabase } from "../Auth/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { message } from "antd";
import MoonLoader from "react-spinners/MoonLoader"
export default function Adoption() {
    const [img, setImg] = useState(null);
    const [formState, setFormState] = useState({});
    const [loader, setLoader] = useState(false)
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
        const imgRef = ref(FirebaseStorage, `Adoption/${formState.animal}/${uuidv4()}`);
        try {
            // Upload the image bytes to Firebase Storage
            const snapshot1 = await uploadBytes(imgRef, img);
            // Get the download URL for the uploaded image
            const downloadURL = await getDownloadURL(snapshot1.ref);
            // Now store image data in Firestore
            await addDoc(collection(FirestoreDatabase, 'adopt'), {
                ...formState,
                image: downloadURL,

            });
            // You can also display a success message if needed
             setLoader(false)
            message.success('Pet uploaded successfully');
            //  navigate("/dashboard")
        } catch (error) {
            // Handle errors
             setLoader(false)
            console.error('Error uploading image:', error);
            message.error('Failed to upload image: ' + error.message);
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-center">
          {loader ?<MoonLoader color="#000000" /> :  
          <section className="rounded-md p-2 bg-white w-full">
                <div className="flex items-center justify-center my-3">
                    <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2"></div>
                        <h2 className="text-2xl font-bold leading-tight">
                            Add for Adoption
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Add the  pet you want to be adopted here!
                        </p>
                        <form onSubmit={handleSubmit} className="mt-5">
                            <div class="space-y-4">
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Name of the Pet?
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
                                        What kind of pet?
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={formState.animal || ""}
                                            onChange={handleChange}
                                            placeholder="(e.g. Dog,Cat)"
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="animal"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Birthday
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={formState.date || ""}
                                            onChange={handleChange}
                                            placeholder="Bday"
                                            type="date"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="date"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        What is the Age?
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={formState.age || ""}
                                            onChange={handleChange}
                                            placeholder="Age"
                                            type="number"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="age"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Breed
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={formState.breed || ""}
                                            onChange={handleChange}
                                            placeholder="Breed"
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="breed"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Color
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={formState.color || ""}
                                            onChange={handleChange}
                                            placeholder="Color"
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            name="color"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between">
                                        <div className="flex gap-4 mb-2">
                                            <div className="flex gap-2 flex-row-reverse font-semibold">
                                                <label htmlFor="female">Female </label>
                                                <input type="radio" name="gender" id="female" value="female" checked={formState.gender === "female"} onChange={handleChange} />
                                            </div>

                                            <div className="flex gap-2 flex-row-reverse font-semibold">
                                                <label htmlFor="male">Male </label>
                                                <input type="radio" name="gender" id="male" value="male" checked={formState.gender === "male"} onChange={handleChange} />
                                            </div>


                                        </div>
                                    </div>
                                    <div >
                                        <p className="text-base font-medium text-gray-900">Vacinated?</p>
                                        <div className="flex gap-4 mb-2">
                                            <div className="flex gap-2 flex-row-reverse font-semibold">
                                                <label htmlFor="yes">Yes </label>
                                                <input type="radio" name="vacinated" id="yes" value="yes" checked={formState.vacinated === "yes"} onChange={handleChange} />
                                            </div>

                                            <div className="flex gap-2 flex-row-reverse font-semibold">
                                                <label htmlFor="male">No </label>
                                                <input type="radio" name="vacinated" id="no" value="no" checked={formState.vacinated === "no"} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between mt-3">
                                        <label className="text-base font-medium text-gray-900">
                                            Pet Image
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
                                        Add for Adoption
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

          }
        </div>

    )
}