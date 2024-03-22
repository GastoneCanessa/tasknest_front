
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { atom } from 'jotai';
import Navbar from './components/common/Navbar';
import CardTask from './components/content/CardTask';
import Homepage from './components/content/Homepage';
import BackgroundSelector from './components/common/BackgroundSelector';
import Register from './pages/Register';
import Login from './pages/Login';
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
        <Route path="/user/bgSelector" element={<BackgroundSelector />} />
        <Route path="/task/:id" element={<CardTask />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
