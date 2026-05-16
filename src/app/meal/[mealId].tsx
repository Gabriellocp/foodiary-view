import { Button } from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function MealPage() {
    const { mealId } = useLocalSearchParams()
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Detalhes da refeição {mealId}</Text>
            <Button onPress={() => router.back()}>
                Voltar
            </Button>
        </View>
    )
}