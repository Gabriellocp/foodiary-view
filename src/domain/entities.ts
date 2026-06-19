export type Food = {
    name: string,
    quantity: number,
    calories: number,
    proteins: number,
    carbohydrates: number,
    fats: number,
    unity: string
}
export type Meal = {
    name: string;
    id: string;
    icon: string;
    foods: Food[];
    createdAt: Date;
    status: 'uploading' | 'processing' | 'success' | 'failed'
}
