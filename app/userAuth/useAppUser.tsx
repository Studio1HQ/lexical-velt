"use client";

import { useAppUser as useAppUserFromContext } from './AppUserContext';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const predefinedUser = [
    {
        userId: 'user001',
        name: 'Nany',
        email: 'user1@example.com',
        photoUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Nany',
        organizationId: 'demo-org',
    }, {
        userId: 'user002',
        name: 'Mary',
        email: 'user2@example.com',
        photoUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Mary',
        organizationId: 'demo-org',
    }

]
export function useAppUser() {
    const { user, setUser, isLoggedIn } = useAppUserFromContext();
    const searchParams = useSearchParams();
    const userParam = searchParams.get('user');

    useEffect(() => {
        if (userParam) {
            const newUser = predefinedUser.find(v => v.userId === userParam);
            if (newUser) {
                setUser(newUser);
            }
        }
    }, [userParam, setUser]);

    return { user, isLoggedIn };
}
