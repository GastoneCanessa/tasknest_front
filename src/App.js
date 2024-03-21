import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.css";
import { atom } from 'jotai';
import Homepage from './components/content/Homepage';
import Home from './pages/Home';

export const currentU = atom(JSON.parse(localStorage.getItem('user')) ?? {})


export const currentUser = atom(
  (get) => get(currentU),
  (get, set, newStr) => {
    set(currentU, newStr)
    localStorage.setItem('user', JSON.stringify(newStr))
  },
)

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/home" element={<Home />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
