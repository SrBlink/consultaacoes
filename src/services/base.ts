import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export const ACOES_URL = "https://statusinvest.com.br/acoes";
export const BDRS_URL = "https://statusinvest.com.br/bdrs";
export const FII_URL = "https://statusinvest.com.br/fundos-imobiliarios";
export const ACOES_ESTRANGEIRAS_URL = "https://statusinvest.com.br/acoes/eua";
export const DOLAR_COTACAO_URL = "https://valor.globo.com/valor-data";

// querySelector
const SELECTOR_VALOR_COTACAO = ".info.special strong";

//querySelectorAll[3]
const SELECTOR_DIVIDEND_YIELD = ".info strong";

//Selector FII
const SELECTOR_FII_PRECO_VALOR_PATRIMONIAL =
  "#main-2 > div.container.pb-7 > div:nth-child(5) > div > div:nth-child(2) > div > div:nth-child(1) > strong";

//Nao tem em fundos imobiliarios
const SELECTOR_PRECO_LUCRO =
  "#indicators-section > div.indicator-today-container > div > div:nth-child(1) > div > div:nth-child(2) > div > div > strong";
const SELECTOR_PRECO_VALOR_PATRIMONIAL =
  "#indicators-section > div.indicator-today-container > div > div:nth-child(1) > div > div:nth-child(4) > div > div > strong";
const SELECTOR_RETURN_FOR_EQUITY =
  "#indicators-section > div.indicator-today-container > div > div:nth-child(4) > div > div:nth-child(1) > div > div > strong";
const SELECTOR_MARGEM_LIQUIDA =
  "#indicators-section > div.indicator-today-container > div > div:nth-child(3) > div > div:nth-child(4) > div > div > strong";

//Seletor para cotacao do dolar.
const SELECTOR_COTACAO_DOLAR = ".cell.auto.data-cotacao__ticker_quote";

export function TratarRequisicao(url: string): Promise<JSDOM> {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url);

    try {
      if (response.ok) {
        const html = await response.text();

        if (!AtivoEncontrado(html)) reject({ Error: "Ativo não encontrado" });

        const dom = new JSDOM(html);

        resolve(dom);
      } else {
        reject({ Error: "Ativo não encontrado" });
      }
    } catch (error) {
      reject({ Error: "Ativo não encontrado" });
    }
  });
}

export function TratarPapeis(document: Document) {
  const cota = document.querySelector(SELECTOR_VALOR_COTACAO)?.textContent;
  const dividendYield = document.querySelectorAll(SELECTOR_DIVIDEND_YIELD)[3]?.textContent;
  const precoLucro = document.querySelector(SELECTOR_PRECO_LUCRO)?.textContent;
  const precoValorPatrimonial = document.querySelector(SELECTOR_PRECO_VALOR_PATRIMONIAL)?.textContent;
  const roe = document.querySelector(SELECTOR_RETURN_FOR_EQUITY)?.textContent;
  const margemLiquida = document.querySelector(SELECTOR_MARGEM_LIQUIDA)?.textContent;

  return RetirarCaracteresEspeciais({
    cota,
    dividendYield,
    precoLucro,
    precoValorPatrimonial,
    roe,
    margemLiquida,
  });
}

export function TratarFundosImobiliarios(document: Document) {
  const cota = document.querySelector(SELECTOR_VALOR_COTACAO)?.textContent;
  const dividendYield = document.querySelectorAll(SELECTOR_DIVIDEND_YIELD)[3]?.textContent;
  const preco_valor_patromonial = document.querySelector(SELECTOR_FII_PRECO_VALOR_PATRIMONIAL)?.textContent;

  return RetirarCaracteresEspeciais({
    cota,
    dividendYield,
    preco_valor_patromonial,
  });
}

export function TratarCotacaoMoeda(document: Document) {
  const dolar = document.querySelector(SELECTOR_COTACAO_DOLAR)?.textContent;
  console.log({ dolar });
  return RetirarCaracteresEspeciais({ dolar });
}

function RetirarCaracteresEspeciais(object: any) {
  if (!object) return;

  const regex = /[^\d.,]/g;

  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === "string") {
      object[key] = Number(Number(value?.replace(regex, "").replace(",", ".")).toFixed(2));
    }
  });

  return object;
}

function AtivoEncontrado(html: string) {
  return html.indexOf("Não encontramos o que você está procurando") === -1;
}
