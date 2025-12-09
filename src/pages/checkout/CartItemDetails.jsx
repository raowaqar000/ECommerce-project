import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [updateItem, setUpdateItem] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  const updateCartItem = async () => {
    if(updateItem){
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity),
    });
    await loadCart();
    }
    setUpdateItem(!updateItem)
    
  };

  const changeQuantity = async (e) => {
    setQuantity(e.target.value);
  };

  const enterKey = (e) => {
    const keyPressed = e.key
    if(keyPressed === "Enter"){
        updateCartItem()
    } else if(keyPressed === "Escape"){
        setQuantity(cartItem.quantity)
        setUpdateItem(false)
    }
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {updateItem ? (
              <input
                type="number"
                className="quantity-textbox"
                value={quantity}
                onChange={changeQuantity}
                onKeyDown={enterKey}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
