import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { Counter, Gauge, Rate, Trend } from "k6/metrics";

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 2,
      iterations: 2,
      gracefulStop: "2s",
    },
  },
};

// Métrica do tipo Contador
const chamadas = new Counter("quantidade_de_chamadas");
// Métrica do tipo Medidor
const myGauge = new Gauge("Tempo_bloqueado");
// Métrica do tipo Taxa
const myRate = new Rate("taxa_req_200");
// Métrica do tipo Tendência
const myTrend = new Trend("Taxa_de_espera");

export default function () {
  const payload = JSON.stringify({
    name: "Francisco",
    job: "Software Engineer",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post("https://reqres.in/api/users", payload, params);
  chamadas.add(1);
  myGauge.add(res.timings.blocked);
  myRate.add(res.status === 201);
  myTrend.add(res.timings.waiting);


  console.log("Response Body:", res.body); // Mostra o corpo da resposta
  console.log("Response Status Code:", res.status); // Mostra o código de status da resposta

  check(res, {
    "Status code é 201": (r) => r.status === 201,
  });
}

export function handleSummary(data) {
  return {
    "post-load-test-report.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
