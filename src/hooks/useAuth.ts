import { AuthContext } from "@/contexts/AuthContext";
import { use } from "react";

export function useAuth() {
    return use(AuthContext)
}