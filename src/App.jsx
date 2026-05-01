import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Shop from "./pages/Shop";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        {/* Dynamic route for categories */}
        <Route path="/category/:slug" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;