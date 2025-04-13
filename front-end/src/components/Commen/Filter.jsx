import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';


const Filter = () => {

    const navigate = useNavigate();
    const catagorie = ["Top Wear", "Bottom Wear"];
    const gender = ["Men", "Women"];
    const colors = ["blue", "black", "green", "yellow", "red"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materiale = ["Cooton", "Whool", "Leadher", "Polyster"];
    const brands = ["Addidas", "Nike", "PUMA", "J."];

    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState({
        catagorie: "",
        gender: "",
        colors: "",
        sizes: [],
        materiale: [],
        brands: [],
    });

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilter({
            catagorie: params.catagorie || "",
            gender: params.gender || "",
            colors: params.colors || "",
            sizes: params.sizes ? params.sizes.split(",") : [],
            materiale: params.materiale ? params.materiale.split(",") : [],
            brands: params.brands ? params.brands.split(",") : [],
        });

    }, [searchParams]);

    const handleFilter = (e) => {
        const { name, value, checked, type } = e.target;
        // console.log({name, value, checked, type});

        let newfilter = { ...filter };

        if (type === "checkbox") {
            if (checked) {
                newfilter[name] = [...(newfilter[name] || []), value]
            } else {
                newfilter[name] = newfilter[name].filter((item) => item !== value);
            }
        } else {
            newfilter[name] = value;
        }

        setFilter(newfilter);
        updateURL(newfilter)
        // console.log(newfilter)
    }

    const updateURL = (newfilter) => {
        const params = new URLSearchParams();
        Object.keys(newfilter).forEach((key) => {
            if (Array.isArray(newfilter[key]) && newfilter[key].length > 0) {
                params.set(key, newfilter[key].join(","));
            } else if (newfilter[key]) {
                params.set(key, newfilter[key]);
            }
        });

        setSearchParams(params);

        navigate(`?${params.toString()}`)
    }

    return (
        // Container
        <div className=''>
            <h2 className='font-semibold text-xl'>Filter</h2>

            {/* Categories */}
            <h2 className='font-medium text-lg mt-6 mb-2'>
                Categories
            </h2>
            {catagorie.map((categ) => (
                <div key={categ}>
                    <input type="radio" name='catagorie'
                        value={categ}
                        onChange={handleFilter}
                    />
                    <label className='ml-2'>{categ}</label>
                </div>
            ))}

            {/* Gender */}
            <h2 className='font-medium text-lg mt-6 mb-2'>
                Gender
            </h2>
            {gender.map((gen) => (
                <div key={gen}>
                    <input type="radio" name='gender'
                        value={gen}
                        onChange={handleFilter}
                    />
                    <label className='ml-2'>{gen}</label>
                </div>
            ))}

            {/* Color */}
            <h2 className='font-medium text-lg mt-6 mb-2'>
                Color
            </h2>
            <div className='flex flex-wrap'>
                {colors.map((col) => (

                    <button key={col} className='w-6 h-6 rounded-full border-2 cursor-pointer' style={{ backgroundColor: `${col}` }} onClick={handleFilter} value={col} name='colors'></button>
                ))}
            </div>

            {/* Size */}

            <h2 className='font-medium text-lg mt-6 mb-2'>
                Size
            </h2>

            <div>
                {sizes.map((size) => (
                    <div key={size}>
                        <input type="checkbox" name='sizes'
                            value={size}
                            onChange={handleFilter}
                        />
                        <label className='ml-2'>{size}</label>
                    </div>
                ))}
            </div>

            {/* Material */}

            <h2 className='font-medium text-lg mt-6 mb-2'>
                Material
            </h2>
            <div>
                {materiale.map((mat) => (
                    <div key={mat}>
                        <input type="checkbox" name='materiale'
                            value={mat}
                            onChange={handleFilter}
                        />
                        <label className='ml-2'>{mat}</label>
                    </div>
                ))}
            </div>


            {/* Brand */}

            <h2 className='font-medium text-lg mt-6 mb-2'>
                Brand
            </h2>
            <div>
                {brands.map((brand) => (
                    <div key={brand}>
                        <input type="checkbox" name='brands'
                            value={brand}
                            onChange={handleFilter}
                        />
                        <label className='ml-2'>{brand}</label>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Filter