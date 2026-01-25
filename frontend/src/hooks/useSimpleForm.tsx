import type { FormEvent } from 'react';

type Props = {
    onSend: (msg: string) => Promise<void> | void;
};

export default function useSimpleForm({ onSend }: Props) {
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const rawMsg = data.get('message');

        const msg = typeof rawMsg === 'string' ? rawMsg : '';

        if (!msg) return;
        e.currentTarget.reset();
        await onSend(msg);
    }

    return { handleSubmit };
}
