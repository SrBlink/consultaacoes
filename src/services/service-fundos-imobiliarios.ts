import * as _base from "./base";

export async function ObterFiis(sigla: string) {
    
    const DOM = await _base.TratarRequisicao(`${_base.FII_URL}/${sigla}`);
    
    const Fiis = _base.TratarFundosImobiliarios(DOM.window.document);
    
    return Fiis;
}