"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiEnvelope, AuthApi } from "@/app/Api/Api";
import { clearAuthSession, getStoredToken, isAuthError } from "@/utils/auth-session";

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
  agreementSignStatus?: string;
  agreementDigioDocId?: string;
  agreementSignedAt?: string;
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

const unwrapApiData = <T,>(response: ApiEnvelope<T> | T): T => {
  if (
    response &&
    typeof response === "object" &&
    "data" in response
  ) {
    return (response as ApiEnvelope<T>).data;
  }
  return response as T;
};

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

  const logout = React.useCallback(() => {
    setUser(null);
    clearAuthSession();
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof window !== "undefined") {
        const token = getStoredToken();
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Auth initialization error", e);
            logout();
          }
        } else {
          clearAuthSession();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [logout]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [logout]);

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

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = (await AuthApi.updateProfile(data)) as ApiEnvelope<User> | User;
      const updatedUser = unwrapApiData(response);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      if (isAuthError(error)) {
        logout();
      }
      throw error;
    }
  };

  const refreshProfile = async () => {
    try {
      const response = (await AuthApi.getProfile()) as ApiEnvelope<User> | User;
      const userData = unwrapApiData(response);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      if (isAuthError(error)) {
        logout();
        return;
      }
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
