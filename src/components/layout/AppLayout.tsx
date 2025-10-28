import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, LogOut, LayoutDashboard, BookOpen, Users, Settings } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode; 
  currentPage: string; 
  onNavigate: (page: string) => void; 
}

export const AppLayout = ({ children, currentPage, onNavigate }: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  if (!user) return null;

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Courses', icon: BookOpen, page: 'courses' },
    { name: 'Users', icon: Users, page: 'users' }, 
    { name: 'Settings', icon: Settings, page: 'settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col">
        {}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">EduSphere</h2>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>

        {}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground' 
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

      </aside>

      <div className="ml-64 flex-1 flex flex-col"> 
        <header className="sticky top-0 z-10 bg-card border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-medium text-card-foreground">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h1> 
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-secondary-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                   {user.name.charAt(0)} 
                 </div>
                 <span className="text-sm font-medium text-card-foreground">{user.name}</span>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-1 p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-secondary-foreground transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children} {}
        </main>
      </div>
    </div>
  );
};