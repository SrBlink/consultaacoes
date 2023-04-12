import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const selectorValorAcao =
  "#main-2 > div.container.pb-7 > div.top-info.d-flex.flex-wrap.justify-between.mb-3.mb-md-5 > div.info.special.w-100.w-md-33.w-lg-20 > div > div:nth-child(1) > strong";
const selectorDividendYield =
  "#main-2 > div.container.pb-7 > div.top-info.d-flex.flex-wrap.justify-between.mb-3.mb-md-5 > div:nth-child(4) > div > div:nth-child(1) > strong";
const selectorP_VP =
  "#main-2 > div.container.pb-7 > div:nth-child(5) > div > div:nth-child(2) > div > div:nth-child(1) > strong";

export async function ObterSiteAcoes(sigla: string) {
  var response = await fetch(`https://statusinvest.com.br/fundos-imobiliarios/${sigla}`);

  if (response.ok) {
    const html = await response.text();
    const dom = new JSDOM(html);
    const valor = dom.window.document.querySelector(selectorValorAcao)?.textContent;
    const dividendYield = dom.window.document.querySelector(selectorDividendYield)?.textContent;
    const p_vp = dom.window.document.querySelector(selectorP_VP)?.textContent;

    console.log({ valor, dividendYield, p_vp });

    return { valor, dividendYield, preco_valor_patromonial: p_vp };
  } else {
    console.log("erro na requisicao", response);
    return {};
  }
}
