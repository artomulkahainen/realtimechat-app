import { Message } from '../models/Message.model.ts';
import { broadcastMessageToAllConnectedUsers } from './websocket.ts';

export function findMessages() {
    return Message.findAll();
}

export async function createMessage(author: string, content: string) {
    const newMessage = await Message.create({ createdBy: author, content });
    broadcastMessageToAllConnectedUsers(newMessage);

    return newMessage;
}
