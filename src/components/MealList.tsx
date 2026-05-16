import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MealCard } from "./MealCard";
import { MealListHeader } from "./MealListHeader";

export function MealList() {
    const { bottom } = useSafeAreaInsets()
    return (
        <FlatList
            // ItemSeparatorComponent={() => <View className="h-8"></View>}
            contentContainerStyle={{ gap: 32, paddingBottom: 80 + bottom + 16 }}
            ListHeaderComponent={MealListHeader}
            data={['1', '2', '3']}
            keyExtractor={(meal) => String(meal)}
            renderItem={({ item: meal }) => {
                return <View className="mx-5">
                    <MealCard id={meal} name={meal} />
                </View>
            }} >
        </FlatList>
    )
}