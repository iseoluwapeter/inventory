import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./components/Orders";
import Suppliers from "./components/Suppliers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Staffs from "./components/Staffs";


import Products from "./pages/Products";
import Category from "./pages/Category";
import Payment from "./pages/Payment";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Customers from "./components/Customers";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route element={<Layout />}>
          {/* Protected Routes */}
          <Route path="*" element={<ErrorPage/>}/>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suppliers"
            element={
              <ProtectedRoute>
                <Suppliers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staffs"
            element={
              <ProtectedRoute>
                <Staffs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
