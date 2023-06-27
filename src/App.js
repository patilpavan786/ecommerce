import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Details from "./Pages/Details/Details";
function App() {

  return (
    <div >
  <BrowserRouter>
  <Routes>
  <Route  path="/" element={<Login />}/>
  <Route  path="/Home" element={<Home />}/>
  <Route  path="/Register" element={<Register />}/>
  <Route  path="/Cart" element={<Cart />}/>
  <Route  path="/Details/:id" element={<Details />}/>
  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
