import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Types
interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: 'user' | 'admin') => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

// Mock storage for users and profiles
const mockUsers = new Map<string, { email: string; password: string; profile: Profile }>();
const mockSessions = new Map<string, { user: User }>();

// Mock data initialization
const initializeMockData = () => {
  // Add an admin user
  const adminProfile: Profile = {
    id: 'admin1',
    email: 'admin@example.com',
    full_name: 'Admin User',
    role: 'admin'
  };
  mockUsers.set('admin@example.com', {
    email: 'admin@example.com',
    password: 'admin123',
    profile: adminProfile
  });

  // Add a regular user
  const userProfile: Profile = {
    id: 'user1',
    email: 'user@example.com',
    full_name: 'John Doe',
    role: 'user'
  };
  mockUsers.set('user@example.com', {
    email: 'user@example.com',
    password: 'user123',
    profile: userProfile
  });
};

// Initialize mock data
initializeMockData();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const checkSession = async () => {
      const sessionStr = localStorage.getItem('session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session?.user) {
          setUser(session.user);
          await loadProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find profile in mock data
      let foundProfile: Profile | null = null;
      for (const [, userData] of mockUsers) {
        if (userData.profile.id === userId) {
          foundProfile = userData.profile;
          break;
        }
      }

      setProfile(foundProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'user' | 'admin') => {
    try {
      // Check if user already exists
      if (mockUsers.has(email)) {
        throw new Error('User with this email already exists');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create new user
      const newUser: User = {
        id: `user${Date.now()}`,
        email
      };

      const newProfile: Profile = {
        id: newUser.id,
        email,
        full_name: fullName,
        role
      };

      // Store user data
      mockUsers.set(email, {
        email,
        password, // Note: In real app, NEVER store passwords in plain text
        profile: newProfile
      });

      // Create session
      const session = { user: newUser };
      mockSessions.set(newUser.id, session);
      localStorage.setItem('session', JSON.stringify(session));

      // Set user and profile
      setUser(newUser);
      setProfile(newProfile);

      // Create welcome notification
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        id: `notif${Date.now()}`,
        user_id: newUser.id,
        title: 'Welcome!',
        message: `Welcome to our subscription platform, ${fullName}! Explore our plans and get started.`,
        type: 'success',
        is_read: false,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check credentials
      const userData = mockUsers.get(email);
      if (!userData) {
        throw new Error('Invalid email or password');
      }

      if (userData.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Create user object
      const loggedInUser: User = {
        id: userData.profile.id,
        email: userData.email
      };

      // Create session
      const session = { user: loggedInUser };
      mockSessions.set(loggedInUser.id, session);
      localStorage.setItem('session', JSON.stringify(session));

      // Set user and profile
      setUser(loggedInUser);
      setProfile(userData.profile);

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Clear session
    localStorage.removeItem('session');
    
    // Clear state
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}