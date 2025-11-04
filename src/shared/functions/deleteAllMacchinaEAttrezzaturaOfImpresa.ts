import { deleteFileS3 } from "../../aws/s3APIs";
import { deleteMacchinaEAttrezzaturaFromDynamo, getAllMacchineEAttrezzatureByCreatoDa } from "../../dynamodb/api/macchinaEAttrezzaturaAPIs";
import { convertFromDynamoDBFormat } from "../../dynamodb/utils/conversionFunctions";
import { Impresa } from "../../model/Impresa";
import { MacchinaEAttrezzatura } from "../../model/MacchineEAttrezzature";

export const deleteAllMacchinaEAttrezzaturaOfImpresa = (execQuery2: Function, impresaSelezionata: Impresa) => {
  execQuery2(getAllMacchineEAttrezzatureByCreatoDa, impresaSelezionata.id).then((res: any) => {
    res.Items.forEach((item: any) => {
      let m = convertFromDynamoDBFormat(item) as MacchinaEAttrezzatura;
      m.documenti.forEach((d) => {
        if (typeof d.file === "string") {
          deleteFileS3(d.file as string);
        }
      });
      execQuery2(deleteMacchinaEAttrezzaturaFromDynamo, m.id).then(() => {});
    });
  });
};
