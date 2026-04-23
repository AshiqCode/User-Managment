import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
