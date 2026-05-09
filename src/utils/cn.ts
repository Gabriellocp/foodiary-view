import clsx, { ClassValue } from "clsx";
import { twMerge } from "tw-merge";

export function cn(...classNames: ClassValue[]) {
    return (
        twMerge(clsx(...classNames))
    )
}