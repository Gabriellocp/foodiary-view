import { httpClient } from "@/services/httpClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from "@tanstack/react-query";
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

type User = {
    name: string;
    id: string;
    email: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
}

interface IAuthContextValue {
    user: User | undefined;
    isLoggedIn: boolean;
    isLoading: boolean;
    signIn: (params: SignInParams) => Promise<void>;
    signUp: (params: SignUpParams) => Promise<void>;
    signOut: () => Promise<void>;
}

const TOKEN_KEY = "@foodiary::token"
export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function load() {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            setToken(token);
            setIsLoading(false);
        }
        load();
    }, [])

    useEffect(() => {
        async function run() {
            if (!token) {
                httpClient.defaults.headers.common.Authorization = null;
                return
            }
            await AsyncStorage.setItem(TOKEN_KEY, token);
            httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
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
    const { data: user, isFetching } = useQuery({
        enabled: !!token,
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const { data } = await httpClient.get<{ user: User }>('/me');
            return data.user;
        }
    })

    const signOut = useCallback(async () => {
        setToken(null);
        await AsyncStorage.removeItem(TOKEN_KEY);
    }, [])
    return (
        <AuthContext.Provider value={
            {
                user,
                isLoggedIn: !!user && !!token,
                isLoading: isLoading || isFetching,
                signIn: handleSignIn,
                signUp: handleSignUp,
                signOut
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}