import type { Context } from 'hono';
import type { WSContext } from 'hono/ws';
import { toDto } from '../mappers/message.ts';
import type { Message } from '../models/Message.model.ts';
import { CHANNEL_NAME, sub, valkey } from './cache.ts';

const wsClients = new Set<WSContext>();

export function handleWebsocketConnection(c: Context) {
    return {
        onOpen(_: Event, ws: WSContext) {
            wsClients.add(ws);
        },
        onClose: () => {
            console.log('Connection closed');
        },
    };
}

export function broadcastMessageToAllConnectedUsers(message: Message) {
    const text = JSON.stringify(toDto(message));
    valkey.publish(CHANNEL_NAME, text);
}

sub.on('message', (_, message) => {
    wsClients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
});
