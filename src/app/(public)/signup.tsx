import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { GenderStep } from "@/components/SignUpSteps/GenderStep";
import { GoalStep } from "@/components/SignUpSteps/GoalStep";
import { signUpSchema } from "@/components/SignUpSteps/signUpSchema";
import { colors } from "@/styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema)
    })
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const steps = [
        {
            icon: "🎯",
            title: "Qual é seu objetivo?",
            subtitle: "O que você pretende alcançar com a dieta?", Component: GoalStep
        },
        {
            icon: "❓",
            title: "Qual é seu gênero?",
            subtitle: "Seu gênero influencia no tipo da dieta",
            Component: GenderStep
        },
    ];
    const currentStep = steps[currentStepIndex];
    function handlePreviousStep() {
        if (currentStepIndex === 0) {
            router.back();
            return;
        }
        setCurrentStepIndex((prev) => prev - 1);
    }
    function handleNextStep() {
        if (currentStepIndex === steps.length - 1) return;
        setCurrentStepIndex((prev) => prev + 1);
    }
    return (
        <AuthLayout
            icon={currentStep.icon}
            title={currentStep.title}
            subtitle={currentStep.subtitle}
        >
            <View className="flex-1 justify-between">
                <FormProvider {...form}>
                    <currentStep.Component />
                </FormProvider>
                <View className="flex-row gap-6 justify-between">
                    <Button size="icon" color="gray" onPress={handlePreviousStep}>
                        <ArrowLeftIcon size={20} color={colors.black[700]} />
                    </Button>
                    <Button size="icon" onPress={handleNextStep}>
                        <ArrowRightIcon size={20} color={colors.black[700]} />
                    </Button>
                </View>
            </View>
        </AuthLayout>
    )
}