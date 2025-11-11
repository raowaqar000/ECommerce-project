import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />}/>
      <Route path="/checkout" element={<CheckoutPage />}/>
      <Route path="/orders" element={<OrdersPage />}/>
      <Route path="/tracking" element={<TrackingPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}

export default App;
