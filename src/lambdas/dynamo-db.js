import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

export const handler = function(event, context, callback) {
  console.log('Este es el event: ' + JSON.stringify(event));
  const requestItems = buildRequestItems(event.Records);
  console.log('Request items: ' + JSON.stringify(requestItems))
  const itemInput = buildRequests(requestItems);
  console.log('Item Input: ' + JSON.stringify(itemInput));
  let r = {
    "Item": itemInput,
    "TableName": "UnicornSensorData"
  }
  console.log('RI: ' + JSON.stringify(r));
  insertIntoDB(r);
};

let buildRequestItems = (records) => {
  return records.map((record) => {
    const json = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
    const item = JSON.parse(json);
    
    return {
      PutRequest: {
        Item: item
      }
    }
  });
}

let buildRequests = (requestItems) => {
  let toReturn = {
    "Name": {
      S: ""
    },
    "StatusTime": {
      S: ""
    }
  };
  console.log('Request items length: ' + requestItems.length);
  while (requestItems.length > 0) {
    const request = requestItems.splice(0, 25);
    console.log('Req: ' + JSON.stringify(request));
    let name = { "Name": { "S": "" } };
    let time = { "StatusTime": { "S" : "" } };
    let nt = Math.random(1, 100).toString().substring(5);
    let req = request.map((r) => {
      toReturn.Name.S = nt
      toReturn.StatusTime.S = nt;
    });
  }
  
  return toReturn;
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
// const command = new BatchWriteItemCommand(commandInput);

let insertIntoDB = async (command) => {
  console.log('Ingresé al insertIntoDB, comando: '+ JSON.stringify(command));
  try {
    let finalCommand = new PutItemCommand(command);
    console.log('This is the final command: ' + JSON.stringify(finalCommand));
    let fc = {
      "Item": {
            "Name": "Liarty",
            "StatusTime": "2023-02-01 02:08:07.652"
        },
        "TableName": "UnicornSensorData"
    };
    // let finalCommand2 = new PutItemCommand(command);
    // console.log('This is the final command 2: ' + JSON.stringify(finalCommand2));
    // await dynamoDBClient.send(finalCommand2);
    await dynamoDBClient.send(finalCommand);
    console.log('Pasé el envío');
  } catch (error) { 
    console.log('Error: ' + error);
  }
}

// insertIntoDB();
