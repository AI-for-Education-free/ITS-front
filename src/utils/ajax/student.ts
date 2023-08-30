import axiosInstance from './index';


export const login = (info: Record<string, any>) => {
  return axiosInstance({
    method: "post",
    url: "/students/login",
    data: info,
    responseType: "json",
  });
};

export const register = (info: Record<string, any>) => {
  return axiosInstance({
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    url: "/students/register",
    data: info,
    responseType: "json",
  });
};