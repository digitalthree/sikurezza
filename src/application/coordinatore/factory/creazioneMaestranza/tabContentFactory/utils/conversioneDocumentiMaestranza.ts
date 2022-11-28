import {DocumentiMaestranza} from "../../../../../../model/Maestranza";
import {conversioneFileBase64} from "./conversioneFileBase64";

export const convertiInDocumentiMaestranza = (data: any) => {
    let documenti: DocumentiMaestranza = {
        contratto: {
            tipologia: data.tipologiaContratto,
            dataAssunzione: data.dataAssunzione,
            dataFineContratto: data.dataFineContratto,
            file: {name: 'contratto', value: conversioneFileBase64(data.contrattoFile)}
        },
        visitaMedica:{
            effettuataIl: data.visitaMedicaEffettuataIl,
            scadenza: data.visitaMedicaScadenza,
            prescrizioniLimitazioni: data.prescrizioniLimitazioni,
            file: {name: 'visitaMedica', value: conversioneFileBase64(data.visitaMedicaFile)}
        },
        corsoFormazioneArt3637: {
            effettuatoIl: data.corsoFormazioneArt3637EffettuatoIl,
            scadenza: data.corsoFormazioneArt3637Scadenza,
            file: {name: 'corsoFormazioneArt3637', value: conversioneFileBase64(data.corsoFormazioneArt3637File)}
        },
        corsoFormazioneCovid:{
            effettuatoIl: data.corsoFormazioneCovidEffettuatoIl,
            scadenza: data.corsoFormazioneCovidScadenza,
            file: {name: 'corsoFormazioneCovid', value: conversioneFileBase64(data.corsoFormazioneCovidFile)}
        },
        corsoMacchineMovTerra:{
            effettuatoIl: data.corsoMacchineMovTerraEffettuatoIl,
            scadenza: data.corsoMacchineMovTerraScadenza,
            file: {name: 'corsoMacchineMovTerra', value: conversioneFileBase64(data.corsoMacchineMovTerraFile)}
        },
        corsoPonteggi:{
            effettuatoIl: data.corsoPonteggiEffettuatoIl,
            scadenza: data.corsoPonteggiScadenza,
            file: {name: 'corsoPonteggi', value: conversioneFileBase64(data.corsoPonteggiFile)}
        },
        corsoPLE: {
            effettuatoIl: data.corsoPLEEffettuatoIl,
            scadenza: data.corsoPLEScadenza,
            file: {name: 'corsoPLE', value: conversioneFileBase64(data.corsoPLEFile)}
        },
        corsoConduzioneGRU: {
            effettuatoIl: data.corsoConduzioneGRUEffettuatoIl,
            scadenza: data.corsoConduzioneGRUScadenza,
            file: {name: 'corsoConduzioneGRU', value: conversioneFileBase64(data.corsoConduzioneGRUFile)}
        },
        corsoGRUSuAutocarro:{
            effettuatoIl: data.corsoGRUSuAutocarroEffettuatoIl,
            scadenza: data.corsoGRUSuAutocarroScadenza,
            file: {name: 'corsoGRUSuAutocarro', value: conversioneFileBase64(data.corsoGRUSuAutocarroFile)}
        },
        corsoEscavatoriIdraulici:{
            effettuatoIl: data.corsoEscavatoriIdrauliciEffettuatoIl,
            scadenza: data.corsoEscavatoriIdrauliciScadenza,
            file: {name: 'corsoEscavatoriIdraulici', value: conversioneFileBase64(data.corsoEscavatoriIdrauliciFile)}
        },
        consegnaDPI:{
            consegnato: data.consegnaDPI,
            consegnatoIl: data.consegnaDPIConsegnatoIl,
            file: {name: 'consegnaDPI', value: conversioneFileBase64(data.consegnaDPIFile)}
        },
        consegnaDPICovid:{
            consegnato: data.consegnaDPICovid,
            consegnatoIl: data.consegnaDPICovidConsegnatoIl,
            file: {name: 'consegnaDPICovid', value: conversioneFileBase64(data.consegnaDPICovidFile)}
        },
        consegnaTesserino:{
            consegnato: data.consegnaTesserino,
            consegnatoIl: data.consegnaTesserinoConsegnatoIl,
            file: {name: 'consegnaTesserino', value: conversioneFileBase64(data.consegnaTesserinoFile)}
        },
        nominaDaPreposto: {
            nomina: data.nominaDaPreposto,
            file: {name: 'nominaDaPreposto', value: conversioneFileBase64(data.nominaDaPrepostoFile)}
        },
        nominaDaRSPP: {
            nomina: data.nominaDaRSPP,
            file: {name: 'nominaDaRSPP', value: conversioneFileBase64(data.nominaDaRSPPFile)}
        },
        nominaDaRLS: {
            nomina: data.nominaDaRLS,
            file: {name: 'nominaDaRLS', value: conversioneFileBase64(data.nominaDaRLSFile)}
        },
        nominaDaAddettoPSoccorso: {
            nomina: data.nominaDaAddettoPSoccorso,
            file: {name: 'nominaDaAddettoPSoccorso', value: conversioneFileBase64(data.nominaDaAddettoPSoccorsoFile)}
        },
        nominaDaAddettoPrevIncendi: {
            nomina: data.nominaDaAddettoPrevIncendi,
            file: {name: 'nominaDaAddettoPrevIncendi', value: conversioneFileBase64(data.nominaDaAddettoPrevIncendiFile)}
        },
        corsoPrimoSoccorso: {
            effettuatoIl: data.corsoPrimoSoccorsoEffettuatoIl,
            scadenza: data.corsoPrimoSoccorsoScadenza,
            file: {name: 'corsoPrimoSoccorso', value: conversioneFileBase64(data.corsoPrimoSoccorsoFile)}
        },
        corsoPrevIncendi: {
            effettuatoIl: data.corsoPrevIncendiEffettuatoIl,
            scadenza: data.corsoPrevIncendiScadenza,
            file: {name: 'corsoPrevIncendi', value: conversioneFileBase64(data.corsoPrevIncendiFile)}
        },
        corsoPreposto: {
            effettuatoIl: data.corsoPrepostoEffettuatoIl,
            scadenza: data.corsoPrepostoScadenza,
            file: {name: 'corsoPreposto', value: conversioneFileBase64(data.corsoPrepostoFile)}
        },
        corsoRLS: {
            effettuatoIl: data.corsoRLSEffettuatoIl,
            scadenza: data.corsoRLSScadenza,
            file: {name: 'corsoRLS', value: conversioneFileBase64(data.corsoRLSFile)}
        },
        corsoRSPP: {
            effettuatoIl: data.corsoRSPPEffettuatoIl,
            scadenza: data.corsoRSPPScadenza,
            file: {name: 'corsoRSPP', value: conversioneFileBase64(data.corsoRSPPFile)}
        }
    }
    return documenti
}