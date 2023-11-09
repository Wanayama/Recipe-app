import React, { useState } from 'react'
import banner2 from '../assets/banner5.webp'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { imgDB, textDB } from '../firebase'
import { v4 } from "uuid";
import { addDoc, collection } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Upload = () => {

    const [recipeName, setRecipeName] = useState('')
    const [quisene, setQuisene] = useState('')
    const [mealType, setMealType] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [img, setImg] = useState('')

    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const imgs = ref(imgDB, `images/${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then(data => {
            getDownloadURL(data.ref).then(val => {
                setImg(val)

                console.log(val)
            })
        })
    }


    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            const valRef = collection(textDB, "recipes")
            await addDoc(valRef, { recipeName: recipeName, quisene: quisene, mealType:mealType, ingredients: ingredients, imgUrl: img })
            alert("Recipe added successfully!");

            navigate('/account')
            // console.log(valRef)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='w-full h-screen flex items-start'>
            <div className='relative w-1/2 h-full flex flex-col'>
                <div className='absolute top-[20%] left-[10%] flex flex-col'>
                    <h1 className='text-4xl text-white font-bold my-4'>Let the world know about your recipes</h1>
                    <p className='text-xl text-white font-normal'>Upload a recipe for free and start a healthy community</p>
                </div>

                <img src={banner2} className='w-full h-full object-cover' alt='banner' />
            </div>

            <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
                <h1 className='text-base text-[#060606] font-semibold'>Bon appetit</h1>

                <div className='w-full flex flex-col max-w-[400px]'>
                    <div className='w-full mb-2 flex flex-col'>
                        <h3 className='text-3xl font-semibold mb-2'>Post recipe</h3>
                        <p className='text-sm mb-1 md:mb-2'> Please enter your details</p>
                    </div>

                    <form onSubmit={handleUpload} className='w-full flex flex-col'>
                        <input type='text'
                            value={recipeName}
                            onChange={e => setRecipeName(e.target.value)}
                            placeholder='Dish name'
                            className='w-full text-black  py-1 px-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

                        <input type='text'
                            value={quisene}
                            onChange={e => setQuisene(e.target.value)}
                            placeholder='Quisene type'
                            className='w-full text-black  py-1 px-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

                        <input type='text'
                            value={mealType}
                            onChange={e => setMealType(e.target.value)}
                            placeholder='Meal Type'
                            className='w-full text-black  py-1 px-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

                        <textarea type='text'
                            value={ingredients}
                            onChange={e => setIngredients(e.target.value)}
                            placeholder='Enter ingredients here...'
                            className='w-full text-black  py-1 px-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />
                        <input type='file'
                            onChange={(e) => handleImageUpload(e)}
                            placeholder='Choose image'
                            className='w-full text-black  py-1 px-2 my-2 bg-transparent outline-none focus:outline-none' />

                        <div className='flex flex-col w-full my-2 md:my-4'>
                            <button type='submit' className='w-full my-1 md:my-2 cursor-pointer text-white font-semibold bg-black rounded-md p-2 md:p-4 text-center justify-center'>Upload</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Upload