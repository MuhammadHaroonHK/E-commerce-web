import React from 'react'

const Filter = () => {

    const catagorie = ["Top Wear", "Bottom Wear"];
    const gender = ["Men", "Women"];
    const colors = ["blue", "black", "green", "yellow", "red"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materiale = ["Cooton", "Whool", "Leadher", "Polyster"];

    return (
        // Container
        <div className=''>
            <h2 className='font-semibold text-xl'>Filter</h2>

            {/* Categories */}
            <h2 className='font-medium text-lg mt-6 mb-2'>
                Categories
            </h2>
            {catagorie.map((categ) => (
                <div>
                    <input type="radio" name='categorie' />
                    <label className='ml-2'>{categ}</label>
                </div>
            ))}

            {/* Gender */}
            <h2 className='font-medium text-lg mt-6 mb-2'>
                Gender
            </h2>
            {gender.map((gen) => (
                <div>
                    <input type="radio" name='gender' />
                    <label className='ml-2'>{gen}</label>
                </div>
            ))}

            {/* Color */}
            <h2 className='font-medium text-lg mt-6 mb-2'>
                Color
            </h2>
            <div className='flex flex-wrap'>
                {colors.map((col) => (

                    <div className='w-6 h-6 rounded-full border-2 cursor-pointer' style={{ backgroundColor: `${col}` }}></div>
                ))}
            </div>

            {/* Size */}

            <h2 className='font-medium text-lg mt-6 mb-2'>
                Size
            </h2>

            <div>
                {sizes.map((size) => (
                    <div>
                        <input type="checkbox" />
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
                    <div>
                        <input type="checkbox" />
                        <label className='ml-2'>{mat}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter