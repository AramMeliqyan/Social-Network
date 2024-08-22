import axios from "axios";
import { IResponse, IUser, PartialUser } from "./types";
import { IPassword, ILogin } from "./types";

export const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})


export const handleSignupRequest = async (user: IUser): Promise<IResponse> => {
    const response = await Axios.post("/signup", user)
    return response.data;
}

export const handleLogin = async (user: PartialUser): Promise<IResponse> => {
    const response = await Axios.post("/login", user);
    return response.data;
}

export const verifyUser = async (): Promise<IResponse> => {
    const response = await Axios.get("/verify");
    return response.data;
}

export const handleLogout = async (): Promise<IResponse> => {
    const response = await Axios.post("/logout");
    return response.data;
}

export const handleUpload = async (form: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload", form);
    return response.data;
}

export const addPost = async (form: FormData): Promise<IResponse> => {
    const response = await Axios.post("/posts", form);
    return response.data;
}

export const getAllPosts = async (): Promise<IResponse> => {
    const response = await Axios.get("/posts");
    return response.data;
}

export const deletePosts = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete(`/posts/${id}`);
    return response.data;
}

export const updatePassword = async (passwords: IPassword): Promise<IResponse> => {
    const response = await Axios.patch("/update/password", passwords);
    return response.data;
}

export const updateLogin = async (loginData: ILogin): Promise<IResponse> => {
    const response = await Axios.patch("/update/login", loginData);
    return response.data;
}

export const updatePageVisibility = async (): Promise<IResponse> => {
    const response = await Axios.patch("/account/set");
    return response.data;
}