import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />}/>
      <Route path="/checkout" element={<div>Test checkout page</div>}/>
    </Routes>
  );
}

export default App;
