import create, { StateCreator } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';



type AuthState = {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
};

type AuthActions = {
    setAuth: (accessToken: string, refreshToken: string) => void;
    clearAuth: () => void;
    checkAuth: () => Promise<void>;
};

export type AuthSlice = AuthState & AuthActions;

const initialVal: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
}
// export const createAuthSlice: StateCreator<
//     AuthSlice,
//     [['zustand/immer', never]],
//     [],
//     AuthSlice
// > = (set) => ({
//     ...initialVal,
//     setAuth: (accessToken, refreshToken) => set((state) => {
//         state.isAuthenticated = true,
//             state.accessToken = accessToken,
//             state.refreshToken = refreshToken
//     }),
//     clearAuth: () => {
//         set((state) => { state.isAuthenticated = false, state.accessToken = null, state.refreshToken = null });
//         Cookies.remove('accessToken');
//         Cookies.remove('refreshToken');
//     },
//     checkAuth: async () => {
//         const accessToken = Cookies.get('accessToken');
//         const refreshToken = Cookies.get('refreshToken');
//         if (accessToken && refreshToken) {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/auth/verify', {
//                     headers: { 'Authorization': `Bearer ${accessToken}` }
//                 });
//                 console.log('df', response);
//                 if (response.status === 200 && response.statusText === "OK") {
//                     set((state) => { state.isAuthenticated = true });
//                 }
//             } catch (error) {
//                 set((state) => { state.isAuthenticated = false });
//                 Cookies.remove('accessToken');
//                 Cookies.remove('refreshToken');
//             }
//         } else {
//             set((state) => { state.isAuthenticated = false });
//         }
//     },
// });

export const createAuthSlice: StateCreator<
    AuthSlice,
    [['zustand/immer', never]],
    [],
    AuthSlice
> = (set) => ({
    ...initialVal,
    setAuth: (accessToken, refreshToken) => {
        set((state) => {
            state.isAuthenticated = true;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        });
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
    },
    clearAuth: () => {
        set((state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
        });
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
    },
    checkAuth: async () => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        if (accessToken && refreshToken) {
            try {
                const response = await axios.get('http://localhost:4000/api/auth/verify', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                if (response.status === 200) {
                    set((state) => { state.isAuthenticated = true });
                }
            } catch (error) {
                set((state) => { state.isAuthenticated = false });
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
            }
        } else {
            set((state) => { state.isAuthenticated = false });
        }
    },
});


