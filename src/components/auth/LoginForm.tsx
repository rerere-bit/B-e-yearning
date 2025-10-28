import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const LoginForm = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login('student@example.com', 'password', 'Student');
    } 
    catch (error) {
      console.error("Login failed", error);
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-card rounded-lg shadow-md border border-border w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-center mb-6 text-card-foreground">Login</h2>
      {}
      <p className="text-center text-muted-foreground mb-4">
        (Form login lengkap akan dibuat nanti)
      </p>
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login as Student (Demo)'}
      </button>
    </div>
  );
};