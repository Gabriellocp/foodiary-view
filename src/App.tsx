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
import { DailyStats } from './components/DailyStats';
import { DateSwitcher } from './components/DateSwitcher';
import { HomeHeader } from './components/HomeHeader';
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
        <HomeHeader />
        <DateSwitcher />
        <View className='mt-2'>
          <DailyStats
            calories={{ current: 200, goal: 1000 }}
            carbohydrates={{ current: 200, goal: 1000 }}
            fats={{ current: 200, goal: 1000 }}
            proteins={{ current: 200, goal: 1000 }}
          />
        </View>
        <View className='h-px bg-gray-200 mt-7'></View>
      </SafeAreaProvider>
    </View>
  );
}
