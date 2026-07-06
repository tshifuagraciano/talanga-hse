

/* ==========================================
   TALANGA HSE v2.0
========================================== */

console.clear();
console.log("Talanga HSE iniciado");

/* ==========================================
   LOCAL STORAGE
========================================== */

function salvarDados(chave, dados) {
    localStorage.setItem(
        chave,
        JSON.stringify(dados)
    );
}

function carregarDados(chave) {

    const dados =
        localStorage.getItem(chave);

    return dados
        ? JSON.parse(dados)
        : [];

}

/* ==========================================
   FUNÇÃO GENÉRICA TABELAS
========================================== */

function adicionarLinha(tabela, conteudo) {

    const linha =
        document.createElement("tr");

    linha.innerHTML =
        conteudo;

    tabela.appendChild(linha);

}

/* ==========================================
   SEGURANÇA
========================================== */

const formSeguranca =
    document.getElementById(
        "formSeguranca"
    );

const tabelaOcorrencias =
    document.querySelector(
        "#tabelaOcorrencias tbody"
    );

let ocorrencias =
    carregarDados(
        "ocorrencias"
    );

function atualizarOcorrencias() {

    if (!tabelaOcorrencias) return;

    tabelaOcorrencias.innerHTML = "";

    ocorrencias.forEach(item => {

        adicionarLinha(

            tabelaOcorrencias,

            `
            <td>${item.titulo}</td>
            <td>${item.severidade}</td>
            <td>${item.area}</td>
            <td>${item.responsavel}</td>
            <td>${item.status}</td>
            `
        );

    });

}

if (formSeguranca) {

    formSeguranca.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const titulo =
                document.getElementById("titulo").value;

            const severidade =
                document.getElementById("severidade").value;

            const area =
                document.getElementById("area").value;

            const responsavel =
                document.getElementById("responsavel").value;

            const status =
                document.getElementById("status").value;

            ocorrencias.push({
                titulo,
                severidade,
                area,
                responsavel,
                status
            });

            salvarDados(
                "ocorrencias",
                ocorrencias
            );

            atualizarOcorrencias();

            formSeguranca.reset();

        }
    );

}

atualizarOcorrencias();

/* ==========================================
   ASO
========================================== */

const formASO =
    document.getElementById("formASO");

const tabelaASO =
    document.querySelector(
        "#tabelaASO tbody"
    );

if (formASO && tabelaASO) {

    formASO.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            adicionarLinha(

                tabelaASO,

                `
                <td>${document.getElementById("nomeColaborador").value}</td>
                <td>${document.getElementById("funcao").value}</td>
                <td>${document.getElementById("tipoASO").value}</td>
                <td>${document.getElementById("validadeASO").value}</td>
                <td>${document.getElementById("statusASO").value}</td>
                `
            );

            formASO.reset();

        }
    );

}

/* ==========================================
   AMBIENTE
========================================== */

const formAmbiente =
    document.getElementById(
        "formAmbiente"
    );

const tabelaAmbiental =
    document.querySelector(
        "#tabelaAmbiental tbody"
    );

if (formAmbiente && tabelaAmbiental) {

    formAmbiente.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            adicionarLinha(

                tabelaAmbiental,

                `
                <td>${document.getElementById("agua").value}</td>
                <td>${document.getElementById("energia").value}</td>
                <td>${document.getElementById("combustivel").value}</td>
                <td>${document.getElementById("co2").value}</td>
                `
            );

            formAmbiente.reset();

        }
    );

}

/* ==========================================
   FAUNA
========================================== */

const formFauna =
    document.getElementById(
        "formFauna"
    );

const tabelaFauna =
    document.querySelector(
        "#tabelaFauna tbody"
    );

if (formFauna && tabelaFauna) {

    formFauna.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            adicionarLinha(

                tabelaFauna,

                `
                <td>${document.getElementById("animal").value}</td>
                <td>${document.getElementById("localAnimal").value}</td>
                `
            );

            formFauna.reset();

        }
    );

}

/* ==========================================
   EMERGÊNCIAS
========================================== */

const formEmergencia =
    document.getElementById(
        "formEmergencia"
    );

const tabelaEmergencias =
    document.querySelector(
        "#tabelaEmergencias tbody"
    );

if (formEmergencia && tabelaEmergencias) {

    formEmergencia.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            adicionarLinha(

                tabelaEmergencias,

                `
                <td>${document.getElementById("tipoEmergencia").value}</td>
                <td>${document.getElementById("localEmergencia").value}</td>
                <td>${document.getElementById("descricaoEmergencia").value}</td>
                `
            );

            formEmergencia.reset();

        }
    );

}

/* ==========================================
   INSPEÇÕES
========================================== */

const formInspecao =
    document.getElementById(
        "formInspecao"
    );

const tabelaInspecoes =
    document.querySelector(
        "#tabelaInspecoes tbody"
    );

if (formInspecao && tabelaInspecoes) {

    formInspecao.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const checks =
                document.querySelectorAll(
                    ".checkItem:checked"
                ).length;

            const total =
                document.querySelectorAll(
                    ".checkItem"
                ).length;

            const score =
                Math.round(
                    (checks / total) * 100
                );

            adicionarLinha(

                tabelaInspecoes,

                `
                <td>${document.getElementById("tipoInspecao").value}</td>
                <td>${document.getElementById("areaInspecao").value}</td>
                <td>${score}%</td>
                `
            );

            formInspecao.reset();

        }
    );

}

/* ==========================================
   COLABORADORES
========================================== */

const formColaborador =
    document.getElementById(
        "formColaborador"
    );

const tabelaColaboradores =
    document.querySelector(
        "#tabelaColaboradores tbody"
    );

if (formColaborador && tabelaColaboradores) {

    formColaborador.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            adicionarLinha(

                tabelaColaboradores,

                `
                <td>${document.getElementById("nomeFuncionario").value}</td>
                <td>${document.getElementById("empresaFuncionario").value}</td>
                <td>${document.getElementById("funcaoFuncionario").value}</td>
                <td>${document.getElementById("supervisorFuncionario").value}</td>
                `
            );

            formColaborador.reset();

        }
    );

}

/* ==========================================
   TREINAMENTOS
========================================== */

const formTreinamento =
    document.getElementById(
        "formTreinamento"
    );

const tabelaTreinamentos =
    document.querySelector(
        "#tabelaTreinamentos tbody"
    );

if (formTreinamento && tabelaTreinamentos) {

    formTreinamento.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const validade =
                new Date(
                    document.getElementById(
                        "validadeTreinamento"
                    ).value
                );

            const hoje =
                new Date();

            const status =
                validade < hoje
                ? "Vencido"
                : "Válido";

            adicionarLinha(

                tabelaTreinamentos,

                `
                <td>${document.getElementById("treinamentoNome").value}</td>
                <td>${document.getElementById("tipoTreinamento").value}</td>
                <td>${document.getElementById("validadeTreinamento").value}</td>
                <td>${status}</td>
                `
            );

            formTreinamento.reset();

        }
    );

}

/* ==========================================
   UTILIZADORES
========================================== */

const formUtilizador =
    document.getElementById(
        "formUtilizador"
    );

const tabelaUtilizadores =
    document.querySelector(
        "#tabelaUtilizadores tbody"
    );

if (formUtilizador && tabelaUtilizadores) {

    formUtilizador.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            adicionarLinha(

                tabelaUtilizadores,

                `
                <td>${document.getElementById("nomeUser").value}</td>
                <td>${document.getElementById("emailUser").value}</td>
                <td>${document.getElementById("perfilUser").value}</td>
                `
            );

            formUtilizador.reset();

        }
    );

}

/* ==========================================
   LOGIN
========================================== */

const formLogin =
    document.getElementById(
        "formLogin"
    );

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const email =
                document.getElementById(
                    "loginEmail"
                ).value;

            alert(
                `Bem-vindo ao Talanga HSE\n\n${email}`
            );

        }
    );

}

/* ==========================================
   EVIDÊNCIAS
========================================== */

const fotoEvidencia =
    document.getElementById(
        "fotoEvidencia"
    );

const previewFoto =
    document.getElementById(
        "previewFoto"
    );

if (fotoEvidencia && previewFoto) {

    fotoEvidencia.addEventListener(
        "change",
        function () {

            const ficheiro =
                this.files[0];

            if (!ficheiro) return;

            const reader =
                new FileReader();

            reader.onload =
                e => {

                    previewFoto.src =
                        e.target.result;

                    previewFoto.style.display =
                        "block";

                };

            reader.readAsDataURL(
                ficheiro
            );

        }
    );

}

/* ==========================================
   MATRIZ DE RISCO
========================================== */

const formRisco =
    document.getElementById(
        "formRisco"
    );

const tabelaRisco =
    document.querySelector(
        "#tabelaRisco tbody"
    );

if (formRisco && tabelaRisco) {

    formRisco.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const perigo =
                document.getElementById(
                    "perigo"
                ).value;

            const probabilidade =
                Number(
                    document.getElementById(
                        "probabilidade"
                    ).value
                );

            const consequencia =
                Number(
                    document.getElementById(
                        "consequencia"
                    ).value
                );

            const score =
                probabilidade *
                consequencia;

            let classificacao =
                "Baixo";

            if (score >= 5)
                classificacao =
                "Moderado";

            if (score >= 10)
                classificacao =
                "Alto";

            if (score >= 17)
                classificacao =
                "Crítico";

            adicionarLinha(

                tabelaRisco,

                `
                <td>${perigo}</td>
                <td>${score}</td>
                <td>${classificacao}</td>
                `
            );

            formRisco.reset();

        }
    );

}

/* ==========================================
   DASHBOARD
========================================== */

if (
    typeof Chart !== "undefined" &&
    document.getElementById(
        "graficoSeguranca"
    )
) {

    new Chart(

        document.getElementById(
            "graficoSeguranca"
        ),

        {

            type: "bar",

            data: {

                labels: [
                    "Condição Insegura",
                    "Quase Acidente",
                    "Acidente"
                ],

                datasets: [
                    {

                        label: "Ocorrências",

                        data: [42, 8, 2],

                        backgroundColor: [
                            "#f59e0b",
                            "#3b82f6",
                            "#dc2626"
                        ]

                    }
                ]

            }

        }

    );

}
