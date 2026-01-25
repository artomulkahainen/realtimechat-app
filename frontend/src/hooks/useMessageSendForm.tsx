import { useEffect, useState } from 'react';
import { postCreateMessage } from '../services/messages';
import { useUser } from '../store/UserContext';
import { useMessages } from '../store/MessagesContext';

export default function useMessageSendForm() {
    const { getUser } = useUser();
    const { isLoading, initMessages } = useMessages();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initMessages();
    }, []);

    async function handleMessageSubmit(content: string) {
        setLoading(true);
        await postCreateMessage(getUser(), content);
        setLoading(false);
    }

    return { handleMessageSubmit, loading: loading || isLoading };
}
