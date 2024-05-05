import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dulceria from './components/Dulceria';
import Pago from './components/Pago';
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dulceria" element={<Dulceria />} />
        <Route path="/pago" element={<Pago />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
