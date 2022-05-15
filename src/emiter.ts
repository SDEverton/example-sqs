import { SendMessageCommand } from  "@aws-sdk/client-sqs";
import { v4 } from "uuid";

import { sqsClient } from  "./lib/sqsClient";

async function Emiter() {
  try {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        Title: {
          DataType: "String",
          StringValue: "The Whistler",
        },
        Author: {
          DataType: "String",
          StringValue: "John Grisham",
        },
        WeeksOn: {
          DataType: "Number",
          StringValue: "6",
        },
      },
      MessageBody: JSON.stringify({
        name: "Everton",
        age: "34",
        id: v4(),
      }),
      QueueUrl: process.env.AWS_SQS_QUEUE_URL
    };
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. MessageID:", data.MessageId);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}

export { Emiter };

