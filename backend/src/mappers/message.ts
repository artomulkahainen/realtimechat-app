import type { MessageDTO } from '../dto/message.ts';
import type { Message } from '../models/Message.model.ts';

export function toDto(message: Message): MessageDTO {
    return {
        id: message.id,
        createdAt: message.createdAt,
        author: message.createdBy,
        content: message.content,
    };
}
