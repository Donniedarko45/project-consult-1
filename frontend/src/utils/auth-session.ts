"use client";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const AUTH_ERROR_PATTERN =
  /(invalid|expired).*token|no token provided|unauthorized|jwt/i;

interface JwtPayloadLike {
  exp?: number;
}

interface ApiErrorLike {
  status?: number;
  message?: unknown;
}

const decodeJwtPayload = (token: string): JwtPayloadLike | null => {
  try {
    const [, payloadPart] = token.split(".");
    if (!payloadPart) return null;

    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(atob(padded)) as JwtPayloadLike;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string, skewSeconds = 30): boolean => {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") return false;
  return payload.exp * 1000 <= Date.now() + skewSeconds * 1000;
};

export const clearAuthSession = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token || token === "undefined" || token === "null") {
    return null;
  }

  if (isTokenExpired(token)) {
    clearAuthSession();
    return null;
  }

  return token;
};

export const getAuthRedirectPath = (): string => {
  if (typeof window === "undefined") return "/login";
  const returnTo = encodeURIComponent(
    `${window.location.pathname}${window.location.search}`,
  );
  return `/login?redirect=${returnTo}`;
};

export const isAuthError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") return false;
  const candidate = error as ApiErrorLike;
  if (candidate.status === 401) return true;
  return AUTH_ERROR_PATTERN.test(String(candidate.message ?? ""));
};

