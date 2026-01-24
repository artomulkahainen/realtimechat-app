import { postCreateMessage } from '../services/messages';
import { useUser } from '../store/UserContext';

function useChat() {
    const { getUser } = useUser();

    async function handleMessageSubmit(content: string) {
        await postCreateMessage(getUser(), content);
    }

    return { handleMessageSubmit };
}

export default useChat;
