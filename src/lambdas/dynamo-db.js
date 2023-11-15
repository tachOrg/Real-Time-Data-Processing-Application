import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDBName = process.env.TABLE_NAME;
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const handler = async (event, context, callback) => {
  const base64String = event.Records[0].kinesis.data
  const decodedData = JSON.parse(Buffer.from(base64String, 'base64').toString('utf-8'));
  console.log(decodedData)
  const command = new PutCommand({
    TableName: "CPU_Stats",
    Item: {
      'date': decodedData['date'],
      'type': decodedData['type'],
      'cpu_user': decodedData['cpu_user'],
      'cpu_sys': decodedData['cpu_sys'],
      'cpu_niced': decodedData['cpu_niced'],
      'cpu_idle': decodedData['cpu_idle'],
      'cpu_iow': decodedData['cpu_iow'],
      'cpu_hi': decodedData['cpu_hi'],
      'cpu_si': decodedData['cpu_si'],
      'cpu_steal': decodedData['cpu_steal'],
    }
  });
  const response = await docClient.send(command);
  console.log(response);
  return response;
}

