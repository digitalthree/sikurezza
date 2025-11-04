import { deleteFileS3 } from "../../aws/s3APIs";
import { deleteMaestranzaFromDynamo, getAllMaestranzeByCreatoDa } from "../../dynamodb/api/maestranzaAPIs";
import { convertFromDynamoDBFormat } from "../../dynamodb/utils/conversionFunctions";
import { Impresa } from "../../model/Impresa";
import { Maestranza } from "../../model/Maestranza";

export const deleteAllMaestranzaOfImpresa = (execQuery2: Function, impresaSelezionata: Impresa) => {
  execQuery2(getAllMaestranzeByCreatoDa, impresaSelezionata.id).then((res: any) => {
    res.Items.forEach((item: any) => {
      let m = convertFromDynamoDBFormat(item) as Maestranza;
      m.corsi.forEach((c) => {
        if (typeof c.file === "string") {
          deleteFileS3(c.file as string);
        }
      });
      m.documenti.forEach((d) => {
        if (typeof d.file === "string") {
          deleteFileS3(d.file as string);
        }
      });
      execQuery2(deleteMaestranzaFromDynamo, m.id).then(() => {});
    });
  });
};
