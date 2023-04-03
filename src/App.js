import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPath from "./views/ErrorPath";
import Signup from './views/auth/Signup';
import Login from "./views/auth/Login";
import Footer from "./components/Footer";
import Profile from "./views/profile/Profile";
import OtherUserProfile from "./views/profile/OtherUserProfile";
import Project from "./views/projects/Project";
import AddProject from "./views/projects/AddProject";
import Projects from "./views/projects/Projects";
import Users from "./views/Users";
import Conversations from "./views/messenger/Conversations";
import ConvMessages from "./views/messenger/ConvMessages";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/projects/new" element={<AddProject />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile/:userId" element={<OtherUserProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/messages/:conversationId" element={<ConvMessages />} />
        <Route path="*" element={<ErrorPath />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
