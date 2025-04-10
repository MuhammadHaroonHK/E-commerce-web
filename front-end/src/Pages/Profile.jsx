import { useNavigate } from 'react-router-dom'
import MyOrders from './MyOrders'

const Profile = () => {
    const nevigate=useNavigate()
    const handleLogout=() => {
        nevigate("/login");
    }
    
    return (
        <div className='p-1 md:p-4'>
            {/* Left side */}
            <div className='flex flex-col gap-6'>
                <div className='border-2 rounded-xl p-6 mx-auto text-center bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3'>
                    <h2 className='font-bold text-2xl'>Muhammd Haroon</h2>
                    <p className='text-gray-600 my-3'>haroonhk059@gmail.com</p>

                    <button className='border-red-900 border-[1px] py-2 px-4 rounded-lg bg-red-500 text-white sm:w-full hover:bg-red-900'
                    onClick={handleLogout}>Log Out</button>
                </div>

            {/* Right side */}
            <MyOrders/>
            </div>
        </div>
    )
}

export default Profile
