import { MacchinaEAttrezzatura } from "../../model/MacchineEAttrezzature";
import { DeleteItemInput, PutItemInput, QueryInput, QueryOutput } from "aws-sdk/clients/dynamodb";
import { dynamoDB } from "../../aws/s3Config";
import { convertToDynamoDBFormat } from "../utils/conversionFunctions";
import { impresaTemporanea } from "../../model/Impresa";

export const createMacchinaEAttrezzaturaInDynamo = async (
  macchinaEAttrezzaturaDaSalvare: MacchinaEAttrezzatura
) => {
  let params: PutItemInput = {
    TableName: "MacchineEAttrezzature",
    Item: convertToDynamoDBFormat(macchinaEAttrezzaturaDaSalvare),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Macchina", err);
    });
};

export const getAllMacchineEAttrezzatureByCreatoDa = async (
  creatoDa: string
) => {
  let params: QueryInput = {
      TableName: "MacchineEAttrezzature",
      IndexName: "MacchineEAttrezzatureByCreatoDa",
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
      console.log("MacchineEAttrezzature api:", err);
      return undefined; // Indica che c'è stato un errore
    }
};

export const updateMacchinaEAttrezzaturaInDynamo = async (
  macchinaEAttrezzaturaToUpdate: MacchinaEAttrezzatura
) => {
  let params: PutItemInput = {
    TableName: "MacchineEAttrezzature",
    Item: convertToDynamoDBFormat(macchinaEAttrezzaturaToUpdate),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Macchina", err);
    });
};

export const deleteMacchinaEAttrezzaturaFromDynamo = async (
  macchinaEAttrezzaturaToDelete: string
) => {
  let params: DeleteItemInput = {
      TableName: "MacchineEAttrezzature",
      Key: { id: { S: macchinaEAttrezzaturaToDelete } },
    };
    return await dynamoDB
      .deleteItem(params)
      .promise()
      .catch((err) => {
        console.error("Unable to delete MacchineEAttrezzature", err);
      });
};
