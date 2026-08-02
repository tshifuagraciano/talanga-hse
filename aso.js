/* ==========================================
   ASO
========================================== */

const formASO =
document.getElementById("formASO");

const tabelaASO =
document.querySelector(
    "#tabelaASO tbody"
);

let asos =
carregarDados("asos");

let asosFiltrados =
[...asos];

let indiceEdicaoASO =
null;

function atualizarASO(){

    if(!tabelaASO) return;

    tabelaASO.innerHTML = "";

   asosFiltrados.forEach(
    item => {

        const index =
        asos.findIndex(
            aso =>

            aso.dataRegisto ===
            item.dataRegisto
        );

            const linha =
            document.createElement("tr");

let corStatus = "";

const hoje =
new Date();

const validade =
new Date(
    item.validade
);

const diasRestantes =

Math.ceil(
    (
        validade - hoje
    ) /
    (
        1000 * 60 * 60 * 24
    )
);

if(diasRestantes < 0){

    corStatus = "#dc3545";

}
else if(diasRestantes <= 15){

    corStatus = "#ffc107";

}
else{

    corStatus = "#198754";

}

            linha.innerHTML = `

                <td>${item.colaborador || "-"}</td>

                <td>${item.funcao || "-"}</td>

                <td>${item.dataASO || "-"}</td>

                <td>${item.tipo || "-"}</td>

                <td>${item.validade || "-"}</td>

                <td>${item.resultado || "-"}</td>

                <td>

    <span
        style="
            background:${corStatus};
            color:white;
            padding:4px 8px;
            border-radius:6px;
            font-weight:bold;
        "
    >
        ${item.status || "-"}
    </span>

</td>

                <td>

                    ${
                        item.aptidoes
                        ? item.aptidoes.join(", ")
                        : "-"
                    }

                </td>

                <td>

                    <button
                        onclick="editarASO(${index})"
                    >
                        ✏️
                    </button>

                    <button
                        onclick="imprimirASO(${index})"
                    >
                        🖨️
                    </button>

                    <button
                        onclick="eliminarASO(${index})"
                    >
                        🗑️
                    </button>

                </td>

            `;

            tabelaASO.appendChild(
                linha
            );

        }

    );
atualizarIndicadoresASO();
}
function atualizarIndicadoresASO(){

    document.getElementById(
        "totalASO"
    ).textContent =
    asos.length;

    document.getElementById(
        "validosASO"
    ).textContent =

    asos.filter(
        item =>
        item.status ===
        "Válido"
    ).length;

    document.getElementById(
        "vencidosASO"
    ).textContent =

    asos.filter(
        item =>
        item.status ===
        "Vencido"
    ).length;

    document.getElementById(
        "aptosASO"
    ).textContent =

    asos.filter(
        item =>
        item.resultado ===
        "Apto"
    ).length;

    document.getElementById(
        "restricoesASO"
    ).textContent =

    asos.filter(
        item =>
        item.resultado ===
        "Apto com Restrição"
    ).length;

    document.getElementById(
        "inaptosASO"
    ).textContent =

    asos.filter(
        item =>
        item.resultado ===
        "Inapto"
    ).length;
        
        const contadorTipos = {};

    asos.forEach(item => {

        contadorTipos[item.tipo] =

        (
            contadorTipos[item.tipo]
            || 0
        ) + 1;

    });

    let tipoFrequente = "-";

    let maiorTipo = 0;

    Object.values(
        contadorTipos
    ).forEach(valor => {

        if(valor > maiorTipo){

            maiorTipo = valor;

        }

    });

    const tiposEmpatados =

    Object.keys(
        contadorTipos
    ).filter(

        tipo =>

        contadorTipos[tipo] ===
        maiorTipo

    );

    if(tiposEmpatados.length === 1){

        tipoFrequente =

        `${tiposEmpatados[0]} (${maiorTipo})`;

    }
    else if(tiposEmpatados.length <= 3){

        tipoFrequente =

        `${tiposEmpatados.join(" / ")} (${maiorTipo})`;

    }
    else{

        tipoFrequente =

        `${tiposEmpatados.length} Tipos (${maiorTipo})`;

    }

    document.getElementById(
        "tipoFrequenteASO"
    ).textContent =
    tipoFrequente;
const hoje =
new Date();

const daqui30Dias =
new Date();

daqui30Dias.setDate(
    hoje.getDate() + 30
);

const proximosVencer =

asos.filter(item => {

    if(
        !item.validade
    ) return false;

    const validade =
    new Date(
        item.validade
    );

    return (

        validade >= hoje

        &&

        validade <=
        daqui30Dias

    );

}).length;

document.getElementById(
    "proximosVencerASO"
).textContent =
proximosVencer;
}
function eliminarASO(index){

    if(
        !confirm(
            "Deseja eliminar este ASO?"
        )
    ) return;

    asos.splice(
        index,
        1
    );
salvarDados(
    "asos",
    asos
);

asosFiltrados =
[...asos];

console.log(
    "ASOS:",
    asos
);

console.log(
    "ASOS FILTRADOS:",
    asosFiltrados
);

atualizarASO();

}
function filtrarASO(){

    const dataInicio =
    document.getElementById(
        "filtroDataInicio"
    ).value;

    const dataFim =
    document.getElementById(
        "filtroDataFim"
    ).value;

    asosFiltrados =
    asos.filter(item => {

        if(
            !item.dataRegisto
        ) return false;

        const dataAso =
        item.dataRegisto
        .split("T")[0];

        return (

            (!dataInicio ||
             dataAso >= dataInicio)

            &&

            (!dataFim ||
             dataAso <= dataFim)

        );

    });

    atualizarASO();

}
function limparFiltroASO(){

    document.getElementById(
        "filtroDataInicio"
    ).value = "";

    document.getElementById(
        "filtroDataFim"
    ).value = "";

    asosFiltrados =
    [...asos];

    atualizarASO();

}

    atualizarASO();



function editarASO(index){

    const item =
    asos[index];
console.log(
    "ASO:",
    item.colaborador
);

const select =
document.getElementById(
    "colaboradorASO"
);

console.log(
    "Primeira opção:",
    select.options[0]?.value
);



console.log(item);





  const colaboradorEncontrado =
carregarDados(
    "colaboradores"
).find(
    colaborador =>
    colaborador.nome ===
    item.colaborador
);

document.getElementById(
    "colaboradorASO"
).value =
colaboradorEncontrado
? colaboradorEncontrado.matricula
: "";


    document.getElementById(
        "funcao"
    ).value =
    item.funcao || "";

    document.getElementById(
        "dataASO"
    ).value =
    item.dataASO || "";

    document.getElementById(
        "tipoASO"
    ).value =
    item.tipo || "";

    document.getElementById(
        "validadeASO"
    ).value =
    item.validade || "";

    document.getElementById(
        "resultadoASO"
    ).value =
    item.resultado || "";

    document
    .querySelectorAll(
        ".aptidao"
    )
    .forEach(cb => {

        cb.checked =
        item.aptidoes &&
        item.aptidoes.includes(
            cb.value
        );

    });

    indiceEdicaoASO =
    index;
atualizarFuncaoASO();
}
function imprimirASO(index){

    const item =
    asos[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "RELATORIO ASO",
        20,
        35
    );

    pdf.line(
        20,
        40,
        190,
        40
    );

    pdf.setFontSize(11);

    pdf.text(
    `Colaborador: ${
        item.colaborador || "-"
    }`,
    20,
    55
);

pdf.text(
    `Funcao: ${
        item.funcao || "-"
    }`,
    20,
    70
);

pdf.text(
    `Data Exame: ${
        item.dataASO || "-"
    }`,
    20,
    85
);

    pdf.text(
        `Tipo de ASO: ${item.tipo}`,
        20,
        100
    );

    pdf.text(
        `Validade: ${item.validade}`,
        20,
        115
    );

    if(
    item.status === "Apto"
){

    pdf.setTextColor(
        0,
        128,
        0
    );

}
else if(
    item.status === "Inapto"
){

    pdf.setTextColor(
        255,
        0,
        0
    );

}
else{

    pdf.setTextColor(
        255,
        140,
        0
    );

}

pdf.text(
    `Status: ${item.status}`,
    20,
    130
);

pdf.setTextColor(
    0,
    0,
    0
);
let corFundo = [0,128,0];
let textoSelo = "APTO";

if(item.status === "Inapto"){

    corFundo = [255,0,0];
    textoSelo = "INAPTO";

}
else if(
    item.status ===
    "Apto com Restricoes"
){

    corFundo =
    [255,140,0];

    textoSelo =
    "RESTRICOES";

}

pdf.setFillColor(
    ...corFundo
);

pdf.roundedRect(
    120,
    120,
    50,
    14,
    2,
    2,
    "F"
);

pdf.setTextColor(
    255,
    255,
    255
);

pdf.text(
    textoSelo,
    132,
    129
);

pdf.setTextColor(
    0,
    0,
    0
);

    pdf.text(
        "Aptidoes:",
        20,
        150
    );

    const textoAptidoes =
    item.aptidoes &&
    item.aptidoes.length > 0

    ? item.aptidoes.join(", ")

    : "Nenhuma";

    pdf.text(
        textoAptidoes,
        20,
        165,
        {
            maxWidth: 170
        }
    );

    pdf.save(
        `ASO_${item.nome}.pdf`
    );

}
function carregarColaboradoresAtivosASO(){

    const select =
    document.getElementById(
        "colaboradorASO"
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
item.matricula;

        option.textContent =
        `${item.nome} (${item.matricula})`;

        select.appendChild(
            option
        );

    });

}

function atualizarFuncaoASO(){

    const matriculaSelecionada =

    document.getElementById(
        "colaboradorASO"
    ).value;

    const colaboradores =
    carregarDados(
        "colaboradores"
    );

    const colaborador =
    colaboradores.find(
        item =>
        item.matricula ==
        matriculaSelecionada
    );

    console.log(
        "Encontrado:",
        colaborador
    );

    const campoFuncao =
    document.getElementById(
        "funcao"
    );

    if(
        campoFuncao &&
        colaborador
    ){

        campoFuncao.value =
        colaborador.funcao;

    }

}
if (
    formASO &&
    tabelaASO
){

    formASO.addEventListener(
        "submit",
        e => {

            e.preventDefault();

     const matricula =
document.getElementById(
    "colaboradorASO"
).value;

const colaboradorSelecionado =

carregarDados(
    "colaboradores"
).find(
    item =>
    item.matricula ===
    matricula
);
const colaborador =
colaboradorSelecionado
? colaboradorSelecionado.nome
: "";
const funcao =
document.getElementById(
    "funcao"
).value;

const dataASO =
document.getElementById(
    "dataASO"
).value;

const tipo =
document.getElementById(
    "tipoASO"
).value;

const validade =
document.getElementById(
    "validadeASO"
).value;

const resultado =
document.getElementById(
    "resultadoASO"
).value;

            const hoje =
new Date()
.toISOString()
.split("T")[0];

const status =

validade >= hoje

? "Válido"

: "Vencido";
            const aptidoes =

            Array.from(

                document.querySelectorAll(
                    ".aptidao:checked"
                )

            ).map(

                item => item.value

            );
console.log({
    colaborador,
    funcao,
    dataASO,
    tipo,
    validade,
    resultado,
    status,
    aptidoes
});
           const novoASO = {

    colaborador,

    funcao,

    dataASO,

    tipo,

    validade,

    resultado,

    status,

    aptidoes,

    dataRegisto:

    indiceEdicaoASO !== null

    ? asos[
        indiceEdicaoASO
      ].dataRegisto

    : new Date().toISOString()

};            if(
                indiceEdicaoASO !== null
            ){

                asos[
                    indiceEdicaoASO
                ] = novoASO;

                indiceEdicaoASO =
                null;

            }
            else{

                asos.push(
                    novoASO
                );

            }
            asosFiltrados =
[...asos];

            salvarDados(
                "asos",
                asos
            );

            atualizarASO();

            formASO.reset();

        }
    );

}

document.getElementById(
    "pesquisaColaboradorASO"
).addEventListener(

    "keydown",

    function(e){

        if(
            e.key === "Enter"
        ){

            e.preventDefault();

            pesquisarColaboradorASO();

        }

    }

);

carregarColaboradoresAtivosASO();
atualizarASO();

/* ==========================================
   ATENDIMENTO AMBULATORIAL
========================================== */

const formAmbulatorio =
document.getElementById(
    "formAmbulatorio"
);

const tabelaAmbulatorio =
document.querySelector(
    "#tabelaAmbulatorio tbody"
);



const doencasAmbulatorio = [

    "Gripe e Resfriado Comum",
    "Pneumonia",
    "Tuberculose",
    "HIV/AIDS",
    "Malária",
    "Infecção Urinária",
    "Gastroenterite",
    "Hipertensão Arterial",
    "Infarto do Miocárdio",
    "Arritmias Cardíacas",
    "Insuficiência Cardíaca",
    "Diabetes Mellitus",
    "Hipotireoidismo",
    "Hipertireoidismo",
    "Obesidade",
    "Asma",
    "Bronquite Crônica",
    "DPOC",
    "Rinite",
    "Sinusite",
    "Gastrite",
    "Refluxo Gastroesofágico",
    "Doença Hepática",
    "Colite",
    "Enxaqueca",
    "AVC",
    "Epilepsia",
    "Doença de Parkinson",
    "Artrite",
    "Osteoartrite",
    "Lombalgia",
    "Fibromialgia",
    "Dermatite",
    "Psoríase",
    "Infecção Fúngica da Pele",
    "Depressão",
    "Ansiedade",
    "Transtorno Bipolar",
    "Esquizofrenia",
    "Conjuntivite",
    "Irritação Ocular",
    "Corpo Estranho no Olho",
    "Olho Seco",
    "Alteração Visual",
    "Otite",
    "Perda Auditiva",
    "Zumbido",
    "Faringite",
    "Amigdalite",
    "Ferimento",
    "Queimadura",
    "Entorse",
    "Fratura"

];
function carregarDoencasAmbulatorio(){

    const select =
    document.getElementById(
        "doencaAmbulatorio"
    );

    if(!select) return;

    select.innerHTML = "";

    doencasAmbulatorio.forEach(
        doenca => {

            const option =
            document.createElement(
                "option"
            );

            option.value =
            doenca;

            option.textContent =
            doenca;

            select.appendChild(
                option
            );

        }

    );

}
carregarDoencasAmbulatorio();
function carregarColaboradoresAmbulatorio(){

    const select =
    document.getElementById(
        "colaboradorAmbulatorio"
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
        item.status ===
        "Ativo"
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

    atualizarDadosAmbulatorio();

}
function atualizarDadosAmbulatorio(){

    const colaboradorSelecionado =

    document.getElementById(
        "colaboradorAmbulatorio"
    ).value;

    const colaboradores =
    carregarDados(
        "colaboradores"
    );

    const colaborador =

    colaboradores.find(
        item =>
        item.nome ===
        colaboradorSelecionado
    );

    document.getElementById(
        "funcaoAmbulatorio"
    ).value =

    colaborador
    ? colaborador.funcao
    : "";

    document.getElementById(
        "empresaAmbulatorio"
    ).value =

    colaborador
    ? colaborador.empresa
    : "";

}
function pesquisarColaboradorAmbulatorio(){

    const termo =

    document.getElementById(
        "pesquisaColaboradorAmbulatorio"
    )
    .value
    .toLowerCase();

    const select =
    document.getElementById(
        "colaboradorAmbulatorio"
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

    if(select.options.length > 0){

        select.selectedIndex = 0;

        atualizarDadosAmbulatorio();

    }

}
function pesquisarDoencaAmbulatorio(){

    const termo =

    document.getElementById(
        "pesquisaDoencaAmbulatorio"
    )
    .value
    .toLowerCase();

    const select =
    document.getElementById(
        "doencaAmbulatorio"
    );

    select.innerHTML = "";

    doencasAmbulatorio
    .filter(

        doenca =>

        doenca
        .toLowerCase()
        .includes(termo)

    )

    .forEach(doenca => {

        const option =
        document.createElement(
            "option"
        );

        option.value =
        doenca;

        option.textContent =
        doenca;

        select.appendChild(
            option
        );

    });

}

let atendimentosAmbulatorio =
carregarDados(
    "atendimentosAmbulatorio"
);
let atendimentosAmbulatorioFiltrados =
[...atendimentosAmbulatorio];

let indiceEdicaoAmbulatorio =
null;
if(
    formAmbulatorio &&
    tabelaAmbulatorio
){

    formAmbulatorio.addEventListener(

        "submit",

        e => {

            e.preventDefault();

            const novoAtendimento = {

                data:
                document.getElementById(
                    "dataAmbulatorio"
                ).value,

                colaborador:
                document.getElementById(
                    "colaboradorAmbulatorio"
                ).value,

                funcao:
                document.getElementById(
                    "funcaoAmbulatorio"
                ).value,

                empresa:
                document.getElementById(
                    "empresaAmbulatorio"
                ).value,

                doenca:
                document.getElementById(
                    "doencaAmbulatorio"
                ).value

            };
if(
    indiceEdicaoAmbulatorio !== null
)  {

    atendimentosAmbulatorio[
        indiceEdicaoAmbulatorio
    ] = novoAtendimento;

    indiceEdicaoAmbulatorio =
    null;

}
else{

    atendimentosAmbulatorio.push(
        novoAtendimento
    );




            }

            salvarDados(
                "atendimentosAmbulatorio",
                atendimentosAmbulatorio
            );
atendimentosAmbulatorioFiltrados =
[...atendimentosAmbulatorio];
            atualizarAmbulatorio();

            formAmbulatorio.reset();

        }

    );

}
function atualizarAmbulatorio(){

    if(
        !tabelaAmbulatorio
    ) return;

    tabelaAmbulatorio.innerHTML =
    "";

    atendimentosAmbulatorioFiltrados.forEach(

        (item,index) => {

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `

                <td>${item.data}</td>

                <td>${item.colaborador}</td>

                <td>${item.funcao}</td>

                <td>${item.empresa}</td>

                <td>${item.doenca}</td>

               <td>

    <button
        onclick="
        editarAmbulatorio(${index})
        "
    >
        ✏️
    </button>

    <button
        onclick="
        imprimirAmbulatorio(${index})
        "
    >
        🖨️
    </button>

    <button
        onclick="
        eliminarAmbulatorio(${index})
        "
    >
        🗑️
    </button>

</td>
            `;

            tabelaAmbulatorio.appendChild(
                linha
            );

        }

    );
atualizarIndicadoresAmbulatorio();
}

function filtrarAmbulatorio(){

    const dataInicio =
    document.getElementById(
        "filtroDataInicioAmbulatorio"
    ).value;

    const dataFim =
    document.getElementById(
        "filtroDataFimAmbulatorio"
    ).value;

    atendimentosAmbulatorioFiltrados =

    atendimentosAmbulatorio.filter(
        item => {

            return (

                (!dataInicio ||

                 item.data >= dataInicio)

                &&

                (!dataFim ||

                 item.data <= dataFim)

            );

        }
    );

    atualizarAmbulatorio();

}

function limparFiltroAmbulatorio(){

    document.getElementById(
        "filtroDataInicioAmbulatorio"
    ).value = "";

    document.getElementById(
        "filtroDataFimAmbulatorio"
    ).value = "";

    atendimentosAmbulatorioFiltrados =
    [...atendimentosAmbulatorio];

    atualizarAmbulatorio();

}


atualizarAmbulatorio();
function editarAmbulatorio(index){

    const item =
    atendimentosAmbulatorioFiltrados[index];

    document.getElementById(
        "dataAmbulatorio"
    ).value =
    item.data;

    document.getElementById(
        "colaboradorAmbulatorio"
    ).value =
    item.colaborador;

    document.getElementById(
        "funcaoAmbulatorio"
    ).value =
    item.funcao;

    document.getElementById(
        "empresaAmbulatorio"
    ).value =
    item.empresa;

    document.getElementById(
        "doencaAmbulatorio"
    ).value =
    item.doenca;

    indiceEdicaoAmbulatorio =
    index;

}
function imprimirAmbulatorio(index){

    const item =
    atendimentosAmbulatorioFiltrados[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "ATENDIMENTO AMBULATORIAL",
        20,
        35
    );

    pdf.line(
        20,
        40,
        190,
        40
    );

    pdf.setFontSize(11);

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
        `Funcao: ${item.funcao}`,
        20,
        85
    );

    pdf.text(
        `Empresa: ${item.empresa}`,
        20,
        100
    );

    pdf.text(
        `Doenca: ${item.doenca}`,
        20,
        115
    );

    pdf.save(
        `Atendimento_${item.colaborador}.pdf`
    );

}
function eliminarAmbulatorio(index){

    if(
        !confirm(
            "Eliminar atendimento?"
        )
    ) return;

    atendimentosAmbulatorio.splice(
        index,
        1
    );

    salvarDados(
        "atendimentosAmbulatorio",
        atendimentosAmbulatorio
    );

    atendimentosAmbulatorioFiltrados =
    [...atendimentosAmbulatorio];

    atualizarAmbulatorio();

}
function pesquisarAmbulatorio(){

    const termo =

    document.getElementById(
        "pesquisaAmbulatorio"
    )
    .value
    .toLowerCase();

    atendimentosAmbulatorioFiltrados =

    atendimentosAmbulatorio.filter(
        item =>

            (item.colaborador || "")
            .toLowerCase()
            .includes(termo)

            ||

            (item.empresa || "")
            .toLowerCase()
            .includes(termo)

            ||

            (item.doenca || "")
            .toLowerCase()
            .includes(termo)

            ||

            (item.funcao || "")
            .toLowerCase()
            .includes(termo)

    );

    atualizarAmbulatorio();

}
function atualizarIndicadoresAmbulatorio(){

    document.getElementById(
        "totalAmbulatorio"
    ).textContent =
   atendimentosAmbulatorioFiltrados.length

    document.getElementById(
        "casosMalaria"
    ).textContent =

    atendimentosAmbulatorioFiltrados.filter(
        item =>
        item.doenca ===
        "Malária"
    ).length;

    const contadorDoencas = {};

    atendimentosAmbulatorioFiltrados.forEach(
        item => {

            contadorDoencas[
                item.doenca
            ] =

            (
                contadorDoencas[
                    item.doenca
                ] || 0
            ) + 1;

        }
    );

    let doencaFrequente = "-";

    let maiorDoenca = 0;

    Object.values(
        contadorDoencas
    ).forEach(valor => {

        if(valor > maiorDoenca){

            maiorDoenca = valor;

        }

    });

    const doencasEmpatadas =

    Object.keys(
        contadorDoencas
    ).filter(

        doenca =>

        contadorDoencas[
            doenca
        ] ===
        maiorDoenca

    );

    if(
    doencasEmpatadas.length === 1
){

    doencaFrequente =

    `${doencasEmpatadas[0]} (${maiorDoenca})`;

}
else if(
    doencasEmpatadas.length <= 3
){

    doencaFrequente =

    `${doencasEmpatadas.join(" / ")} (${maiorDoenca})`;

}
else{

    doencaFrequente =

    `${doencasEmpatadas.length} Doenças (${maiorDoenca})`;

}
    document.getElementById(
        "doencaFrequenteAmbulatorio"
    ).textContent =
    doencaFrequente;

    const contadorColaboradores = {};

atendimentosAmbulatorio.forEach(
    item => {

        contadorColaboradores[
            item.colaborador
        ] =

        (
            contadorColaboradores[
                item.colaborador
            ] || 0
        ) + 1;

    }
);

const hoje = new Date();

const mesAtual =
hoje.getMonth();

const anoAtual =
hoje.getFullYear();

const atendimentosMes =

atendimentosAmbulatorio.filter(
    item => {

        if(!item.data)
        return false;

        const data =
        new Date(
            item.data
        );

        return (

            data.getMonth()
            === mesAtual

            &&

            data.getFullYear()
            === anoAtual

        );

    }
).length;

document.getElementById(
    "atendimentosMes"
).textContent =
atendimentosMes;


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
    "colaboradorFrequenteAmbulatorio"
).textContent =
colaboradorFrequente;

    const contadorEmpresas = {};

    atendimentosAmbulatorio.forEach(
        item => {

            contadorEmpresas[
                item.empresa
            ] =

            (
                contadorEmpresas[
                    item.empresa
                ] || 0
            ) + 1;

        }
    );

    let empresaFrequente = "-";

    let maiorEmpresa = 0;

    Object.values(
        contadorEmpresas
    ).forEach(valor => {

        if(valor > maiorEmpresa){

            maiorEmpresa = valor;

        }

    });

    const empresasEmpatadas =

    Object.keys(
        contadorEmpresas
    ).filter(

        empresa =>

        contadorEmpresas[
            empresa
        ] ===
        maiorEmpresa

    );

   if(
    empresasEmpatadas.length === 1
){

    empresaFrequente =

    `${empresasEmpatadas[0]} (${maiorEmpresa})`;

}
else if(
    empresasEmpatadas.length <= 3
){

    empresaFrequente =

    `${empresasEmpatadas.join(" / ")} (${maiorEmpresa})`;

}
else{

    empresaFrequente =

    `${empresasEmpatadas.length} Empresas (${maiorEmpresa})`;

}

    document.getElementById(
        "empresaFrequenteAmbulatorio"
    ).textContent =
    empresaFrequente;

}

carregarDoencasAmbulatorio();

carregarColaboradoresAmbulatorio();

atualizarAmbulatorio();
/* ==========================================
   CONTROLE DE VALIDADE DE MEDICAMENTOS
========================================== */

const formMedicamento =
document.getElementById(
    "formMedicamento"
);

const tabelaMedicamentos =
document.querySelector(
    "#tabelaMedicamentos tbody"
);

let medicamentos =
carregarDados(
    "medicamentos"
);

let medicamentosFiltrados =
[...medicamentos];

let indiceEdicaoMedicamento =
null;
function atualizarMedicamentos(){

    if(
        !tabelaMedicamentos
    ) return;

    tabelaMedicamentos.innerHTML =
    "";

    medicamentosFiltrados.forEach(

        (item,index) => {

            let status = "";

            const hoje =
            new Date();

            const validade =
            new Date(
                item.validade
            );

            const diasRestantes =

            Math.ceil(

                (
                    validade - hoje
                )

                /

                (
                    1000 * 60 * 60 * 24
                )

            );

            if(
                diasRestantes < 0
            ){

                status =
                "🔴 Vencido";

            }
            else if(
                diasRestantes <= 90
            ){

                status =
                "🟡 A Vencer";

            }
            else{

                status =
                "🟢 Em Validade";

            }

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `

                <td>${item.nome}</td>

                <td>${item.lote}</td>

                <td>${item.quantidade}</td>

                <td>${item.validade}</td>

                <td>${status}</td>

                <td>${item.local}</td>

                <td>

    <button
        onclick="
        editarMedicamento(${index})
        "
    >
        ✏️
    </button>

    <button
        onclick="
        imprimirMedicamento(${index})
        "
    >
        🖨️
    </button>

    <button
        onclick="
        eliminarMedicamento(${index})
        "
    >
        🗑️
    </button>

</td>
            `;

            tabelaMedicamentos.appendChild(
                linha
            );

        }

    );

    atualizarIndicadoresMedicamentos();

}
if(
    formMedicamento &&
    tabelaMedicamentos
){

    formMedicamento.addEventListener(

        "submit",

        e => {

            e.preventDefault();

            const novoMedicamento = {

                nome:
                document.getElementById(
                    "nomeMedicamento"
                ).value,

                fabricante:
                document.getElementById(
                    "fabricanteMedicamento"
                ).value,

                lote:
                document.getElementById(
                    "loteMedicamento"
                ).value,

                quantidade:
                document.getElementById(
                    "quantidadeMedicamento"
                ).value,

                fabricacao:
                document.getElementById(
                    "fabricacaoMedicamento"
                ).value,

                validade:
                document.getElementById(
                    "validadeMedicamento"
                ).value,

                local:
                document.getElementById(
                    "localMedicamento"
                ).value

            };

            if(
                indiceEdicaoMedicamento !== null
            ){

                medicamentos[
                    indiceEdicaoMedicamento
                ] = novoMedicamento;

                indiceEdicaoMedicamento =
                null;

            }
            else{

                medicamentos.push(
                    novoMedicamento
                );

            }

            salvarDados(
                "medicamentos",
                medicamentos
            );

            medicamentosFiltrados =
            [...medicamentos];

            atualizarMedicamentos();

            formMedicamento.reset();

        }

    );
atualizarMedicamentos();
atualizarIndicadoresMedicamentos();
}
function imprimirMedicamento(index){

    const item =
    medicamentosFiltrados[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "CONTROLE DE VALIDADE DE MEDICAMENTOS",
        20,
        35
    );

    pdf.line(
        20,
        40,
        190,
        40
    );

    pdf.setFontSize(11);

    pdf.text(
        `Medicamento: ${item.nome}`,
        20,
        55
    );

    pdf.text(
        `Fabricante: ${item.fabricante}`,
        20,
        70
    );

    pdf.text(
        `Lote: ${item.lote}`,
        20,
        85
    );

    pdf.text(
        `Quantidade: ${item.quantidade}`,
        20,
        100
    );

    pdf.text(
        `Fabricacao: ${item.fabricacao}`,
        20,
        115
    );

    pdf.text(
        `Validade: ${item.validade}`,
        20,
        130
    );

    pdf.text(
        `Local: ${item.local}`,
        20,
        145
    );

    const hoje =
    new Date();

    const validade =
    new Date(
        item.validade
    );

    const dias =

    Math.ceil(
        (
            validade - hoje
        ) /
        (
            1000 * 60 * 60 * 24
        )
    );

    let status = "";

    if(dias < 0){

        status =
        "Vencido";

    }
    else if(dias <= 90){

        status =
        "A Vencer";

    }
    else{

        status =
        "Em Validade";

    }

    pdf.text(
        `Status: ${status}`,
        20,
        160
    );

    pdf.save(
        `Medicamento_${item.nome}.pdf`
    );

}
function editarMedicamento(index){

    const item =
    medicamentosFiltrados[index];

    document.getElementById(
        "nomeMedicamento"
    ).value =
    item.nome;

    document.getElementById(
        "fabricanteMedicamento"
    ).value =
    item.fabricante;

    document.getElementById(
        "loteMedicamento"
    ).value =
    item.lote;

    document.getElementById(
        "quantidadeMedicamento"
    ).value =
    item.quantidade;

    document.getElementById(
        "fabricacaoMedicamento"
    ).value =
    item.fabricacao;

    document.getElementById(
        "validadeMedicamento"
    ).value =
    item.validade;

    document.getElementById(
        "localMedicamento"
    ).value =
    item.local;

    indiceEdicaoMedicamento =
    index;

}
function eliminarMedicamento(index){

    if(
        !confirm(
            "Eliminar medicamento?"
        )
    ) return;

    medicamentos.splice(
        index,
        1
    );

    salvarDados(
        "medicamentos",
        medicamentos
    );

    medicamentosFiltrados =
    [...medicamentos];

    atualizarMedicamentos();

}
function atualizarIndicadoresMedicamentos(){

    document.getElementById(
        "totalMedicamentos"
    ).textContent =
    medicamentosFiltrados.length;

    const hoje =
    new Date();

    let validos = 0;
    let aVencer = 0;
    let vencidos = 0;

    medicamentosFiltrados.forEach(
        item => {

            const validade =
            new Date(item.validade);

            const dias =

            Math.ceil(
                (
                    validade - hoje
                )
                /
                (
                    1000 * 60 * 60 * 24
                )
            );

            if(dias < 0){

                vencidos++;

            }
            else if(dias <= 90){

                aVencer++;

            }
            else{

                validos++;

            }

        }
    );

    document.getElementById(
        "medicamentosValidos"
    ).textContent =
    validos;

    document.getElementById(
        "medicamentosAVencer"
    ).textContent =
    aVencer;

    document.getElementById(
        "medicamentosVencidos"
    ).textContent =
    vencidos;

    /* ESTOQUE TOTAL */

    document.getElementById(
        "estoqueTotal"
    ).textContent =

    medicamentosFiltrados.reduce(

        (total,item) =>

        total +

        Number(
            item.quantidade || 0
        ),

        0

    );

    /* MEDICAMENTO FREQUENTE */

    const contadorMedicamentos = {};

    medicamentosFiltrados.forEach(
        item => {

            contadorMedicamentos[
                item.nome
            ] =

            (
                contadorMedicamentos[
                    item.nome
                ] || 0
            ) + 1;

        }
    );

    let medicamentoFrequente = "-";

    let maiorMedicamento = 0;

    Object.values(
        contadorMedicamentos
    ).forEach(valor => {

        if(valor > maiorMedicamento){

            maiorMedicamento = valor;

        }

    });

    const medicamentosEmpatados =

    Object.keys(
        contadorMedicamentos
    ).filter(

        medicamento =>

        contadorMedicamentos[
            medicamento
        ] === maiorMedicamento

    );

    if(
        medicamentosEmpatados.length === 1
    ){

        medicamentoFrequente =

        `${medicamentosEmpatados[0]} (${maiorMedicamento})`;

    }

    document.getElementById(
        "medicamentoFrequente"
    ).textContent =
    medicamentoFrequente;

    /* FABRICANTE FREQUENTE */

    const contadorFabricantes = {};

    medicamentosFiltrados.forEach(
        item => {

            contadorFabricantes[
                item.fabricante
            ] =

            (
                contadorFabricantes[
                    item.fabricante
                ] || 0
            ) + 1;

        }
    );

    let fabricanteFrequente = "-";

    let maiorFabricante = 0;

    Object.values(
        contadorFabricantes
    ).forEach(valor => {

        if(valor > maiorFabricante){

            maiorFabricante = valor;

        }

    });

    const fabricantesEmpatados =

    Object.keys(
        contadorFabricantes
    ).filter(

        fabricante =>

        contadorFabricantes[
            fabricante
        ] === maiorFabricante

    );

    if(
        fabricantesEmpatados.length === 1
    ){

        fabricanteFrequente =

        `${fabricantesEmpatados[0]} (${maiorFabricante})`;

    }

    document.getElementById(
        "fabricanteFrequente"
    ).textContent =
    fabricanteFrequente;

    /* PRÓXIMO A VENCER */

    const medicamentosValidos =

    medicamentosFiltrados.filter(
        item =>

        new Date(
            item.validade
        ) >= hoje

    );

    medicamentosValidos.sort(
        (a,b) =>

        new Date(a.validade) -

        new Date(b.validade)

    );

    let proximoVencer = "-";

    if(
        medicamentosValidos.length > 0
    ){

        const medicamento =
        medicamentosValidos[0];

        const dias =

        Math.ceil(

            (
                new Date(
                    medicamento.validade
                ) - hoje
            )

            /

            (
                1000 * 60 * 60 * 24
            )

        );

        proximoVencer =

        `${medicamento.nome} (${dias} dias)`;

    }

 const estoqueBaixo =

medicamentosFiltrados.filter(
    item =>

    Number(
        item.quantidade
    ) <= 10

).length;

document.getElementById(
    "estoqueBaixo"
).textContent =
estoqueBaixo;

    document.getElementById(
        "proximoMedicamentoVencer"
    ).textContent =
    proximoVencer;
const contadorLocais = {};

medicamentosFiltrados.forEach(
    item => {

        contadorLocais[
            item.local
        ] =

        (
            contadorLocais[
                item.local
            ] || 0
        ) + 1;

    }
);

let localFrequente = "-";

let maiorLocal = 0;

Object.values(
    contadorLocais
).forEach(valor => {

    if(valor > maiorLocal){

        maiorLocal = valor;

    }

});

const locaisEmpatados =

Object.keys(
    contadorLocais
).filter(

    local =>

    contadorLocais[
        local
    ] ===
    maiorLocal

);

if(
    locaisEmpatados.length === 1
){

    localFrequente =

    `${locaisEmpatados[0]} (${maiorLocal})`;

}
else if(
    locaisEmpatados.length <= 3
){

    localFrequente =

    `${locaisEmpatados.join(" / ")} (${maiorLocal})`;

}
else{

    localFrequente =

    `${locaisEmpatados.length} Locais (${maiorLocal})`;

}

document.getElementById(
    "localFrequenteMedicamento"
).textContent =
localFrequente;
}
function pesquisarMedicamento(){

    const termo =

    document.getElementById(
        "pesquisaMedicamento"
    )
    .value
    .toLowerCase();

    medicamentosFiltrados =

    medicamentos.filter(
        item =>

            (item.nome || "")
            .toLowerCase()
            .includes(termo)

            ||

            (item.fabricante || "")
            .toLowerCase()
            .includes(termo)

            ||

            (item.lote || "")
            .toLowerCase()
            .includes(termo)

            ||

            (item.local || "")
            .toLowerCase()
            .includes(termo)

    );
  

    atualizarMedicamentos();

}
function filtrarMedicamentos(){

    const dataInicio =
    document.getElementById(
        "filtroValidadeInicioMedicamento"
    ).value;

    const dataFim =
    document.getElementById(
        "filtroValidadeFimMedicamento"
    ).value;

    medicamentosFiltrados =

    medicamentos.filter(
        item =>

            (!dataInicio ||
             item.validade >= dataInicio)

            &&

            (!dataFim ||
             item.validade <= dataFim)

    );

    atualizarMedicamentos();

}
function limparFiltroMedicamentos(){

    document.getElementById(
        "filtroValidadeInicioMedicamento"
    ).value = "";

    document.getElementById(
        "filtroValidadeFimMedicamento"
    ).value = "";

    medicamentosFiltrados =
    [...medicamentos];

    atualizarMedicamentos();

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

let emergencias =
carregarDados(
    "emergencias"
);

let indiceEdicaoEmergencia =
null;

if (formEmergencia && tabelaEmergencias) {    formEmergencia.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        const novaEmergencia = {

    data:
    document.getElementById(
        "dataEmergencia"
    ).value,

    tipo:
    document.getElementById(
        "tipoEmergencia"
    ).value,

    local:
    document.getElementById(
        "localEmergencia"
    ).value,

    descricao:
    document.getElementById(
        "descricaoEmergencia"
    ).value

};

if(
    indiceEdicaoEmergencia !== null
){

    emergencias[
        indiceEdicaoEmergencia
    ] = novaEmergencia;

    indiceEdicaoEmergencia =
    null;

}


else{

    emergencias.push(
        novaEmergencia
    );

}

        salvarDados(
            "emergencias",
            emergencias
        );

        atualizarEmergencias();

        formEmergencia.reset();

    }
);

function atualizarEmergencias(
    lista = emergencias
){

    tabelaEmergencias.innerHTML = "";
lista.sort(
    (a,b) =>

    new Date(b.data) -
    new Date(a.data)

);
    lista.forEach(
        (item, index) => {

            adicionarLinha(

                tabelaEmergencias,

                `

                <td>
                    ${item.data || "-"}
                </td>

                <td>
                    ${item.tipo}
                </td>

                <td>
                    ${item.local}
                </td>

                <td>
                    ${item.descricao}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="
                            editarEmergencia(${index})
                        "
                    >
                        ✏️
                    </button>

                    <button
                        type="button"
                        onclick="
                            imprimirEmergencia(${index})
                        "
                    >
                        🖨️
                    </button>

                    <button
                        type="button"
                        onclick="
                            eliminarEmergencia(${index})
                        "
                    >
                        🗑️
                    </button>

                </td>

                `

            );

        }

    );
atualizarIndicadoresEmergencias();

}


function pesquisarColaboradorASO(){

    const termo =

    document.getElementById(
        "pesquisaColaboradorASO"
    )
    .value
    .toLowerCase();

    const select =
    document.getElementById(
        "colaboradorASO"
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
        item.matricula;

        option.textContent =

        `${item.nome} (${item.matricula})`;

        select.appendChild(
            option
        );

    });
atualizarFuncaoASO();
}


function filtrarEmergencias(){

    const inicio =
    document.getElementById(
        "dataInicioEmergencia"
    ).value;

    const fim =
    document.getElementById(
        "dataFimEmergencia"
    ).value;

    let resultados =
    [...emergencias];

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

    atualizarEmergencias(
        resultados
    );
atualizarIndicadoresEmergenciasPeriodo(
    resultados
);
}
function limparFiltroEmergencias(){

    document.getElementById(
        "dataInicioEmergencia"
    ).value = "";

    document.getElementById(
        "dataFimEmergencia"
    ).value = "";

    atualizarEmergencias();

}
function atualizarIndicadoresEmergenciasPeriodo(lista){

    document.getElementById(
        "totalEmergencias"
    ).textContent =
    lista.length;

    

}
function atualizarIndicadoresEmergencias(){

    document.getElementById(
        "totalEmergencias"
    ).textContent =
    emergencias.length;

    const contadorTipos = {};

    const contadorLocais = {};

    emergencias.forEach(item => {

        contadorTipos[item.tipo] =

        (
            contadorTipos[item.tipo]
            || 0
        ) + 1;

        contadorLocais[item.local] =

        (
            contadorLocais[item.local]
            || 0
        ) + 1;

    });

    let tipoMaisFrequente = "-";

let maiorQuantidade = 0;

Object.values(
    contadorTipos
).forEach(valor => {

    if(valor > maiorQuantidade){

        maiorQuantidade = valor;

    }

});

const empatados =

Object.keys(
    contadorTipos
).filter(

    tipo =>

    contadorTipos[tipo] ===
    maiorQuantidade

);

if(empatados.length === 1){

    tipoMaisFrequente =

    `${empatados[0]} (${maiorQuantidade})`;

}
else if(empatados.length <= 3){

    tipoMaisFrequente =

    `${empatados.join(" / ")} (${maiorQuantidade})`;

}
else{

    tipoMaisFrequente =

    `${empatados.length} Tipos (${maiorQuantidade})`;

}
    let localMaisFrequente = "-";

let maiorQuantidadeLocal = 0;

Object.values(
    contadorLocais
).forEach(valor => {

    if(valor > maiorQuantidadeLocal){

        maiorQuantidadeLocal = valor;

    }

});

const locaisEmpatados =

Object.keys(
    contadorLocais
).filter(

    local =>

    contadorLocais[local] ===
    maiorQuantidadeLocal

);

if(locaisEmpatados.length === 1){

    localMaisFrequente =

    `${locaisEmpatados[0]} (${maiorQuantidadeLocal})`;

}
else if(locaisEmpatados.length <= 3){

    localMaisFrequente =

    `${locaisEmpatados.join(" / ")} (${maiorQuantidadeLocal})`;

}
else{

    localMaisFrequente =

    `${locaisEmpatados.length} Locais (${maiorQuantidadeLocal})`;

}

    document.getElementById(
        "tipoFrequenteEmergencia"
    ).textContent =
    tipoMaisFrequente;

    document.getElementById(
        "localFrequenteEmergencia"
    ).textContent =
    localMaisFrequente;

    document.getElementById(
        "tiposEmergencia"
    ).textContent =

    new Set(

        emergencias.map(
            item =>
            item.tipo
        )

    ).size;

}
function eliminarEmergencia(index){

    if(
        !confirm(
            "Eliminar emergência?"
        )
    ) return;

    emergencias.splice(
        index,
        1
    );

    salvarDados(
        "emergencias",
        emergencias
    );

    atualizarEmergencias();

}
function editarEmergencia(index){

    const item =
    emergencias[index];

    document.getElementById(
        "dataEmergencia"
    ).value =
    item.data || "";

    document.getElementById(
        "tipoEmergencia"
    ).value =
    item.tipo;

    document.getElementById(
        "localEmergencia"
    ).value =
    item.local;

    document.getElementById(
        "descricaoEmergencia"
    ).value =
    item.descricao;

    indiceEdicaoEmergencia =
    index;

}
function imprimirEmergencia(index){

    const item =
    emergencias[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "RELATORIO DE EMERGENCIA",
        20,
        35
    );

    pdf.line(
        20,
        40,
        190,
        40
    );

    pdf.setFontSize(11);

    pdf.text(
        `Data: ${item.data || "-"}`,
        20,
        55
    );

    pdf.text(
        `Tipo: ${item.tipo}`,
        20,
        70
    );

    pdf.text(
        `Local: ${item.local}`,
        20,
        85
    );

    pdf.text(
        `Descricao: ${
            item.descricao || "-"
        }`,
        20,
        100,
        {
            maxWidth: 160
        }
    );

    pdf.save(
        `Emergencia_${item.tipo}.pdf`
    );

}


atualizarEmergencias();
}
