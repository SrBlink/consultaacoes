import fastify from "fastify";
import * as _serviceAcoes from "./services";
import * as _types from "./interfaces/interfaces-requests";

const app = fastify();

app.get<{ Params: _types.GetAcoes }>("/sigla-bolsa-valores/:sigla", async (request, reply) => {
  const { sigla } = request.params;

  if (sigla) reply.status(200).send(await _serviceAcoes.ObterSiteAcoes(sigla));

  reply.status(404).send({ error: "Sigla não foi encontrada" });
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("HTTP Server ON!");
  });
