
import 'dotenv/config'
import { Consumer } from 'sqs-consumer';
import { PrismaClient } from '@prisma/client';

import { sqs } from './lib/sqsClient';

const prisma = new PrismaClient()

const app = Consumer.create({
  batchSize: 10,
  queueUrl: process.env.AWS_SQS_QUEUE_URL,
  handleMessage: async (message) => {
    const { Body } = message;
    const { id, name, age } = JSON.parse(Body);
    await prisma.integration.create({
      data: {
        description: message.MessageId,
        reference: id,
        response: {
          name,
          age,
        },
      },
    });
  },
  sqs: sqs
});

app.on('error', async (err) => {
  await prisma.error.create({
    data: {
      description: err.message,
      reference: err.name,
    },
  });
  console.error(err.message);
});

app.on('processing_error', async (err) => {
  await prisma.error.create({
    data: {
      description: err.message,
      reference: err.name,
    },
  })
  console.error(err.message);
});

app.on('timeout_error', async (err: Error) => {
  await prisma.error.create({
    data: {
      description: err.message,
      reference: err.name,
    },
  })
 console.error(err.message);
});

app.start();