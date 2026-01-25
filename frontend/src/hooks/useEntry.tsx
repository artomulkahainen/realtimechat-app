import { useUser } from '../store/UserContext';

export default function useEntry() {
    const { setUser, setInitialized } = useUser();

    function handleProceedToChat(user: string) {
        setUser(user);
        setInitialized(true);
    }

    return { handleProceedToChat };
}
