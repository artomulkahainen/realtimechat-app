import type { Context } from 'hono';
import type { Message } from '../models/Message.model.ts';
import { toDto } from '../mappers/message.ts';
import type { WSContext } from 'hono/ws';
import { Redis as Valkey } from 'iovalkey';

const valkey = new Valkey(6379, 'cache');
const sub = new Valkey(6379, 'cache');

const CHANNEL_NAME = 'chat';
sub.subscribe(CHANNEL_NAME);

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
