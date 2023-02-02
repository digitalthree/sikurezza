import {Documento} from "../../../../../../../model/Maestranza";

export const convertiInDocumentiMaestranza = (data: any) => {
    let documenti: Documento[] = [
        {
            nome: 'contratto',
            tipologia: data.tipologiaContratto,
            dataAssunzione: data.dataAssunzione,
            dataFineContratto: data.dataFineContratto,
            file: data.contrattoFile
        },
        {
            nome: 'visitaMedica',
            effettuatoIl: data.visitaMedicaEffettuataIl,
            scadenza: data.visitaMedicaScadenza,
            prescrizioniLimitazioni: data.prescrizioniLimitazioni,
            file: data.visitaMedicaFile
        },
        {
            nome: 'corsoFormazioneArt3637',
            effettuatoIl: data.corsoFormazioneArt3637EffettuatoIl,
            scadenza: data.corsoFormazioneArt3637Scadenza,
            file: data.corsoFormazioneArt363File
        },
        {
            nome: 'corsoFormazioneCovid',
            effettuatoIl: data.corsoFormazioneCovidEffettuatoIl,
            scadenza: data.corsoFormazioneCovidScadenza,
            file: data.corsoFormazioneCovidFile
        },
        {
            nome: 'corsoMacchineMovTerra',
            effettuatoIl: data.corsoMacchineMovTerraEffettuatoIl,
            scadenza: data.corsoMacchineMovTerraScadenza,
            file: data.corsoMacchineMovTerraFile
        },
        {
            nome: 'corsoPonteggi',
            effettuatoIl: data.corsoPonteggiEffettuatoIl,
            scadenza: data.corsoPonteggiScadenza,
            file: data.corsoPonteggiFile
        },
        {
            nome: 'corsoPLE',
            effettuatoIl: data.corsoPLEEffettuatoIl,
            scadenza: data.corsoPLEScadenza,
            file: data.corsoPLEFile
        },
        {
            nome: 'corsoConduzioneGRU',
            effettuatoIl: data.corsoConduzioneGRUEffettuatoIl,
            scadenza: data.corsoConduzioneGRUScadenza,
            file: data.corsoConduzioneGRUFile
        },
        {
            nome: 'corsoGRUSuAutocarro',
            effettuatoIl: data.corsoGRUSuAutocarroEffettuatoIl,
            scadenza: data.corsoGRUSuAutocarroScadenza,
            file: data.corsoGRUSuAutocarroFile
        },
        {
            nome: 'corsoEscavatoriIdraulici',
            effettuatoIl: data.corsoEscavatoriIdrauliciEffettuatoIl,
            scadenza: data.corsoEscavatoriIdrauliciScadenza,
            file: data.corsoEscavatoriIdrauliciFile
        },
        {
            nome: 'consegnaDPI',
            consegnato: data.consegnaDPI,
            consegnatoIl: data.consegnaDPIConsegnatoIl,
            file: data.consegnaDPIFile
        },
        {
            nome: 'consegnaDPICovid',
            consegnato: data.consegnaDPICovid,
            consegnatoIl: data.consegnaDPICovidConsegnatoIl,
            file: data.consegnaDPICovidFile
        },
        {
            nome: 'consegnaTesserino',
            consegnato: data.consegnaTesserino,
            consegnatoIl: data.consegnaTesserinoConsegnatoIl,
            file: data.consegnaTesserinoFile
        },
        {
            nome: 'nominaDaPreposto',
            nomina: data.nominaDaPreposto,
            file: data.nominaDaPrepostoFile
        },
        {
            nome: 'nominaDaRSPP',
            nomina: data.nominaDaRSPP,
            file: data.nominaDaRSPPFile
        },
        {
            nome: 'nominaDaRLS',
            nomina: data.nominaDaRLS,
            file: data.nominaDaRLSFile
        },
        {
            nome: 'nominaDaAddettoPSoccorso',
            nomina: data.nominaDaAddettoPSoccorso,
            file: data.nominaDaAddettoPSoccorsoFile
        },
        {
            nome: 'nominaDaAddettoPrevIncendi',
            nomina: data.nominaDaAddettoPrevIncendi,
            file: data.nominaDaAddettoPrevIncendiFile
        },
        {
            nome: 'corsoPrimoSoccorso',
            effettuatoIl: data.corsoPrimoSoccorsoEffettuatoIl,
            scadenza: data.corsoPrimoSoccorsoScadenza,
            file: data.corsoPrimoSoccorsoFile
        },
        {
            nome: 'corsoPrevIncendi',
            effettuatoIl: data.corsoPrevIncendiEffettuatoIl,
            scadenza: data.corsoPrevIncendiScadenza,
            file: data.corsoPrevIncendiFile
        },
        {
            nome: 'corsoPreposto',
            effettuatoIl: data.corsoPrepostoEffettuatoIl,
            scadenza: data.corsoPrepostoScadenza,
            file: data.corsoPrepostoFile
        },
        {
            nome: 'corsoRLS',
            effettuatoIl: data.corsoRLSEffettuatoIl,
            scadenza: data.corsoRLSScadenza,
            file: data.corsoRLSFile
        },
        {
            nome: 'corsoRSPP',
            effettuatoIl: data.corsoRSPPEffettuatoIl,
            scadenza: data.corsoRSPPScadenza,
            file: data.corsoRSPPFile
        }
    ]
    return documenti
}