import { Button, TextField } from '@mui/material';
import useSimpleForm from '../hooks/useSimpleForm';
import styles from './styles/SimpleForm.module.css';

type Props = {
    label: string;
    onSend: (msg: string) => Promise<void> | void;
    isLoading?: boolean;
};

export default function SimpleForm({ label, onSend, isLoading }: Props) {
    const { handleSubmit } = useSimpleForm({ onSend });

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
                label={label}
                name="message"
                variant="outlined"
                sx={{ width: '90%', margin: 0 }}
            />
            <Button
                type="submit"
                color="primary"
                loading={isLoading}
                variant="outlined"
                sx={{ width: '10%' }}
            >
                Send
            </Button>
        </form>
    );
}
