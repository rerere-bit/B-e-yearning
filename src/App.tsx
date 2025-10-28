import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm'; 
import { AppLayout } from '@/components/layout/AppLayout'; 

function App() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard'); 

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading application...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/50">
        {}
        <LoginForm />
      </div>
    );
  }

  return (
    <AppLayout currentPage={currentPage} onNavigate={handleNavigate}>
      {}
      <div className="p-8">
        <h1 className="text-2xl font-bold">Welcome to {currentPage.toUpperCase()} page!</h1>
        <p>Content for {currentPage} will go here.</p>
      </div>
    </AppLayout>
  );
}

export default App;