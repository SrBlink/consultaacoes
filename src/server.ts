import fastify from "fastify";
import * as _types from "./interfaces/interfaces-requests";
import { TratarRotas } from "./rotas/rotas";
import { ObterCotacaoMoeda as _serviceCotacaoMoeda } from "./services/service-cotacao-moeda";
const app = fastify();

app.get<{ Params: _types.GetAcoes }>("/b3/:tipoativo/:sigla", async (request, reply) => {
  const { sigla, tipoativo } = request.params;

  try {
    const response = await TratarRotas(sigla, tipoativo);

    if (response?.Error) reply.status(404).send(response.Error);

    reply.status(200).send(response);
  } catch (error) {
    reply.status(404).send(error);
  }
});

app.get("/b3/cotacao-moeda", async (request, reply) => {
  try {
    var response = await _serviceCotacaoMoeda();

    reply.status(200).send(response);
  } catch (error) {
    reply.status(404).send(error);
  }
});

app.listen({ host: "0.0.0.0", port: process.env.PORT ? Number(process.env.PORT) : 3333 }).then(() => {
  console.log("HTTP Server ON!");
});
