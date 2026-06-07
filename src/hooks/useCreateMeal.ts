import { httpClient } from "@/services/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MealType {
    type: 'audio' | 'image',
    onSuccess?: (data: CreateMealResponse) => void
}

type CreateMealResponse = {
    presignedUrl: string;
    mealId: string;
}

export function useCreateMeal({ type, onSuccess }: MealType) {
    const queryClient = useQueryClient();
    const { mutateAsync: createMeal, isPending: isLoading } = useMutation({
        mutationKey: ['meal', 'create'],
        mutationFn: async (uri: string) => {
            const { data } = await httpClient.post<CreateMealResponse>('/meals', {
                fileType: type === 'audio' ? 'audio/m4a' : 'image/jpeg'
            });

            const { presignedUrl: uploadUrl } = data;
            const response = await fetch(uri);
            const file = await response.blob();
            await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': type === 'audio' ? 'audio/m4a' : 'image/jpg'
                }
            });
            return data;
        },
        onSuccess: (data) => {
            onSuccess?.(data);
            queryClient.refetchQueries({ queryKey: ['meal', 'list'] });
        }
    })
    return {
        createMeal,
        isLoading
    }
}