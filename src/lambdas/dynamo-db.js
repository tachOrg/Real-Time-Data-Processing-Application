import { DynamoDBClient, BatchWriteItemCommand } from '@aws-sdk/client-dynamodb';

export const handler = function(event, context, callback) {
};

const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDBName = process.env.TABLE_NAME;
let commandInput = {
  RequestItems: {
    [dynamoDBName] : [ 
      {
        "PutRequest": {
          "Item": {
            "Name": { "S": "Koethl" },
            "StatusTime": { "S": "2023-01-30 21:30:00.000" }
          }
        }
      }
    ]
  }
};
const command = new BatchWriteItemCommand(commandInput);

let insertIntoDB = async () => {
  try {
    await dynamoDBClient.send(command);
  } catch (error) { 
  }
}

insertIntoDB();