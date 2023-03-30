import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorContent from "./views/ErrorContent";
import ErrorPath from "./views/ErrorPath";
import Signup from './views/auth/Signup';
import Login from "./views/auth/Login";
import Footer from "./components/Footer";
import Profile from "./views/profile/Profile";
import OtherUserProfile from "./views/profile/OtherUserProfile";
import Project from "./views/projects/Project";
import AddProject from "./views/projects/AddProject";
import SearchResults from "./views/SearchResults";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<SearchResults />} />
        <Route path="/projects/new" element={<AddProject />} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<OtherUserProfile />} />
        <Route path="/error" element={<ErrorContent />} />
        <Route path="*" element={<ErrorPath />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
