import { useAuth } from "@/hooks/useAuth";
import { Text, View } from "react-native";
import { DailyStats } from "./DailyStats";
import { DateSwitcher } from "./DateSwitcher";

export function MealListHeader() {
    const { user } = useAuth();
    return (
        <>
            <DateSwitcher />
            <View className='mt-2'>
                <DailyStats
                    calories={{ current: 0, goal: user?.calories ?? 0 }}
                    carbohydrates={{ current: 0, goal: user?.carbohydrates ?? 0 }}
                    fats={{ current: 0, goal: user?.fats ?? 0 }}
                    proteins={{ current: 0, goal: user?.proteins ?? 0 }}
                />
            </View>
            <View className='h-px bg-gray-200 mt-7' />
            <Text className="m-5 text-black-700 text-base font-sans-medium tracking-[1.28px]">REFEIÇÕES</Text>
        </>
    )
}