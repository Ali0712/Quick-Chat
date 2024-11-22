import { create } from 'zustand';
import axiosInstance from '../lib/axios';

export const useAuthStore = create((set) => ({
    user: 'null',
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/users/check-auth");
            set({ user: response.data });
        } catch (error) {
            console.log(error.response.data.message);
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async(data) => {
    
    },
    login: async(data) => {
    
    },

})
);
