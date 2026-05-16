import { CreateMealBottomBar } from "@/components/CreateMealBottomBar";
import { HomeHeader } from "@/components/HomeHeader";
import { MealList } from "@/components/MealList";
import { View } from "react-native";

export default function HomePage() {
    return (
        <View className="flex-1 bg-white">
            <HomeHeader />
            <MealList />
            <CreateMealBottomBar />
        </View>
    )
}