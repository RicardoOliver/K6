This project includes JavaScript code for running API testing with K6.

## How to run the project:

1. Ensure that [node.js](https://nodejs.org/) is installed.
2. Also, ensure that [k6](https://k6.io/docs/get-started/installation/) is installed.
3. Run the test through the terminal with the command `k6 run <file-name>`. For example: `k6 run post-load-test.js`.

## API source:

1. [reqres.in/api/users](https://reqres.in/api/users)
2. [reqres.in/api/users/2](https://reqres.in/api/users/2)

## Report

<p> O k6 é uma ferramenta de teste de carga de código aberto e desenvolvida em Go. Ela permite criar, executar e analisar testes de carga de maneira eficiente e escalável. O k6 é projetado para ser fácil de usar, oferecendo uma sintaxe simples e amigável para escrever scripts de teste. Ele também oferece uma ampla gama de recursos, como suporte a vários protocolos, métricas integradas, execução distribuída e relatórios detalhados.

Aqui está uma descrição do código fornecido:

```javaScript
    import http from "k6/http";: Importa o módulo http do k6 para fazer chamadas HTTP.

    import { check } from "k6";: Importa a função check do k6 para realizar verificações nos resultados das chamadas HTTP.

    import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";: Importa a função htmlReport do pacote k6-reporter para gerar relatórios HTML.

    import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";: Importa a função textSummary do pacote k6-summary para gerar resumos de texto.

    import { Counter, Gauge, Rate, Trend } from 'k6/metrics';: Importa os tipos de métricas do k6, como Counter, Gauge, Rate e Trend, para coletar métricas durante a execução do teste.

    import { sleep } from 'k6';: Importa a função sleep do k6 para adicionar pausas durante a execução do teste.

    export const options = {...}: Define as opções de configuração do teste, incluindo a definição de cenários para execução de iterações compartilhadas.

    const chamadas = new Counter('quantidade de chamadas');: Cria um contador chamado "quantidade de chamadas" para acompanhar o número de chamadas feitas.

    const myGauge = new Gauge('Tempo bloqueado');: Cria um medidor chamado "Tempo bloqueado" para acompanhar o tempo bloqueado.

    const myRate = new Rate('taxa req 200');: Cria uma taxa chamada "taxa req 200" para acompanhar a taxa de respostas com código 200.

    const myTrend = new Trend('Taxa de espera.');: Cria uma tendência chamada "Taxa de espera" para acompanhar a taxa de espera.
```

    
    
    
    
export default function () {...}: Define a função principal do teste.
        Cria um payload em JSON.
        Define os parâmetros para a requisição HTTP.
        Faz uma chamada HTTP POST para "https://reqres.in/api/users".
        Atualiza as métricas com os valores relevantes.
        Adiciona uma pausa de 1 segundo.
        Exibe o corpo da resposta e o código de status no console.
        Realiza uma verificação no código de status da resposta.

export function handleSummary(data) {...}: Define a função de manipulação do resumo do teste.
        Retorna um objeto com o relatório HTML e o resumo em texto.

No geral, o código define um teste de carga usando o k6. Ele
User
continuar
ChatGPT

O código continua definindo a função handleSummary que é responsável por manipular os dados de resumo do teste. Essa função retorna um objeto contendo o relatório HTML gerado pela função htmlReport e o resumo em texto gerado pela função textSummary.

Durante a execução do teste, o código realiza uma chamada HTTP POST para "https://reqres.in/api/users" com um payload em JSON. Em seguida, as métricas são atualizadas com os valores relevantes, como o número de chamadas feitas, o tempo bloqueado, a taxa de respostas com código 200 e a taxa de espera. Uma pausa de 1 segundo é adicionada antes de finalizar a iteração.

O código também exibe o corpo da resposta e o código de status no console. Em seguida, uma verificação é feita no código de status da resposta usando a função check. Se o código de status for igual a 201, a verificação é considerada bem-sucedida.

No final do teste, a função handleSummary é chamada para manipular os dados de resumo e retornar o relatório HTML e o resumo em texto.

Essa implementação utiliza métricas do k6, como contadores, medidores, taxas e tendências, para coletar informações durante a execução do teste. Essas métricas podem ser úteis para análise e monitoramento do desempenho da aplicação em teste. O código também faz uso das funções check, sleep e das importações de módulos para estender a funcionalidade do k6.

Em resumo, o código realiza um teste de carga básico com o k6, fazendo uma chamada HTTP POST e coletando métricas para análise. O resultado do teste é apresentado no console e também é gerado um relatório HTML e um resumo em texto. </p>

