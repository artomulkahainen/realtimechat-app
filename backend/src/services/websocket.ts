import type { Context } from 'hono';
import type { Message } from '../models/Message.model.ts';
import { toDto } from '../mappers/message.ts';
import type { WSContext, WSMessageReceive } from 'hono/ws';

const wsClients = new Set<WSContext>();

export function handleWebsocketConnection(c: Context) {
    return {
        onOpen(evt: Event, ws: WSContext) {
            console.log('about to add new ws client');
            wsClients.add(ws);
            console.log(wsClients);
        },
        onMessage(
            evt: MessageEvent<WSMessageReceive>,
            ws: WSContext<WebSocket>
        ) {
            console.log(`Message from client: ${evt.data}`);
            ws.send('Hello from server!');
        },
        onClose: () => {
            console.log('Connection closed');
        },
    };
}

export function broadcastMessageToAllConnectedUsers(message: Message) {
    const text = JSON.stringify(toDto(message));

    wsClients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(text);
        }
    });
}
