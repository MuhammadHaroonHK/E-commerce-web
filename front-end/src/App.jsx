import UserLayout from "./components/Layout/UserLayout"
import {Toaster} from "sonner"
import Home from "./Pages/Home"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
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
      </Route>
    </Routes>
    </>
  )
}

export default App
