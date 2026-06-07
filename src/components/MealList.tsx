import { Meal } from "@/domain/entities";
import { queryKeys } from "@/domain/keys";
import { httpClient } from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MealCard } from "./MealCard";
import { MealListHeader } from "./MealListHeader";

export function MealList() {
    const { bottom } = useSafeAreaInsets();
    const [currentDate, setCurrentDate] = useState(new Date());
    const dateStr = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`
    }, [currentDate])
    const { data: meals } = useQuery({
        queryKey: queryKeys.meal.listWithFilers([currentDate.toString()]),
        staleTime: Infinity,
        queryFn: async () => {
            const { data } = await httpClient.get<{ meals: Meal[] }>('/meals', {
                params: {
                    date: dateStr
                }
            });
            return data.meals;
        }
    })

    function handlePreviousDate() {
        setCurrentDate((date) => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        })
    }

    function handleNextDate() {
        setCurrentDate((date) => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        })
    }
    return (
        <FlatList
            // ItemSeparatorComponent={() => <View className="h-8"></View>}
            contentContainerStyle={{ gap: 32, paddingBottom: 80 + bottom + 16 }}
            ListHeaderComponent={<MealListHeader
                currentDate={currentDate}
                onNext={handleNextDate}
                onPrevious={handlePreviousDate}
            />}
            data={meals}
            ListEmptyComponent={<Text className="text-xl text-gray-700 text-center">Nenhuma refeição cadastrada</Text>}
            keyExtractor={(meal) => meal.id}
            renderItem={({ item: meal }) => {
                return <View className="mx-5">
                    <MealCard id={meal.id} name={meal.name} />
                </View>
            }} >
        </FlatList>
    )
}