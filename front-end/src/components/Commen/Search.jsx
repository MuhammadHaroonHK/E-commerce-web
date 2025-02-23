import React, { useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const Search = ({ closeSearch }) => {

    const [search, setSearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("search", search);
        closeSearch(false)
    }
    return (
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col sm:flex-row bg-slate-100 p-4 sm:p-6 relative w-full top-0 z-30 shadow-lg'>
            <div className='relative w-full sm:w-1/2 vsm:w-[250px] mx-auto'>
                <input 
                    type="text" 
                    placeholder='Search'
                    onChange={(e)=>{setSearch(e.target.value)}}
                    value={search} 
                    className='border border-black rounded-lg outline-none p-2 w-full' 
                />
                <button type='submit' className='absolute top-1/2 -translate-y-1/2 right-10 sm:right-4 vsm:right-2 w-6 h-6 sm:w-6 sm:h-6'>
                    <CiSearch className='w-full h-full' />
                </button>
            </div>
            <div className='absolute top-4 sm:top-7 right-4 sm:right-8 cursor-pointer w-6 h-6 sm:w-6 sm:h-6'>
                <MdOutlineClose onClick={closeSearch} className='w-full h-full' />
            </div>
        </div>
        </form>
    );
};

export default Search;
