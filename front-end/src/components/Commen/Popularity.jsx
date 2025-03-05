import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Popularity = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const handleSortChange = (e) => {
        const sortBy=e.target.value;

        searchParams.set("sortBy", sortBy);
        setSearchParams(searchParams);
    };

  return (
    <div>
        <select id="sort" 
        className='border-2 py-1 px-3'
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}>
            <option value="">Default</option>
            <option value="priceAsc">Price: low to high</option>
            <option value="priceDsc">Price: high to low</option>
            <option value="popularity">Popularity</option>
        </select>
    </div>
  )
}

export default Popularity