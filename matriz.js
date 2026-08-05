/* ==========================================
   MATRIZ DE RISCO
========================================== */
const tabelaRisco =
document.querySelector(
    "#tabelaRisco tbody"
);

let riscos =
carregarDados(
    "riscos"
);

function atualizarRiscos(){

    if(!tabelaRisco) return;

    tabelaRisco.innerHTML = "";

    riscos.forEach(item => {

        const linha =
        document.createElement("tr");

        linha.innerHTML = `
            <td>${item.perigo}</td>
            <td>${item.score}</td>
            <td class="${item.classe}">
                ${item.classificacao}
            </td>
        `;

        tabelaRisco.appendChild(
            linha
        );

    });

}

const formRisco =
document.getElementById(
    "formRisco"
);

if(formRisco){

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

            let classificacao = "";
            let classe = "";

            if(score <= 5){

                classificacao = "Baixo";
                classe = "risco-baixo";

            }
            else if(score <= 10){

                classificacao = "Moderado";
                classe = "risco-moderado";

            }
            else if(score <= 15){

                classificacao = "Alto";
                classe = "risco-alto";

            }
            else{

                classificacao = "Crítico";
                classe = "risco-critico";

            }

            riscos.push({

                perigo,
                score,
                classificacao,
                classe

            });

            salvarDados(
                "riscos",
                riscos
            );

            atualizarRiscos();

            formRisco.reset();

        }
    );

}

atualizarRiscos();
