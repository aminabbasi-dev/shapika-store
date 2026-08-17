export interface User {
  id: string;
  first_name: string; // ✅ تغییر از name به first_name
  last_name: string; // ✅ اضافه شد
  email: string;
  phone_number?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
}

export interface LoginInput {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterInput {
  first_name: string; // ✅ تغییر از name
  last_name: string; // ✅ اضافه شد
  email: string;
  phone_number?: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptNewsletter?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User; // ✅ حذف Omit چون User password ندارد
  errors?: {
    field?: string;
    message: string;
  }[];
}

export interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
    general?: string;
  };
  timestamp?: Date;
  success?: boolean;
}

export interface RegisterFormState {
  errors: {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    phone_number?: string[];
    password?: string[];
    confirmPassword?: string[];
    acceptTerms?: string[];
    general?: string;
  };
  timestamp?: Date;
  success?: boolean;
}

export interface JWTPayload {
  userId: string;
  email: string;
  first_name?: string; // ✅ اضافه شد
  last_name?: string; // ✅ اضافه شد
  iat?: number;
  exp?: number;
}
