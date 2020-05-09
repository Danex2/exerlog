import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Exercises from "./pages/Exercises";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Create from "./pages/Create";

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
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect exact from="/" to="/login" />
            <Route path="/workouts">
              <Exercises />
            </Route>
            <PrivateRoute path="/create" component={Create} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  </Provider>
);
export default App;
