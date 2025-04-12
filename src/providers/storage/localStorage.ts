import { AuthUser } from "types/user";

export const saveUserSession = (user: AuthUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserSession = (): AuthUser | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const clearSession = () => {
  localStorage.removeItem("user");
};
