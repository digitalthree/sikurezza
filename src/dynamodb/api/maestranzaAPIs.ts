import { Maestranza } from "../../model/Maestranza";
import { DeleteItemInput, GetItemInput, PutItemInput, QueryInput, QueryOutput } from "aws-sdk/clients/dynamodb";
import { dynamoDB } from "../../aws/s3Config";
import { convertToDynamoDBFormat } from "../utils/conversionFunctions";

export const createMaestranzaInDynamo = async (
  maestranzaDaSalvare: Maestranza
) => {
  let params: PutItemInput = {
    TableName: "Maestranze",
    Item: convertToDynamoDBFormat(maestranzaDaSalvare),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Maestranza", err);
    });
};

export const deleteMaestranzaFromDynamo = async (
  maestranzaToDelete: string
) => {
  let params: DeleteItemInput = {
        TableName: "Maestranze",
        Key: { id: { S: maestranzaToDelete } },
      };
      return await dynamoDB
        .deleteItem(params)
        .promise()
        .catch((err) => {
          console.error("Unable to delete Maestranza", err);
        });
};

export const updateMaestranzaInDynamo = async (
  maestranzaToUpdate: Maestranza
) => {
  let params: PutItemInput = {
    TableName: "Maestranze",
    Item: convertToDynamoDBFormat(maestranzaToUpdate),
  };
  return await dynamoDB
    .putItem(params)
    .promise()
    .catch((err: any) => {
      console.error("Unable to add Maestranza", err);
    });
};

export const getAllMaestranzeByCreatoDa = async (
  creatoDa: string
) => {
  let params: QueryInput = {
        TableName: "Maestranze",
        IndexName: "MaestranzeByCreatoDa",
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
        console.log("Maestranze api:", err);
        return undefined; // Indica che c'è stato un errore
      }
};

export const getMaestranzaById = async (
  id: string
) => {
  let params: GetItemInput = {
      TableName: "Maestranze",
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
        console.error("Unable to get Maestranza", err);
      });
};
