import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
} from "../../Redux/Action";
import axios from "axios";
import styles from "./Home.module.css";

import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const favoriteItems = useSelector((state) => state.favorites);
  const isLoggedIn = useSelector((state) => state.todo.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      let url = "https://fakestoreapi.com/products";
      if (category && category !== "all") {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
  };

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  const handleClick = (product, event) => {
    if (event) {
      event.stopPropagation();
    }
    navigate(`/Details/${product.id}`, { state: { product } });
  };

  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  return (
    <>
    <Navbar />
    <div className={styles.main}>
    
      <div className={styles.sidebar}>
        <h3>Categories</h3>
        <ul>
          {categories.map((categoryItem) => (
            <li
              key={categoryItem}
              onClick={() => handleCategoryClick(categoryItem)}
              className={category === categoryItem ? styles.active : ""}
            >
              {categoryItem}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cardcontainer}>
        {products.map((product) => {
          const isAddedToCart = cartItems?.some(
            (item) => item.id === product.id
          );
          const isFavorite = favoriteItems?.some(
            (item) => item.id === product.id
          );

          return (
            <div key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.title}
                onClick={() => handleClick(product)}
              />
              <h3>{product.title}</h3>
              <p>{product.price * 10} Rs</p>
              <p>Category: {product.category}</p>
              <button
                className={styles.addToCartbutton}
                onClick={() =>
                  isAddedToCart
                    ? handleRemoveFromCart(product.id)
                    : handleAddToCart(product)
                }
              >
                {isAddedToCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                className={styles.likebutton}
                onClick={() =>
                  isFavorite
                    ? handleRemoveFromFavorites(product.id)
                    : handleAddToFavorites(product)
                }
              >
                {isFavorite ? (
                  <FaHeart style={{ color: "red" }} />
                ) : (
                  <FaHeart />
                )}
              </button>
            </div>
          );
        })}
      </div>

   
    </div>
    <h2 className={styles.FavoriteHeading}>Favorite Products</h2>
    <div className={styles.cardcontainer2}>
      {favoriteItems?.map((product) => (
        <div
          key={product.id}
          className={styles.card}
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
  );
}

export default Home;
