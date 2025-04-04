"use client"
import {redirect} from 'next/navigation';
import useUser from "@/grandus-lib/hooks/useUser";

export const AuthGuard = ({ children }) => {
    const { user, isLoading } = useUser()

    if (isLoading) {
        return null;
    }

    if (!isLoading && !user?.accessToken) {
        return redirect("/prihlasenie");
    }

    return children;
};
