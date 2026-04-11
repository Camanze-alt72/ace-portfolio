import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import References from './pages/References';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProjectsAdmin from './pages/ProjectsAdmin';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import ServicesAdmin from './pages/ServicesAdmin';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import ReferencesAdmin from './pages/ReferencesAdmin';
import AddReference from './pages/AddReference';
import EditReference from './pages/EditReference';
import Users from './pages/Users';
import UsersAdmin from './pages/UsersAdmin';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/references" element={<References />} />
              <Route path="/add-reference" element={<AddReference />} />
              <Route path="/users" element={<Users />} />
              <Route path="/admin/users" element={<UsersAdmin />} />
              <Route path="/admin/users/add" element={<AddUser />} />
              <Route path="/admin/users/edit/:id" element={<EditUser />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/projects" element={<ProjectsAdmin />} />
              <Route path="/admin/projects/add" element={<AddProject />} />
              <Route path="/admin/projects/edit/:id" element={<EditProject />} />
              <Route path="/admin/services" element={<ServicesAdmin />} />
              <Route path="/admin/services/add" element={<AddService />} />
              <Route path="/admin/services/edit/:id" element={<EditService />} />
              <Route path="/admin/references" element={<ReferencesAdmin />} />
              <Route path="/admin/references/add" element={<AddReference />} />
              <Route path="/admin/references/edit/:id" element={<EditReference />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
