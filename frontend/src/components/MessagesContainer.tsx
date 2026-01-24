import { useMessages } from '../store/MessagesContext';
import styles from './styles/MessagesContainer.module.css';

function MessagesContainer() {
    const { messages } = useMessages();

    return (
        <div className={styles.messagesContainer}>
            {messages.map((m) => (
                <p key={m.id}>
                    {m.author}: {m.content}
                </p>
            ))}
        </div>
    );
}

export default MessagesContainer;
