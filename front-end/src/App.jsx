import UserLayout from "./components/Layout/UserLayout"
import {Toaster} from "sonner"
import Home from "./Pages/Home"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import Collection from "./Pages/Collection"
import CheckOut from "./Pages/CheckOut"
import ConformPage from "./Pages/ConformPage"
function App() {

  return (
    <>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/collection" element={<Collection/>} />
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route path="/conform-order" element={<ConformPage/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
