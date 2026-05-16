import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface IMealCard {
    id: string,
    name: string
}

export function MealCard({ id, name }: IMealCard) {
    return (
        <Link href={{
            pathname: "/meal/[mealId]",
            params: { mealId: id }
        }} asChild>
            <TouchableOpacity>
                <Text className="text-base font-sans-regular text-gray-700">Hoje, 12h25</Text>
                <View className="mt-2 px-4 py-5 flex-row gap-3 items-center border-gray-400 border rounded-2xl">
                    <View className="size-12 bg-gray-200 rounded-full items-center justify-center">
                        <Text>🍞</Text>
                    </View>
                    <View>
                        <Text className="text-gray-700 font-sans-regular text-base">{name}</Text>
                        <Text className="text-black-700 font-sans-medium text-base">Pão</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}