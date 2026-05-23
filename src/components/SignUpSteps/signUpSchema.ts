import z from "zod";

export const signUpSchema = z.object({
    goal: z.enum(['lose', 'mantain', 'gain']),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;