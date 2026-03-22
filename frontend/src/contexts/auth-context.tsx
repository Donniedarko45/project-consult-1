"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthApi } from "@/app/Api/Api";

export interface User {
  id: string;
  phone: string;
  name: string | null;
  email: string | null;
  hasAccess: boolean;
  pan?: string;
  aadhar?: string;
  dob?: string;
  gender?: string;
  kycStatus?: string;
  digioKycId?: string;
}

interface SendOTPResponse {
  success: boolean;
  data: {
    message: string;
    userId: string;
  };
}

interface VerifyOTPResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
    isNewUser: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  sendOTP: (phone: string) => Promise<{ message: string; userId: string }>;
  verifyOTP: (phone: string, otp: string) => Promise<{ isNewUser: boolean }>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Auth initialization error", e);
            logout();
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const sendOTP = async (
    phone: string,
  ): Promise<{ message: string; userId: string }> => {
    setIsLoading(true);
    try {
      const response = (await AuthApi.sendOTP(phone)) as SendOTPResponse;
      return response.data;
    } catch (error) {
      console.error("Send OTP failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (
    phone: string,
    otp: string,
  ): Promise<{ isNewUser: boolean }> => {
    setIsLoading(true);
    try {
      const response = (await AuthApi.verifyOTP(
        phone,
        otp,
      )) as VerifyOTPResponse;
      const { token, user: userData, isNewUser } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return { isNewUser };
    } catch (error) {
      console.error("Verify OTP failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response: any = await AuthApi.updateProfile(data);
      const updatedUser = response.data || response;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      throw error;
    }
  };

  const refreshProfile = async () => {
    try {
      const response: any = await AuthApi.getProfile();
      const userData = response.data || response;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        sendOTP,
        verifyOTP,
        logout,
        isAuthenticated: !!user,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
