import {setFileInDocumenti} from "../../../../../../store/impresaSlice";

export const conversioneFileBase64 = (file: File): string => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let fileBase64: string = ""
    reader.onload = function () {
        /*if(e.target.files){
            dispatch(setFileInDocumenti({id: index,
                name: e.target.files[0].name,
                value: reader.result as string
            }))
        }*/
        fileBase64 = reader.result as string
    };

    return fileBase64

}