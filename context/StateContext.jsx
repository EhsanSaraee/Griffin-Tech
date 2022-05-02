import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantities, setTotalQuantities] = useState(0);
   const [qty, setQty] = useState(1);

   let foundedProduct;
   let index;

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
   };

   const onRemove = (product) => {
      foundedProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      setTotalPrice(
         (prevTotalPrice) => prevTotalPrice - product.price * product.quantity
      );
      setTotalQuantities(
         (prevTotalQuantities) => prevTotalQuantities - product.quantity
      );
      setCartItems(newCartItems);
   };

   const toggleCartItemQuantity = (id, value) => {
      foundedProduct = cartItems.find((item) => item._id === id);
      index = cartItems.findIndex((product) => product._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id);

      if (value === 'inc') {
         setCartItems([
            ...newCartItems,
            { ...foundedProduct, quantity: foundedProduct.quantity + 1 },
         ]);
         setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + foundedProduct.price
         );
         setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (value === 'dec') {
         if (foundedProduct.quantity > 1) {
            setCartItems([
               ...newCartItems,
               { ...foundedProduct, quantity: foundedProduct.quantity - 1 },
            ]);
            setTotalPrice(
               (prevTotalPrice) => prevTotalPrice - foundedProduct.price
            );
            setTotalQuantities(
               (prevTotalQuantities) => prevTotalQuantities - 1
            );
         } else {
            onRemove(foundedProduct);
         }
      }
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
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
         }}
      >
         {children}
      </Context.Provider>
   );
};

export const useStateContext = () => useContext(Context);
