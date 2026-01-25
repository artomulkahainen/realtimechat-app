import { useMessages } from '../store/MessagesContext';
import { useUser } from '../store/UserContext';

export default function useEntry() {
    const { setUser, setInitialized } = useUser();
    const { initMessages, isLoading } = useMessages();

    async function handleProceedToChat(user: string) {
        setUser(user);
        await initMessages();
        setInitialized(true);
    }

    return { handleProceedToChat, isLoading };
}
