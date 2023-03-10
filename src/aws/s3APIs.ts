import ReactS3Client from 'react-aws-s3-typescript';
import {s3, s3Config} from './s3Config';
import {Dispatch} from "@reduxjs/toolkit";
import {setFileInDocumentiMaestranza} from "../store/maestranzaSlice";

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
                const file = new Blob([data.Body as Uint8Array], {type: "application/pdf"})
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