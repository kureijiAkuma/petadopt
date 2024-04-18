import { collection, getDocs } from "firebase/firestore";
import { DB } from "../firebase";


export const GetAdopt = async () => {
    try {
        const events = await getDocs(collection(DB, "adopt"))
        return {
            success: true,
            data: events.docs.map((doc) => {
                return { ...doc.data(), id: doc.id, }
            }),
        }
    } catch (error) {
        return (error)
    }
};

export const GetProduct = async () => {
    try {
        const events = await getDocs(collection(DB, "shopitems"))
        return {
            success: true,
            data: events.docs.map((doc) => {
                return { ...doc.data(), id: doc.id, }
            }),
        }
    } catch (error) {
        return (error)
    }
};