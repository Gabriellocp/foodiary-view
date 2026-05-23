import { Controller, useFormContext } from "react-hook-form";
import { OptionsSelector } from "../OptionsSelector";
import { SignUpFormData } from "./signUpSchema";

export function GoalStep() {
    const form = useFormContext<SignUpFormData>();
    return (
        <Controller
            control={form.control}
            name="goal"
            render={({ field }) => {
                return (
                    <OptionsSelector
                        onChange={field.onChange}
                        value={field.value}
                        options={[
                            {
                                icon: '🥬',
                                title: 'Perder peso',
                                value: 'lose'
                            },
                            {
                                icon: '🍎',
                                title: 'Manter peso',
                                value: 'mantain'
                            },
                            {
                                icon: '🍖',
                                title: 'Ganhar peso',
                                value: 'gain'
                            }
                        ]}
                    />
                )
            }}
        />

    )
}