import { httpClient } from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MealCard } from "./MealCard";
import { MealListHeader } from "./MealListHeader";
type Food = {
    name: string,
    quantity: number,
    calories: number,
    proteins: number,
    carbohydrates: number,
    fats: number
}
type Meal = {
    name: string;
    id: string;
    icon: string;
    foods: Food[];
    createdAt: Date;
}

export function MealList() {
    const { bottom } = useSafeAreaInsets();

    const { data: meals } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const { data } = await httpClient.get<{ meals: Meal[] }>('/meals', {
                params: {
                    date: '2026-05-31'
                }
            });
            return data.meals;
        }
    })
    return (
        <FlatList
            // ItemSeparatorComponent={() => <View className="h-8"></View>}
            contentContainerStyle={{ gap: 32, paddingBottom: 80 + bottom + 16 }}
            ListHeaderComponent={MealListHeader}
            data={meals}
            ListEmptyComponent={<Text className="text-xl text-gray-700 text-center">Nenhuma refeição cadastrada</Text>}
            keyExtractor={(meal) => String(meal)}
            renderItem={({ item: meal }) => {
                return <View className="mx-5">
                    <MealCard id={meal.id} name={meal.name} />
                </View>
            }} >
        </FlatList>
    )
}