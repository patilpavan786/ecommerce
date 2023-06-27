import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import style from "./Login.module.css";
import { useDispatch } from "react-redux";
import { USER } from "../../Redux/Action";
import { useCookies } from "react-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "rememberMe",
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(()=> {
    const storedUsername = cookies.username;
    const storedRememberMe = cookies.username;
    if(storedRememberMe === "true" && storedUsername){
        setUsername(storedUsername);
        setPassword(true);
    }
},[cookies])

  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("please fill all the inputs ");
      return;
    }
    if (rememberMe) {
      setCookie("username", username, { path: "/" });
      setCookie("rememberMe", true, { path: "/" });
    } else {
      removeCookie("username", { path: "/" });
      removeCookie("rememberMe", { path: "/" });
    }

    const storedData = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = storedData?.find(
      (user) => user.username === username && user.password === password
    );
    if (existingUser) {
      dispatch({ type: USER, payload: existingUser });
      setSucessMessage("login successful ");
      navigate("/Home");
    } else {
      setErrorMessage("invalid username or password ");
    }
  }
  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          className={style.input}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={style.input}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>
          <h3>Remember Me</h3>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </span>

        <button className={style.submitebtn} type="submit">Login</button>
        {errorMessage && (
            <p style={{color :"red", fontSize:"1.5rem"}}>{errorMessage}</p>
        )}
        {sucessMessage &&(
            <p style={{color :"green", fontSize:"1.5rem"}}>{sucessMessage}</p>
        )}
        <div className={style.checkAccount}>
        <span style={{color:"Black"}} className={style.Checkbtn}>
        Already have an account ?
        <Link to={"/Register"}
        style={{color:"red"}}
        
        >Register</Link>
        </span>
        
        </div>
      </form>
    </div>
  );
}

export default Login;
