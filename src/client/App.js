import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Exercises from "./pages/Exercises";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import PrivateRoute from "./components/PrivateRoute";

const store = configureStore({
  reducer: authReducer,
});

const App = () => (
  <Provider store={store}>
    <div className="bg-gray-200">
      <div className="min-h-screen flex flex-col max-w-6xl m-auto">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/exercises">
              <Exercises />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </div>
  </Provider>
);
export default App;
