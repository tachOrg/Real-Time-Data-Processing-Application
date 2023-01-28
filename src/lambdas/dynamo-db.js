const { DynamoDBClient, BatchWriteItemCommand } = require('@aws-sdk/client-dynamodb');
const { config } = require('dotenv');
// Start up the .env config
config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
let commandInput = {
  RequestItems: {
    "UnicornSensorData": [
      {
        "PutRequest": {
          "Item": {
            "Name": { "S": "Belcebub" },
            "StatusTime": { "S": "2023-01-27 21:20:00.000" }
          }
        }
      }
    ]
  }
};
const command = new BatchWriteItemCommand(commandInput);

getData = async () => {
  try {
    const data = await client.send(command);
    console.log('Data getted: ' + data);
  } catch (error) {
    console.log('Error getting data: ' + error);
  }
}

getData();