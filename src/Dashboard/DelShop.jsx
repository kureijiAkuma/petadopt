import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { DB, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import background from "../images/bg_2.jpg"

export default function DelShop() {
    const [shopItems, setShopItems] = useState([]);

    useEffect(() => {
        const fetchShopItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(DB, "shopitems"));
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), expanded: false }));
                setShopItems(data);
            } catch (error) {
                console.error("Error fetching shop items:", error);
            }
        };

        fetchShopItems();
    }, []);

    const handleDeleteItem = async (id, thumbnailUrl, imageUrls) => {
        try {
            // Delete thumbnail from storage
            await deleteObject(ref(storage, thumbnailUrl));

            // Delete images from storage
            await Promise.all(imageUrls.map(url => deleteObject(ref(storage, url))));

            // Delete document from Firestore
            await deleteDoc(doc(DB, "shopitems", id));
            setShopItems(shopItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting shop item:", error);
        }
    };

    // Function to truncate the description after 15 words
    const truncateDescription = (description) => {
        const words = description.split(" ");
        if (words.length > 15) {
            return words.slice(0, 15).join(" ") + "...";
        } else {
            return description;
        }
    };

    // Function to toggle the expanded state of the description
    const toggleExpand = (id) => {
        setShopItems(
            shopItems.map((item) => {
                if (item.id === id) {
                    return { ...item, expanded: !item.expanded };
                } else {
                    return item;
                }
            })
        );
    };

    return (
        <div className={`relative min-h-screen max-h-fit w-full pt-24 p-5 flex gap-4 flex-col justify-start bg-red-200` }>
            <table className="border-separate border-spacing-0 bg-gray-300 p-5 border border-solid border-black rounded-lg">
                <thead>
                    <tr>
                        <th className="sticky top-16 pt-4 bg-gray-300 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Name</th>
                        <th className="sticky top-16 pt-4 bg-gray-300 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Price</th>
                        <th className="sticky top-16 pt-4 bg-gray-300 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Quantity</th>
                        <th className="sticky top-16 pt-4 bg-gray-300 max-w-40 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Description</th>
                        <th className="sticky top-16 pt-4 bg-gray-300 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Thumbnail</th>
                        <th className="sticky top-16 pt-4 bg-gray-300 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Featured Images</th>
                        <th className="sticky top-16 pt-4 bg-gray-300 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Date Created</th>
                        <th className="sticky top-16 pt-4 bg-gray-300 font-Roboto font-semibold text-base border-solid border-b-2 border-black">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shopItems.map((item) => {
                        const { id, name, price, quantity, description, thumbnailUrl, imgUrls, createdAt } = item;
                        const createdAtDate = new Date(createdAt.seconds * 1000);
                        const formattedCreatedAt = `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()} ${createdAtDate.getHours()}:${createdAtDate.getMinutes()} ${createdAtDate.getHours() >= 12 ? 'PM' : 'AM'}`;

                        return (
                            <tr key={id}>
                                <td className="font-Roboto font-normal text-center text-base border-solid border-b-2 border-black">{name}</td>
                                <td className="font-Roboto font-normal text-center text-base border-solid border-b-2 border-black">₱ {price}</td>
                                <td className="font-Roboto font-normal text-center text-base border-solid border-b-2 border-black">{quantity}</td>
                                <td className="max-w-40 break-words font-Roboto font-normal text-center text-base border-solid border-b-2 border-black">
                                    {item.expanded ? description : truncateDescription(description)}
                                    {description.split(" ").length > 15 && (
                                        <button className="ml-2 text-blue-500 hover:underline" onClick={() => toggleExpand(id)}>
                                            {item.expanded ? "collapse" : "expand"}
                                        </button>
                                    )}
                                </td>
                                <td className="font-Roboto font-normal text-center text-base border-solid border-b-2 border-black text-light-blue-900 underline"><a target="blank" href={thumbnailUrl}>img1</a></td>
                                <td className="text-center space-x-2 font-Roboto font-normal text-base border-solid border-b-2 border-black">
                                    <a target="blank" className="font-Roboto text-base font-normal text-light-blue-900 underline" href={imgUrls[0]}>img1</a>
                                    <a target="blank" className="font-Roboto text-base font-normal text-light-blue-900 underline" href={imgUrls[1]}>img2</a>
                                    <a target="blank" className="font-Roboto text-base font-normal text-light-blue-900 underline" href={imgUrls[2]}>img3</a>
                                    <a target="blank" className="font-Roboto text-base font-normal text-light-blue-900 underline" href={imgUrls[3]}>img4</a>
                                </td>
                                <td className="break-words font-Roboto font-normal text-center text-base border-solid border-b-2 border-black">{formattedCreatedAt}</td>
                                <td className="font-Roboto font-normal text-center text-red-900 text-base border-solid border-b-2 border-black">
                                    <button className="" onClick={() => handleDeleteItem(id, thumbnailUrl, imgUrls)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
