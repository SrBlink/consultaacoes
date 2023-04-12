import * as _types from "../interfaces/interfaces-requests";
import { ObterAcoes as _serviceAcoes } from "../services/service-acoes";
import { ObterAcoesEstrageiras as _serviceAcoesEstrangeiras } from "../services/service-acoes-estrangeiras";
import { ObterBdrs as _serviceBdrs } from "../services/service-bdrs";
import { ObterCotacaoMoeda as _serviceCotacaoMoeda } from "../services/service-cotacao-moeda";
import { ObterFiis as _serviceFundosImobiliarios } from "../services/service-fundos-imobiliarios";

export function TratarRotas(sigla: string, tipoativo: string) {
  if (!sigla) return { Error: "Sigla do ativo não encontrada" };

  console.log("sigla", sigla);

  switch (tipoativo) {
    case _types.fundosimobiliarios:
      return _serviceFundosImobiliarios(sigla);

    case _types.acoes:
      return _serviceAcoes(sigla);

    case _types.acoesestrangeiras:
      return _serviceAcoesEstrangeiras(sigla);

    case _types.bdrs:
      return _serviceBdrs(sigla);

    default:
      return { Error: "Não foi encontrado o tipo de ativo que deseja consultar." };
  }
}
