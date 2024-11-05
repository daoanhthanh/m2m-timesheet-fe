const BACKEND_DOMAIN = import.meta.env.VITE_RESTFUL_DOMAIN;

export const API_URL = `${BACKEND_DOMAIN}/api/v1`;

export const endpoints = {
  login: `${API_URL}/auth/login`,
  me: `${API_URL}/auth/me`,
  logout: `${API_URL}/auth/logout`,
  changePassword: `${API_URL}/auth/change-password`,
  employee: {
    list: `${API_URL}/employees`,
  },
  downloadFile: (fileName: string) =>
    `${BACKEND_DOMAIN}/assets/file?q=${fileName}`,
};
