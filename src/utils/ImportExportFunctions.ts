import {
  getFileFromS3,
  retriveFileFromS3Clean,
  uploadFileS3,
} from "../aws/s3APIs";
import { createImpresaInDynamo } from "../dynamodb/api/impresaAPIs";
import {
  createMacchinaEAttrezzaturaInDynamo,
  getAllMacchineEAttrezzatureByCreatoDa,
} from "../dynamodb/api/macchinaEAttrezzaturaAPIs";
import {
  createMaestranzaInDynamo,
  getAllMaestranzeByCreatoDa,
} from "../dynamodb/api/maestranzaAPIs";
import { convertFromDynamoDBFormat } from "../dynamodb/utils/conversionFunctions";
import {
  Autodichiarazione,
  Impresa,
  ImpresaDaImportare,
} from "../model/Impresa";
import {
  DocumentoMacchinaEAttrezzatura,
  MacchinaEAttrezzatura,
} from "../model/MacchineEAttrezzature";
import { Corso, Documento, Maestranza } from "../model/Maestranza";
import JSZip from "jszip";

// export const exportToJsonFileThis = (data: Impresa, fileName: string, execQuery2: Function) => {
//     let impresa = {...data, maestranze: [], macchineEAttrezzature: []} as ImpresaDaImportare
//     fillImpresa(execQuery2, impresa).then(res => {
//         const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
//             JSON.stringify(res)
//         )}`;
//         const link = document.createElement("a");
//         link.href = jsonString;
//         link.download = fileName;

//         link.click();
//     })
// };

export const exportToZipFile = async (
  data: Impresa,
  fileName: string,
  execQuery2: Function,
  setgenerateZip: Function
) => {
  try {
    setgenerateZip(true);
    let impresaIniziale = {
      ...data,
      maestranze: [],
      macchineEAttrezzature: [],
    } as ImpresaDaImportare;

    // 1. Esegui la funzione asincrona per recuperare i dati e i file
    const { impresaJson, filesToZip } = await fillImpresa(
      execQuery2,
      impresaIniziale
    );
    const zip = new JSZip();

    // 2. Aggiungi il file JSON contenente i metadati e i riferimenti ai file
    const jsonString = JSON.stringify(impresaJson, null, 2);
    zip.file("dati_impresa.json", jsonString);
    // 3. Aggiungi tutti i file binari all'archivio ZIP
    filesToZip.forEach((fileData) => {
      // Aggiunge il file usando il percorso (path) definito in fillImpresa
      zip.file(fileData.path, fileData.data);
    });

    // 4. Genera il file ZIP come Blob
    const content = await zip.generateAsync({ type: "blob" });

    // 5. Crea il link e avvia il download
    const zipFileName = `${fileName.replace(".json", "") || "export"}.zip`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = zipFileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Pulisci l'URL creato
    URL.revokeObjectURL(link.href);
    setgenerateZip(false);
  } catch (error) {
    console.error("Errore durante l'esportazione ZIP:", error);
    alert("Si è verificato un errore durante l'esportazione dei dati.");
  }
};

// Nuovo tipo per tracciare i file da zippare
type FileToZip = {
  path: string; // Il percorso all'interno dello zip (es: "maestranze/nome_maestranza/corso1.pdf")
  data: File | Blob; // Il dato binario
};

const fillImpresa = async (
  execQuery2: Function,
  impresa: ImpresaDaImportare
): Promise<{
  impresaJson: ImpresaDaImportare;
  filesToZip: FileToZip[];
}> => {
  let filesToZip: FileToZip[] = [];

  // --- FUNZIONE AUSILIARIA PER GESTIRE I DOCUMENTI (Corsi, Documenti Maestranze, etc.) ---
  // Questa funzione estrae il file binario, salva il metadato nel JSON e lo aggiunge a filesToZip
  const handleDocumentArray = async (
    documentArray:
      | Documento[]
      | Corso[]
      | DocumentoMacchinaEAttrezzatura[]
      | Autodichiarazione[],
    basePath: string
  ) => {
    const docPromises = documentArray.map(async (doc: any, index: number) => {
      let docToSave = { ...doc };
      if (typeof doc.file === "string") {
        const originalUrl = doc.file as string;
        // 1. Recupera il file binario
        const fileBlob = await retriveFileFromS3Clean(originalUrl);

        // 2. Determina un nome file univoco e pulito per lo ZIP
        const fileName =
          originalUrl.substring(originalUrl.lastIndexOf("/") + 1) ||
          `documento-${index}.pdf`;
        const zipPath = `${basePath}/${fileName}`;

        // 3. Salva i metadati nel JSON (l'oggetto deve avere solo il nome del file per lo ZIP)

        docToSave.file = fileName;

        // 4. Aggiungi il file binario e il suo percorso allo ZIP all'array
        filesToZip.push({ path: zipPath, data: fileBlob });
      }
      return docToSave;
    });
    return await Promise.all(docPromises);
  };

  // 1. Esegui la query Maestranze
  const resMaestranze: any = await execQuery2(
    getAllMaestranzeByCreatoDa,
    impresa.id
  );

  const docPath = `documentiImpresa/`;

  impresa.documentiIdoneitaImpresa = await handleDocumentArray(
    impresa.documentiIdoneitaImpresa,
    docPath
  );

  const maestranzePromises = resMaestranze.Items.map(async (item: any) => {
    const maestranza = convertFromDynamoDBFormat(item) as Maestranza;
    maestranza.id = crypto.randomUUID();
    const maestranzaPath = `maestranze/${maestranza.id}`;

    // Gestione Corsi
    maestranza.corsi = await handleDocumentArray(
      maestranza.corsi,
      `${maestranzaPath}/corsi`
    );

    // Gestione Documenti Maestranza
    maestranza.documenti = await handleDocumentArray(
      maestranza.documenti,
      `${maestranzaPath}/documenti`
    );

    impresa.maestranze.push(maestranza);
    return maestranza;
  });

  await Promise.all(maestranzePromises);

  // 3. Esegui la query Macchine
  const resMacchine: any = await execQuery2(
    getAllMacchineEAttrezzatureByCreatoDa,
    impresa.id
  );

  // 4. Popola l'array macchine
  const macchinePromises = resMacchine.Items.map(async (item2: any) => {
    const macchina = convertFromDynamoDBFormat(item2) as MacchinaEAttrezzatura;
    macchina.id = crypto.randomUUID();
    const macchinaPath = `macchine/${macchina.id}`;

    macchina.documenti = await handleDocumentArray(
      macchina.documenti,
      macchinaPath
    );

    impresa.macchineEAttrezzature.push(macchina);
    return macchina;
  });

  await Promise.all(macchinePromises);

  // 5. Gestione Anagrafica (DVR, CCIAA)
  const anagraficaDocs = [
    { doc: impresa.anagrafica.dvr, path: "anagrafica/dvr" },
    { doc: impresa.anagrafica.certificatoCCIAA, path: "anagrafica/cciaa" },
  ];

  for (const item of anagraficaDocs) {
    if (item.doc.file && item.doc.file.value) {
      const originalUrl = item.doc.file.value as string;
      const fileBlob = await retriveFileFromS3Clean(originalUrl);
      const fileName =
        originalUrl.substring(originalUrl.lastIndexOf("/") + 1) ||
        "documento-impresa.pdf";
      filesToZip.push({ path: `${item.path}/${fileName}`, data: fileBlob });
      item.doc.file.value = fileName; // Aggiorna il JSON con il nome del file
    }
  }

  // Infine, restituiamo sia il JSON modificato che l'array dei file
  return { impresaJson: impresa, filesToZip };
};

/**
 * Gestisce l'importazione dei dati dell'impresa da un file ZIP.
 * @param zipFile Il file ZIP caricato dall'utente.
 * @param creatoDaUserId L'ID dell'utente che esegue l'importazione.
 * @returns Una Promise che si risolve con l'oggetto ImpresaDaImportare salvato.
 */
export const importFromZipFile = async (
  zipFile: File | Blob,
  user: string,
  execQuery2: Function
): Promise<Impresa> => {
  // 1. Caricamento e Decompressione del file ZIP
  // ---
  const zip = await JSZip.loadAsync(zipFile);
  console.log(zip);

  // Cerca e carica il file JSON (dati_impresa.json)
  let jsonFile = zip.file("dati_impresa.json");
  if (!jsonFile) {
    throw new Error(
      "File 'dati_impresa.json' non trovato all'interno dell'archivio ZIP."
    );
  }
  const jsonString = await jsonFile.async("string");
  let impresaDaImportare: ImpresaDaImportare = JSON.parse(jsonString);

  // 2. Prepara i Dati Base dell'Impresa
  // ---
  impresaDaImportare.creatoDa = user; // Imposta l'utente che esegue l'import
  impresaDaImportare.id = crypto.randomUUID(); // Rimuovi l'ID precedente (se presente) per forzare una nuova creazione

  // 3. Funzione Ausiliaria per salvare i File su S3 e aggiornare il JSON
  // ---
  // Funzione per salvare i File su S3 e aggiornare il JSON
  const updateDocument = async (doc: any, basePath: string) => {
    if (typeof doc.file === "string" && doc.file) {
      const fileName = doc.file;

      // 1. Definiamo i percorsi probabili per la ricerca nello ZIP
      const possibleZipPaths = [
        `${basePath}/${fileName}`, // Es: maestranze/ID/corsi/nomefile.pdf (Path rigido)
        basePath.replace(/\/[^\/]+$/, "") + `/${fileName}`, // Es: macchine/ID/nomefile.pdf (Path meno specifico)
        fileName, // Caso estremo: file nel root
      ];

      let fileEntry: JSZip.JSZipObject | null = null;

      // 2. Cerchiamo il file nello ZIP (JSZipObject)
      for (const path of possibleZipPaths) {
        const entry = zip.file(path);
        if (entry) {
          fileEntry = entry;
          break;
        }
      }

      if (!fileEntry) {
        console.warn(
          `File binario non trovato per il percorso ZIP (Percorsi tentati: ${possibleZipPaths.join(
            " | "
          )}): ${fileName}`
        );
        return doc; // Non possiamo fare nulla, saltiamo
      }

      // 3. Ottieni il dato binario come Blob
      const fileBlob = await fileEntry.async("blob");

      // 4. Salva il file su S3 e ottieni la nuova chiave/URL
      const s3Url = await uploadFileS3(blobToFile(fileBlob, fileName));

      // 5. Aggiorna il JSON con la NUOVA URL di S3
      doc.file = s3Url?.key;
    }
    return doc;
  };

  // 3. Salvataggio Anagrafica e Documenti Collegati
  // ---
  // Logica per DVR e CCIAA
  const updateAnagraficaFile = async (
    fileObj: { nome: string; value: File | string | undefined },
    basePath: string
  ) => {
    if (typeof fileObj.value === "string") {
      const fileName = fileObj.value;

      // 1. Cerchiamo in modo più flessibile
      const possibleZipPaths = [
        `${basePath}/${fileName}`,
        fileName,
        // Cerca in tutto lo ZIP per il nome del file (lento, solo se necessario)
        // Array.from(zip.files).find(([key, val]) => key.endsWith(fileName))
      ];

      let fileEntry: JSZip.JSZipObject | null = null;
      for (const path of possibleZipPaths) {
        const entry = zip.file(path);
        if (entry) {
          fileEntry = entry;
          break;
        }
      }

      if (fileEntry) {
        const fileBlob = await fileEntry.async("blob");
        const s3Url = await uploadFileS3(blobToFile(fileBlob, fileName));
        fileObj.value = s3Url?.key; // Aggiorna il valore con l'URL S3
      } else {
        console.warn(`File binario Anagrafica non trovato per: ${fileName}`);
      }
    }
  };

  // Chiamata
  await updateAnagraficaFile(
    impresaDaImportare.anagrafica.dvr.file,
    "anagrafica/dvr"
  );
  await updateAnagraficaFile(
    impresaDaImportare.anagrafica.certificatoCCIAA.file,
    "anagrafica/cciaa"
  );

  // 5. Salvataggio e Aggiornamento Maestranze (con File)
  // ---
  const savedMaestranzePromises = impresaDaImportare.maestranze.map(
    async (maestranza) => {
      const basePath = `maestranze/${maestranza.id}`;

      // 1. Prepara la Maestranza per il salvataggio
      maestranza.id = crypto.randomUUID(); // Rimuovi l'ID precedente
      maestranza.creatoDa = impresaDaImportare.id as string; // Imposta l'utente

      // 2. Salva i file dei Corsi su S3 e aggiorna il JSON
      maestranza.corsi = await Promise.all(
        maestranza.corsi.map((c) => updateDocument(c, `${basePath}/corsi`))
      );

      // 3. Salva i file dei Documenti su S3 e aggiorna il JSON
      maestranza.documenti = await Promise.all(
        maestranza.documenti.map((d) =>
          updateDocument(d, `${basePath}/documenti`)
        )
      );

      // 4. Salva la Maestranza nel DB (es. DynamoDB)
      execQuery2(createMaestranzaInDynamo, maestranza);
      return maestranza;
    }
  );

  // Sostituisce l'array di maestranze con quelle salvate (con i nuovi ID)
  impresaDaImportare.maestranze = await Promise.all(savedMaestranzePromises);

  // 6. Salvataggio e Aggiornamento Macchine (con File)
  // ---
  const savedMacchinePromises = impresaDaImportare.macchineEAttrezzature.map(
    async (macchina) => {
      const basePath = `macchine/${macchina.id}`;

      // 1. Prepara la Macchina per il salvataggio
      macchina.id = crypto.randomUUID(); // Rimuovi l'ID precedente
      macchina.creatoDa = impresaDaImportare.id as string; // Imposta l'utente

      macchina.documenti = await Promise.all(
        macchina.documenti.map((d) => updateDocument(d, `${basePath}`))
      );

      // 2. Salva la Macchina nel DB
      execQuery2(createMacchinaEAttrezzaturaInDynamo, macchina);
      return macchina;
    }
  );

  // Sostituisce l'array di macchine con quelle salvate (con i nuovi ID)
  impresaDaImportare.maestranze = await Promise.all(savedMaestranzePromises);
  impresaDaImportare.macchineEAttrezzature = await Promise.all(
    savedMacchinePromises
  );

  impresaDaImportare.documentiIdoneitaImpresa = await Promise.all(
    impresaDaImportare.documentiIdoneitaImpresa.map((d) =>
      updateDocument(d, `documentiImpresa`)
    )
  );

  // 7. Salvataggio finale dell'Impresa
  let impresaToSaveInDynamo = {
    ...impresaDaImportare,
    maestranze: impresaDaImportare.maestranze.map((m) => m.id),
    macchineEAttrezzature: impresaDaImportare.macchineEAttrezzature.map(
      (m) => m.id
    ),
  } as Impresa;
  await execQuery2(createImpresaInDynamo, impresaToSaveInDynamo);

  return impresaToSaveInDynamo;
};

/**
 * Converts a Blob object to a File object.
 * @param {Blob} blob - The Blob to convert.
 * @param {string} fileName - The desired name for the File.
 * @returns {File} A new File object.
 */
function blobToFile(blob: Blob, fileName: string) {
  // A File is created using the File constructor:
  // new File(fileBits, fileName, options);

  const file = new File(
    [blob], // The first argument is an array of Blob, BufferSource, or String parts.
    fileName, // The second argument is the file's name.
    {
      type: blob.type, // Use the original Blob's MIME type.
      lastModified: Date.now(), // Optional: Set a last modified timestamp.
    }
  );

  return file;
}
