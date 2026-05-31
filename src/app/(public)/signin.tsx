import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/styles/colors";
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Controller, useForm } from 'react-hook-form';
import { View } from "react-native";
import z from 'zod';
const signInSchema = z.object({
    email: z.email('Informe um e-mail válido'),
    password: z.string().min(8, 'A senha deve ter 8 caracteres')
})

export default function SignInPage() {
    const { signIn } = useAuth();
    const { control, handleSubmit: handleSubmitHook, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const handleSubmit = handleSubmitHook(async (data) => {
        try {
            await signIn(data);
        } catch (err) {
            console.log(err)
        }
    })
    return (
        <AuthLayout
            icon="🙎"
            title="Entre em sua conta"
            subtitle="Acesse sua conta"
        >
            <View className="justify-between flex-1">

                <View className="gap-6">
                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState }) => <Input
                            label="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            value={field.value}
                            error={fieldState.error?.message}
                            onChangeText={field.onChange}
                        />}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field, fieldState }) => <Input
                            label="Senha"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="password"
                            secureTextEntry
                            value={field.value}
                            error={fieldState.error?.message}
                            onChangeText={field.onChange}
                        />}
                    />

                </View>
                <View className="flex-row gap-6">
                    <Button size="icon" color="gray" onPress={() => router.back()}>
                        <ArrowLeftIcon size={20} color={colors.black[700]} />
                    </Button>
                    <Button className="flex-1" onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>Entrar</Button>
                </View>
            </View>
        </AuthLayout>
    )
}