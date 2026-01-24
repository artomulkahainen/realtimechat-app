import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { toDto } from './mappers/message.ts';
import { GET_MESSAGES_PATH } from './routes.ts';
import { findMessages } from './services/message.ts';

const app = new Hono();

app.get(GET_MESSAGES_PATH, async (c) => {
    return c.json((await findMessages()).map(toDto));
});

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

serve(
    {
        fetch: app.fetch,
        port: 3001,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
