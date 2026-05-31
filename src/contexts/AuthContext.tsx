import { httpClient } from "@/services/httpClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
type SignInParams = {
    email: string;
    password: string;
}

type SignUpParams = {
    account: {
        name: string;
        email: string;
        password: string;
    };
    height: number;
    weight: number;
    activityLevel: number;
    gender: string;
    goal: string;

}


interface IAuthContextValue {
    isLoggedIn: boolean;
    isLoading: boolean;
    signIn: (params: SignInParams) => Promise<void>;
    signUp: (params: SignUpParams) => Promise<void>;
}

const TOKEN_KEY = "@foodiary::token"
export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        async function run() {
            if (!token) {
                return await AsyncStorage.removeItem(TOKEN_KEY);
            }
            await AsyncStorage.setItem(TOKEN_KEY, token);

        }
        run();

    }, [token])
    const { mutateAsync: handleSignIn } = useMutation({
        mutationFn: async (body: SignInParams) => {
            const { data } = await httpClient.post('/signin', body);
            const APIToken = data.accessToken;
            setToken(APIToken);
        }
    });
    const { mutateAsync: handleSignUp } = useMutation({
        mutationFn: async (body: SignUpParams) => {
            const { data } = await httpClient.post('/signup', body);
            const APIToken = data.accessToken;
            setToken(APIToken);
        }
    });

    const signOut = useCallback(() => {
        setToken(null);
    }, [])
    return (
        <AuthContext.Provider value={
            {
                isLoggedIn: !!token,
                isLoading: false,
                signIn: handleSignIn,
                signUp: handleSignUp,
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}