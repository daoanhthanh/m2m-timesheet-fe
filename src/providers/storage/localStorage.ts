import User from "@/domains/user/user";

export const saveUserSession = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserSession = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const clearSession = () => {
  localStorage.removeItem("user");
};
