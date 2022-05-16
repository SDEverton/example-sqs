
import 'dotenv/config'
import { Consumer } from 'sqs-consumer';
import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';
import fs from 'node:fs';

import { sqs } from './lib/sqsClient';
import sendEmail from './lib/mail';

const prisma = new PrismaClient();
const doc = new PDFDocument();

let reference: string;

const app = Consumer.create({
  batchSize: 10,
  queueUrl: process.env.AWS_SQS_QUEUE_URL,
  handleMessage: async (message) => {
    const { Body } = message;
    const { id, name, age, email } = JSON.parse(Body);
    reference = id;

    try {
      fs.readFileSync(`${id}.pdf`);
    } catch (error) {
      doc.pipe(fs.createWriteStream(`${id}.pdf`));
      doc
        .fontSize(25)
        .text(`Certifico que ${name} conseguiu criar uma fila de envio de certificados por e-mail!`, 100, 100);

      doc.end();
    }

    const status = await sendEmail({ id, name, email });
    if (!status) throw Error('Error sending email');
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
      description: err?.message || '',
      reference,
    },
  });
});

app.on('processing_error', async (err) => {
  await prisma.error.create({
    data: {
      description: err?.message || '',
      reference,
    },
  });
});

app.on('timeout_error', async (err: Error) => {
  await prisma.error.create({
    data: {
      description: err?.message || '',
      reference,
    },
  })
});

app.start();