import { useEffect } from "react";
import Header from "../components/Header";
import "./Homepage.css";
import { products } from "../../project-code/data/products";

function Homepage() {
  useEffect(() => {
    document.title = "MyShop";
    const setFavicon = (url) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = url;
    };
    // favicon file placed in public folder; adjust path if located elsewhere
    setFavicon("/home-favicon.png");
  }, []);

  // async function getProducts() {
  //   const response = await fetch("http://localhost:3000/api/products")
  //   const data = await response.json()
  //   console.log(data);

  // }
  // getProducts()

  fetch("http://localhost:3000/api/products").then((response) => {
    response.json().then((data) => {
      console.log(data);
    });
  });
  return (
    <>
      <Header />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${
                      product.rating.stars * 10
                    }.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  {(product.priceCents / 100).toFixed(2)}
                </div>

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Homepage;
