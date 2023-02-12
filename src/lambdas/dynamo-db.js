import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

export const handler = function(event, context, callback) {
  console.log('Este es el event: ' + JSON.stringify(event));
  const requestItems = buildRequestItems(event.Records[0]);
  console.log('Request items: ' + JSON.stringify(requestItems))
  const itemInput = buildRequests(requestItems);
  console.log('Item Input: ' + JSON.stringify(itemInput));
  let r = {
    "Item": itemInput,
    "TableName": "UnicornSensorData"
  }
  insertIntoDB(r);
};

let buildRequestItems = (records) => {
  const json = Buffer.from(records.kinesis.data, 'base64').toString('ascii');
  const item = JSON.parse(json);
  return {
    PutRequest: {
      Item: item
    }
  }
}

let buildRequests = (requestItems) => {
  return {
    "Name": {
      S: requestItems.PutRequest.Item.Name
    },
    "StatusTime": {
      S: requestItems.PutRequest.Item.StatusTime
    }
  };
}

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
          }, 
          "TableName": [dynamoDBName]
        }
      }
    ]
  }
};

let insertIntoDB = async (inputFromMain) => {
  try {
    let finalCommand = new PutItemCommand(inputFromMain);
    await dynamoDBClient.send(finalCommand);
    console.log('Pasé el envío');
  } catch (error) { 
    console.log('Error: ' + error);
  }
}

