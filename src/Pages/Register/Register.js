import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { USER } from "../../Redux/Action";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !email || !birthdate || !password || !confirmPassword) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("password should be at least 6 charectors ");
      return;
    }
    let user = {
      username: "username",
      email: "email",
      password: "password",
      birthdate: "birthdate",
    };
    dispatch({
      type: USER,
      payload: user,
    });

    alert("succefully registerd");
    navigate("/");
  }

  return (
    <div  className={style.main}>
      <form onSubmit={handleSubmit}  className={style.form}>
        <input
        className={style.input}
          type="text"
          value={username}
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        className={style.input}
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        className={style.input}
          type="date"
          value={birthdate}
          placeholder="birthdate"
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <input
        className={style.input}
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
        className={style.input}
          type="password"
          value={confirmPassword}
          placeholder="confirmPassword"
          onChange={(e) => setConfirmPasword(e.target.value)}
        />

        <button className={style.submitebtn} type="submit">SignUp</button>
     
        <div className={style.checkAccount}>
        <span style={{color:"Black"}} className={style.Checkbtn}>
       Don,t have an account ?
        <Link to={"/"}
        style={{color:"red"}}
        
        >Login</Link>
        </span>
        
        </div>
        </form>
    </div>
  );
}

export default Register;
