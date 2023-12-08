
import Link from 'next/link'
import '../styles/globals.scss'
import styles from '../styles/Navbar.module.scss'
import { FaGuitar } from "react-icons/fa";

import Cookies from 'js-cookie';
import { MouseEventHandler } from 'react';

export default function Navbar() {


  const handleLogOut = () => {
    Cookies.remove('authToken')
    console.log('hello')
  }
  /* const handleActive = (e: MouseEventHandler<HTMLAnchorElement>) => {
    const target = e.target
    console.log('target', target)
  } */
  return (
    <nav className="navbar">
      {/* <div className="logo"><FaGuitar />Chordio</div> */}
      <Link className='logo' href="/"><FaGuitar />Chordio</Link>
      <div className="menuItems">
        <ul>
          {/*  <li>
            <Link className='link' href="/">Home</Link>
          </li> */}
          <li>
            <Link /* onClick={handleActive} */ className={"link"} href="/mysongs">Transposer</Link>
          </li>
          <li>
            <Link /* onClick={handleActive} */ className={"link"} href="/savedchords">Saved</Link>
          </li>
          <li>
            <div className="dropdown ">
              <span className='link bubble onlyBubble'>Account</span>
              <div className="dropdown-content">
                <Link className='link' href="/login">Login</Link>
                <Link className='link' href="/register">Register</Link>
                <Link onClick={handleLogOut} className='link' href="/">Logout</Link>
              </div>
            </div>
            {/*  <Link className='link bubble' href="/login">Login</Link> */}
          </li>
          {/*  <li>
            <Link className='link bubble' href="/register">Register</Link>
          </li>
          <li>
            <Link onClick={handleLogOut} className='link bubble' href="/">Logout</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}