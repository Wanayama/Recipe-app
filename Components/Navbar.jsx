import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import Button from './Button';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { ShowOnLogout } from './ProtectedRoute';


function Navbar() {
    const [open, setOpen] = useState(false);
    const { user } = UserAuth();


    return (
        <header className='w-full fixed z-10 bg-black opacity-90'>
            <nav className='flex w-full py-2 md:py-3 px-4 md:px-10 items-center justify-between'>
                <a href='/' className='flex items-center justify-center text-white text-lg cursor-pointer'>
                    <img src={Logo} alt='logo' className='md:block w-8 h-8 lg:w-14 lg:h-14' />
                    <p className='font-bold text-center'>
                        Bon <span className='text-green-500 text-xl'>appétit</span>
                    </p>
                </a>

                <ul className='hidden md:flex text-white gap-6'>
                    <li>
                        <a href='/'>Home</a>
                    </li>
                    <li>
                        <a href='/#recipes'>Explore</a>
                    </li>
                    <li>
                        <a href='/favourite'>Favorites</a>
                    </li>
                </ul>

                <ShowOnLogout>
                    <Link to='/login'>
                        <Button
                            title='sign-in'
                            containerStyle='bg-transparent border
                border-white text-white hover:bg-white hover:text-slate-700
                rounded-full ml-10 min-w-[50px] md:min-w-[130px]'
                        />
                    </Link>
                </ShowOnLogout>

                <Link to='/account'>
                    <p className='text-white flex px-1'><MdAccountCircle size={20} />{user && user.email}</p>
                </Link>

                <button className='block md:hidden text-white text-xl'
                    onClick={() => setOpen(prev => !prev)}>
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button>
            </nav>
            <div className={`${open ? "flex" : "hidden"} bg-black flex-col
            w-full px-4 pt-6 pb-10 text-white gap-6 text-[14px]`}>
                <a href='/'>Home</a>
                <a href='/#recipes'>Recipes</a>
                <a href='/favorites'>Favorites</a>
            </div>
        </header>
    )
}

export default Navbar