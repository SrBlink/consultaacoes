import * as _base from "./base";

export async function ObterAcoes(sigla: string) {
    
  const DOM = await _base.TratarRequisicao(`${_base.ACOES_URL}/${sigla}`);

  const acoes = _base.TratarPapeis(DOM?.window?.document);

  return acoes;
}
