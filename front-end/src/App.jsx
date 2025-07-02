import UserLayout from "./components/Layout/UserLayout"
import { Toaster } from "sonner"
import Home from "./Pages/Home"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import Collection from "./Pages/Collection"
import CheckOut from "./Pages/CheckOut"
import ConformPage from "./Pages/ConformPage"
import OrderDetails from "./Pages/OrderDetails"
import MyOrders from "./Pages/MyOrders"
import BestSeller from "./Products/BestSeller"
import AdminLayout from "./components/Admin/AdminLayout"
import UserMange from "./components/Admin/UserMange"
import AdminMainContent from "./components/Admin/AdminMainContent"
import ProductManagement from "./components/Admin/ProductManagement"
import EditProduct from "./components/Admin/EditProduct"
import OrderManagement from "./components/Admin/OrderManagement"

import {Provider} from "react-redux"
import store from "./redux/store"
import ProtectedRoute from "./components/Commen/ProtectedRoute"
function App() {

  return (
    <>
    <Provider store={store}>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection/all" element={<Collection />} />
          <Route path="product/:id" element={<BestSeller />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/conform-order" element={<ConformPage />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Route>
        {/* Admin Layout */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /> </ProtectedRoute>}>
          <Route index element={<AdminMainContent />} />
          <Route path="users" element={<UserMange />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProduct />} />
          <Route path="Orders" element={<OrderManagement />} />
        </Route>

      </Routes>
      </Provider>
    </>
  )
}

export default App
