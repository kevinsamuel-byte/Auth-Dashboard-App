import axiosInstance from "./axiosInstance";

export const loginUser = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const getDashboardData = async () => {
  const res = await axiosInstance.get("/dashboard");
  return res.data;
};

export const updateUser = async (data) => {
  const res = await axios.put("/user/update", data);
  return res.data;
};