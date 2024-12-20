import { createContext, useState, useEffect, useContext } from 'react';
import { apiClient } from '../lib/api-client';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export interface ProfileType {
    id: string,
    name: string,
    email?: string,
    about: string,
    profilePic: string,
    phoneNumber?: string,

    // info
    enabled: boolean,
    emailVerified: boolean,
    phoneVerified: boolean
}

interface UserContextType {
    userProfile: ProfileType | null;
    setUserProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;
    getProfileInfo: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<ProfileType | null>(null);
    const navigate = useNavigate();

    const getProfileInfo = async () => {
        const res = await apiClient.get("/user/profile");

        if (res.status === 200) {
            const data = res.data;

            // console.log(data);


            setUserProfile(data);
        } else if (res.status === 401) {
            // console.log("Unauthorized");
            toast.error("Unauthorized user!")
            navigate("/auth")
        }

    }

    useEffect(() => {
        getProfileInfo();
    }, [])

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile, getProfileInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export const useProfile = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useProfile must be used within a UserContextProvider");
    }

    return context;
};