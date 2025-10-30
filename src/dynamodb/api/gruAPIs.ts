import { Gru } from "../../model/Gru";
import {
  DeleteItemInput,
  PutItemInput,
  QueryInput,
  QueryOutput,
} from "aws-sdk/clients/dynamodb";
import { dynamoDB } from "../../aws/s3Config";
import { convertToDynamoDBFormat } from "../utils/conversionFunctions";

export const createGruInDynamo = async (gruDaSalvare: Gru) => {
  let params: PutItemInput = {
    TableName: "Gru",
    Item: convertToDynamoDBFormat(gruDaSalvare),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Gru", err);
    });
};

export const getAllGruByCreatoDa = async (creatoDa: string) => {
  let params: QueryInput = {
    TableName: "Gru",
    IndexName: "GruByCreatoDa",
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
    console.log("Gru api:", err);
    return undefined; // Indica che c'è stato un errore
  }
};

export const updateGruInDynamo = async (gruToUpdate: Gru) => {
  let params: PutItemInput = {
    TableName: "Gru",
    Item: convertToDynamoDBFormat(gruToUpdate),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Gru", err);
    });
};

export const deleteGruFromDynamo = async (gruToDelete: string) => {
  let params: DeleteItemInput = {
    TableName: "Gru",
    Key: { id: { S: gruToDelete } },
  };
  return await dynamoDB
    .deleteItem(params)
    .promise()
    .catch((err) => {
      console.error("Unable to delete Gru", err);
    });
};
