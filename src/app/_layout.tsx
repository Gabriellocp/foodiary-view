import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/global.css";
import {
    HostGrotesk_400Regular,
    HostGrotesk_500Medium, HostGrotesk_600SemiBold, HostGrotesk_700Bold
} from '@expo-google-fonts/host-grotesk';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <Navigation />
            </AuthProvider>
        </SafeAreaProvider>
    )
}

function Navigation() {
    const { isLoggedIn, isLoading } = useAuth();
    const [loaded, error] = useFonts({
        HostGrotesk_400Regular, HostGrotesk_500Medium, HostGrotesk_600SemiBold, HostGrotesk_700Bold
    });
    useEffect(() => {
        const isFontLoaded = loaded || error;
        const isUserLoaded = !isLoading;
        if (isFontLoaded && isUserLoaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error, isLoading]);
    if (!loaded && !error) {
        return null;
    }
    return (
        <>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }} >
                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="(public)" />
                </Stack.Protected>
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(private)" />
                </Stack.Protected>
            </Stack>
        </>
    )
}