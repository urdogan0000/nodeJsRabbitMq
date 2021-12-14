const amqp = require("amqplib");
const queueName = process.argv[2] || "jobsQueue";
const data = require("./data.json");
connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);

    //Get Message
    channel.consume(queueName, (message) => {
      const messageInfo = JSON.parse(message.content.toString());

      const userInfo = data.find((u) => u.id == messageInfo.description);
      //ack() method provides ı deal with this specific task and now publisher can delete from queue
      if(userInfo){
          console.log("İşlenen kayıt "+userInfo.id);
          channel.ack(message);
      }
     
    });
  } catch (error) {
    console.log("Error is " + error);
  }
}
