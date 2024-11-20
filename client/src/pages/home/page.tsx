import { apiClient } from "@/lib/api-client";
import { AxiosResponse } from "axios";
import { useEffect } from 'react';

const HomePage = () => {
    const isAuthenticated = async () => {
        try {
            const res: AxiosResponse = await apiClient.get("/auth/isLoggedIn");

            if (res.status === 200) {
                const data = res.data;
                console.log("Authorized");

                console.log(data);
            } else if (res.status === 401) {
                console.log("You are not authorized!");
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        isAuthenticated();
    }, [])

    return (
        <div>HomePage</div>
    )
}

export default HomePage