import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Meal } from "@/domain/entities";
import { queryKeys } from "@/domain/keys";
import { httpClient } from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function MealPage() {
    const { mealId } = useLocalSearchParams();
    const { data: meal, isFetching: isLoading } = useQuery({
        queryKey: queryKeys.meal.get,
        queryFn: async () => {
            const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`);
            return data.meal;
        },
        refetchInterval: (query) => {
            if (query.state.data?.status === 'success') return false;
            return 2000;
        },
    });
    if (isLoading || meal?.status !== "success") {
        return (
            <View className="bg-lime-700 flex-1 items-center justify-center gap-12">
                <Logo width={187} height={60} />
                <ActivityIndicator color={'white'} />
            </View>
        )
    }
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Detalhes da refeição {mealId}</Text>
            <Button onPress={() => router.back()}>
                Voltar
            </Button>
        </View>
    )
}