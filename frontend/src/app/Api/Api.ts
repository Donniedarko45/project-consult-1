export const BASE_URL = "https://project-consult-1.onrender.com";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: errorData.message || "An error occurred",
      status: response.status,
      errors: errorData.errors,
    };
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

async function request<T>(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: any,
  customHeaders: Record<string, string> = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint
    }`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  // Add authorization token if available
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);
    return handleResponse<T>(response);
  } catch (error) {
    console.error(`API Request failed for ${url}:`, error);
    throw error;
  }
}

// Auth API - OTP-based WhatsApp authentication
export const AuthApi = {
  // Send OTP to user's WhatsApp number
  sendOTP: (phone: string) => request("/api/auth/send-otp", "POST", { phone }),
  // Verify OTP and get JWT token
  verifyOTP: (phone: string, otp: string) =>
    request("/api/auth/verify-otp", "POST", { phone, otp }),
  // Get user profile
  getProfile: () => request("/api/user/me", "GET"),
  // Update user profile (name, email, kyc)
  updateProfile: (data: any) => request("/api/user/profile", "POST", data),
};

// Contact API
export const ContactApi = {
  submitQuery: (data: any) => request("/contact", "POST", data),
};

// Plans/Subscription API
export const PlansApi = {
  getAllPlans: () => request("/api/plans", "GET"),
  getPlanById: (id: string) => request(`/api/plans/${id}`, "GET"),
  subscribe: (planId: string, data: any) =>
    request(`/api/plans/${planId}/subscribe`, "POST", data),
};

// Courses API
export const CoursesApi = {
  getAllCourses: () => request("/courses", "GET"),
  getCourseById: (id: string) => request(`/courses/${id}`, "GET"),
  enroll: (courseId: string) => request(`/courses/${courseId}/enroll`, "POST"),
  getMyCourses: () => request("/courses/my-courses", "GET"),
};

// Workshops API
export const WorkshopsApi = {
  getAllWorkshops: () => request("/workshops", "GET"),
  register: (workshopId: string, data: any) =>
    request(`/workshops/${workshopId}/register`, "POST", data),
};

// Subscriptions API
export const SubscriptionsApi = {
  initSubscription: (planId: string) =>
    request("/api/subscriptions/init", "POST", { planId }),
  getCurrentSubscription: () => request("/api/subscriptions/current", "GET"),
};

// Payment API
export const PaymentApi = {
  createOrder: (subscriptionId: string) =>
    request("/api/payments/create-order", "POST", { subscriptionId }),
  verifyPayment: (subscriptionId: string) =>
    request("/api/payments/verify", "POST", { subscriptionId }),
};

// General/Other APIs reflecting the file structure
export const ServiceApi = {
  getAllServices: () => request("/services", "GET"),
};

export const BlogApi = {
  getAllBlogs: () => request("/blogs", "GET"),
  getBlogBySlug: (slug: string) => request(`/blogs/${slug}`, "GET"),
};

export const SmallCaseApi = {
  getAll: () => request("/small-case", "GET"),
};

// eKYC API
export const EkycApi = {
  initKyc: (identifier: string, name: string, dob: string) =>
    request("/api/ekyc/init", "POST", { identifier, name, dob }),
  getStatus: () => request("/api/ekyc/status", "GET"),
  updateStatus: (kycId: string, status: string) =>
    request("/api/ekyc/update-status", "POST", { kycId, status }),
};

// E-Sign (DigiSign) API
export const ESignApi = {
  // Create a sign request for a subscription agreement
  initSign: (subscriptionId: string) =>
    request("/api/ekyc/sign/init", "POST", { subscriptionId }),
  // Get sign status for a subscription
  getSignStatus: (subscriptionId: string) =>
    request(`/api/ekyc/sign/status/${subscriptionId}`, "GET"),
  // Update sign status after frontend Digio SDK callback
  updateSignStatus: (subscriptionId: string, status: string) =>
    request("/api/ekyc/sign/update-status", "POST", { subscriptionId, status }),
};

export default {
  Auth: AuthApi,
  Contact: ContactApi,
  Plans: PlansApi,
  Courses: CoursesApi,
  Workshops: WorkshopsApi,
  Subscriptions: SubscriptionsApi,
  Payment: PaymentApi,
  Service: ServiceApi,
  Blog: BlogApi,
  SmallCase: SmallCaseApi,
  Ekyc: EkycApi,
  ESign: ESignApi,
};
