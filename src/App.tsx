import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium, HostGrotesk_600SemiBold, HostGrotesk_700Bold
} from '@expo-google-fonts/host-grotesk';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './screens/Home';
import "./styles/global.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    HostGrotesk_400Regular, HostGrotesk_500Medium, HostGrotesk_600SemiBold, HostGrotesk_700Bold
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View className='flex flex-1 bg-white'>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Home />
      </SafeAreaProvider>
    </View>
  );
}
