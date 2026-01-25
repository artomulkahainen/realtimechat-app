import { Redis as Valkey } from 'iovalkey';

const PORT = process.env.CACHE_PORT;
const HOST = process.env.CACHE_HOST;
export const CHANNEL_NAME = 'chat';

if (!HOST || !PORT) {
    throw new Error(
        'Cache host or port not initialized as environment variable'
    );
}

export const valkey = new Valkey(Number(PORT), HOST);
export const sub = valkey.duplicate();

sub.subscribe(CHANNEL_NAME);
