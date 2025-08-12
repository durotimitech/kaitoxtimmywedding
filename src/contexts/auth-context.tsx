'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { AuthService, AuthUser, AuthCredentials } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAttendanceModal: boolean;
  login: (
    credentials: AuthCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  closeAttendanceModal: () => void;
  openAttendanceModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const existingUser = AuthService.getAuthenticatedUser();
        if (existingUser) {
          setUser(existingUser);
          // Show attendance modal every time for authenticated users
          setShowAttendanceModal(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    credentials: AuthCredentials
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await AuthService.verifyCredentials(credentials);

      if (result.success && result.user) {
        setUser(result.user);
        // Show attendance modal after successful login
        setShowAttendanceModal(true);
        return { success: true };
      } else {
        return {
          success: false,
          error:
            "We couldn't verify your details. Please contact the couple for assistance.",
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Something went wrong. Please try again or contact the couple.',
      };
    }
  };

  const logout = () => {
    AuthService.clearAuthentication();
    setUser(null);
    setShowAttendanceModal(false);
  };

  const closeAttendanceModal = () => {
    setShowAttendanceModal(false);
  };

  const openAttendanceModal = () => {
    setShowAttendanceModal(true);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    showAttendanceModal,
    login,
    logout,
    closeAttendanceModal,
    openAttendanceModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
