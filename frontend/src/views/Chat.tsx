import MessagesContainer from '../components/MessagesContainer';
import SimpleForm from '../components/SimpleForm';
import useChat from '../hooks/useChat';
import styles from './styles/Chat.module.css';

export default function Chat() {
    const { handleMessageSubmit } = useChat();

    return (
        <div className={styles.main}>
            <MessagesContainer />
            <div className={styles.formDiv}>
                <SimpleForm
                    label="Message"
                    onSend={handleMessageSubmit}
                    isLoading={false}
                />
            </div>
        </div>
    );
}
