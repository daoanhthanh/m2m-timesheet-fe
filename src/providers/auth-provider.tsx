import { AuthProvider } from "@refinedev/core";
import { endpoints } from "@/providers/endpoints";
import User, { Role } from "@/domains/user/user";
import {
  clearSession,
  saveUserSession,
} from "@/providers/storage/localStorage";
import { get, post } from "@/providers/http/request";

const checkMe = async () => {
  const maybeMe = await get<User>(endpoints.me);

  if (maybeMe.isFails()) {
    return null;
  }

  return maybeMe.data();
};

const authProvider: AuthProvider = {
  check: async () => {
    const me = await checkMe();

    if (me) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Vui lòng đăng nhập lại",
        name: "Không có quyền truy cập",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  forgotPassword: async (params) => {
    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  getIdentity: async () => {
    return await checkMe();
  },
  getPermissions: async (params) => {
    const me = await checkMe();
    if (!me) {
      return null; // Thực tế trường hợp này sẽ không xảy ra do trước hết route phải đi qua hàm xác thực => chắc chắn có me
    }
    return me.role as Role;
  },
  login: async ({ email, password }) => {
    const body = {
      userID: email,
      password,
    };

    const response = await post<any, User>(endpoints.login, body);

    if (response.isFails()) {
      const message = response.getErrorMessage();
      return {
        success: false,
        error: {
          message: "Đăng nhập thất bại",
          name: message,
        },
      };
    }

    const me = response.data();

    saveUserSession(me);
    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    clearSession();
    await post(endpoints.logout, {});
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  updatePassword: async (params) => {
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
};

export default authProvider;
