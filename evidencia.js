/* ==========================================
   EVIDÊNCIAS
========================================== */

const formEvidencia =
document.getElementById(
    "formEvidencia"
);

const tabelaEvidencias =
document.querySelector(
    "#tabelaEvidencias tbody"
);

let listaEvidencias =
carregarDados(
    "evidencias"
);

function atualizarEvidencias(){

    if(!tabelaEvidencias) return;

    tabelaEvidencias.innerHTML = "";

    listaEvidencias.forEach(item => {

        const linha =
        document.createElement("tr");

        linha.innerHTML = `
            <td>${item.descricao}</td>
            <td>${item.data}</td>
        `;

        tabelaEvidencias.appendChild(
            linha
        );

    });

}

if(formEvidencia){

    formEvidencia.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const descricao =
            document.getElementById(
                "descricaoEvidencia"
            ).value;

            listaEvidencias.push({

                descricao,

                data:
                new Date()
                .toLocaleDateString()

            });

            salvarDados(
                "evidencias",
                listaEvidencias
            );

            atualizarEvidencias();

            formEvidencia.reset();

        }
    );

}

atualizarEvidencias();