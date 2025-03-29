import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
  return (
    <div className='fixed  flex flex-col justify-between h-full p-4   sm:items-center bg-black sm:bg-transparent '>
      <div  className='hidden sm:block'>
         <img className='w-16 h-16' src='logo.gif'></img>
      </div>

      <div className='flex sm:flex-col flex-row sm:gap-4 gap-0 justify-between sm:items-center'>
        <Link to='/'>
          <div title='Home'>
          <lord-icon
              src="https://cdn.lordicon.com/wmwqvixz.json"
              trigger="hover"
              state="hover-home-1"
              colors="primary:#ffffff"
              style={{width: '25px', height: '25px'}}>
          </lord-icon>
          </div>
        </Link>
        
        <Link to="/add" style={{ margin: '20px 0' }}>
        <lord-icon
          src="https://cdn.lordicon.com/zxaptliv.json"
          trigger="hover"
          colors="primary:#ffffff"
          style={{ width: '42px', height: '40px' }}>
        </lord-icon>
      </Link>

        <Link to='/search'>
           <div title='Search'>
           <lord-icon
                src="https://cdn.lordicon.com/fkdzyfle.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{width: '25px', height: '25px'}}>
            </lord-icon>
            </div>
        </Link>

      </div>

      <div className='hidden sm:block ' title='All @copyrigth reserver by me & Created By Arnava Tivari'>
      <lord-icon
            src="https://cdn.lordicon.com/jnzhohhs.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{width: '15px', height: '35px'}}>
        </lord-icon>
      </div>

    </div>
  )
}

export default Sidebar