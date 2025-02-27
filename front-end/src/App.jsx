import UserLayout from "./components/Layout/UserLayout"
import {Toaster} from "sonner"
import Home from "./Pages/Home"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
function App() {

  return (
    <>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" elemen={<UserLayout/>}/>
      <Route index element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
