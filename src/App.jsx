import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />}/>
      <Route path="/checkout" element={<CheckoutPage />}/>
    </Routes>
  );
}

export default App;
