import "./checkout/checkout.css";
import "./checkout/CheckoutHeader.css";
import Checkout from "./Checkout";
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";
import dayjs from "dayjs";
import { OrderSummary } from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
function CheckoutPage({ cart }) {
  useEffect(() => {
    document.title = "Cart";
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
    setFavicon("/cart-favicon.png");
  }, []);

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);
  return (
    <>
      <Checkout />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
