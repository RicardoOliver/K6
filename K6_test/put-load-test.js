import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 1,
      gracefulStop: "2s",
    },
  },
};

export default function () {
  const payload = JSON.stringify({
    name: "fernanda",
    job: "Software Engineer",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.put("https://reqres.in/api/users/2", payload, params);

  console.log("Response Body:", res.body); // Mostra o corpo da resposta
  console.log("Response Status Code:", res.status); // Mostra o código de status da resposta

  const checkOutput = check(res, {
    "Status code é 200": (res) => res.status == 200,
  });
}

export function handleSummary(data) {
  return {
    "put-load-test-report.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
