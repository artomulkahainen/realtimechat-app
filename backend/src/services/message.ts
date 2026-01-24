import { Message } from '../models/Message.model.ts';

export function findMessages() {
    return Message.findAll();
}
