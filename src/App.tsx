import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

type Page = 'landing' | 'auth' | 'dashboard';

function App() {
  const { user, profile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  useEffect(() => {
    if (!loading) {
      if (user && profile) {
        setCurrentPage('dashboard');
      } else if (currentPage === 'dashboard') {
        setCurrentPage('landing');
      }
    }
  }, [user, profile, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'landing') {
    return <Landing onGetStarted={() => setCurrentPage('auth')} />;
  }

  if (currentPage === 'auth') {
    return <Auth onSuccess={() => setCurrentPage('dashboard')} />;
  }

  if (profile?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

export default App;
