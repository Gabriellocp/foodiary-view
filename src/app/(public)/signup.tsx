import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { AccountStep } from "@/components/SignUpSteps/AccountStep";
import { ActivityLevelStep } from "@/components/SignUpSteps/ActivityLevelStep";
import { BirthDateStep } from "@/components/SignUpSteps/BirthDateStep";
import { GenderStep } from "@/components/SignUpSteps/GenderStep";
import { GoalStep } from "@/components/SignUpSteps/GoalStep";
import { HeightStep } from "@/components/SignUpSteps/HeightStep";
import { signUpSchema } from "@/components/SignUpSteps/signUpSchema";
import { WeightStep } from "@/components/SignUpSteps/WeightStep";
import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";

export default function SignUpPage() {
    const { signUp } = useAuth();
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
        {
            icon: '📅',
            title: 'Qual é sua data de nascimento?',
            subtitle: 'Sua idade ajuda a personalizar sua dieta',
            Component: BirthDateStep,
        },
        {
            icon: '📏',
            title: 'Qual é sua altura?',
            subtitle: 'Sua altura é importante para o cálculo do IMC',
            Component: HeightStep,
        },
        {
            icon: '⚖️',
            title: 'Qual é seu peso atual?',
            subtitle: 'Seu peso atual nos ajuda a criar sua dieta',
            Component: WeightStep,
        },
        {
            icon: '🏃',
            title: 'Qual é seu nível de atividade?',
            subtitle: 'Isso nos ajuda a calcular suas necessidades calóricas',
            Component: ActivityLevelStep,
        },
        {
            icon: '📝',
            title: 'Crie sua conta',
            subtitle: 'Finalize seu cadastro para começar sua jornada',
            Component: AccountStep,
        },
    ];
    const currentStep = steps[currentStepIndex];
    const isLastStep = currentStepIndex === steps.length - 1;

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
    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await signUp(data)
        } catch (err) {

        }
    })
    return (
        <AuthLayout
            icon={currentStep.icon}
            title={currentStep.title}
            subtitle={currentStep.subtitle}
        >
            <View className="flex-1 justify-between gap-2">
                <FormProvider {...form}>
                    <currentStep.Component />
                </FormProvider>
                <View className="flex-row gap-6 justify-between">
                    <Button size="icon" color="gray" onPress={handlePreviousStep}>
                        <ArrowLeftIcon size={20} color={colors.black[700]} />
                    </Button>
                    {isLastStep ? (
                        <Button
                            className="flex-1"
                            onPress={handleSubmit}
                            loading={form.formState.isSubmitting}
                            disabled={form.formState.isSubmitting}
                        >
                            Criar conta
                        </Button>
                    ) : (
                        <Button size="icon" onPress={handleNextStep}>
                            <ArrowRightIcon size={20} color={colors.black[700]} />
                        </Button>
                    )}
                </View>
            </View>
        </AuthLayout>
    )
}