import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import { toast } from 'react-toastify'
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import logo from '../logo.jpg';

export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  
  const activeStyles = {
    color: 'teal',
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы.')
  }

  return (
    <div className='flex gap-10 py-8'>
        <div className='w-1/6'>
          <div className='flex flex-col basis-1/4 flex-grow'>
            <img src={logo} alt="In Close-Up"/>
          </div>
        </div>
        <div className='w-3/6'>
          { isAuth && (
            <ul className="flex justify-around items-center pt-2">
              <li><NavLink to={'/'} href="/" className='text-base text-blue-950 hover:text-gray-600 font-bold' style={({isActive}) => isActive ? activeStyles : undefined }>Главная</NavLink></li>
              <li><NavLink to={'/posts'} href="/" className='text-base text-blue-950 hover:text-gray-600 font-bold' style={({isActive}) => isActive ? activeStyles : undefined }>Мои посты</NavLink></li>
              <li><NavLink to={'/new'} href="/" className='text-base font-bold text-blue-950 hover:text-gray-600  active:text-gray-600' style={({isActive}) => isActive ? activeStyles : undefined }>Добавить пост</NavLink></li>
            </ul>
          )
          }
        </div>
        <div className='w-1/6'>  
          <div className='flex justify-center items-center bg-blue-950 text-sm text-white rounded-sm px-4 py-2'>
            {isAuth ? (<button onClick={logoutHandler}> <Link to={'/'}>Выйти </Link> </button>) : (<Link to={'/login'}> Войти </Link>)}
          </div>
        </div>
    </div>
  )
}
