import { FlatList, View } from "react-native";
import { MealCard } from "./MealCard";
import { MealListHeader } from "./MealListHeader";

export function MealList() {
    return (

        <FlatList
            // ItemSeparatorComponent={() => <View className="h-8"></View>}
            contentContainerStyle={{ gap: 32 }}
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