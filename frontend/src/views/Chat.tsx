import MessagesContainer from '../components/MessagesContainer';
import MessageSendForm from '../components/MessageSendForm';
import { MessageProvider } from '../store/MessagesContext';
import styles from './styles/Chat.module.css';

export default function Chat() {
    return (
        <MessageProvider>
            <div className={styles.main}>
                <MessagesContainer />
                <MessageSendForm />
            </div>
        </MessageProvider>
    );
}
