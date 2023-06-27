import React ,{useEffect}from 'react'
import { useNavigate ,location, useLocation} from 'react-router-dom'
import style from "./Details.module.css"
import { useDispatch ,useSelector} from 'react-redux'


function Details() {

  const navigate=useNavigate()
  const location = useLocation()
  const {product } = location.state;
  const isLoggedIn = useSelector((state)=> state.todo.isLoggedIn);
  const favoriteItems = useSelector((state) => state.favorites);
function handleGoBack(){
  navigate(-1);
}

useEffect(()=> {
  if(!isLoggedIn){
    navigate('/')
  }
}
,[]
)
const handleClick = (product, event) => {
  if (event) {
    event.stopPropagation();
  }
  navigate(`/Details/${product.id}`, { state: { product } });
};

  return (
    <>
    <button className={style.backbtn} onClick={handleGoBack}>Go Back</button>
    <div className={style.Detailscontainer}>
    <div className={style.card}>
    <img 
    src={product.image}
    alt={product.title}
    />
    <div className={style.carddetails}>
    <h3>{product.title}</h3>
    <p>Price :{product.price}RS</p>
    <p>Description :{product.description}</p>
    <p>category : {product.category}</p>

    </div>
    </div>
    

   
    </div>
    <h2 className={style.FavoriteHeading}>Favorite Products</h2>
    <div className={style.cardcontainer2}>
      {favoriteItems?.map((product) => (
        <div
          key={product.id}
          className={style.card2}
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

export default Details