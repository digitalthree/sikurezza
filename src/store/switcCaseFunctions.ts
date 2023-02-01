import {MaestranzaState} from "./maestranzaSlice";

export const setPropertyFileMaestranza = (state: MaestranzaState, property: string, url: string) => {
    switch (property) {
        case 'contratto':state.maestranzaDaCreare.documenti.contratto.file.value = url
            break
        case 'visitaMedica': state.maestranzaDaCreare.documenti.visitaMedica.file.value = url
            break
        case 'corsoFormazioneArt3637': state.maestranzaDaCreare.documenti.corsoFormazioneArt3637.file.value = url
            break
        case 'corsoFormazioneCovid': state.maestranzaDaCreare.documenti.corsoFormazioneCovid.file.value = url
            break
        case 'corsoMacchineMovTerra': state.maestranzaDaCreare.documenti.corsoMacchineMovTerra.file.value = url
            break
        case 'corsoPonteggi': state.maestranzaDaCreare.documenti.corsoPonteggi.file.value = url
            break
        case 'corsoPLE': state.maestranzaDaCreare.documenti.corsoPLE.file.value = url
            break
        case 'corsoConduzioneGRU': state.maestranzaDaCreare.documenti.corsoConduzioneGRU.file.value = url
            break
        case 'corsoEscavatoriIdraulici': state.maestranzaDaCreare.documenti.corsoEscavatoriIdraulici.file.value = url
            break
        case 'corsoGRUSuAutocarro': state.maestranzaDaCreare.documenti.corsoGRUSuAutocarro.file.value = url
            break
        case 'consegnaDPI': state.maestranzaDaCreare.documenti.consegnaDPI.file.value = url
            break
        case 'consegnaDPICovid': state.maestranzaDaCreare.documenti.consegnaDPICovid.file.value = url
            break
        case 'consegnaTesserino': state.maestranzaDaCreare.documenti.consegnaTesserino.file.value = url
            break
        case 'nominaDaPreposto': state.maestranzaDaCreare.documenti.nominaDaPreposto.file.value = url
            break
        case 'nominaDaRSPP': state.maestranzaDaCreare.documenti.nominaDaRSPP.file.value = url
            break
        case 'nominaDaRLS': state.maestranzaDaCreare.documenti.nominaDaRLS.file.value = url
            break
        case 'nominaDaAddettoPSoccorso': state.maestranzaDaCreare.documenti.nominaDaAddettoPSoccorso.file.value = url
            break
        case 'nominaDaAddettoPrevIncendi': state.maestranzaDaCreare.documenti.nominaDaAddettoPrevIncendi.file.value = url
            break
        case 'corsoPrimoSoccorso': state.maestranzaDaCreare.documenti.corsoPrimoSoccorso.file.value = url
            break
        case 'corsoPrevIncendi': state.maestranzaDaCreare.documenti.corsoPrevIncendi.file.value = url
            break
        case 'corsoPreposto': state.maestranzaDaCreare.documenti.corsoPreposto.file.value = url
            break
        case 'corsoRLS': state.maestranzaDaCreare.documenti.corsoRLS.file.value = url
            break
        case 'corsoRSPP': state.maestranzaDaCreare.documenti.corsoRSPP.file.value = url
            break
    }
}