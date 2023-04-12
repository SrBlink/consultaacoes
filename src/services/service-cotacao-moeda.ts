import * as _base from "./base";

export async function ObterCotacaoMoeda() {
    
    const DOM = await _base.TratarRequisicao(`${_base.DOLAR_COTACAO_URL}`);
    
    const cotacaoMoeda = _base.TratarCotacaoMoeda(DOM.window.document);
    
    return cotacaoMoeda;
}