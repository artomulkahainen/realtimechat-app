import { get, post } from '../utils/fetch';
import { type CreateMessageRequest, type MessageDTO } from './dto/message';

const MESSAGES_PATH = '/api/messages';

export function getMessages() {
    return get<MessageDTO[]>(MESSAGES_PATH);
}

export function postCreateMessage(author: string, content: string) {
    return post<MessageDTO, CreateMessageRequest>(MESSAGES_PATH, {
        author,
        content,
    });
}
