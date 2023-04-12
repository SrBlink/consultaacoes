import * as _base from "./base";

export async function ObterBdrs(sigla: string) {
    
    const DOM = await _base.TratarRequisicao(`${_base.BDRS_URL}/${sigla}`);
    
    const bdrs = _base.TratarPapeis(DOM.window.document);
    
    return bdrs;
}