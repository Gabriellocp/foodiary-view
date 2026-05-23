import z from 'zod';

export const signUpSchema = z.object({
    goal: z.enum(['lose', 'maintain', 'gain']),
    birthDate: z.string().min(1, 'Data de nascimento é obrigatória').transform((data) => {
        const [day, month, year] = data.split('/');
        return `${year}-${month}-${day}`;
    }),
    gender: z.enum(['male', 'female']),
    height: z.string().min(1, 'Altura é obrigatória').transform(Number),
    weight: z.string().min(1, 'Peso é obrigatório').transform(Number),
    activityLevel: z.string().transform(Number),
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.email('Email inválido'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
}).transform((data) => {
    const { name, email, password, ...rest } = data;
    return ({
        ...rest,
        account: {
            name,
            password,
            email,
        }
    })
});
// Take only the 'input' so the transformed fields will be sent to 'data' on react-hook-form handleSubmit
export type SignUpFormData = z.input<typeof signUpSchema>;