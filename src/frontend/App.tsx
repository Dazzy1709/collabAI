import { useState } from 'react'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router';
import "./styles/App.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>    
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={ <Signup />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </>
  )
}

export default App;
