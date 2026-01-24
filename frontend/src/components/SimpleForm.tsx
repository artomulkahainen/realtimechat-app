import { Button, TextField } from '@mui/material';
import type { FormEvent } from 'react';
import styles from './styles/SimpleForm.module.css';

type Props = {
    label: string;
    isLoading: boolean;
    onSend: (msg: string) => Promise<void>;
};

export default function SimpleForm({ label, isLoading, onSend }: Props) {
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const rawMsg = data.get('message');

        const msg = typeof rawMsg === 'string' ? rawMsg : '';

        if (!msg) return;
        e.currentTarget.reset();
        await onSend(msg);
    }

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
