import { Meal } from "@/domain/entities";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { DailyStats } from "./DailyStats";
import { DateSwitcher } from "./DateSwitcher";


interface IMealListHeaderProps {
    currentDate: Date;
    onPrevious: () => void;
    onNext: () => void;
    meals: Meal[]
}


export function MealListHeader({ currentDate, onNext, onPrevious, meals }: IMealListHeaderProps) {
    const { user } = useAuth();
    const { calories, carbohydrates, fats, proteins } = useMemo(() => {
        return meals.reduce((acc, meal) => {
            for (const food of meal.foods) {
                acc.calories += food.calories;
                acc.carbohydrates += food.carbohydrates;
                acc.proteins += food.proteins;
                acc.fats += food.fats;

            }
            return acc;
        }, {
            calories: 0, carbohydrates: 0, fats: 0, proteins: 0
        })
    }, [meals])
    return (
        <>
            <DateSwitcher currentDate={currentDate} onNext={onNext} onPrevious={onPrevious} />
            <View className='mt-2'>
                <DailyStats
                    calories={{ current: calories, goal: user?.calories ?? 0 }}
                    carbohydrates={{ current: carbohydrates, goal: user?.carbohydrates ?? 0 }}
                    fats={{ current: fats, goal: user?.fats ?? 0 }}
                    proteins={{ current: proteins, goal: user?.proteins ?? 0 }}
                />
            </View>
            <View className='h-px bg-gray-200 mt-7' />
            <Text className="m-5 text-black-700 text-base font-sans-medium tracking-[1.28px]">REFEIÇÕES</Text>
        </>
    )
}