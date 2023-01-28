const { DynamoDBClient, BatchExecuteStatementCommand } = require('@aws-sdk/client-dynamodb');
const { config } = require('dotenv');
// Start up the .env config
config();

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const command = new BatchExecuteStatementCommand({});

getData = async () => {
  try {
    const data = await client.send(command);
    console.log('Data getted: ' + data);
  } catch (error) {
    console.log('Error getting data: ' + error);
  }
}

getData();