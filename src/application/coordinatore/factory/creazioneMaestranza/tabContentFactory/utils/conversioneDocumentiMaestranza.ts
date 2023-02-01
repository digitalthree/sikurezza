import {DocumentiMaestranza} from "../../../../../../model/Maestranza";

export const convertiInDocumentiMaestranza = (data: any) => {
    let documenti: DocumentiMaestranza = {
        contratto: {
            tipologia: data.tipologiaContratto,
            dataAssunzione: data.dataAssunzione,
            dataFineContratto: data.dataFineContratto,
            file: {name: "contratto", value: data.contrattoFile}
        },
        visitaMedica:{
            effettuataIl: data.visitaMedicaEffettuataIl,
            scadenza: data.visitaMedicaScadenza,
            prescrizioniLimitazioni: data.prescrizioniLimitazioni,
            file: {name: "visitaMedica", value: data.visitaMedicaFile}
        },
        corsoFormazioneArt3637: {
            effettuatoIl: data.corsoFormazioneArt3637EffettuatoIl,
            scadenza: data.corsoFormazioneArt3637Scadenza,
            file: {name: "corsoFormazioneArt363", value: data.corsoFormazioneArt363File}
        },
        corsoFormazioneCovid:{
            effettuatoIl: data.corsoFormazioneCovidEffettuatoIl,
            scadenza: data.corsoFormazioneCovidScadenza,
            file: {name: "corsoFormazioneCovid", value: data.corsoFormazioneCovidFile}
        },
        corsoMacchineMovTerra:{
            effettuatoIl: data.corsoMacchineMovTerraEffettuatoIl,
            scadenza: data.corsoMacchineMovTerraScadenza,
            file: {name: "corsoMacchineMovTerra", value: data.corsoMacchineMovTerraFile}
        },
        corsoPonteggi:{
            effettuatoIl: data.corsoPonteggiEffettuatoIl,
            scadenza: data.corsoPonteggiScadenza,
            file: {name: "corsoPonteggi", value: data.corsoPonteggiFile}
        },
        corsoPLE: {
            effettuatoIl: data.corsoPLEEffettuatoIl,
            scadenza: data.corsoPLEScadenza,
            file: {name: "corsoPLE", value: data.corsoPLEFile}
        },
        corsoConduzioneGRU: {
            effettuatoIl: data.corsoConduzioneGRUEffettuatoIl,
            scadenza: data.corsoConduzioneGRUScadenza,
            file: {name: "corsoConduzioneGRU", value: data.corsoConduzioneGRUFile}
        },
        corsoGRUSuAutocarro:{
            effettuatoIl: data.corsoGRUSuAutocarroEffettuatoIl,
            scadenza: data.corsoGRUSuAutocarroScadenza,
            file: {name: "corsoGRUSuAutocarro", value: data.corsoGRUSuAutocarroFile}
        },
        corsoEscavatoriIdraulici:{
            effettuatoIl: data.corsoEscavatoriIdrauliciEffettuatoIl,
            scadenza: data.corsoEscavatoriIdrauliciScadenza,
            file: {name: "corsoEscavatoriIdraulici", value: data.corsoEscavatoriIdrauliciFile}
        },
        consegnaDPI:{
            consegnato: data.consegnaDPI,
            consegnatoIl: data.consegnaDPIConsegnatoIl,
            file: {name: "consegnaDPI", value: data.consegnaDPIFile}
        },
        consegnaDPICovid:{
            consegnato: data.consegnaDPICovid,
            consegnatoIl: data.consegnaDPICovidConsegnatoIl,
            file: {name: "consegnaDPICovid", value: data.consegnaDPICovidFile}
        },
        consegnaTesserino:{
            consegnato: data.consegnaTesserino,
            consegnatoIl: data.consegnaTesserinoConsegnatoIl,
            file: {name: "consegnaTesserino", value: data.consegnaTesserinoFile}
        },
        nominaDaPreposto: {
            nomina: data.nominaDaPreposto,
            file: {name: "nominaDaPreposto", value: data.nominaDaPrepostoFile}
        },
        nominaDaRSPP: {
            nomina: data.nominaDaRSPP,
            file: {name: "nominaDaRSPP", value: data.nominaDaRSPPFile}
        },
        nominaDaRLS: {
            nomina: data.nominaDaRLS,
            file: {name: "nominaDaRLS", value: data.nominaDaRLSFile}
        },
        nominaDaAddettoPSoccorso: {
            nomina: data.nominaDaAddettoPSoccorso,
            file: {name: "nominaDaAddettoPSoccorso", value: data.nominaDaAddettoPSoccorsoFile}
        },
        nominaDaAddettoPrevIncendi: {
            nomina: data.nominaDaAddettoPrevIncendi,
            file: {name: "nominaDaAddettoPrevIncendi", value: data.nominaDaAddettoPrevIncendiFile}
        },
        corsoPrimoSoccorso: {
            effettuatoIl: data.corsoPrimoSoccorsoEffettuatoIl,
            scadenza: data.corsoPrimoSoccorsoScadenza,
            file: {name: "corsoPrimoSoccorso", value: data.corsoPrimoSoccorsoFile}
        },
        corsoPrevIncendi: {
            effettuatoIl: data.corsoPrevIncendiEffettuatoIl,
            scadenza: data.corsoPrevIncendiScadenza,
            file: {name: "corsoPrevIncendi", value: data.corsoPrevIncendiFile}
        },
        corsoPreposto: {
            effettuatoIl: data.corsoPrepostoEffettuatoIl,
            scadenza: data.corsoPrepostoScadenza,
            file: {name: "corsoPreposto", value: data.corsoPrepostoFile}
        },
        corsoRLS: {
            effettuatoIl: data.corsoRLSEffettuatoIl,
            scadenza: data.corsoRLSScadenza,
            file: {name: "corsoRLS", value: data.corsoRLSFile}
        },
        corsoRSPP: {
            effettuatoIl: data.corsoRSPPEffettuatoIl,
            scadenza: data.corsoRSPPScadenza,
            file: {name: "corsoRSPP", value: data.corsoRSPPFile}
        }
    }
    return documenti
}