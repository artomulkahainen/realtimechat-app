import amqp from 'amqplib';

const URL = process.env.RABBIT_URL;

if (!URL) {
    throw new Error('RabbitMQ url not initialized as environment variable');
}

let connection;
let channel;

async function initRabbit() {
    if (connection && channel) return;

    connection = await amqp.connect(URL);

    channel = await connection.createChannel();

    process.once('SIGINT', async () => {
        console.log('\nClosing RabbitMQ connection...');
        await channel.close();
        await connection.close();
        process.exit(0);
    });
}
