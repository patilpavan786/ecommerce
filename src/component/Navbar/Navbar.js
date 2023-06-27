import React,{useState} from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import style from "./Navbar.module.css"
import { useDispatch,useSelector } from 'react-redux'
import { logoutUser, searchProducts } from '../../Redux/Action'
function Navbar() {

const dispatch = useDispatch()
const navigate = useNavigate()
const [value, setValue]= useState('');
const isLoggedIn = useSelector((state)=> state.todo.isLoggedIn);


function handleLogOut(){
    dispatch(logoutUser());
    navigate('/')
}

function handleChange(e){
const searchValue = e.target.value;
setValue(searchValue);
dispatch(searchProducts(searchValue))
}

  return (
    <div className={style.main}>
    <h1 className={style.logo} >Ecommerce</h1>
    <input
    className={style.Search}
    placeholder='Search' 
    value={value}
    onChange={handleChange}
    />
    <span>
    <NavLink className={style.link} to="/HOME">Home</NavLink>
    <NavLink className={style.link} to="/Cart">Cart</NavLink>
    {isLoggedIn && (
        <button className={style.logoutButton} onClick={handleLogOut}>LogOut</button>
    )}
    </span>
    </div>
  )
}

export default Navbar