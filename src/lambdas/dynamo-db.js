const { DynamoDBClient, BatchWriteItemCommand } = require('@aws-sdk/client-dynamodb');
const { config } = require('dotenv');

// Start up the .env config
config();

const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDBName = process.env.AWS_DYNAMO_DB_NAME;
let commandInput = {
  RequestItems: {
    [dynamoDBName] : [ 
      {
        "PutRequest": {
          "Item": {
            "Name": { "S": "Bikora" },
            "StatusTime": { "S": "2023-01-30 19:38:00.000" }
          }
        }
      }
    ]
  }
};
const command = new BatchWriteItemCommand(commandInput);

insertIntoDB = async () => {
  try {
    await dynamoDBClient.send(command);
  } catch (error) { 
  }
}

insertIntoDB();
