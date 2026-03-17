import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dulceria from './components/Dulceria';
import Pago from './components/Pago';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dulceria" element={<Dulceria />} />
          <Route path="/pago" element={<Pago />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
