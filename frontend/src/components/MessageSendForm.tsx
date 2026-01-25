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
                isLoading={loading}
            />
        </div>
    );
}
