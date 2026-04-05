import useMessagesContainer from '../hooks/useMessagesContainer';
import { useMessages } from '../store/MessagesContext';
import styles from './styles/MessagesContainer.module.css';

export default function MessagesContainer() {
    const { messages } = useMessages();
    const { containerRef } = useMessagesContainer();

    return (
        <div
            ref={containerRef}
            aria-label="This container include the chat messages"
            className={styles.messagesContainer}
        >
            {messages.map((m) => (
                <p key={m.id}>
                    {m.author}: {m.content}
                </p>
            ))}
        </div>
    );
}
