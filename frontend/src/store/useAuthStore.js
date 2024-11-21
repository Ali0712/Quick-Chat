import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            
        } catch (error) {
            console.log("Error checking auth", error);
            set({user: null});
        } finally {
            set({isCheckingAuth: false});
        }
    }

}))
