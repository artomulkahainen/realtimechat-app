import { useEffect, useRef } from 'react';
import { useMessages } from '../store/MessagesContext';

function useMessagesContainer() {
    const { messages } = useMessages();
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.scrollTop = el.scrollHeight;
    }, [messages]);

    return { containerRef };
}

export default useMessagesContainer;
