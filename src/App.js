import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
