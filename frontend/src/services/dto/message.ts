export type MessageDTO = {
    id: string;
    createdAt: Date;
    author: string;
    content: string;
};

export type CreateMessageRequest = {
    author: string;
    content: string;
};
