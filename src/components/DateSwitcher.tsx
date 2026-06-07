import { formatDate } from "@/utils/formatDate";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colors";

interface IDateSwitcherProps {
    currentDate: Date;
    onPrevious: () => void;
    onNext: () => void;
}

export function DateSwitcher({ currentDate, onNext, onPrevious }: IDateSwitcherProps) {
    return (
        <View className="px-2 mt-3 flex flex-row items-center justify-between">
            <TouchableOpacity className="size-12 items-center justify-center" onPress={onPrevious}>
                <ChevronLeftIcon size={20} color={colors.black[700]} />
            </TouchableOpacity>
            <Text className="font-sans-medium text-base text-gray-700 tracking-[1.28px]">{formatDate(currentDate)}</Text>
            <TouchableOpacity className="size-12  items-center justify-center" onPress={onNext}>
                <ChevronRightIcon size={20} color={colors.black[700]} />
            </TouchableOpacity>
        </View>
    )
}