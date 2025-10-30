import { Cantiere } from "../../model/Cantiere";
import {
  DeleteItemInput,
  PutItemInput,
  QueryInput,
  QueryOutput,
} from "aws-sdk/clients/dynamodb";
import { convertToDynamoDBFormat } from "../utils/conversionFunctions";
import { dynamoDB } from "../../aws/s3Config";

export const createCantiereInDynamo = async (cantiereDaSalvare: Cantiere) => {
  let params: PutItemInput = {
    TableName: "Cantieri",
    Item: convertToDynamoDBFormat(cantiereDaSalvare),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Cantiere", err);
    });
};

export const getAllCantieriByCreatoDa = async (creatoDa: string) => {
  let params: QueryInput = {
    TableName: "Cantieri",
    IndexName: "CantieriByCreatoDa",
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
    console.log("cantieri api:", err);
    return undefined; // Indica che c'è stato un errore
  }
};

export const updateCantiereInDynamo = async (cantiereToUpdate: Cantiere) => {
  let params: PutItemInput = {
    TableName: "Cantieri",
    Item: convertToDynamoDBFormat(cantiereToUpdate),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Cantiere", err);
    });
};

export const deleteCantiereFromDynamo = async (cantiereToDelete: string) => {
  let params: DeleteItemInput = {
    TableName: "Cantieri",
    Key: { id: { S: cantiereToDelete } },
  };
  return await dynamoDB
    .deleteItem(params)
    .promise()
    .catch((err) => {
        console.error("Unable to delete Cantiere", err);
    });
};
