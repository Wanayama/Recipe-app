import React, { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import RecipeCard from '../Components/RecipeCard';
import { fetchRecipes } from '../utils/server';
import Loader from '../Components/Loader';

const Favourite = () => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    const { item, isEmpty, removeItem, emptyCart } = useCart();

    const fetchRecipe = async () => {
        try {
            const data = await fetchRecipes({ recipes })

            setRecipes(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchRecipe()
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }

    if (isEmpty) return <div className='text-white w-full items-center justify-center py-20'>
        <p className='text-center'>Oops! No Recipe Found</p>
    </div>

    return (
        <div className='w-full p-20'>
            <h1 className='text-white text-2xl'>Manage your favourite recipies</h1>

            <div className='w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
                {
                    recipes?.map((item, index) => (
                        <RecipeCard recipe={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Favourite