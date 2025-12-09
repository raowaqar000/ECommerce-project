import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/home/HomePage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutPage from "./pages/checkout/CheckoutPage";

function App() {
    const [cart, setCart] = useState([])
    // useEffect(() => {
    //   axios.get("/api/cart-items?expand=product")
    //   .then((response) => {    
    //     console.log(response.data);
          
    //     setCart(response.data)
    //   })
    // }, [])

    const loadCart = async () => {
        const response = await axios.get("/api/cart-items?expand=product")
        setCart(response.data)
      }

    useEffect(() => {
      
      loadCart()
    },[])

  return (
    <Routes>
      <Route index element={<Homepage cart={cart} loadCart={loadCart}/>}/>
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />}/>
      <Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart} />}/>
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}

export default App;
