function exportarSegurancaExcel(){
const workbook = XLSX.utils.book_new();

    const wsDesvios =

XLSX.utils.json_to_sheet(

    ocorrencias.map(item => ({

        Titulo:
        item.titulo,

        Descricao:
        item.descricao,

        Severidade:
        item.severidade,

        Area:
        item.area,

        Responsavel:
        item.responsavel,

        Status:
        item.status

    }))

);

XLSX.utils.book_append_sheet(
    workbook,
    wsDesvios,
    "Desvios"
);
   const wsEPI =

XLSX.utils.json_to_sheet(

    solicitacoesEPI.map(item => ({

        Data:
        item.data,

        Colaborador:
        item.colaborador,

        Matricula:
        item.matricula,

        Empresa:
        item.empresa,

        Funcao:
        item.funcao,

        EPI:
        item.epi,

        Quantidade:
        item.quantidade,

        Motivo:
        item.motivo,

        Status:
        item.status

    }))

);

XLSX.utils.book_append_sheet(
    workbook,
    wsEPI,
    "EPI"
);

    const wsDDS =

XLSX.utils.json_to_sheet(

    ddsAtivos.map(item => ({

        Data:
        item.data,

        Tema:
        item.tema,

        Responsavel:
        item.responsavel,

        Participantes:
        item.totalParticipantes

    }))

);

XLSX.utils.book_append_sheet(
    workbook,
    wsDDS,
    "DDS"
);

    const wsFalaTalanga =

XLSX.utils.json_to_sheet(

    falaTalanga.map(item => ({

        Data:
        item.data,

        Colaborador:
        item.colaborador,

        Empresa:
        item.empresa,

        Tipo:
        item.tipo,

        Mensagem:
        item.mensagem,

        Status:
        item.status,

        Resposta:
        item.resposta

    }))

);

XLSX.utils.book_append_sheet(
    workbook,
    wsFalaTalanga,
    "FalaTalanga"
);

    const wsInspecoes =

XLSX.utils.json_to_sheet(

    inspecoes.map(item => ({

        Data:
        item.data,

        Atividade:
        item.atividade,

        Area:
        item.area,

        Responsavel:
        item.responsavel,

        Tipo:
        item.tipo,

        Descricao:
        item.descricao,

        AcaoCorretiva:
        item.acaoCorretiva,

        Prazo:
        item.prazo,

        Status:
        item.status

    }))

);

XLSX.utils.book_append_sheet(
    workbook,
    wsInspecoes,
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

    const wsASO =
XLSX.utils.json_to_sheet(
    asos.map(item => ({

        Colaborador:
        item.colaboradores?.nome || "",

        Matricula:
        item.colaboradores?.matricula || "",

        Funcao:
        item.colaboradores?.funcao || "",

        Tipo:
        item.tipo || "",

        DataExame:
        item.data_exame || "",

        Validade:
        item.validade || "",

        Resultado:
        item.resultado || "",

        Status:
        item.status || ""

    }))
);
XLSX.utils.book_append_sheet(
    workbook,
    wsASO,
    "ASO"
);


    const dadosAmbulatorio =

atendimentosAmbulatorio.map(item => ({

    Data:
    item.data_atendimento,

    Colaborador:
    item.colaborador,

    Funcao:
    item.funcao,

    Empresa:
    item.empresa,

    Doenca:
    item.doenca

}));
const wsAmbulatorio =

XLSX.utils.json_to_sheet(
    dadosAmbulatorio
);
XLSX.utils.book_append_sheet(
    workbook,
    wsAmbulatorio,
    "Ambulatorio"
);


   const dadosMedicamentos =

medicamentos.map(item => ({

    Medicamento:
    item.nome,

    Fabricante:
    item.fabricante,

    Lote:
    item.lote,

    Quantidade:
    item.quantidade,

    Validade:
    item.validade,

    Local:
    item.local

}));
const wsMedicamentos =

XLSX.utils.json_to_sheet(
    dadosMedicamentos
);

XLSX.utils.book_append_sheet(
    workbook,
    wsMedicamentos,
    "Medicamentos"
);
    const dadosEmergencias =

emergencias.map(item => ({

    Data:
    item.data_emergencia,

    Tipo:
    item.tipo,

    Local:
    item.local,

    Descricao:
    item.descricao

}));
const wsEmergencias =

XLSX.utils.json_to_sheet(
    dadosEmergencias
);

XLSX.utils.book_append_sheet(
    workbook,
    wsEmergencias,
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
        colaboradores.map(item => ({
            Nome: item.nome || "",
            Matricula: item.matricula || "",
            Genero: item.genero || "",
            Funcao: item.funcao || "",
            Setor: item.setor || "",
            Lider: item.lider || "",
            Empresa: item.empresa || "",
            Admissao: item.data_admissao || "",
            Demissao: item.data_demissao || "",
            Status: item.status || ""
        }))
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
        treinamentos.map(item => ({
            Data: item.data || "",
            Colaborador: item.colaborador || "",
            Treinamento: item.tipo || "",
            Instrutor: item.instrutor || "",
            Validade: item.validade || "",
            Status: item.status || ""
        }))
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
        utilizadores.map(item => ({
            Nome: item.nome || "",
            Email: item.email || "",
            Perfil: item.perfil || "",
            Status: item.status || "",
            UltimoAcesso: item.ultimo_acesso || "",
            PrimeiroAcesso: item.primeiro_acesso ? "Sim" : "Não"
        }))
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
    ambiental.map(item => ({
        Requisito: item.requisito || "",
        Categoria: item.categoria || "",
        PossuiValidade: item.possui_validade || "",
        DataEmissao: item.data_emissao || "",
        DataValidade: item.data_validade || "",
        Responsavel: item.responsavel || "",
        Cumprimento: item.cumprimento || "",
        Observacoes: item.observacoes || "",
        Status: item.status || ""
    }))
);

   const wsResiduos =
XLSX.utils.json_to_sheet(
    residuos.map(item => ({
        Data: item.data_residuo || "",
        Tipo: item.tipo || "",
        Quantidade: item.quantidade || "",
        Unidade: item.unidade || "",
        Destino: item.destino || "",
        Responsavel: item.responsavel || ""
    }))
);

    const wsConsumos =
XLSX.utils.json_to_sheet(
    consumos.map(item => ({
        Data: item.data_consumo || "",
        Tipo: item.tipo || "",
        Quantidade: item.quantidade || "",
        Unidade: item.unidade || "",
        Local: item.local || "",
        Observacao: item.observacao || ""
    }))
);

   const wsFauna =
XLSX.utils.json_to_sheet(
    fauna.map(item => ({
        Data: item.data_fauna || "",
        Animal: item.animal || "",
        Local: item.local || "",
        Descricao: item.descricao || ""
    }))
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

    const hhtAcumulado =

document.getElementById(
    "cardHHTAcumulado"
)?.textContent || "0";

const efetivoAtual =

document.getElementById(
    "cardEfetivoAtual"
)?.textContent || "0";

const tf =

Number(

    document.getElementById(
        "cardTF"
    )?.textContent || 0

);

const tg =

Number(

    document.getElementById(
        "cardTG"
    )?.textContent || 0

);

const diasSemAcidente =

document.getElementById(
    "diasSemAcidente"
)?.textContent || "0";
const totalACA =

Number(
    document.getElementById(
        "acaHSE"
    )?.textContent || 0
);

const totalFatalidades =

Number(
    document.getElementById(
        "fatalidadeHSE"
    )?.textContent || 0
);

const totalNearMiss =

Number(
    document.getElementById(
        "nearMissHSE"
    )?.textContent || 0
);

const totalDiasPerdidos =

Number(
    document.getElementById(
        "diasPerdidosTotal"
    )?.textContent || 0
);

const conformidade =

Number(

    String(
        document.getElementById(
            "cardConformidade"
        )?.textContent || "0"
    ).replace("%","")

);
const asoVencido =

Number(
    document.getElementById(
        "alertaASOVencido"
    )?.textContent.match(/\d+/)?.[0] || 0
);

const asoProximo =

Number(
    document.getElementById(
        "alertaASOProximo"
    )?.textContent.match(/\d+/)?.[0] || 0
);

const treinamentoVencido =

Number(
    document.getElementById(
        "alertaTreinamentoVencido"
    )?.textContent.match(/\d+/)?.[0] || 0
);

const ambientalVencido =
ambiental.filter(
    item => item.status === "Vencido"
).length;

    /* =================================
       PAGINA 1
    ================================= */

    pdf.setFont(
        "helvetica",
        "bold"
    );
const logo =
document.getElementById("logoTalanga");

if(logo){

   pdf.addImage(
    logo,
    "PNG",
    20,
    10,
    25,
    25
);
 }
pdf.setFontSize(22);

pdf.text(
    "TALANGA HSE",
    55,
    20
);

pdf.setFontSize(10);

pdf.text(
    "Sistema Integrado de Gestão HSE",
    55,
    28
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