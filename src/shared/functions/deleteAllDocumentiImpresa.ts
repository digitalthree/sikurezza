import { deleteFileS3 } from "../../aws/s3APIs";
import { Impresa } from "../../model/Impresa";

export const deleteAllDocumentiImpresa = (impresaSelezionata: Impresa) => {
  impresaSelezionata.documentiIdoneitaImpresa.forEach((d) => {
    if (typeof d.file === "string") {
      deleteFileS3(d.file).then(() => {});
    }
  });
  if (typeof impresaSelezionata.anagrafica.certificatoCCIAA.file.value === "string") {
    deleteFileS3(impresaSelezionata.anagrafica.certificatoCCIAA.file.value as string);
  }
  if (typeof impresaSelezionata.anagrafica.dvr.file.value === "string") {
    deleteFileS3(impresaSelezionata.anagrafica.dvr.file.value as string);
  }
};
