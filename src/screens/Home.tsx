import { CreateMealBottomBar } from "../components/CreateMealBottomBar";
import { HomeHeader } from "../components/HomeHeader";
import { MealList } from "../components/MealList";

export function Home() {
    return (
        <>
            <HomeHeader />
            <MealList />
            <CreateMealBottomBar />
        </>
    )
}