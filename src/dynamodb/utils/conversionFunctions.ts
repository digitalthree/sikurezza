export function convertToDynamoDBFormat(jsonData: any): any {
    let dynamoData: any = {};

    for (let key in jsonData) {
        let value = jsonData[key];

        if (typeof value === "number") {
            dynamoData[key] = { N: value.toString() }; // Converti i numeri in stringhe
        } else if (typeof value === "string") {
            dynamoData[key] = { S: value }; // Mantieni le stringhe
        } else if (typeof value === "boolean") {
            dynamoData[key] = { BOOL: value }; // Mantieni i booleani
        } else if (value === null) {
            dynamoData[key] = { NULL: true }; // Rappresenta i valori null
        } else if (Array.isArray(value)) {
            dynamoData[key] = { L: value.map(item => convertToDynamoDBFormat({ item }).item) }; // Lista
        } else if (typeof value === "object") {
            dynamoData[key] = { M: convertToDynamoDBFormat(value) }; // Mappa
        } else {
            //throw new Error(`Tipo non supportato per la chiave ${key}`);
        }
    }

    return dynamoData;
}

export function convertFromDynamoDBFormat(dynamoData:any) {
    let formattedData:any = {};

    for (let key in dynamoData) {
        let value = dynamoData[key];

        if (value.N !== undefined) {
            formattedData[key] = Number(value.N); // Convert number string to actual number
        } else if (value.S !== undefined) {
            formattedData[key] = value.S; // Extract string
        } else if (value.B !== undefined) {
            formattedData[key] = value.B; // Extract binary
        } else if (value.SS !== undefined) {
            formattedData[key] = value.SS; // Extract stringArray
        } else if (value.NS !== undefined) {
            formattedData[key] = value.NS; // Extract numberArray
        } else if (value.BS !== undefined) {
            formattedData[key] = value.BS; // Extract binaryArray
        } else if (value.BOOL !== undefined) {
            formattedData[key] = value.BOOL; // Extract boolean
        } else if (value.NULL !== undefined) {
            formattedData[key] = value.NULL ? null : undefined; // Extract null
        } else if (value.L !== undefined) {
            formattedData[key] = value.L.map((v: any) => {
                if (v.S !== undefined) {
                    return v.S;
                } else if (v.N !== undefined) {
                    return Number(v.N)// Convert number string to actual number
                } else if (v.B !== undefined) {
                    return v.B; // Extract binary
                } else if (v.SS !== undefined) {
                    return v.SS; // Extract stringArray
                } else if (v.NS !== undefined) {
                    return v.NS; // Extract numberArray
                } else if (v.BS !== undefined) {
                    return v.BS; // Extract binaryArray
                } else if (v.BOOL !== undefined) {
                    return v.BOOL; // Extract boolean
                } else if (v.L !== undefined) {
                    return convertFromDynamoDBFormat(v.L)
                } else if (v.M !== undefined) {
                    return convertFromDynamoDBFormat(v.M)
                }
            }); // Extract array
        } else if (value.M !== undefined) {
            formattedData[key] = convertFromDynamoDBFormat(value.M); // Extract map
        } else {
            formattedData[key] = value; // Keep other types as is
        }
    }

    return formattedData;
}