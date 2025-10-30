import { Ponteggio } from "../../model/Ponteggio";
import {
  DeleteItemInput,
  PutItemInput,
  QueryInput,
  QueryOutput,
} from "aws-sdk/clients/dynamodb";
import { dynamoDB } from "../../aws/s3Config";
import { convertToDynamoDBFormat } from "../utils/conversionFunctions";

export const createPonteggioInDynamo = async (
  ponteggioDaSalvare: Ponteggio
) => {
  let params: PutItemInput = {
    TableName: "Ponteggi",
    Item: convertToDynamoDBFormat(ponteggioDaSalvare),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Ponteggio", err);
    });
};

export const getAllPonteggiByCreatoDa = async (creatoDa: string) => {
  let params: QueryInput = {
    TableName: "Ponteggi",
    IndexName: "PonteggiByCreatoDa",
    KeyConditionExpression: "#creatoDa = :creatoDa",
    ExpressionAttributeValues: {
      ":creatoDa": { S: creatoDa },
    },
    ExpressionAttributeNames: {
      "#creatoDa": "creatoDa",
    },
    Limit: 3,
  };
  let allItems: any[] = [];
  let lastEvaluatedKey: Record<string, any> | undefined;

  try {
    do {
      if (lastEvaluatedKey) {
        params.ExclusiveStartKey = lastEvaluatedKey;
      }

      const result = await dynamoDB.query(params).promise();
      if (result && result.Items) {
        allItems.push(...result.Items);
      }
      lastEvaluatedKey = result?.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return { Items: allItems } as QueryOutput; // Restituisci un oggetto simile a QueryOutput
  } catch (err: any) {
    console.log("Ponteggi api:", err);
    return undefined; // Indica che c'è stato un errore
  }
};

export const updatePonteggioInDynamo = async (ponteggioToUpdate: Ponteggio) => {
  let params: PutItemInput = {
    TableName: "Ponteggi",
    Item: convertToDynamoDBFormat(ponteggioToUpdate),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Ponteggio", err);
    });
};

export const deletePonteggioFromDynamo = async (ponteggioToDelete: string) => {
  let params: DeleteItemInput = {
    TableName: "Ponteggi",
    Key: { id: { S: ponteggioToDelete } },
  };
  return await dynamoDB
    .deleteItem(params)
    .promise()
    .catch((err) => {
      console.error("Unable to delete Ponteggio", err);
    });
};
