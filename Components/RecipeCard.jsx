import React from 'react'
import { Link } from "react-router-dom";
import { BsFillBagHeartFill } from "react-icons/bs";

const RecipeCard = ({ recipe }) => {

    const { image, label, cuisineType, dietLabel, mealType, uri } = recipe?.recipe
    const id = uri?.split('#')[1]

    // console.log(id)



    return (
        <div className='w-full md:w-[220px]'>
            <div className='w-full shadow rounded-lg hover:scale-110 transition-[4s]'>
                <BsFillBagHeartFill className='text-green-500 cursor-pointer mt-2' size={18} />
                <Link to={`/recipes/${id}`}>
                    <img src={image} alt='label' className='rounded-lg h-[200px] md:h-[150px] w-full ' />
                </Link>
                <div className='p-3'>
                    <p className='text-white font-semibold'>{label}</p>
                    <div className='mt-2'>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500'>
                            {cuisineType}
                        </span>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500'>
                            {mealType}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard