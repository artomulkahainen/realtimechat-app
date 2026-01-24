import { serve } from '@hono/node-server';
import { createNodeWebSocket } from '@hono/node-ws';
import { Hono } from 'hono';
import { sequelize } from './config/db.ts';
import type { CreateMessageRequest } from './dto/message.ts';
import { toDto } from './mappers/message.ts';
import { MESSAGES_PATH, WEBSOCKET_PATH } from './routes.ts';
import { createMessage, findMessages } from './services/message.ts';
import { handleWebsocketConnection } from './services/websocket.ts';
import { validateCreateMessage } from './validators/message.ts';

const app = new Hono();
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

// routes
app.get(WEBSOCKET_PATH, upgradeWebSocket(handleWebsocketConnection));

app.get(MESSAGES_PATH, async ({ json }) => {
    return json((await findMessages()).map(toDto));
});

app.post(MESSAGES_PATH, validateCreateMessage, async ({ req, json }) => {
    const body = await req.json<CreateMessageRequest>();

    return json(toDto(await createMessage(body.author, body.content)), 201);
});

// handle app launch
(async () => {
    {
        try {
            await sequelize.sync({ alter: false });
            console.log('Database synchronized');

            const server = serve(
                {
                    fetch: app.fetch,
                    port: 3001,
                },
                (info) => {
                    console.log(
                        `Server is running on http://localhost:${info.port}`
                    );
                }
            );
            injectWebSocket(server);
        } catch (err) {
            console.error('Failed to start application:', err);
            process.exit(1);
        }
    }
})();
