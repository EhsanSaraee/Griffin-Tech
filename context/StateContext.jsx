import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState();
   const [totalQuantities, setTotalQuantities] = useState();
   const [qty, setQty] = useState(1);

   const incQty = () => setQty((prevQty) => prevQty + 1);

   const decQty = () =>
      setQty((prevQty) => {
         if (prevQty - 1 < 1) return 1;
         return prevQty - 1;
      });

   const onAdd = (product, quantity) => {
      const existingItem = cartItems.find((item) => item._id === product._id);

      setTotalPrice(
         (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities(
         (prevTotalQuantities) => prevTotalQuantities + quantity
      );

      if (existingItem) {
         const updatedCartItems = cartItems.map((item) => {
            if (item._id === product._id)
               return {
                  ...item,
                  quantity: item.quantity + quantity,
               };
         });

         setCartItems(updatedCartItems);
      } else {
         product.quantity = quantity;

         setCartItems([...cartItems, { ...product }]);
      }
      toast.success(`${qty} ${product.name} added to cart`);
      console.log(cartItems);
   };

   return (
      <Context.Provider
         value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
         }}
      >
         {children}
      </Context.Provider>
   );
};

export const useStateContext = () => useContext(Context);
