import { connect, type ChannelModel } from 'amqplib';

const RABBIT_USER = process.env.RABBIT_USER;
const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD;
const RABBIT_HOST = process.env.RABBIT_HOST;
const RABBIT_PORT = process.env.RABBIT_PORT;

if (!RABBIT_USER || !RABBIT_PASSWORD || !RABBIT_HOST || !RABBIT_PORT) {
    throw new Error(
        'RabbitMQ Parameters not initialized as environment variables'
    );
}

const connection = await startConnection();
const channel = await startChannel(connection);

async function startConnection() {
    console.log('About to start the RabbitMQ connection');
    try {
        return await connect(
            `amqp://${RABBIT_USER}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}/`
        );
    } catch (e) {
        console.error('Error with connecting to rabbitmq: ', e);
        throw new Error('RabbitMQ Connection Failed');
    } finally {
        console.log('RabbitMQ: Connection Created Succesfully');
    }
}

async function startChannel(connection: ChannelModel) {
    console.log('About to create channel...');
    try {
        return await connection.createChannel();
    } catch (e) {
        console.error('Error with starting the channel:', e);
        throw new Error('RabbitMQ Channel Creation Failed');
    } finally {
        console.log('RabbitMQ: Channel created succesfully');
    }
}

export async function addMessageToQueue<T extends object>(message: T) {
    try {
        const queueName = 'MESSAGES';

        await channel.assertQueue(queueName, {
            durable: true,
        });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });

        console.log(`Sent to ${queueName}:`, message);
    } catch (e) {
        console.error('Failed to add message to queue:', e);
        throw new Error('Failed');
    }
}
