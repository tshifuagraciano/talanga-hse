function ativarPesquisa(
    idPesquisa,
    idTabela
){

    const campo =
    document.getElementById(
        idPesquisa
    );

    const tabela =
    document.getElementById(
        idTabela
    );

    if(!campo || !tabela) return;

    campo.addEventListener(
        "input",
        () => {

            const termo =
            campo.value.toLowerCase();

            const linhas =
            tabela.querySelectorAll(
                "tbody tr"
            );

            linhas.forEach(linha => {

                const texto =
                linha.textContent
                .toLowerCase();

                linha.style.display =
                texto.includes(termo)
                ? ""
                : "none";

            });

        }
    );

}
ativarPesquisa(
    "pesquisaOcorrencia",
    "tabelaOcorrencias"
);

ativarPesquisa(
    "pesquisaASO",
    "tabelaASO"
);

ativarPesquisa(
    "pesquisaAmbiente",
    "tabelaAmbiental"
);

ativarPesquisa(
    "pesquisaFauna",
    "tabelaFauna"
);

ativarPesquisa(
    "pesquisaEmergencia",
    "tabelaEmergencias"
);

ativarPesquisa(
    "pesquisaInspecao",
    "tabelaInspecoes"
);

ativarPesquisa(
    "pesquisaColaborador",
    "tabelaColaboradores"
);

ativarPesquisa(
    "pesquisaTreinamento",
    "tabelaTreinamentos"
);

ativarPesquisa(
    "pesquisaUtilizador",
    "tabelaUtilizadores"
);

ativarPesquisa(
    "pesquisaEvidencia",
    "tabelaEvidencias"
);

ativarPesquisa(
    "pesquisaRisco",
    "tabelaRisco"
);
