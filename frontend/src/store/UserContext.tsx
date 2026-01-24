import { createContext, useContext, useState, type ReactNode } from 'react';

interface UserContextValue {
    setUser: (user: string) => void;
    initialized: boolean;
    setInitialized: (value: boolean) => void;
    getUser: () => string;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string>();
    const [initialized, setInitialized] = useState(false);

    function getUser() {
        if (!user) {
            throw new Error('User is not initialized');
        }

        return user;
    }

    return (
        <UserContext.Provider
            value={{ getUser, setUser, initialized, setInitialized }}
        >
            {children}
        </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser(): UserContextValue {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error('UserProvider has not been provided to component');
    }
    return ctx;
}
