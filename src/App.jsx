import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [cart, setCart] = useState([])
    useEffect(() => {
      axios.get("/api/cart-items?expand=product")
      .then((response) => {    
        console.log(response.data);
          
        setCart(response.data)
      })
    }, [])

  return (
    <Routes>
      <Route index element={<Homepage cart={cart}/>}/>
      <Route path="/checkout" element={<CheckoutPage cart={cart} />}/>
      <Route path="/orders" element={<OrdersPage />}/>
      <Route path="/tracking" element={<TrackingPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}

export default App;
