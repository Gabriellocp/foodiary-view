import { Logo } from "@/components/Logo";
import { Food, Meal } from "@/domain/entities";
import { queryKeys } from "@/domain/keys";
import { httpClient } from "@/services/httpClient";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeftIcon } from "lucide-react-native";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function MealDeatailsHeader({ foods }: { foods: Food[] }) {
    const calories = foods.reduce((acc, food) => acc += food.calories, 0);

    const { top } = useSafeAreaInsets();
    return (
        <View className="h-24 w-full bg-black" style={{ paddingTop: top + 8 }}>
            <View className="flex-1 justify-between items-center px-4 flex-row">
                <View className="flex gap-4 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeftIcon size={24} color={'white'} />
                    </TouchableOpacity>
                    <Text className="text-white tracking-[-0.05px] text-base">
                        Macros Totais
                    </Text>
                </View>
                <View className="flex-row gap-2 items-center">
                    <Text className="text-white text-sm">
                        Calorias
                    </Text>
                    <View className="rounded-full bg-white h-5 w-10 items-center justify-center">
                        <Text className="text-xs font-sans-bold" adjustsFontSizeToFit>{calories}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

interface IMacroCardProps {
    label: string;
    total: number;
    percent: number;
    color: string;
}

function MacroCard({ color, label, percent, total }: IMacroCardProps) {
    return (
        <View className="items-center gap-2">
            <Text className="text-gray-700">{label}</Text>
            <Text className={cn('font-sans-medium', color)}>{`${total}g (${percent}%)`}</Text>
        </View>
    )
}

function MealDetail({ meal }: { meal: Meal }) {
    const macroItems = useMemo(() => {
        const totalMacros = meal.foods.reduce((acc, food) => {
            acc.carbohydrates.total += food.carbohydrates;
            acc.proteins.total += food.proteins;
            acc.fats.total += food.fats;
            return acc;
        }, {
            carbohydrates: {
                total: 0,
                percent: 0,
                label: 'Carboidratos',
                textColor: 'text-yellow-500',
                bgColor: 'bg-yellow-500',
            },
            proteins: {
                total: 0,
                percent: 0,
                label: 'Proteínas',
                textColor: 'text-teal-500',
                bgColor: 'bg-teal-500',
            },
            fats: {
                total: 0,
                percent: 0,
                label: 'Gorduras',
                textColor: 'text-orange-500',
                bgColor: 'bg-orange-500',
            }
        });
        const { carbohydrates, fats, proteins } = totalMacros;
        const total = (carbohydrates.total + fats.total + proteins.total) / 100;
        carbohydrates.percent = Math.floor(carbohydrates.total / total);
        proteins.percent = Math.floor(proteins.total / total);
        fats.percent = 100 - (proteins.percent + carbohydrates.percent);
        return totalMacros;
    }, [meal.id])
    return (
        <View className="flex-1">
            <View className="flex-row justify-between p-4">
                {Object.values(macroItems).map(item => <MacroCard {...item} key={item.label} color={item.textColor} />)}
            </View>
            <View className="h-2 w-auto rounded-full m-4 flex-row overflow-hidden">
                {Object.values(macroItems).map(item => {
                    return <View key={item.label} style={{ width: `${item.percent}%` }} className={cn('h-full', item.bgColor)} />
                })}
            </View>
            <View className="px-4 flex gap-2">
                <Text className="font-sans-bold text-2xl">
                    {meal.name}
                </Text>
                <FlatList
                    data={meal.foods}
                    ListHeaderComponent={<Text className="my-4 text-gray-700">Itens</Text>}
                    renderItem={({ item }) => (
                        <>
                            <Text className="ml-3 text-base text-gray-700 font-sans-medium">
                                {`${item.quantity}${item.unity} ${item.name}`}
                            </Text>
                            <View className="h-[0.5px] w-full bg-gray-700 my-2" />
                        </>
                    )}
                >

                </FlatList>
            </View>
        </View>
    )
}
export default function MealPage() {
    const { mealId } = useLocalSearchParams();
    const { data: meal, isFetching: isLoading } = useQuery({
        queryKey: queryKeys.meal.get(mealId as string),
        staleTime: 60_000,
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
        <View className="flex-1">
            <StatusBar style="light" />
            <MealDeatailsHeader foods={meal.foods} />
            <MealDetail meal={meal} />
        </View>
    )
}