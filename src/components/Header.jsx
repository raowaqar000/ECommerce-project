import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import "./header.css";
import { useState } from "react";
function Header({ cart }) {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const nevigate = useNavigate();
  let totalQuantity = 0;

  if (cart) {
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
  }

  const searchBar = (e) => {
    e.preventDefault()    
    nevigate(`/?search=${searchQuery}`);
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <form onSubmit={searchBar} className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="search-button" type="submit" >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </form>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
