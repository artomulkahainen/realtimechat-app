import { Message } from '../models/Message.model.ts';

export function findMessages() {
    return Message.findAll();
}

export function createMessage(author: string, content: string) {
    return Message.create({ createdBy: author, content });
}
