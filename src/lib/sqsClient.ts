import { SQSClient, SQSClientConfig } from "@aws-sdk/client-sqs";
import AWS from "aws-sdk";

const credentials = {
  region: process.env.AWS_REGION, 
  credentials: { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "", 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  } 
}

const sqsClient = new SQSClient(credentials);
AWS.config.update(credentials);

const sqs = new AWS.SQS();


export { sqsClient, sqs };
