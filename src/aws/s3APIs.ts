import ReactS3Client from 'react-aws-s3-typescript';
import {s3, s3Config} from './s3Config';


export const uploadFileS3 = async (file: File) => {
    const s3 = new ReactS3Client(s3Config);
    try {
        return await s3.uploadFile(file)
    } catch (exception) {
        console.log(exception);
    }
}

export const deleteFileS3 = async (key: string) => {
    const s3 = new ReactS3Client(s3Config);
    try {
        return await s3.deleteFile(key)
    } catch (exception) {
        console.log(exception);
    }
    return false
}

export const getFileFromS3 = (url: string | File) => {
    if (typeof url === 'string') {
        s3.getObject({
            Bucket: process.env.REACT_APP_AWS_BUCKET_NAME as string,
            Key: url,
        }, (err, data) => {
            if (data) {
                const file = new Blob([data.Body as BlobPart], {type: "application/pdf"})
                const fileURL = URL.createObjectURL(file);
                const pdfWindow = window.open();
                if (pdfWindow) {
                    pdfWindow.location.href = fileURL;
                }
            }
        })
    } else {
        const fileURL = URL.createObjectURL(url as File);
        const pdfWindow = window.open();
        if (pdfWindow) {
            pdfWindow.location.href = fileURL;
        }
    }
}

export const retriveFileFromS3Clean = async (url: string): Promise<File|Blob> => {
    // 1. Usiamo .promise() per trasformare la chiamata in una Promise che possiamo 'await'
    const result = await s3.getObject({
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME as string,
        Key: url,
    }).promise(); 

    if (result && result.Body) {
        const contentType = result.ContentType || "application/pdf";
        const fileBlob = new Blob([result.Body as BlobPart], { type: contentType });

        // // Creazione dell'oggetto File
        // const fileName = url.substring(url.lastIndexOf('/') + 1) || 'downloaded-file.pdf';
        // const file = new File([fileBlob], fileName, { type: contentType });
        
        return fileBlob;
    } 

    throw new Error("File non trovato o corpo dati assente.");
};