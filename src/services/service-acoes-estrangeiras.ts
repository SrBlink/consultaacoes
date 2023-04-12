import * as _base from "./base";

export async function ObterAcoesEstrageiras(sigla: string) {
    
    const DOM = await _base.TratarRequisicao(`${_base.ACOES_ESTRANGEIRAS_URL}/${sigla}`);
    
    const acoesEstrangeiras = _base.TratarPapeis(DOM.window.document);
    
    return acoesEstrangeiras;
}