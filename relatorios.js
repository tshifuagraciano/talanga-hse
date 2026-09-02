function exportarSegurancaExcel(){

    const workbook =
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            ocorrencias || []
        ),
        "Ocorrencias"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            solicitacoesEPI || []
        ),
        "EPI"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            ddsAtivos || []
        ),
        "DDS"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            falaTalanga || []
        ),
        "FalaTalanga"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            inspecoes || []
        ),
        "Inspecoes"
    );

    XLSX.writeFile(
        workbook,
        "Seguranca.xlsx"
    );

}
document
.getElementById(
    "excelSeguranca"
)
?.addEventListener(
    "click",
    exportarSegurancaExcel
);
function exportarASOExcel(){

    const workbook =
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            asos || []
        ),
        "ASO"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            atendimentosAmbulatorio || []
        ),
        "Ambulatorio"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            medicamentos || []
        ),
        "Medicamentos"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
            emergencias || []
        ),
        "Emergencias"
    );

    XLSX.writeFile(
        workbook,
        "Saude_Ocupacional.xlsx"
    );

}
document
.getElementById(
    "excelASO"
)
?.addEventListener(
    "click",
    exportarASOExcel
);
function exportarColaboradoresExcel(){

    const worksheet =
    XLSX.utils.json_to_sheet(
        colaboradores
    );

    const workbook =
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Colaboradores"
    );

    XLSX.writeFile(
        workbook,
        "Colaboradores.xlsx"
    );

}

document
.getElementById("excelColaboradores")
?.addEventListener(
    "click",
    exportarColaboradoresExcel
);
function exportarTreinamentosExcel(){

    const worksheet =
    XLSX.utils.json_to_sheet(
        treinamentos
    );

    const workbook =
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Treinamentos"
    );

    XLSX.writeFile(
        workbook,
        "Treinamentos.xlsx"
    );

}

document
.getElementById("excelTreinamentos")
?.addEventListener(
    "click",
    exportarTreinamentosExcel
);
function exportarUtilizadoresExcel(){

    const worksheet =
    XLSX.utils.json_to_sheet(
        utilizadores
    );

    const workbook =
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Utilizadores"
    );

    XLSX.writeFile(
        workbook,
        "Utilizadores.xlsx"
    );

}

document
.getElementById("excelUtilizadores")
?.addEventListener(
    "click",
    exportarUtilizadoresExcel
);

function exportarAmbienteExcel(){

    const workbook =
    XLSX.utils.book_new();

    const wsAmbiental =
    XLSX.utils.json_to_sheet(
        ambiental
    );

    const wsResiduos =
    XLSX.utils.json_to_sheet(
        residuos
    );

    const wsConsumos =
    XLSX.utils.json_to_sheet(
        consumos
    );

    const wsFauna =
    XLSX.utils.json_to_sheet(
        fauna
    );

    XLSX.utils.book_append_sheet(
        workbook,
        wsAmbiental,
        "Requisitos"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        wsResiduos,
        "Residuos"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        wsConsumos,
        "Consumos"
    );

    XLSX.utils.book_append_sheet(
        workbook,
        wsFauna,
        "Fauna"
    );

    XLSX.writeFile(
        workbook,
        "Ambiente.xlsx"
    );

}
document
.getElementById(
    "excelAmbiente"
)
?.addEventListener(
    "click",
    exportarAmbienteExcel
);
function gerarRelatorioExecutivo(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const dataAtual =
    new Date().toLocaleDateString("pt-PT");

    const horaAtual =
    new Date().toLocaleTimeString("pt-PT");

    const registosHHT =
    carregarDados("registosHHT") || [];

    const hhtAcumulado =
    registosHHT.reduce(
        (t,item)=>
        t + Number(item.hhtSemana || 0),
        0
    );

    const efetivoAtual =
    registosHHT.length
    ?
    registosHHT[
        registosHHT.length - 1
    ].efetivoSemana
    :
    0;

   const ocorrenciasHSE =

carregarDados(
    "ocorrenciasHSE"
) || [];

const totalACA =

ocorrenciasHSE.filter(
    item =>

    item.tipo === "ACA"
).length;

const totalFatalidades =

ocorrenciasHSE.filter(
    item =>

    item.tipo === "Fatalidade"
).length;

const totalDiasPerdidos =

ocorrenciasHSE.reduce(
    (total,item)=>

    total +

    Number(
        item.diasPerdidos || 0
    ),

    0
);
const totalNearMiss =

ocorrenciasHSE.filter(
    item =>

    item.tipo === "Near Miss"
).length;
    const tf =
    hhtAcumulado > 0
    ?
    (
        totalACA * 1000000
    ) /
    hhtAcumulado
    :
    0;

    const tg =
    hhtAcumulado > 0
    ?
    (
        totalDiasPerdidos * 1000000
    ) /
    hhtAcumulado
    :
    0;

    const diasSemAcidente =
    typeof calcularDiasSemAcidente ===
    "function"
    ?
    calcularDiasSemAcidente()
    :
    0;

    const hoje =
    new Date();

    let asoVencido = 0;
    let asoProximo = 0;

    asos.forEach(item=>{

        const validade =
        new Date(item.validade);

        const dias =
        (validade-hoje) /
        (1000*60*60*24);

        if(dias < 0){

            asoVencido++;

        }
        else if(dias <= 30){

            asoProximo++;

        }

    });

    let treinamentoVencido = 0;
    let treinamentoProximo = 0;

    treinamentos.forEach(item=>{

        const validade =
        new Date(item.validade);

        const dias =
        (validade-hoje) /
        (1000*60*60*24);

        if(dias < 0){

            treinamentoVencido++;

        }
        else if(dias <= 30){

            treinamentoProximo++;

        }

    });

    const ambientalVencido =
    ambiental.filter(
        item =>
        item.status === "Vencido"
    ).length;

    const totalItens =
        asos.length +
        treinamentos.length +
        ambiental.length +
        ocorrencias.length +
        inspecoes.length;

    const totalNaoConformes =
        asoVencido +
        treinamentoVencido +
        ambientalVencido;

    const conformidade =
totalItens > 0
?
Math.max(
    0,
    Math.round(
        (
            (totalItens - totalNaoConformes) /
            totalItens
        ) * 100
    )
)
:
100;

    /* =================================
       PAGINA 1
    ================================= */

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(22);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(16);

    pdf.text(
        "RELATORIO EXECUTIVO",
        20,
        32
    );

    pdf.setFontSize(10);

    pdf.text(
        `Data: ${dataAtual}`,
        20,
        45
    );

    pdf.text(
        `Hora: ${horaAtual}`,
        90,
        45
    );

    pdf.line(
        20,
        50,
        190,
        50
    );

    pdf.setFontSize(14);

    pdf.text(
        "INDICADORES EXECUTIVOS",
        20,
        65
    );

    pdf.setFontSize(11);

    pdf.text(
        `Conformidade HSE: ${conformidade}%`,
        25,
        85
    );

    pdf.text(
        `Dias Sem Acidente: ${diasSemAcidente}`,
        25,
        95
    );

    pdf.text(
        `Efetivo Atual: ${efetivoAtual}`,
        25,
        105
    );

    pdf.text(
        `HHT Acumulado: ${hhtAcumulado.toLocaleString("pt-PT")}`,
        25,
        115
    );

    pdf.text(
        `TF: ${tf.toFixed(2)}`,
        25,
        125
    );

    pdf.text(
        `TG: ${tg.toFixed(2)}`,
        25,
        135
    );

    pdf.text(
    `ACA: ${totalACA}`,
    25,
    145
);

pdf.text(
    `Fatalidades: ${totalFatalidades}`,
    25,
    155
);

pdf.text(
    `Near Miss: ${totalNearMiss}`,
    25,
    165
);

pdf.text(
    `Dias Perdidos: ${totalDiasPerdidos}`,
    25,
    175
);

    /* =================================
       PAGINA 2
    ================================= */

    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(
        "SEGURANCA E HHT",
        20,
        20
    );

    pdf.setFontSize(11);

    pdf.text(
        `Desvios: ${ocorrencias.length}`,
        25,
        45
    );

    pdf.text(
        `ACA: ${totalACA}`,
        25,
        55
    );

    pdf.text(
        `Fatalidades: ${totalFatalidades}`,
        25,
        65
    );

    pdf.text(
        `Near Miss: ${totalNearMiss}`,
        25,
        75
    );

    pdf.text(
        `Dias Perdidos: ${totalDiasPerdidos}`,
        25,
        85
    );

    pdf.line(
        20,
        100,
        190,
        100
    );

    pdf.text(
        `Efetivo Atual: ${efetivoAtual}`,
        25,
        120
    );

    pdf.text(
        `HHT Acumulado: ${hhtAcumulado.toLocaleString("pt-PT")}`,
        25,
        130
    );

    pdf.text(
        `TF: ${tf.toFixed(2)}`,
        25,
        140
    );

    pdf.text(
        `TG: ${tg.toFixed(2)}`,
        25,
        150
    );

    /* =================================
       PAGINA 3
    ================================= */

    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(
        "SAUDE OCUPACIONAL",
        20,
        20
    );

    pdf.setFontSize(11);

    pdf.text(
        `ASO: ${asos.length}`,
        25,
        45
    );

    pdf.text(
        `ASO Vencidos: ${asoVencido}`,
        25,
        55
    );

    pdf.text(
        `ASO a Vencer: ${asoProximo}`,
        25,
        65
    );

    pdf.text(
        `Atendimentos Ambulatório: ${atendimentosAmbulatorio.length}`,
        25,
        75
    );

    pdf.text(
        `Medicamentos: ${medicamentos.length}`,
        25,
        85
    );

    pdf.text(
        `Emergências: ${emergencias.length}`,
        25,
        95
    );
    pdf.text(
    `Taxa de ASO Válidos: ${
        asos.length
        ?
        Math.round(
            (
                (asos.length - asoVencido)
                /
                asos.length
            ) * 100
        )
        :
        100
    }%`,
    25,
    105
);

    /* =================================
       PAGINA 4
    ================================= */

    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(
        "AMBIENTE",
        20,
        20
    );

    pdf.setFontSize(11);

    pdf.text(
        `Requisitos Ambientais: ${ambiental.length}`,
        25,
        45
    );

    pdf.text(
        `Resíduos: ${residuos.length}`,
        25,
        55
    );

    pdf.text(
        `Consumos: ${consumos.length}`,
        25,
        65
    );

    pdf.text(
        `Fauna: ${fauna.length}`,
        25,
        75
    );

    pdf.text(
    `Conformidade Ambiental: ${
        ambiental.length
        ?
        Math.round(
            (
                (ambiental.length - ambientalVencido)
                /
                ambiental.length
            ) * 100
        )
        :
        100
    }%`,
    25,
    95
);
    /* =================================
       PAGINA 5
    ================================= */

    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(
        "RH E SISTEMA",
        20,
        20
    );

    pdf.setFontSize(11);

    pdf.text(
        `Colaboradores: ${colaboradores.length}`,
        25,
        45
    );

    pdf.text(
        `Treinamentos: ${treinamentos.length}`,
        25,
        55
    );

    pdf.text(
        `Utilizadores: ${utilizadores.length}`,
        25,
        65
    );

    /* =================================
       PAGINA 6
    ================================= */

    pdf.addPage();

    pdf.setFontSize(18);

    pdf.text(
        "ANALISE DA TALANGUINHA",
        20,
        20
    );

    const parecer =

`RESUMO EXECUTIVO

O sistema apresenta actualmente ${conformidade}% de conformidade HSE.

A organização possui um efetivo operacional de ${efetivoAtual} colaboradores e acumula ${hhtAcumulado.toLocaleString("pt-PT")} Horas-Homem Trabalhadas.

Foram registados ${totalACA} acidentes com afastamento, ${totalFatalidades} fatalidades e ${totalDiasPerdidos} dias perdidos.

A Taxa de Frequência encontra-se em ${tf.toFixed(2)} e a Taxa de Gravidade em ${tg.toFixed(2)}.

PONTOS POSITIVOS

 Conformidade HSE de ${conformidade}%.

 ${asoVencido} ASO vencidos.

 ${treinamentoVencido} treinamentos vencidos.

 ${ambientalVencido} requisitos ambientais vencidos.

PONTOS DE ATENÇÃO

 ${totalACA} acidentes com afastamento registados.

 ${totalFatalidades} fatalidades registadas.

 ${totalDiasPerdidos} dias perdidos acumulados.



RECOMENDAÇÃO DA TALANGUINHA

Manter o controlo contínuo dos indicadores HSE, reforçar a prevenção de acidentes com afastamento, garantir o encerramento das ações corretivas e promover melhorias contínuas nos processos de Segurança, Saúde Ocupacional e Ambiente.

CLASSIFICAÇÃO GERAL

${conformidade >= 90
? "EXCELENTE"
: conformidade >= 70
? "SATISFATÓRIA"
: "CRÍTICA"}`;
    pdf.setFontSize(11);

    pdf.text(
        parecer,
        20,
        45,
        {
            maxWidth:170
        }
    );

    pdf.save(
        "Relatorio_Executivo_HSE.pdf"
    );

}
document
.getElementById(
    "relatorioExecutivo"
)
?.addEventListener(
    "click",
    gerarRelatorioExecutivo
);