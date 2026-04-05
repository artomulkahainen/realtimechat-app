import { TextField } from '@mui/material';
import useSimpleForm from '../hooks/useSimpleForm';
import ChatButton from './ChatButton';
import styles from './styles/SimpleForm.module.css';

type Props = {
    label: string;
    onSend: (msg: string) => Promise<void> | void;
    textFieldAriaLabel: string;
    buttonAriaLabel: string;
    isLoading?: boolean;
};

export default function SimpleForm({
    label,
    onSend,
    textFieldAriaLabel,
    isLoading,
}: Props) {
    const { handleSubmit } = useSimpleForm({ onSend });

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
                aria-label={textFieldAriaLabel}
                label={label}
                name="message"
                variant="outlined"
                sx={{ width: '90%', margin: 0 }}
            />
            <ChatButton isLoading={isLoading} width="10%">
                Send
            </ChatButton>
        </form>
    );
}
