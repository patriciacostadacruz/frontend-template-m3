import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorContent from "./views/ErrorContent";
import ErrorPath from "./views/ErrorPath";
import Signup from './views/auth/Signup';
import Login from "./views/auth/Login";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/error" element={<ErrorContent />} />
        <Route path="*" element={<ErrorPath />} />
      </Routes>
    </div>
  );
}

export default App;
