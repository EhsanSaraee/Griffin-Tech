import { useStateContext } from 'context/StateContext';
import { urlFor } from 'lib/client';
import Link from 'next/link';
import { useRef } from 'react';
import {
   AiOutlineMinus,
   AiOutlinePlus,
   AiOutlineLeft,
   AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

const Cart = () => {
   const cartRef = useRef();
   const {
      totalPrice,
      setShowCart,
      cartItems,
      totalQuantities,
      incQty,
      decQty,
      qty,
      toggleCartItemQuantity,
      onRemove,
   } = useStateContext();

   return (
      <section className="cart-wrapper" ref={cartRef}>
         <div className="cart-container">
            <button
               className="cart-heading"
               type="button"
               onClick={() => setShowCart(false)}
            >
               <AiOutlineLeft />
               <span className="heading">Your Cart</span>
               <span className="cart-num-items">({totalQuantities}items)</span>
            </button>
            {cartItems.length < 1 && (
               <div className="empty-cart">
                  <AiOutlineShopping size={150} />
                  <h3>Your shopping cart is empty</h3>
                  <Link passHref href="/">
                     <button
                        type="button"
                        className="btn"
                        onClick={() => setShowCart(false)}
                     >
                        Continue Shopping
                     </button>
                  </Link>
               </div>
            )}
            <div className="product-container">
               {cartItems.length >= 1 &&
                  cartItems.map((item) => (
                     <div className="product" key={item._id}>
                        <img
                           src={urlFor(item?.image[0])}
                           className="cart-product-image"
                           alt={item.name}
                        />
                        <div className="item-desc">
                           <div className="flex top">
                              <h5>{item.name}</h5>
                              <h4>${item.price}</h4>
                           </div>
                           <div className="flex bottom">
                              <div>
                                 <p className="quantity-desc">
                                    <span
                                       className="minus"
                                       onClick={() =>
                                          toggleCartItemQuantity(
                                             item._id,
                                             'dec'
                                          )
                                       }
                                    >
                                       <AiOutlineMinus />
                                    </span>
                                    <span className="num">{item.quantity}</span>
                                    <span
                                       className="plus"
                                       onClick={() =>
                                          toggleCartItemQuantity(
                                             item._id,
                                             'inc'
                                          )
                                       }
                                    >
                                       <AiOutlinePlus />
                                    </span>
                                 </p>
                              </div>
                              <button
                                 type="button"
                                 className="remove-item"
                                 onClick={() => onRemove(item)}
                              >
                                 <TiDeleteOutline />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
            {cartItems.length >= 1 && (
               <div className="cart-bottom">
                  <div className="total">
                     <h3>Subtotal: </h3>
                     <h3>{totalPrice}</h3>
                  </div>
                  <div className="btn-container">
                     <button type="button" className="btn">
                        Payment
                     </button>
                  </div>
               </div>
            )}
         </div>
      </section>
   );
};

export default Cart;
