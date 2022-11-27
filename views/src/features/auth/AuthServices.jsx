import axios from "axios";

const API_URL = "http://localhost:3500/api/auth/";

// Register user
const signUp = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("token", response.data.accessToken);
  }

  return response.data.accessToken;
};

// Login user
const signIn = async (userData) => {
  const response = await axios.post(API_URL + "signin", userData);
  if (response.data) {
    localStorage.setItem("token", response.data.accessToken);
  }
  return response.data.accessToken;
  // console.log(response.data)
};

// Refresh User Access Token
const refresh = async () => {
  // withCredentials allows us to send secure cookies in the request
  const response = await axios.get(API_URL + "refresh", {
    withCredentials: true,
  });
  console.log("AuthService: refresh response is", response.data.accessToken);
  return response.data.accessToken;
};

// Login user
const loadUser = async (axiosPrivate) => {
  const response = await axiosPrivate.get(API_URL + "me");

  return response.data;
 
};
const getUser = async (email) => {
  // console.log(email)
  const response = await axios.post(API_URL + "info", email);

  return response.data;
 
};

// get user email for password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgot-password", userData);

  return response.data;
};

// get user email for password
const resetPassword = async (userData) => {
  const response = await axios.put(API_URL + "reset-password", userData);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  return response.data;
};

// verify token from forgot password
const verifyToken = async (token) => {
  const response = await axios.get(`${API_URL}verifyToken?token=${token}`);

  return response.data;
};

// Update user
const updateUser = async (data, token) => {
 
  console.log(data)

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.put(`${API_URL}me`, data, config);

  return response.data;
};

// Logout user
const SignOut = () => {
  localStorage.removeItem("token");
};

const authService = {
  signUp,
  SignOut,
  signIn,
  forgotPassword,
  resetPassword,
  verifyToken,
  updateUser,
  loadUser,
  getUser,
  refresh,
};

export default authService;
