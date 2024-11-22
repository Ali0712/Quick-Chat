import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: 'null',
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/users/check-auth");
            set({ user: response.data.data });
        } catch (error) {
            console.log(error.response.data.message);
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async(data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post("/users/register", data);
            console.log(response.data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async(data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post("/users/login", data);
            console.log(response.data.data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout : async() => {
        try {
            const response = await axiosInstance.post("/users/logout");
            console.log(response.data);
            toast.success(response.data.message);
            set({ user: null });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
})
);
