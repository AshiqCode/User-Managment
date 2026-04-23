import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
