import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  //get redirct parameter and check if it is checkout
  const redirct = new URLSearchParams(location.search).get("redirct") || "/";
  const isCheckoutRedirct = redirct.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirct ? "/checkout" : "/")
        })
      } else {
        // Even if there's nothing to merge, still navigate
        navigate(isCheckoutRedirct ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirct, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  return (
    <div className='mx-auto'>
      <div className='w-[100%] h-[450px] flex flex-col items-center justify-center'>
        <div className='sm:border-2 rounded-lg w-[100%] sm:w-[350px] p-4 sm:p-6 mt-0 sm:mt-6'>
          <h2 className='text-3xl font-bold text-center my-4'>
            Login
          </h2>

          <form className='flex flex-col mx-auto' onSubmit={handleSubmit}>
            <label className='font-semibold text-lg'>Email</label>
            <input type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='border p-1 rounded-md' />
            <label className='font-semibold text-lg pt-3'>Password</label>
            <input type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='border p-1 rounded-md' />
            <button type='submit' className='bg-black text-white px-6 py-2 rounded-lg text-lg hover:bg-gray-900 my-6 mx-10'>Log In</button>

            <p className='text-center mb-3 text-gray-600'>Don't have account?
              <Link to={`/register?redirct=${encodeURIComponent(redirct)}`} className='text-black'>Register</Link></p>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login