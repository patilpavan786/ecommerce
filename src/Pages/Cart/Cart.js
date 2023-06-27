import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { removeFromCart, clearCart } from '../../Redux/Action'
import style from "./Cart.module.css"
import { useNavigate } from 'react-router-dom'
import Navbar from '../../component/Navbar/Navbar'


function Cart() {
  const cartItems = useSelector((state)=>state.cart)
  const dispatch = useDispatch()
  const favoriteItems= useSelector((state)=> state.favoriteItems);
  const isLoggedIn = useSelector((state)=> state.todo.isLoggedIn);
  const navigate= useNavigate()
 console.log( favoriteItems)
useEffect(()=> {
  if(!isLoggedIn){
    navigate('/')
  }
}
,[]
)

function handleRemoveFromCart(itemId){
  dispatch(removeFromCart(itemId))
};

function calculateFinalPrice(){
  let totalPrice = 0;
  cartItems.forEach((item) =>{
    totalPrice += item.price * item.quantity
  })
  return totalPrice;
}


function handleCHeckout(){
  if(window.confirm("are you sure want to proceed with purchase and remve the item from cart ")){
    alert("congratulation , purchase sucessful ")
    dispatch(clearCart());
  }
}

function handleClick (product, event){
if(event){
  event.stopPropagation();
}
navigate(`/Details/${product.id}`, {state:{product}});
}

  return (
    <>
    <Navbar/>
    <div className={style.cardcontainer}>
    {cartItems.map((item)=>(
      <div key= {item.id} className={style.card}>
      <img src={item.image} alt ={item.title} onClick={()=>handleClick(item)}/>
      <h3>{item.title}</h3>
      <p>Price: {item.price * item.quantity}  Rs</p>
      <p>quantity : {item.quantity}</p>
      <button  className={style.addToCartbutton} onClick={()=> handleRemoveFromCart(item.id)}>Remove from Cart</button>
      
      
      </div>
    ))}

    </div>
    <h3>Total Price :{calculateFinalPrice()} Rs</h3>
    <button className={style.addToCartbutton2} onClick={handleCHeckout}>CheckOut</button>
    
    <h2 className={style.FavoriteHeading}>Favorite Products</h2>
    <div className={style.cardcontainer2}>
      {favoriteItems?.map((product) => (
        <div
          key={product.id}
          className={style.card}
          onClick={() => handleClick(product)}
        >
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price * 10} Rs</p>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
    
    
    </>
   
  )
}

export default Cart