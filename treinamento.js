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

let treinamentos =
carregarDados(
    "treinamentos"
);

function atualizarTreinamentos(
    lista = treinamentos
){

    if(!tabelaTreinamentos) return;

    tabelaTreinamentos.innerHTML = "";

    lista.forEach(

        (item,index) => {

            const linha =
            document.createElement("tr");

            linha.innerHTML = `

                <td>${item.data || "-"}</td>

                <td>${item.colaborador || "-"}</td>

                <td>${item.tipo || "-"}</td>

                <td>${item.instrutor || "-"}</td>

                <td>${item.validade || "-"}</td>

                <td>${item.status || "-"}</td>

                <td>

                    <button
                        type="button"
                        onclick="
                            editarTreinamento(${index})
                        "
                    >
                        ✏️
                    </button>

                    <button
                        type="button"
                        onclick="
                            imprimirTreinamento(${index})
                        "
                    >
                        🖨️
                    </button>

                    <button
                        type="button"
                        onclick="
                            eliminarTreinamento(${index})
                        "
                    >
                        🗑️
                    </button>

                </td>

            `;

            tabelaTreinamentos.appendChild(
                linha
            );

        }

    );
atualizarIndicadoresTreinamentos();
}

let indiceEdicaoTreinamento =
null;
function atualizarIndicadoresTreinamentos(){

    document.getElementById(
        "totalTreinamentos"
    ).textContent =
    treinamentos.length;

    document.getElementById(
        "validosTreinamentos"
    ).textContent =

    treinamentos.filter(
        item =>
        item.status ===
        "Válido"
    ).length;

    document.getElementById(
        "vencidosTreinamentos"
    ).textContent =

    treinamentos.filter(
        item =>
        item.status ===
        "Vencido"
    ).length;    const contadorColaboradores = {};

    treinamentos.forEach(item => {

        contadorColaboradores[
            item.colaborador
        ] =

        (
            contadorColaboradores[
                item.colaborador
            ] || 0
        ) + 1;

    });

    let colaboradorFrequente = "-";

    let maiorColaborador = 0;

    Object.values(
        contadorColaboradores
    ).forEach(valor => {

        if(valor > maiorColaborador){

            maiorColaborador =
            valor;

        }

    });

    const colaboradoresEmpatados =

    Object.keys(
        contadorColaboradores
    ).filter(

        colaborador =>

        contadorColaboradores[
            colaborador
        ] === maiorColaborador

    );

    if(
        colaboradoresEmpatados.length === 1
    ){

        colaboradorFrequente =

        `${colaboradoresEmpatados[0]} (${maiorColaborador})`;

    }
    else if(
        colaboradoresEmpatados.length <= 3
    ){

        colaboradorFrequente =

        `${colaboradoresEmpatados.join(" / ")} (${maiorColaborador})`;

    }
    else{

        colaboradorFrequente =

        `${colaboradoresEmpatados.length} Colaboradores (${maiorColaborador})`;

    }

    document.getElementById(
        "colaboradorFrequenteTreinamento"
    ).textContent =
    colaboradorFrequente;
        const contadorTreinamentos = {};

    treinamentos.forEach(item => {

        contadorTreinamentos[
            item.tipo
        ] =

        (
            contadorTreinamentos[
                item.tipo
            ] || 0
        ) + 1;

    });

    let treinamentoFrequente = "-";

    let maiorTreinamento = 0;

    Object.values(
        contadorTreinamentos
    ).forEach(valor => {

        if(valor > maiorTreinamento){

            maiorTreinamento =
            valor;

        }

    });

    const treinamentosEmpatados =

    Object.keys(
        contadorTreinamentos
    ).filter(

        treinamento =>

        contadorTreinamentos[
            treinamento
        ] === maiorTreinamento

    );

    if(
        treinamentosEmpatados.length === 1
    ){

        treinamentoFrequente =

        `${treinamentosEmpatados[0]} (${maiorTreinamento})`;

    }
    else if(
        treinamentosEmpatados.length <= 3
    ){

        treinamentoFrequente =

        `${treinamentosEmpatados.join(" / ")} (${maiorTreinamento})`;

    }
    else{

        treinamentoFrequente =

        `${treinamentosEmpatados.length} Treinamentos (${maiorTreinamento})`;

    }

    document.getElementById(
        "treinamentoFrequente"
    ).textContent =
    treinamentoFrequente;

}
function atualizarIndicadoresTreinamentosPeriodo(lista){

    document.getElementById(
        "totalTreinamentos"
    ).textContent =
    lista.length;

    document.getElementById(
        "validosTreinamentos"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Válido"
    ).length;

    document.getElementById(
        "vencidosTreinamentos"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Vencido"
    ).length;

    const contadorColaboradores = {};

    lista.forEach(item => {

        contadorColaboradores[
            item.colaborador
        ] =

        (
            contadorColaboradores[
                item.colaborador
            ] || 0
        ) + 1;

    });

    let colaboradorFrequente = "-";

    let maiorColaborador = 0;

    Object.values(
        contadorColaboradores
    ).forEach(valor => {

        if(valor > maiorColaborador){

            maiorColaborador = valor;

        }

    });

    const colaboradoresEmpatados =

    Object.keys(
        contadorColaboradores
    ).filter(

        colaborador =>

        contadorColaboradores[
            colaborador
        ] ===
        maiorColaborador

    );

    if(colaboradoresEmpatados.length === 1){

        colaboradorFrequente =

        `${colaboradoresEmpatados[0]} (${maiorColaborador})`;

    }
    else if(
        colaboradoresEmpatados.length <= 3
    ){

        colaboradorFrequente =

        `${colaboradoresEmpatados.join(" / ")} (${maiorColaborador})`;

    }
    else{

        colaboradorFrequente =

        `${colaboradoresEmpatados.length} Colaboradores (${maiorColaborador})`;

    }

    document.getElementById(
        "colaboradorFrequenteTreinamento"
    ).textContent =
    colaboradorFrequente;

    const contadorTreinamentos = {};

    lista.forEach(item => {

        contadorTreinamentos[
            item.tipo
        ] =

        (
            contadorTreinamentos[
                item.tipo
            ] || 0
        ) + 1;

    });

    let treinamentoFrequente = "-";

    let maiorTreinamento = 0;

    Object.values(
        contadorTreinamentos
    ).forEach(valor => {

        if(valor > maiorTreinamento){

            maiorTreinamento = valor;

        }

    });

    const treinamentosEmpatados =

    Object.keys(
        contadorTreinamentos
    ).filter(

        treinamento =>

        contadorTreinamentos[
            treinamento
        ] ===
        maiorTreinamento

    );

    if(treinamentosEmpatados.length === 1){

        treinamentoFrequente =

        `${treinamentosEmpatados[0]} (${maiorTreinamento})`;

    }
    else if(
        treinamentosEmpatados.length <= 3
    ){

        treinamentoFrequente =

        `${treinamentosEmpatados.join(" / ")} (${maiorTreinamento})`;

    }
    else{

        treinamentoFrequente =

        `${treinamentosEmpatados.length} Treinamentos (${maiorTreinamento})`;

    }

    document.getElementById(
        "treinamentoFrequente"
    ).textContent =
    treinamentoFrequente;

}
function pesquisarColaboradorTreinamento(){

    const termo =

    document.getElementById(
        "pesquisaColaboradorTreinamento"
    )
    .value
    .toLowerCase();

    const select =
    document.getElementById(
        "colaboradorTreinamento"
    );

    const colaboradores =
    carregarDados(
        "colaboradores"
    );

    select.innerHTML = "";

    colaboradores
    .filter(item =>

        item.status === "Ativo"

        &&

        (

            item.nome
            .toLowerCase()
            .includes(termo)

            ||

            item.matricula
            .toLowerCase()
            .includes(termo)

        )

    )

    .forEach(item => {

        const option =
        document.createElement(
            "option"
        );

        option.value =
        item.nome;

        option.textContent =

        `${item.nome} (${item.matricula})`;

        select.appendChild(
            option
        );

    });

}

function filtrarTreinamentos(){

    const inicio =
    document.getElementById(
        "dataInicioTreinamento"
    ).value;

    const fim =
    document.getElementById(
        "dataFimTreinamento"
    ).value;

    let resultados =
    [...treinamentos];

    if(inicio){

        resultados =
        resultados.filter(
            item =>
            item.data >= inicio
        );

    }

    if(fim){

        resultados =
        resultados.filter(
            item =>
            item.data <= fim
        );

    }

    atualizarTreinamentos(
        resultados
    );

    atualizarIndicadoresTreinamentosPeriodo(
        resultados
    );

}
function limparFiltroTreinamentos(){

    document.getElementById(
        "dataInicioTreinamento"
    ).value = "";

    document.getElementById(
        "dataFimTreinamento"
    ).value = "";

    atualizarTreinamentos();

    atualizarIndicadoresTreinamentos();

}
function eliminarTreinamento(index){

    if(
        !confirm(
            "Eliminar treinamento?"
        )
    ) return;

    treinamentos.splice(
        index,
        1
    );

    salvarDados(
        "treinamentos",
        treinamentos
    );

    atualizarTreinamentos();

}
function editarTreinamento(index){

    const item =
    treinamentos[index];

    document.getElementById(
        "dataTreinamento"
    ).value =
    item.data || "";

    document.getElementById(
        "colaboradorTreinamento"
    ).value =
    item.colaborador || "";

    document.getElementById(
        "tipoTreinamento"
    ).value =
    item.tipo || "";

    document.getElementById(
        "instrutorTreinamento"
    ).value =
    item.instrutor || "";

    document.getElementById(
        "validadeTreinamento"
    ).value =
    item.validade || "";

    indiceEdicaoTreinamento =
    index;

}

function carregarColaboradoresAtivos(){

    const select = document.getElementById(
        "colaboradorTreinamento"
    );

    if(!select) return;

    select.innerHTML = "";

    const colaboradores =
    carregarDados(
        "colaboradores"
    );

    colaboradores
    .filter(
        item =>
        item.status === "Ativo"
    )
    .forEach(item => {

        const option =
        document.createElement(
            "option"
        );

        option.value =
        item.nome;

        option.textContent =
        item.nome;

        select.appendChild(
            option
        );

    });

}

if (formTreinamento && tabelaTreinamentos) {

    formTreinamento.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        const data =
        document.getElementById(
            "dataTreinamento"
        ).value;

        const colaborador =
        document.getElementById(
            "colaboradorTreinamento"
        ).value;

        const tipo =
        document.getElementById(
            "tipoTreinamento"
        ).value;

        const instrutor =
        document.getElementById(
            "instrutorTreinamento"
        ).value;

        const validade =
        document.getElementById(
            "validadeTreinamento"
        ).value;

        const hoje =
        new Date()
        .toISOString()
        .split("T")[0];

        const status =

        validade >= hoje

        ? "Válido"

        : "Vencido";

        const novoTreinamento = {

            data,

            colaborador,

            tipo,

            instrutor,

            validade,

            status

        };

        if(
            indiceEdicaoTreinamento !== null
        ){

            treinamentos[
                indiceEdicaoTreinamento
            ] = novoTreinamento;

            indiceEdicaoTreinamento =
            null;

        }
        else{

            treinamentos.push(
                novoTreinamento
            );

        }

        salvarDados(
            "treinamentos",
            treinamentos
        );

        atualizarTreinamentos();

        formTreinamento.reset();

    }

);
}
function imprimirTreinamento(index){

    const item =
    treinamentos[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.text(
        "RELATORIO DE TREINAMENTO",
        20,
        35
    );

    pdf.text(
        `Data: ${item.data}`,
        20,
        55
    );

    pdf.text(
        `Colaborador: ${item.colaborador}`,
        20,
        70
    );

    pdf.text(
        `Treinamento: ${item.tipo}`,
        20,
        85
    );

    pdf.text(
        `Instrutor: ${item.instrutor}`,
        20,
        100
    );

    pdf.text(
        `Validade: ${item.validade}`,
        20,
        115
    );

    pdf.text(
        `Status: ${item.status}`,
        20,
        130
    );

    pdf.save(
        `Treinamento_${item.colaborador}.pdf`
    );

}
carregarColaboradoresAtivos();
atualizarTreinamentos();
