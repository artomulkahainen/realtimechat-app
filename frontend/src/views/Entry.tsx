import SimpleForm from '../components/SimpleForm';
import useEntry from '../hooks/useEntry';
import styles from './styles/Entry.module.css';

export default function Entry() {
    const { handleProceedToChat } = useEntry();

    return (
        <div className={styles.mainDiv}>
            <h1>Arto's Chat</h1>
            <p>Start by giving a username</p>
            <div className={styles.formDiv}>
                <SimpleForm label="Username" onSend={handleProceedToChat} />
            </div>
        </div>
    );
}
