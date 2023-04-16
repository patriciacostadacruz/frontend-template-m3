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
import IsPrivate from './components/IsPrivate';
import ConvMessages from './components/messenger/ConvMessages';

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects"
          element={
            <IsPrivate>
              <Projects />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <IsPrivate>
              <Project />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/new"
          element={
            <IsPrivate>
              <AddProject />
            </IsPrivate>
          }
        />
        <Route
          path="/users"
          element={
            <IsPrivate>
              <Users />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              <OtherUserProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/conversations"
          element={
            <IsPrivate>
              <Conversations />
            </IsPrivate>
          }
        >
          <Route
            path="/conversations/:conversationId"
            element={
              <IsPrivate>
                <ConvMessages />
              </IsPrivate>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPath />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
