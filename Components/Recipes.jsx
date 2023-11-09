import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import Searchbar from './SearchBar'
import { BiSearchAlt2 } from "react-icons/bi";
import RecipeCard from './RecipeCard';
import { fetchRecipes } from '../utils/server';
import Button from './Button'

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('Vegan', 'High-protein', 'vegeterian', 'balanced')
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    


    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const fetchRecipe = async () => {
        try {
            const data = await fetchRecipes({ query, limit })

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

    const handleSearchedRecipe = async (e) => {
        e.preventDefault()
        fetchRecipe()
    }

    const showMore = () => {
        setLimit(prev => prev + 10)
        fetchRecipe()
    }
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-center
        pt-10 pb-5 px-0 md:px10'>
                <form className='w-full lg:w-2/4' onSubmit={handleSearchedRecipe}>
                    <Searchbar placeholder="eg. chicken, ugali, vegan"
                        handleInputChange={handleChange}
                        rightIcon={<BiSearchAlt2 className='text-gray-600' />} />
                </form>
            </div>

            {
                recipes?.length > 0 ? (
                    <>
                        <div className='w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
                            {
                                recipes?.map((item, index) => (
                                    <RecipeCard recipe={item} key={index} />
                                ))
                            }
                        </div>

                        <div className='flex w-full items-center justify-center py-10'>
                            <button className='text-white bg-green-800 px-3 py-1 rounded-full text-sm' onClick={showMore}>Show More</button>
                        </div>
                    </>
                ) : <div className='text-white w-full items-center justify-center py-10'>
                    <p className='text-center'>Oops! No Recipe Found</p>
                </div>
            }
        </div>
    )
}

export default Recipes