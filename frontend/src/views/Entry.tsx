import SimpleForm from '../components/SimpleForm';
import useEntry from '../hooks/useEntry';
import styles from './styles/Entry.module.css';

function Entry() {
    const { handleProceedToChat, isLoading } = useEntry();

    return (
        <div className={styles.mainDiv}>
            <h1>Arto's Chat</h1>
            <p>Start by giving a username</p>
            <div className={styles.formDiv}>
                <SimpleForm
                    label="Username"
                    onSend={handleProceedToChat}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

export default Entry;
