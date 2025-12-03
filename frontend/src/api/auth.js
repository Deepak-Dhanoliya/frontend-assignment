import API from "./api";

export const signup = (payload) => API.post("/signup", payload);
export const login = (payload) => API.post("/login", payload);

export const me = () => API.get("/profile");

export const updateProfile = (payload) => API.put("/profile", payload);

