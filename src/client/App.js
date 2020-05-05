import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="bg-gray-200">
    <div className="min-h-screen flex flex-col max-w-6xl m-auto">
      <Navbar />
      <Register />
    </div>
  </div>
);
export default App;
