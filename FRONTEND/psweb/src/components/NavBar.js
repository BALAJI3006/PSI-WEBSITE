import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/NavBar.css';
const logout = async () =>{
  localStorage.removeItem('loggedInUserEmail');
  localStorage.removeItem('loggedInUserGmail');

}


const NavBar = () => {
  const userEmail =JSON.parse(localStorage.getItem('loggedInUserEmail'));
  const userGmail =JSON.parse(localStorage.getItem('loggedInUserGmail'));

    return (
        <nav className='nav'>
            <div className='logo'>
                <img
                    alt="Logo"
                    src="https://cdn.discordapp.com/attachments/1205756212445192263/1207363674990313562/Dr.Palamsetty_Innovations123.png?ex=65df600b&is=65cceb0b&hm=d8811294349ee35313077b961c60da34b5a054821e87fd435d7ed27f448f3c38&" 
                    style={{ height: '35px', width: '160px' }}  
                />
            </div>
            <ul className='navUl'>
                <li className= 'navLi'><Link to="/">Home</Link></li>
                <li className='navLi'><Link to="/programmes">Our Programmes</Link></li>
                <li className='navLi'><Link to="/clubs">Clubs</Link></li>
                <li className='navLi'><Link to="/about">About Us</Link></li>
                <li className='navLi'><Link to="/contact">Contact Us</Link></li>
            </ul>
            
            
            {userEmail ? (
                <div>
                    <div className='userEmail'>Welcome {userEmail.fullname}</div>
                    <Link to="/login"><div className='loginButton' onClick={logout}>Sign Out</div></Link>
                </div>
            ) : userGmail ? (
              <div>
                  <div className='userEmail'>Welcome {userGmail.given_name}</div>
                  <Link to="/login"><div className='loginButton' onClick={logout}>Sign Out</div></Link>
              </div>
          ):(
                <Link to="/login"><div className='loginButton'>Login</div></Link>
            )}
        </nav>
    );
};

export default NavBar;
