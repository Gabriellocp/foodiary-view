import { httpClient } from "@/services/httpClient";
import { useMutation } from "@tanstack/react-query";

interface MealType {
    type: 'audio' | 'image'
}

export function useCreateMeal({ type }: MealType) {

    const { mutateAsync: createMeal, isPending: isLoading } = useMutation({
        mutationKey: ['meal', 'create'],
        mutationFn: async (uri: string) => {
            const { data } = await httpClient.post('/meals', {
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
        }
    })
    return {
        createMeal,
        isLoading
    }
}