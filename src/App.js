import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Homepage from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />}/>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
