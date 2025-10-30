import { Impresa } from "../../model/Impresa";
import {
  DeleteItemInput,
  GetItemInput,
  PutItemInput,
  QueryInput,
  QueryOutput,
} from "aws-sdk/clients/dynamodb";
import { dynamoDB } from "../../aws/s3Config";
import { convertToDynamoDBFormat } from "../utils/conversionFunctions";

export const createImpresaInDynamo = async (impresaDaSalvare: Impresa) => {
  let params: PutItemInput = {
    TableName: "Imprese",
    Item: convertToDynamoDBFormat(impresaDaSalvare),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .then((res) => {return res})
    .catch((err: any) => {
      console.error("Unable to add impresa", err);
    });
};

export const updateImpresaInDynamo = async (impresaToUpdate: Impresa) => {
  let params: PutItemInput = {
    TableName: "Imprese",
    Item: convertToDynamoDBFormat(impresaToUpdate),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add impresa", err);
    });
};

export const getAllImpreseByCreataDa = async (creatoDa: string) => {
  let params: QueryInput = {
    TableName: "Imprese",
    IndexName: "ImpreseByCreatoDa",
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
    console.log("Impresa api:", err);
    return undefined; // Indica che c'è stato un errore
  }
};

export const getImpresaById = async (id: string) => {
  let params: GetItemInput = {
    TableName: "Imprese",
    Key: {
      id: {
        S: id,
      },
    },
  };
  return await dynamoDB
    .getItem(params)
    .promise()
    .catch((err) => {
      console.error("Unable to get Impresa", err);
    });
};

export const deleteImpresaFromDynamo = async (impresaToDelete: string) => {
  let params: DeleteItemInput = {
    TableName: "Imprese",
    Key: { id: { S: impresaToDelete } },
  };
  return await dynamoDB
    .deleteItem(params)
    .promise()
    .catch((err) => {
      console.error("Unable to delete Impresa", err);
    });
};
