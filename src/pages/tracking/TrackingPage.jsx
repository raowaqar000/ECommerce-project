import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./tracking.css";
import { Link, useParams } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      console.log(response.data);
      setTrackingData(response.data);
    };
    fetchTrackingData();
  }, [orderId]);
  useEffect(() => {
    document.title = "Track your Order";
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
    setFavicon("/tracking-favicon.png");
  }, []);

  if (!trackingData) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const product = trackingData.products.find((p) => p.productId === productId);
  if (!product) {
    return <div>Product not found</div>;
  }

  const totalDeliveryTimeMs =
    product.estimatedDeliveryTimeMs - trackingData.orderTimeMs;
  let timePassMs = dayjs().valueOf() - trackingData.orderTimeMs;
  let deliveryPercent = (timePassMs / totalDeliveryTimeMs) * 100;
  // clamp and round so equality checks work reliably
  deliveryPercent = Math.max(0, Math.min(100, deliveryPercent));
  deliveryPercent = Math.round(deliveryPercent);

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  const status =
    deliveryPercent >= 100
      ? "Delivered"
      : deliveryPercent >= 50
      ? "Shipped"
      : "Preparing";

  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {isDelivered ? "Delivered on" : "Arriving on"}{" "}
            {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D")}
          </div>

          <div className="product-info">{product.product.name}</div>

          <div className="product-info">Quantity: {product.quantity}</div>

          <img
            className="product-image"
            src={product.product.image}
            alt={product.product.name}
          />
        </div>

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && "current-status"}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && "current-status"}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && "current-status"}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${deliveryPercent}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
