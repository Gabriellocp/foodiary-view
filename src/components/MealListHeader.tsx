import { Text, View } from "react-native";
import { DailyStats } from "./DailyStats";
import { DateSwitcher } from "./DateSwitcher";

export function MealListHeader() {
    return (
        <>
            <DateSwitcher />
            <View className='mt-2'>
                <DailyStats
                    calories={{ current: 200, goal: 1000 }}
                    carbohydrates={{ current: 200, goal: 1000 }}
                    fats={{ current: 200, goal: 1000 }}
                    proteins={{ current: 200, goal: 1000 }}
                />
            </View>
            <View className='h-px bg-gray-200 mt-7' />
            <Text className="m-5 text-black-700 text-base font-sans-medium tracking-[1.28px]">REFEIÇÕES</Text>
        </>
    )
}