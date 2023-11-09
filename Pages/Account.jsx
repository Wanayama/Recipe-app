import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { BsArrowRightShort, BsFillBagHeartFill, BsInstagram } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import { PiTiktokLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { collection, getDocs } from 'firebase/firestore';
import { textDB } from '../firebase';

const Account = () => {
    const { user, logout } = UserAuth();
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const getRecipe = async () => {
        const valRef = collection(textDB, "recipes")
        const dataDB = await getDocs(valRef)
        const allData = dataDB.docs.map(val=>({...val.data(), id:val.id}))
        setData(allData)
        console.log(dataDB)
    }

    useEffect(() => {
        getRecipe();
    },[])

    console.log(data, "datadata")

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
            console.log('you are logged out')
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='bg-white w-full flex mx-auto py-24 h-auto'>
            <div className='flex flex-col w-1/4 h-full'>
                <h3 className='text-1xl flex w-44 gap-3 px-2 text-white font-bold py-2 mb-5 bg-slate-600 rounded-r-full'><MdAccountCircle size={20} />Account</h3>
                <Link to='/upload'>
                    <h3 className='text-1xl text-center w-44 gap-3 px-2 text-white font-bold py-2 mb-5 bg-slate-600 rounded-r-full'>Post</h3>
                </Link>
                <button onClick={handleLogout} className='bg-transparent border
                border-black py-2 text-black w-44 hover:bg-black hover:text-white transition 3s
                rounded-r-full'>Logout</button>
            </div>

            <div className='flex flex-col w-3/4 px-16'>
                <h2 className='font-bold text-3xl'>Account</h2>
                <p className='text-sm mb-8'>Manage settings related to your account</p>

                <div className='flex flex-col shadow-md px-4 py-6'>
                    <h2 className='font-bold text-2xl'>Profile</h2>
                    <p className='text-sm mb-8'>Manage profile settings</p>
                    <div className='flex w-full mb-8'>
                        <label className='font-bold text-sm mr-52'>Photo</label>
                        <MdAccountCircle size={50} />
                    </div>
                    <div className='flex w-full mb-4'>
                        <label className='font-bold text-sm mr-52'>Email</label>
                        <p className='mb-4 mr-48 text-xs'>{user && user.email} <span className='p-1 bg-indigo-300 text-xs text-indigo-800'>Primary</span>
                            <span className='p-1 ml-2 bg-green-300 text-xs text-green-800'>Verified</span></p>
                        <BsArrowRightShort className='text-blue-700' size={20} />
                    </div>
                    <div className='flex w-full mb-4'>
                        <label className='font-bold text-sm mr-44'>Social accounts</label>
                        <div className='flex flex-col w-full relative'>
                            <div className='flex w-full'>
                                <p className='text-xs mr-36'>Follow me to see more content from my social accounts</p>
                                <BsArrowRightShort className='text-blue-700' size={20} />
                            </div>
                            <div className='flex w-full'>

                                <BsInstagram size={20} className='mr-6 mt-4 text-green-500' />
                                <AiOutlineYoutube size={20} className='mr-6 mt-4 text-green-500' />
                                <PiTiktokLogo size={20} className='mr-6 mt-4 text-green-500' />
                                <FaXTwitter size={20} className='text-green-500 mt-4' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-24'>
                <p className='text-xl mb-8'>Manage your uploaded recipes here..</p>
                <div className='w-full flex flex-wrap gap-10'>
                    {
                        data.map((value, index)=>
                            <div id={index} className='w-full md:w-[220px]'>
                                <div className='w-full shadow rounded-lg hover:scale-110 transition-[4s]'>
                                <img src={value.imgUrl} alt='label' className='rounded-lg h-[200px] md:h-[150px] w-full ' />
                                <div className='p-3'>
                                <p className='text-black font-semibold'>{value.recipeName}</p>
                                <div className='mt-2'>
                                <span className='px-2 py-1 text-[12px] capitalize bg-[#092e17c7]  shadow-xl rounded-full mr-3 text-white'>
                            {value.quisene}
                        </span>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#092e17c7] shadow-xl rounded-full mr-3 text-white'>
                            {value.mealType}
                        </span>
                                </div>
                                </div>
                                </div>
                            </div>
                            )
                    }
                </div>
                </div>

            </div>
        </div>
    )
}

export default Account