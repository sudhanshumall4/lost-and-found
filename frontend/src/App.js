import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReportForm from './pages/ReportForm';
import PublicList from './pages/PublicList';
import Moderator from './pages/Moderator'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-white text-2xl font-bold">Lost & Found</span>
              </div>
              <div className="flex gap-4">
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
                <Link 
                  to="/moderator" 
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition duration-200"
                >
                  Moderator
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<PublicList />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/moderator" element={<Moderator/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;