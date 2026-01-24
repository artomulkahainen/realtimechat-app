import type { UUID } from 'node:crypto';

export type MessageDTO = {
    id: UUID;
    createdAt: Date;
    author: string;
    content: string;
};

export type CreateMessageRequest = {
    author: string;
    content: string;
};
