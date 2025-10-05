import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReportForm from './pages/ReportForm';
import PublicList from './pages/PublicList';
import Moderator from './pages/Moderator';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

// Navigation component with authentication
function Navigation({ isAuthenticated, adminUser, onLogout }) {
  const navigate = useNavigate();
  
  const handleModeratorClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/moderator');
    } else {
      navigate('/admin/login');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold">Lost & Found</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition duration-200"
            >
              Browse Items
            </Link>
            <Link 
              to="/report" 
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition duration-200"
            >
              Report Item
            </Link>
            <a
              href="#"
              onClick={handleModeratorClick}
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition duration-200"
            >
              {isAuthenticated ? 'Dashboard' : 'Admin'}
            </a>
            {isAuthenticated && (
              <>
                <span className="text-white/70 text-sm">
                  Welcome, {adminUser?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setAdminUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const handleAuthFail = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl mb-4 shadow-lg">
            <svg className="animate-spin w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-purple-900 mb-2">Loading</h3>
          <p className="text-purple-600">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <Navigation 
          isAuthenticated={isAuthenticated}
          adminUser={adminUser}
          onLogout={handleLogout}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<PublicList />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          <Route 
            path="/moderator" 
            element={
              <ProtectedRoute onAuthFail={handleAuthFail}>
                <Moderator />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;