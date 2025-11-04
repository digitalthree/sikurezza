import {Estintore} from "../../model/Estintore";
import { DeleteItemInput, PutItemInput, QueryInput, QueryOutput } from "aws-sdk/clients/dynamodb";
import { dynamoDB } from "../../aws/s3Config";
import { convertToDynamoDBFormat } from "../utils/conversionFunctions";

export const createEstintoreInDynamo = async (estintoreDaSalvare: Estintore) => {
    let params: PutItemInput = {
        TableName: "Estintori",
        Item: convertToDynamoDBFormat(estintoreDaSalvare),
      };
      return await dynamoDB
        .putItem(params)
        .promise()
        .catch((err: any) => {
          console.error("Unable to add Estintore", err);
        });
}

export const getAllEstintoreByCreatoDa = async (creatoDa: string) => {
    let params: QueryInput = {
        TableName: "Estintori",
        IndexName: "EstintoriByCreatoDa",
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
        console.log("Estintori api:", err);
        return undefined; // Indica che c'è stato un errore
      }
}

export const updateEstintoreInDynamo = async (estintoreToUpdate: Estintore) => {
    let params: PutItemInput = {
        TableName: "Estintori",
        Item: convertToDynamoDBFormat(estintoreToUpdate),
      };
      return await dynamoDB
        .putItem(params)
        .promise()
        .catch((err: any) => {
          console.error("Unable to add Estintore", err);
        });

}

export const deleteEstintoreFromDynamo = async (estintoreToDelete: string) => {
    let params: DeleteItemInput = {
        TableName: "Estintori",
        Key: { id: { S: estintoreToDelete } },
      };
      return await dynamoDB
        .deleteItem(params)
        .promise()
        .catch((err) => {
            console.error("Unable to delete Estintore", err);
        });
}