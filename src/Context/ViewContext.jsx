import { createContext, useContext, useEffect, useState } from "react";
import { FirestoreDatabase, auth } from "../Auth/Config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {message} from 'antd'

const ViewContext = createContext()

export const useView = () => useContext(ViewContext)

export const ViewProvider = ({children}) =>{
    const [view, setView] = useState([])
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
      });
      return () => unsubscribe();
  }, []);
      //view item
  const viewItem = (event) => {
    setView([event])
    console.log(view);
  }
  const addToAdopt = async (product) => {
    const isProductInCart = cart.some(item => item.id === product.id);
    if (!isProductInCart) {
      setCart([...cart, product]);
      message.success("Added to cart");
      try {
        // Check if the user has an existing cart document
        const cartDocRef = doc(FirestoreDatabase, 'AdoptedCart', user?.uid); // Assuming userId is available
        const cartDocSnap = await getDoc(cartDocRef);
        
        if (cartDocSnap.exists()) {
          // If the cart document exists, update it with the new data
          const updatedCartData = {
            ...cartDocSnap.data(),
            products: {
              ...cartDocSnap.data().products,
              [product.id]: product
            }
          };
          await setDoc(cartDocRef, updatedCartData);
          console.log('Cart document successfully updated');
        } else {
          // If the cart document doesn't exist, create it with the new data
          const cartData = {
            products: {
              [product.id]: product
            }
          };
          await setDoc(cartDocRef, cartData);
          console.log('Cart document created');
        }
      } catch (error) {
       console.log('Error updating/creating cart document: ', error);
      }
    } else {
      message.success("Already in the cart");
    }
  }

  return(
    <ViewContext.Provider value={{view, cart, viewItem,addToAdopt}}>{children}</ViewContext.Provider>
  )
}