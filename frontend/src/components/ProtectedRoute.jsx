import { useEffect, useState } from 'react';
import axios from 'axios';

function ProtectedRoute({ children, onAuthFail }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setLoading(false);
      onAuthFail();
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/admin/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.valid) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        onAuthFail();
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      onAuthFail();
    } finally {
      setLoading(false);
    }
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
          <h3 className="text-xl font-semibold text-purple-900 mb-2">Verifying Authentication</h3>
          <p className="text-purple-600">Please wait...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;