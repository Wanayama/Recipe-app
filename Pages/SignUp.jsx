import React, { useState } from 'react'
import banner2 from '../assets/banner3.jpeg'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const {createUser} = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(e.message)
        try {
            await createUser(email, password);
            navigate('/account')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='w-full h-screen flex items-start'>
            <div className='relative w-1/2 h-full flex flex-col'>
                <div className='absolute top-[20%] left-[10%] flex flex-col'>
                    <h1 className='text-4xl text-white font-bold my-4'>Let the world know about your recipes</h1>
                    <p className='text-xl text-white font-normal'>Register for free and start a healthy community</p>
                </div>

                <img src={banner2} className='w-full h-full object-cover' alt='banner' />
            </div>

            <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
                <h1 className='text-base text-[#060606] font-semibold'>Bon appetit</h1>

                <div className='w-full flex flex-col max-w-[400px]'>
                    <div className='w-full mb-2 flex flex-col'>
                        <h3 className='text-3xl font-semibold mb-2'>Register</h3>
                        <p className='text-sm mb-1 md:mb-2'>Welcome! Please enter your details</p>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                        <input type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            className='w-full text-black  py-1 px-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

                        <input type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className='w-full text-black py-1 px-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

                        <div className='flex flex-col w-full my-2 md:my-4'>
                            <button className='w-full my-1 md:my-2 cursor-pointer hover:text-black hover:bg-white transition-[3s] hover:border-2 hover:border-black text-white font-semibold bg-black rounded-md p-2 md:p-4 text-center justify-center'>SignUp</button>
                            <Link to='/login' className='w-full my-1 md:my-2 text-black font-semibold hover:text-white hover:bg-black transition-[3s] bg-white border-2 border-black rounded-md p-2 md:p-4 text-center justify-center'>
                                <button>Login</button>
                            </Link>
                        </div>
                    </form>

                    <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <p className='absolute text-black/80 bg-[#f5f5f5]'>or</p>
                    </div>

                    <div className='w-full flex text-sm my-1 cursor-pointer md:my-2 text-black font-semibold bg-white border-2 border-black rounded-md p-2 md:p-4 text-center justify-center'>
                        <FcGoogle size={22} />
                        Sign In with Google
                    </div>
                </div>

                <div className='w-full flex justify-center items-center'>
                    <p className='text-sm font-normal text-[#060606]'>Do you have an account?
                        <Link to='/login' className='font-semibold underline underline-offset-2 cursor-pointer'>Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp