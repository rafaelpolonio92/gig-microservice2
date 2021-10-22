const amqp = require('amqplib/callback_api');

const rabbitConsumer = (socket) => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queue = 'message';

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(' [*] Waiting for message', queue);

      channel.consume(
        queue,
        (data) => {
          console.log(' [x] Received Data:', data.content.toString('utf-8'));
          socket.broadcast.emit('message', data.content.toString('utf-8'));
        },
        {
          noAck: true,
        }
      );
    });
  });
};

module.exports = rabbitConsumer;
