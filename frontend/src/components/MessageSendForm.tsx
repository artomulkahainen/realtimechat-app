import useMessageSendForm from '../hooks/useMessageSendForm';
import SimpleForm from './SimpleForm';
import styles from './styles/MessageSendForm.module.css';

export default function MessageSendForm() {
    const { handleMessageSubmit, loading } = useMessageSendForm();

    return (
        <div className={styles.formDiv}>
            <SimpleForm
                label="Message"
                onSend={handleMessageSubmit}
                textFieldAriaLabel="Text field for your message you want to send"
                buttonAriaLabel="With this button, you can send your message, if it's long enough"
                isLoading={loading}
            />
        </div>
    );
}
