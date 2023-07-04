//Realizando Requisições HTTP
//cd modulo3
//comando executar teste : K6 run aula2.js

import http from 'k6/http';
import {check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';
import { sleep } from 'k6';

export const options = {
  executor: "shared-iterations",
      vus: 2,
      iterations: 2,
      gracefulStop: "2s",
}

// Métrica do tipo Contador
const chamadas = new Counter('quantidade de chamadas');
// Métrica do tipo Medidor
const myGauge = new Gauge('Tempo bloqueado');
// Métrica do tipo Taxa
const myRate = new Rate('taxa req 200');
// Métrica do tipo Tendência
const myTrend = new Trend('Taxa de espera.');

const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

export default function () {
 const res = http.get('https://test.k6.io/');
 chamadas.add(1);
 myGauge.add(res.timings.blocked);
 myRate.add(res.status === 201);
 myTrend.add(res.timings.waiting);
 sleep(1);

 console.log("Response Body:", res.body); // Mostra o corpo da resposta
 console.log("Response Status Code:", res.status); // Mostra o código de status da resposta

  check(res, {
     'Status code é 200': (r) => r.status === 200
  });
  sleep(1);
}

export function handleSummary(data) {
    return {
      "aula2-load-test-report.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }