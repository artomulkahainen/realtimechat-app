import type { Context } from 'hono';
import type { Message } from '../models/Message.model.ts';
import { toDto } from '../mappers/message.ts';

const wsClients = new Set<WebSocket>();

export function handleWebsocketConnection(c: Context) {
    const ws = c.get('websocket');

    wsClients.add(ws);
    console.log('WS connected: ', wsClients.size);

    const remove = () => {
        wsClients.delete(ws);
        console.log('WS disconnected: ', wsClients.size);
    };
    ws.on('close', remove);
    ws.on('error', (err: Error) => {
        console.error('WS error', err);
        remove();
    });

    return {};
}

export function broadcastMessageToAllConnectedUsers(message: Message) {
    const text = JSON.stringify(toDto(message));

    wsClients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(text);
        }
    });
}
