import "./checkout.css";
import "./CheckoutHeader.css";
import Checkout from "./Checkout";
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
function CheckoutPage({ cart, loadCart}) {
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
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );

      setDeliveryOptions(response.data);
    };
    fetchCheckoutData()
  }, []);
  useEffect(() => {
    const fetchPaymentSummary = async () => {
      let response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    }
    fetchPaymentSummary()
  }, [cart])
  window.axios = axios;
  return (
    <>
      <Checkout />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
