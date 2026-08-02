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
console.log("PDF iniciou");


    const { jsPDF } = window.jspdf;

    const pdf =
    new jsPDF();

    const dataAtual =
    new Date().toLocaleDateString(
        "pt-PT"
    );

    const horaAtual =
    new Date().toLocaleTimeString(
        "pt-PT"
    );
const elementoConformidade =
document.getElementById(
    "cardConformidade"
);


    const hoje =
    new Date();

    let asoVencido = 0;
    let asoProximo = 0;

    let treinamentoVencido = 0;
    let treinamentoProximo = 0;

    asos.forEach(item => {

        const validade =
        new Date(item.validade);

        const dias =
        (validade - hoje) /
        (1000 * 60 * 60 * 24);

        if(dias < 0){

            asoVencido++;

        }
        else if(dias <= 30){

            asoProximo++;

        }

    });

    treinamentos.forEach(item => {

        const validade =
        new Date(item.validade);

        const dias =
        (validade - hoje) /
        (1000 * 60 * 60 * 24);

        if(dias < 0){

            treinamentoVencido++;

        }
        else if(dias <= 30){

            treinamentoProximo++;

        }

    });

    const totalInspecoes =
    carregarDados(
        "inspecoes"
    ).length;

    const registosAmbientais =
    carregarDados(
        "ambiental"
    ) || [];
const ambientalVencido =
registosAmbientais.filter(
    item => item.status === "Vencido"
).length;

const ambientalAVencer =
registosAmbientais.filter(
    item => item.status === "A Vencer"
).length;

let medicamentosVencidos = 0;
let medicamentosAVencer = 0;

medicamentos.forEach(item => {

    const validade =
    new Date(item.validade);

    const dias =
    (validade - hoje) /
    (1000 * 60 * 60 * 24);

    if(dias < 0){

        medicamentosVencidos++;

    }



    
    else if(dias <= 90){

        medicamentosAVencer++;

    }

});
const ocorrenciasAbertas =
ocorrencias.filter(
    item => item.status !== "Fechado"
).length;

const inspecoesAbertas =
inspecoes.filter(
    item => item.status !== "Fechado"
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
    ambientalVencido +
    ocorrenciasAbertas +
    inspecoesAbertas;

const conformidade =
totalItens > 0
? `${Math.max(
    0,
    Math.round(
        (
            (totalItens - totalNaoConformes) /
            totalItens
        ) * 100
    )
)}%`
: "100%";

    /* ============================
       CABEÇALHO
    ============================ */

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

    pdf.setDrawColor(
        0,
        102,
        204
    );

    pdf.line(
        20,
        36,
        120,
        36
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(11);

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

    /* ============================
       INDICADORES HSE
    ============================ */

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(14);

    pdf.text(
        "INDICADORES HSE",
        20,
        65
    );

   pdf.setFontSize(16);

pdf.text(
    `CONFORMIDADE HSE: ${conformidade}`,
    25,
    80
);

pdf.setFontSize(11);

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(11);

    pdf.text(
        `Colaboradores: ${colaboradores.length}`,
        25,
        95
    );

    pdf.text(
        `Treinamentos: ${treinamentos.length}`,
        25,
        105
    );

    pdf.text(
        `ASOs: ${asos.length}`,
        25,
        115
    );

    pdf.text(
    `Ocorrencias: ${ocorrencias.length}`,
    25,
    125
);

pdf.text(
    `Utilizadores: ${utilizadores.length}`,
    25,
    135
);

    pdf.text(
        `Inspecoes: ${totalInspecoes}`,
        25,
        145
    );

    pdf.text(
        `Registos Ambientais: ${registosAmbientais.length}`,
        25,
        155
    );

    /* ============================
       ALERTAS CRITICOS
    ============================ */

    pdf.line(
        20,
        165,
        190,
        165
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(14);

    pdf.text(
        "ALERTAS CRITICOS",
        20,
        180
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(11);

    pdf.text(
        `ASO vencidos: ${asoVencido}`,
        25,
        195
    );

    pdf.text(
        `ASO a vencer (30 dias): ${asoProximo}`,
        25,
        205
    );

    pdf.text(
        `Treinamentos vencidos: ${treinamentoVencido}`,
        25,
        215
    );

    pdf.text(
        `Treinamentos a vencer (30 dias): ${treinamentoProximo}`,
        25,
        225
    );
pdf.text(
    `Ambiental vencido: ${ambientalVencido}`,
    25,
    235
);

pdf.text(
    `Ambiental a vencer: ${ambientalAVencer}`,
    25,
    245
);

pdf.text(
    `Medicamentos vencidos: ${medicamentosVencidos}`,
    25,
    255
);

pdf.text(
    `Medicamentos a vencer: ${medicamentosAVencer}`,
    25,
    265
);
    /* ============================
       RESUMO EXECUTIVO
    ============================ */

    pdf.addPage();

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(16);

pdf.text(
    "RESUMO EXECUTIVO",
    20,
    25
);

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(11);
const resumo =

`O Talanga HSE apresenta atualmente ${conformidade} de conformidade geral.

Existem ${colaboradores.length} colaboradores registados, ${treinamentos.length} treinamentos, ${asos.length} ASOs emitidos e ${totalInspecoes} inspecoes realizadas.

Foram registadas ${ocorrencias.length} ocorrencias de seguranca e ${registosAmbientais.length} registos ambientais.

Existem ${asoVencido} ASOs vencidos, ${treinamentoVencido} treinamentos vencidos, ${ambientalVencido} requisitos ambientais vencidos e ${medicamentosVencidos} medicamentos vencidos que requerem acompanhamento prioritario.`;

    pdf.text(
    resumo,
    20,
    45,
    {
        maxWidth:170
    }
);

    /* ============================
       RODAPE
    ============================ */

    pdf.line(
    20,
    270,
    190,
    270
);

pdf.text(
    "GT Engenharia e Servicos",
    20,
    278
);

pdf.text(
    "Relatorio gerado automaticamente pelo Talanga HSE",
    20,
    284
);
console.log("PDF terminou");
/* ============================
   PAGINA 2 - SEGURANCA
============================ */

pdf.addPage();

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(18);

pdf.text(
    "SEGURANCA",
    20,
    20
);

pdf.setFontSize(14);

pdf.text(
    "Ocorrencias",
    20,
    40
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setFontSize(11);

pdf.text(
    `Total Ocorrencias: ${ocorrencias.length}`,
    25,
    55
);

pdf.text(
    `Abertas: ${
        ocorrencias.filter(
            item => item.status === "Aberto"
        ).length
    }`,
    25,
    65
);

pdf.text(
    `Em Tratamento: ${
        ocorrencias.filter(
            item => item.status === "Em Tratamento"
        ).length
    }`,
    25,
    75
);

pdf.text(
    `Fechadas: ${
        ocorrencias.filter(
            item => item.status === "Fechado"
        ).length
    }`,
    25,
    85
);

/* ============================
   EPI
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Gestao de EPI",
    20,
    110
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Solicitacoes: ${solicitacoesEPI.length}`,
    25,
    125
);

pdf.text(
    `Pendentes: ${
        solicitacoesEPI.filter(
            item => item.status === "Pendente"
        ).length
    }`,
    25,
    135
);

pdf.text(
    `Aprovadas: ${
        solicitacoesEPI.filter(
            item => item.status === "Aprovado"
        ).length
    }`,
    25,
    145
);

pdf.text(
    `Entregues: ${
        solicitacoesEPI.filter(
            item => item.status === "Entregue"
        ).length
    }`,
    25,
    155
);

pdf.text(
    `Rejeitadas: ${
        solicitacoesEPI.filter(
            item => item.status === "Rejeitado"
        ).length
    }`,
    25,
    165
);

/* ============================
   DDS
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "DDS",
    20,
    190
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `DDS Realizados: ${ddsAtivos.length}`,
    25,
    205
);

const participantesDDS =
ddsAtivos.reduce(
    (total, dds) =>
        total + (
            dds.participantes
            ? dds.participantes.length
            : 0
        ),
    0
);

pdf.text(
    `Participacoes: ${participantesDDS}`,
    25,
    215
);

/* ============================
   INSPECOES
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Inspecoes",
    20,
    240
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Total Inspecoes: ${inspecoes.length}`,
    25,
    255
);

pdf.text(
    `Abertas: ${
        inspecoes.filter(
            item => item.status === "Aberto"
        ).length
    }`,
    25,
    265
);
/* ============================
   FALA TALANGA
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Fala Talanga",
    110,
    190
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Total: ${falaTalanga.length}`,
    115,
    205
);

pdf.text(
    `Sugestoes: ${
        falaTalanga.filter(
            item => item.tipo === "Sugestão"
        ).length
    }`,
    115,
    215
);

pdf.text(
    `Reclamacoes: ${
        falaTalanga.filter(
            item => item.tipo === "Reclamação"
        ).length
    }`,
    115,
    225
);

pdf.text(
    `Denuncias: ${
        falaTalanga.filter(
            item => item.tipo === "Denúncia"
        ).length
    }`,
    115,
    235
);

pdf.text(
    `Elogios: ${
        falaTalanga.filter(
            item => item.tipo === "Elogio"
        ).length
    }`,
    115,
    245
);

pdf.text(
    `Em Tratamento: ${
        falaTalanga.filter(
            item => item.status === "Em Tratamento"
        ).length
    }`,
    115,
    255
);

pdf.text(
    `Fechados: ${
        falaTalanga.filter(
            item => item.status === "Fechado"
        ).length
    }`,
    115,
    265
);

/* ============================
   PAGINA 3 - SAUDE OCUPACIONAL
============================ */

pdf.addPage();

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(18);

pdf.text(
    "SAUDE OCUPACIONAL",
    20,
    20
);

/* ============================
   ASO
============================ */

pdf.setFontSize(14);

pdf.text(
    "ASO",
    20,
    40
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setFontSize(11);

pdf.text(
    `Total ASO: ${asos.length}`,
    25,
    55
);

pdf.text(
    `Validos: ${
        asos.filter(
            item => item.status === "Válido"
        ).length
    }`,
    25,
    65
);

pdf.text(
    `Vencidos: ${
        asos.filter(
            item => item.status === "Vencido"
        ).length
    }`,
    25,
    75
);

pdf.text(
    `Proximos a vencer: ${asoProximo}`,
    25,
    85
);

/* ============================
   AMBULATORIO
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Ambulatorio",
    20,
    110
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Atendimentos: ${atendimentosAmbulatorio.length}`,
    25,
    125
);

pdf.text(
    `Casos de Malaria: ${
        atendimentosAmbulatorio.filter(
            item => item.doenca === "Malária"
        ).length
    }`,
    25,
    135
);

/* ============================
   MEDICAMENTOS
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Medicamentos",
    20,
    160
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Total: ${medicamentos.length}`,
    25,
    175
);

pdf.text(
    `Vencidos: ${medicamentosVencidos}`,
    25,
    185
);

pdf.text(
    `A vencer: ${medicamentosAVencer}`,
    25,
    195
);

const estoqueMedicamentos =
medicamentos.reduce(
    (total,item) =>
    total + Number(
        item.quantidade || 0
    ),
    0
);

pdf.text(
    `Estoque Total: ${estoqueMedicamentos}`,
    25,
    205
);

/* ============================
   EMERGENCIAS
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Emergencias",
    20,
    230
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Total Emergencias: ${emergencias.length}`,
    25,
    245
);

/* ============================
   PAGINA 4 - AMBIENTE
============================ */

pdf.addPage();

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(18);

pdf.text(
    "AMBIENTE",
    20,
    20
);

/* ============================
   REQUISITOS LEGAIS
============================ */

pdf.setFontSize(14);

pdf.text(
    "Requisitos Legais",
    20,
    40
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setFontSize(11);

pdf.text(
    `Total Registos: ${ambiental.length}`,
    25,
    55
);

pdf.text(
    `Validos: ${
        ambiental.filter(
            item => item.status === "Valido"
        ).length
    }`,
    25,
    65
);

pdf.text(
    `A Vencer: ${
        ambiental.filter(
            item => item.status === "A Vencer"
        ).length
    }`,
    25,
    75
);

pdf.text(
    `Vencidos: ${
        ambiental.filter(
            item => item.status === "Vencido"
        ).length
    }`,
    25,
    85
);

/* ============================
   RESIDUOS
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Residuos",
    20,
    115
);

pdf.setFont(
    "helvetica",
    "normal"
);

const quantidadeResiduos =
residuos.reduce(
    (total,item) =>
    total + Number(item.quantidade || 0),
    0
);

pdf.text(
    `Total Registos: ${residuos.length}`,
    25,
    130
);

pdf.text(
    `Quantidade Total: ${quantidadeResiduos}`,
    25,
    140
);

pdf.text(
    `Reciclagem: ${
        residuos.filter(
            item => item.destino === "Reciclagem"
        ).length
    }`,
    25,
    150
);

pdf.text(
    `Reutilizacao: ${
        residuos.filter(
            item => item.destino === "Reutilização"
        ).length
    }`,
    25,
    160
);

pdf.text(
    `Aterro: ${
        residuos.filter(
            item => item.destino === "Aterro"
        ).length
    }`,
    25,
    170
);

/* ============================
   CONSUMOS
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Consumos",
    20,
    200
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Registos: ${consumos.length}`,
    25,
    215
);

pdf.text(
    `Agua: ${
        consumos.filter(
            item =>
            item.tipo === "Água Potável" ||
            item.tipo === "Água Bruta"
        ).length
    }`,
    25,
    225
);

pdf.text(
    `Energia: ${
        consumos.filter(
            item =>
            item.tipo === "Energia - Rede Pública" ||
            item.tipo === "Energia - Gerador"
        ).length
    }`,
    25,
    235
);

pdf.text(
    `Combustiveis: ${
        consumos.filter(
            item =>
            item.tipo === "Gasóleo" ||
            item.tipo === "Gasolina"
        ).length
    }`,
    25,
    245
);

/* ============================
   FAUNA
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Fauna",
    110,
    40
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Registos: ${fauna.length}`,
    115,
    55
);

pdf.text(
    `Especies: ${
        new Set(
            fauna.map(
                item => item.animal
            )
        ).size
    }`,
    115,
    65
);
/* ============================
   PAGINA 5 - RH E SISTEMA
============================ */

pdf.addPage();

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(18);

pdf.text(
    "RECURSOS HUMANOS E SISTEMA",
    20,
    20
);

/* ============================
   COLABORADORES
============================ */

pdf.setFontSize(14);

pdf.text(
    "Colaboradores",
    20,
    40
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setFontSize(11);

pdf.text(
    `Total: ${colaboradores.length}`,
    25,
    55
);

pdf.text(
    `Ativos: ${
        colaboradores.filter(
            item => item.status === "Ativo"
        ).length
    }`,
    25,
    65
);

pdf.text(
    `Inativos: ${
        colaboradores.filter(
            item => item.status === "Inativo"
        ).length
    }`,
    25,
    75
);

pdf.text(
    `Homens: ${
        colaboradores.filter(
            item => item.genero === "Masculino"
        ).length
    }`,
    25,
    85
);

pdf.text(
    `Mulheres: ${
        colaboradores.filter(
            item => item.genero === "Feminino"
        ).length
    }`,
    25,
    95
);

/* ============================
   TREINAMENTOS
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Treinamentos",
    20,
    125
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Total: ${treinamentos.length}`,
    25,
    140
);

pdf.text(
    `Validos: ${
        treinamentos.filter(
            item => item.status === "Válido"
        ).length
    }`,
    25,
    150
);

pdf.text(
    `Vencidos: ${
        treinamentos.filter(
            item => item.status === "Vencido"
        ).length
    }`,
    25,
    160
);

pdf.text(
    `A vencer em 30 dias: ${treinamentoProximo}`,
    25,
    170
);

/* ============================
   UTILIZADORES
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.text(
    "Utilizadores",
    20,
    200
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Total: ${utilizadores.length}`,
    25,
    215
);

pdf.text(
    `Ativos: ${
        utilizadores.filter(
            item => (item.status || "Ativo") === "Ativo"
        ).length
    }`,
    25,
    225
);

pdf.text(
    `Inativos: ${
        utilizadores.filter(
            item => item.status === "Inativo"
        ).length
    }`,
    25,
    235
);

pdf.text(
    `Administradores: ${
        utilizadores.filter(
            item => item.perfil === "Administrador"
        ).length
    }`,
    25,
    245
);

pdf.text(
    `Tecnicos HSE: ${
        utilizadores.filter(
            item => item.perfil === "Técnico HSE"
        ).length
    }`,
    25,
    255
);

/* ============================
   PAGINA 6 - ALERTAS E CONCLUSAO
============================ */

pdf.addPage();

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(18);

pdf.text(
    "ALERTAS CRITICOS",
    20,
    20
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setFontSize(11);

let y = 40;

pdf.text(
    `ASOs vencidos: ${asoVencido}`,
    25,
    y
);
y += 12;

pdf.text(
    `ASOs a vencer: ${asoProximo}`,
    25,
    y
);
y += 12;

pdf.text(
    `Treinamentos vencidos: ${treinamentoVencido}`,
    25,
    y
);
y += 12;

pdf.text(
    `Treinamentos a vencer: ${treinamentoProximo}`,
    25,
    y
);
y += 12;

pdf.text(
    `Requisitos ambientais vencidos: ${ambientalVencido}`,
    25,
    y
);
y += 12;

pdf.text(
    `Requisitos ambientais a vencer: ${ambientalAVencer}`,
    25,
    y
);
y += 12;

pdf.text(
    `Medicamentos vencidos: ${medicamentosVencidos}`,
    25,
    y
);
y += 12;

pdf.text(
    `Medicamentos a vencer: ${medicamentosAVencer}`,
    25,
    y
);
y += 20;

/* ============================
   CONCLUSAO EXECUTIVA
============================ */

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(16);

pdf.text(
    "CONCLUSAO EXECUTIVA",
    20,
    y
);

y += 15;

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setFontSize(11);

const conclusao =

`O Talanga HSE apresenta atualmente ${conformidade} de conformidade geral.

Foram registados ${ocorrencias.length} desvios ou ocorrencias de seguranca, ${inspecoes.length} inspecoes, ${asos.length} ASOs, ${treinamentos.length} treinamentos e ${ambiental.length} registos ambientais.

A organizacao possui ${colaboradores.length} colaboradores registados e ${utilizadores.length} utilizadores ativos na plataforma.

Recomenda-se atencao especial aos indicadores vencidos ou proximos do vencimento identificados neste relatorio, garantindo a manutencao da conformidade HSE e a melhoria continua do desempenho organizacional.

Relatorio gerado automaticamente pelo Talanga HSE.`;

pdf.text(
    conclusao,
    20,
    y,
    {
        maxWidth: 170
    }
);

/* ============================
   RODAPE FINAL
============================ */

pdf.line(
    20,
    270,
    190,
    270
);

pdf.text(
    "GT Engenharia e Servicos",
    20,
    280
);

pdf.text(
    "Relatorio gerado automaticamente pelo Talanga HSE",
    20,
    287
);
pdf.text(
    `CONFORMIDADE HSE: ${conformidade}`,
    25,
    80
);
/* NO FINAL DA FUNÇÃO */

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