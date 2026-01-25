import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MessageDTO } from '../services/dto/message';
import { getMessages } from '../services/messages';
import useWebSocket from '../hooks/useWebSocket';

interface MessageContextValue {
    messages: MessageDTO[];
    initMessages: () => Promise<void>;
    isLoading: boolean;
}

const MessageContext = createContext<MessageContextValue | undefined>(
    undefined
);

export function MessageProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<MessageDTO[]>([]);
    const [loading, setLoading] = useState(false);

    async function initMessages() {
        setLoading(true);
        setMessages(await getMessages());
        setLoading(false);
    }

    function addMessage(message: MessageDTO) {
        setMessages((prev) => [...prev, message]);
    }

    useWebSocket({ addMessage });

    return (
        <MessageContext.Provider
            value={{ messages, initMessages, isLoading: loading }}
        >
            {children}
        </MessageContext.Provider>
    );
}

export function useMessages(): MessageContextValue {
    const ctx = useContext(MessageContext);
    if (!ctx) {
        throw new Error('MessageProvider has not been provided to component');
    }
    return ctx;
}
