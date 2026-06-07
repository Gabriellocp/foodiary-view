import { Food } from "@/domain/entities";
import { formatMealDate } from "@/utils/formatMealDate";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface IMealCard {
    id: string;
    createdAt: Date;
    name: string;
    icon: string;
    foods: Pick<Food, 'name'>[];
}

export function MealCard({ id, name, createdAt, foods, icon }: IMealCard) {
    return (
        <Link href={{
            pathname: "/meal/[mealId]",
            params: { mealId: id }
        }} asChild>
            <TouchableOpacity>
                <Text className="text-base font-sans-regular text-gray-700">{formatMealDate(createdAt)}</Text>
                <View className="mt-2 px-4 py-5 flex-row gap-3 items-center border-gray-400 border rounded-2xl">
                    <View className="size-12 bg-gray-200 rounded-full items-center justify-center">
                        <Text>{icon}</Text>
                    </View>
                    <View>
                        <Text className="text-gray-700 font-sans-regular text-base">{name}</Text>
                        <Text className="text-black-700 font-sans-medium text-base">
                            {foods.map(food => food.name).join(', ')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}