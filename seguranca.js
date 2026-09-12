/* ==========================================
   SEGURANÇA🚨 Gestão de Desvios e Ocorrências
========================================== */

const formSeguranca =
document.getElementById(
    "formSeguranca"
);

const tabelaOcorrencias =
document.querySelector(
    "#tabelaOcorrencias tbody"
);

let ocorrencias = [];

let indiceEdicao =
null;

let ocorrenciasFiltradas =
[...ocorrencias];

let ocorrenciasHSE = [];


let ocorrenciasHSEFiltradas = [];

function editarOcorrencia(indice){

    const item =
    ocorrencias[indice];

    document.getElementById(
        "titulo"
    ).value = item.titulo;

    document.getElementById(
        "descricao"
    ).value = item.descricao || "";

    document.getElementById(
        "severidade"
    ).value = item.severidade;

    document.getElementById(
        "area"
    ).value = item.area;

    document.getElementById(
        "responsavel"
    ).value = item.responsavel;

    document.getElementById(
        "status"
    ).value = item.status;

   indiceEdicao =
item.id;


}

async function carregarOcorrenciasSupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("desvios")
.select("*")
.eq("empresa_id",window.empresaAtual)
.eq(
    "empresa_id",
    window.empresaAtual
)


    if(error){
        console.error(error);
        return;
    }

    ocorrencias =
    (data || []).map(item => ({

        id: item.id,
        titulo: item.titulo,
        descricao: item.descricao,

        fotoProblema:
        item.foto_problema,

        fotoSolucao:
        item.foto_solucao,

        severidade:
        item.severidade,

        area:
        item.area,

        responsavel:
        item.responsavel,

        status:
        item.status,

        data:
        item.created_at

    }));

    ocorrenciasFiltradas =
    [...ocorrencias];

    atualizarOcorrencias();
}

async function imprimirOcorrencia(indice){

    const item =
    ocorrencias[indice];

const fotoProblema =
item.fotoProblema;

const fotoSolucao =
item.fotoSolucao;

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();
const logo =
document.getElementById("logoTalanga");

if(logo){

    pdf.addImage(
        logo,
        "PNG",
        15,
        10,
        30,
        30
    );

}
    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "RELATORIO DE DESVIO",
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
        `Titulo: ${item.titulo}`,
        20,
        55
    );

    pdf.text(
        `Descricao: ${
            item.descricao || ""
        }`,
        20,
        70
    );

    pdf.text(
        `Severidade: ${item.severidade}`,
        20,
        90
    );

    pdf.text(
        `Area: ${item.area}`,
        20,
        105
    );

    pdf.text(
        `Responsavel: ${item.responsavel}`,
        20,
        120
    );

    pdf.text(
        `Status: ${item.status}`,
        20,
        135
    );

    pdf.text(
        `Data: ${
            new Date(
                item.data
            ).toLocaleDateString(
                "pt-PT"
            )
        }`,
        20,
        150
    );

    

    
let y = 160;

if(fotoProblema){

    pdf.text(
        "Foto do Problema:",
        20,
        y
    );

    pdf.addImage(
    fotoProblema,
        "JPEG",
        20,
        y + 5,
        60,
        45
    );

    y += 60;

}

if(fotoSolucao){

    pdf.text(
        "Foto da Solucao:",
        20,
        y
    );

    pdf.addImage(
    fotoSolucao,
        "JPEG",
        20,
        y + 5,
        60,
        45
    );

    y += 60;

}

pdf.save(
    `Desvio_${item.titulo}.pdf`
);
}

function atualizarIndicadoresOcorrencias(){

    document.getElementById(
        "totalOcorrencias"
    ).textContent =
    ocorrenciasFiltradas.length

    document.getElementById(
        "abertosOcorrencias"
    ).textContent =

   ocorrenciasFiltradas.filter(
        item =>
        item.status ===
        "Aberto"
    ).length;

    document.getElementById(
        "tratamentoOcorrencias"
    ).textContent =

    ocorrenciasFiltradas.filter(
        item =>
        item.status ===
        "Em Tratamento"
    ).length;

    document.getElementById(
        "fechadosOcorrencias"
    ).textContent =

   ocorrenciasFiltradas.filter(
        item =>
        item.status ===
        "Fechado"
    ).length;

    document.getElementById(
        "altaSeveridadeOcorrencias"
    ).textContent =

   ocorrenciasFiltradas.filter(
        item =>
        item.severidade ===
        "Alta"
    ).length;

    const contadorAreas = {};

    ocorrenciasFiltradas.forEach(
        item => {

            contadorAreas[
                item.area
            ] =

            (
                contadorAreas[
                    item.area
                ] || 0
            ) + 1;

        }
    );

    let areaFrequente = "-";

    let maiorArea = 0;

    Object.values(
        contadorAreas
    ).forEach(valor => {

        if(valor > maiorArea){

            maiorArea = valor;

        }

    });

    const areasEmpatadas =

    Object.keys(
        contadorAreas
    ).filter(

        area =>

        contadorAreas[
            area
        ] ===
        maiorArea

    );

    if(
        areasEmpatadas.length === 1
    ){

        areaFrequente =

        `${areasEmpatadas[0]} (${maiorArea})`;

    }
    else if(
        areasEmpatadas.length <= 3
    ){

        areaFrequente =

        `${areasEmpatadas.join(" / ")} (${maiorArea})`;

    }

    document.getElementById(
        "areaFrequenteOcorrencias"
    ).textContent =
    areaFrequente;

    const contadorResponsaveis = {};

    ocorrenciasFiltradas.forEach(
        item => {

            contadorResponsaveis[
                item.responsavel
            ] =

            (
                contadorResponsaveis[
                    item.responsavel
                ] || 0
            ) + 1;

        }
    );

    let responsavelFrequente = "-";

    let maiorResponsavel = 0;

    Object.values(
        contadorResponsaveis
    ).forEach(valor => {

        if(valor > maiorResponsavel){

            maiorResponsavel = valor;

        }

    });

    const responsaveisEmpatados =

    Object.keys(
        contadorResponsaveis
    ).filter(

        responsavel =>

        contadorResponsaveis[
            responsavel
        ] ===
        maiorResponsavel

    );

    if(
        responsaveisEmpatados.length === 1
    ){

        responsavelFrequente =

        `${responsaveisEmpatados[0]} (${maiorResponsavel})`;

    }
    else if(
        responsaveisEmpatados.length <= 3
    ){

        responsavelFrequente =

        `${responsaveisEmpatados.join(" / ")} (${maiorResponsavel})`;

    }

    document.getElementById(
        "responsavelFrequenteOcorrencias"
    ).textContent =
    responsavelFrequente;

}
async function eliminarOcorrencia(indice){

    if(
        !confirm(
            "Deseja eliminar esta ocorrência?"
        )
    ) return;

    const item =
    ocorrenciasFiltradas[indice];

    const { error } =
    await supabaseClient
    .from("desvios")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){
        console.error(error);
        return;
    }

    await carregarOcorrenciasSupabase();
}
function filtrarOcorrenciasPeriodo(){

    const inicio =
    document.getElementById(
        "dataInicioOcorrencia"
    ).value;

    const fim =
    document.getElementById(
        "dataFimOcorrencia"
    ).value;

    if(!inicio || !fim){

        alert(
            "Selecione as duas datas."
        );

        return;

    

    const dataInicio =
    new Date(inicio);

    const dataFim =
    new Date(fim);

    ocorrenciasFiltradas =
    ocorrenciasFiltradas.filter(item => {

        if(!item.data){

            return false;

        }

        const dataOcorrencia =
        new Date(item.data);

        return (

            dataOcorrencia >= dataInicio &&

            dataOcorrencia <= dataFim

        );

    });

    atualizarOcorrencias();

}
function limparFiltroOcorrencias(){

    ocorrenciasFiltradas =
    [...ocorrencias];

    atualizarOcorrencias();

}
}

async function atualizarOcorrencias(){

    if(!tabelaOcorrencias) return;

    tabelaOcorrencias.innerHTML = "";

    for(const [indice, item] of ocorrenciasFiltradas.entries()){

            const linha =
            document.createElement("tr");

           const evidencia =

item.evidenciaId

? await obterEvidencia(
    item.evidenciaId
)

: null;

console.log(
    "Evidencia:",
    evidencia
);

const fotoProblema =
item.fotoProblema
? "📷 Sim"
: "-";

const fotoSolucao =
item.fotoSolucao
? "📷 Sim"
: "-";
            linha.innerHTML = `
    <td>${item.titulo}</td>

    <td>${item.descricao || ""}</td>

    <td>${fotoProblema}</td>

    <td>${fotoSolucao}</td>

    <td>${item.severidade}</td>

    <td>${item.area}</td>

    <td>${item.responsavel}</td>

    <td>${item.status}</td>

    <td>

        <button
            onclick="editarOcorrencia(${indice})"
        >
            ✏️
        </button>

        <button
            onclick="imprimirOcorrencia(${indice})"
        >
            🖨️
        </button>

        <button
            onclick="eliminarOcorrencia(${indice})"
        >
            🗑️
        </button>

    </td>
`;
            tabelaOcorrencias.appendChild(
                linha
            );

        }
    
atualizarIndicadoresOcorrencias();
atualizarIndicadoresOcorrencias();

}




function filtrarOcorrenciasPeriodo(){

    const inicio =
    document.getElementById(
        "dataInicioOcorrencia"
    ).value;

    const fim =
    document.getElementById(
        "dataFimOcorrencia"
    ).value;

    if(!inicio || !fim){

        alert(
            "Selecione as duas datas."
        );

        return;

    }

    const dataInicio =
    new Date(inicio);

    const dataFim =
    new Date(fim);

    dataFim.setHours(
        23,
        59,
        59,
        999
    );

    ocorrenciasFiltradas =
    ocorrenciasFiltradas.filter(item => {

        if(!item.data){

            return false;

        }

        const dataOcorrencia =
        new Date(item.data);

        return (

            dataOcorrencia >= dataInicio &&

            dataOcorrencia <= dataFim

        );

    });

    atualizarOcorrencias();

}

function limparFiltroOcorrencias(){

    document.getElementById(
        "dataInicioOcorrencia"
    ).value = "";

    document.getElementById(
        "dataFimOcorrencia"
    ).value = "";

    ocorrenciasFiltradas =
    [...ocorrencias];

    atualizarOcorrencias();

}

const pesquisaOcorrencia =
document.getElementById(
    "pesquisaOcorrencia"
);

if(pesquisaOcorrencia){

    pesquisaOcorrencia.addEventListener(

        "input",

        () => {

            const termo =

            pesquisaOcorrencia.value
            .toLowerCase();

            ocorrenciasFiltradas =

            ocorrencias.filter(
                item =>

                    (item.titulo || "")
                    .toLowerCase()
                    .includes(termo)

                    ||

                    (item.descricao || "")
                    .toLowerCase()
                    .includes(termo)

                    ||

                    (item.area || "")
                    .toLowerCase()
                    .includes(termo)

                    ||

                    (item.responsavel || "")
                    .toLowerCase()
                    .includes(termo)

                    ||

                    (item.status || "")
                    .toLowerCase()
                    .includes(termo)

            );

            atualizarOcorrencias();

        }

    );

}
if (formSeguranca) {

    formSeguranca.addEventListener(
        "submit",
        async e => {

            e.preventDefault();
            console.log("SUBMIT EXECUTADO");

            const titulo =
            document.getElementById(
                "titulo"
            ).value;

const descricao =
document.getElementById(
    "descricao"
).value;

            const severidade =
            document.getElementById(
                "severidade"
            ).value;

            const area =
            document.getElementById(
                "area"
            ).value;

            const responsavel =
            document.getElementById(
                "responsavel"
            ).value;

            const status =
            document.getElementById(
                "status"
            ).value;

            const data =
new Date().toISOString();

console.log(
    document.getElementById("fotoProblema")
);

console.log(
    document.getElementById("fotoSolucao")
);


const arquivoProblema =
document.getElementById(
    "fotoProblema"
).files[0];

const arquivoSolucao =
document.getElementById(
    "fotoSolucao"
).files[0];

let fotoProblema = "";
let fotoSolucao = "";

try {

    if(arquivoProblema){

        fotoProblema =
await redimensionarImagem(
    arquivoProblema
);

    }

    if(arquivoSolucao){

       fotoSolucao =
await redimensionarImagem(
    arquivoSolucao
);

    }

}
catch(erro){

    console.error(
        "Erro ao converter imagem:",
        erro
    );

}



console.log({
    titulo,
    descricao,
    fotoProblema,
    fotoSolucao,
    severidade,
    area,
    responsavel,
    status,
    data
});

let error;
const itemAtual =
ocorrencias.find(
    item => item.id === indiceEdicao
);
if(indiceEdicao !== null){

    ({ error } =
    await supabaseClient
    .from("desvios")
    .update({

        titulo,
        descricao,

        foto_problema:
fotoProblema ||
itemAtual.fotoProblema,

foto_solucao:
fotoSolucao ||
itemAtual.fotoSolucao,

        severidade,
        area,
        responsavel,
        status

    })
    .eq(
        "id",
        indiceEdicao
    ));

    indiceEdicao = null;

}else{

    ({ error } =
    await supabaseClient
    .from("desvios")
    .insert([{
        empresa_id:
window.empresaAtual,

        titulo,
        descricao,

        foto_problema:
        fotoProblema,

        foto_solucao:
        fotoSolucao,

        severidade,
        area,
        responsavel,
        status

    }]));
}

if(error){
    console.error(error);
    return;
}

await carregarOcorrenciasSupabase();
            ocorrenciasFiltradas =
[...ocorrencias];

            atualizarOcorrencias();
            atualizarDashboard();

            formSeguranca.reset();

        }
    );
    console.log(
    "Ocorrencias gravadas:",
    ocorrencias
);
function converterBase64(arquivo){

    return new Promise(
        (resolve, reject) => {

            const reader =
            new FileReader();

            reader.onload =
            () => resolve(
                reader.result
            );

            reader.onerror =
            erro => reject(
                erro
            );

            reader.readAsDataURL(
                arquivo
            );

        }
    );

}
}
async function redimensionarImagem(
    arquivo,
    larguraMax = 1200,
    alturaMax = 1200,
    qualidade = 0.8
){
    return new Promise(
        (resolve, reject) => {

            const reader =
            new FileReader();

            reader.onload =
            e => {

                const img =
                new Image();

                img.onload =
                () => {

                    let largura =
                    img.width;

                    let altura =
                    img.height;

                    if(
                        largura > larguraMax
                    ){

                        altura =
                        altura *
                        (
                            larguraMax /
                            largura
                        );

                        largura =
                        larguraMax;

                    }

                    if(
                        altura > alturaMax
                    ){

                        largura =
                        largura *
                        (
                            alturaMax /
                            altura
                        );

                        altura =
                        alturaMax;

                    }

                    const canvas =
                    document.createElement(
                        "canvas"
                    );

                    canvas.width =
                    largura;

                    canvas.height =
                    altura;

                    const ctx =
                    canvas.getContext("2d");

                    ctx.drawImage(
                        img,
                        0,
                        0,
                        largura,
                        altura
                    );

                    resolve(

                        canvas.toDataURL(
                            "image/jpeg",
                            qualidade
                        )

                    );

                };

                img.src =
                e.target.result;

            };

            reader.onerror =
            reject;

            reader.readAsDataURL(
                arquivo
            );

        }
    );
}
atualizarOcorrencias();
/* ==========================================
   GESTÃO DE EPI
========================================== */

const tabelaEPI =
document.querySelector(
    "#tabelaEPI tbody"
);

let solicitacoesEPI = [];

let solicitacoesEPIFiltradas = [];



const tabelaEstoqueEPI =
document.querySelector(
    "#tabelaEstoqueEPI tbody"
);

let estoqueEPI = [];

const formEstoqueEPI =
document.getElementById(
    "formEstoqueEPI"
);

async function carregarSolicitacoesEPISupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("epi_solicitacoes")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .order(
        "data_solicitacao",
        {
            ascending:false
        }
    );

    if(error){

        console.error(error);

        return;
    }

    solicitacoesEPI =
    (data || []).map(item => ({

        id: item.id,

        data:
        item.data_solicitacao,

        colaborador:
        item.colaborador,

        matricula:
        item.matricula,

        empresa:
        item.empresa,

        funcao:
        item.funcao,

        epi:
        item.epi,

        quantidade:
        item.quantidade,

        motivo:
        item.motivo,

        status:
        item.status

    }));

    solicitacoesEPIFiltradas =
    [...solicitacoesEPI];

    atualizarEPI();
}

function atualizarEPI(){

    if(!tabelaEPI) return;

    tabelaEPI.innerHTML =
    "";

    solicitacoesEPIFiltradas.forEach(
    (item,index) => {

            const linha =
            document.createElement(
                "tr"
            );
let statusFormatado = "";

if(
    item.status ===
    "Pendente"
){

    statusFormatado =
    "🟡 Pendente";

}
else if(
    item.status ===
    "Aprovado"
){

    statusFormatado =
    "🟢 Aprovado";

}
else if(
    item.status ===
    "Entregue"
){

    statusFormatado =
    "📦 Entregue";

}
else if(
    item.status ===
    "Rejeitado"
){

    statusFormatado =
    "🔴 Rejeitado";

}
else{

    statusFormatado =
    item.status;

}

linha.innerHTML = `

    <td>${item.data}</td>

    <td>${item.colaborador}</td>

    <td>${item.empresa}</td>

    <td>${item.epi}</td>

    <td>${item.quantidade}</td>

    <td>${item.motivo}</td>

    <td>${statusFormatado}</td>

    <td>

    <button
        onclick="
            aprovarEPI(${index})
        "
    >
        ✅
    </button>

    <button
        onclick="
            entregarEPI(${index})
        "
    >
        📦
    </button>

    <button
        onclick="
            rejeitarEPI(${index})
        "
    >
        ❌
    </button>

    <button
        onclick="
            imprimirSolicitacaoEPI(${index})
        "
    >
        🖨️
    </button>
    <button
    onclick="
        historicoEPI('${item.matricula}')
    "
>
    👤
</button>
<button
    onclick="
        eliminarSolicitacaoEPI(${index})
    "
>
    🗑️
</button>
</td>
`;
            tabelaEPI.appendChild(
                linha
            );



        }
    );

    atualizarIndicadoresEPI();

}
function carregarEPIsEstoque(){

    const select =
    document.getElementById(
        "epiEstoque"
    );

    if(!select) return;

    select.innerHTML = "";

    listaEPIs.forEach(
        epi => {

            const option =
            document.createElement(
                "option"
            );

            option.value =
            epi;

            option.textContent =
            epi;

            select.appendChild(
                option
            );

        }
    );

}


if(formEstoqueEPI){

    formEstoqueEPI.addEventListener(

        "submit",

        async e => {

            e.preventDefault();

            const novoItem = {

                epi:
                document.getElementById(
                    "epiEstoque"
                ).value,

                ca:
                document.getElementById(
                    "caEPI"
                ).value,

                fabricante:
                document.getElementById(
                    "fabricanteEPI"
                ).value,

                fornecedor:
                document.getElementById(
                    "fornecedorEPI"
                ).value,

                quantidade:
                Number(
                    document.getElementById(
                        "quantidadeEstoque"
                    ).value
                ),

                dataEntrada:
                document.getElementById(
                    "dataEntradaEPI"
                ).value,

                validade:
                document.getElementById(
                    "validadeEPI"
                ).value,

                observacao:
                document.getElementById(
                    "observacaoEPI"
                ).value

            };

            const { error } =
await supabaseClient
.from("epi_estoque")
.insert([{
empresa_id:
window.empresaAtual,
    epi: novoItem.epi,
    ca: novoItem.ca,
    fabricante: novoItem.fabricante,
    fornecedor: novoItem.fornecedor,
    quantidade: novoItem.quantidade,
    data_entrada: novoItem.dataEntrada,
    validade: novoItem.validade,
    observacao: novoItem.observacao

}]);

if(error){
    console.error(error);
    return;
}

await carregarEstoqueEPISupabase();

            formEstoqueEPI.reset();

        }

    );

}


async function carregarEstoqueEPISupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("epi_estoque")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .order(
        "created_at",
        {
            ascending:false
        }
    );

    if(error){
        console.error(error);
        return;
    }

    estoqueEPI =
    (data || []).map(item => ({

        id: item.id,
        epi: item.epi,
        ca: item.ca,
        fabricante: item.fabricante,
        fornecedor: item.fornecedor,
        quantidade: item.quantidade,
        dataEntrada: item.data_entrada,
        validade: item.validade,
        observacao: item.observacao

    }));

    atualizarEstoqueEPI();
}


function atualizarEstoqueEPI(){

    if(!tabelaEstoqueEPI)
    return;

    tabelaEstoqueEPI.innerHTML =
    "";

    estoqueEPI.forEach(

        (item,index) => {

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `

    <td>${item.epi}</td>

    <td>${item.ca}</td>

    <td>${item.fabricante}</td>

    <td>${item.fornecedor}</td>

    <td>${item.quantidade}</td>

    <td>${item.dataEntrada}</td>

    <td>${item.validade}</td>

    <td>

        <button
            onclick="
            eliminarEstoqueEPI(${index})
            "
        >
            🗑️
        </button>

    </td>

`;
            tabelaEstoqueEPI.appendChild(
                linha
            );

        }

    );

}
async function eliminarEstoqueEPI(index){

    if(
        !confirm(
            "Eliminar item?"
        )
    ) return;

    const item =
    estoqueEPI[index];

    const { error } =
    await supabaseClient
    .from("epi_estoque")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){
        console.error(error);
        return;
    }

    await carregarEstoqueEPISupabase();

    carregarEPIsEstoque();
}
async function eliminarSolicitacaoEPI(index){

    if(
        !confirm(
            "Deseja eliminar esta solicitação?"
        )
    ) return;

    const item =
    solicitacoesEPIFiltradas[index];

const previewProblema =
document.getElementById(
    "previewFotoProblema"
);

if(previewProblema){

    previewProblema.innerHTML =
    item.fotoProblema
    ? `${item.fotoProblema}`
    : "";
}
const previewSolucao =
document.getElementById(
    "previewFotoSolucao"
);

if(previewSolucao){

    previewSolucao.innerHTML =
    item.fotoSolucao
    ? `${item.fotoSolucao}`
    : "";
}

    const { error } =
    await supabaseClient
    .from("epi_solicitacoes")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;
    }

    await carregarSolicitacoesEPISupabase();
}
function imprimirSolicitacaoEPI(index){

    const item =
    solicitacoesEPIFiltradas[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();
    const logo =
document.getElementById(
    "logoTalanga"
);

if (logo) {

    pdf.addImage(
        logo,
        "PNG",
        10,
        8,
        20,
        20
    );

}

pdf.setFontSize(18);

pdf.text(
    "TALANGA HSE",
    40,
    18
);

pdf.setFontSize(14);

pdf.text(
    "SOLICITACAO EPI",
    40,
    28
);

pdf.line(
    10,
    38,
    200,
    38
);

    pdf.setFontSize(11);

    pdf.text(
        `Data: ${new Date(item.data).toLocaleDateString("pt-PT")}`,
        20,
        55
    );

    pdf.text(
        `Colaborador: ${item.colaborador}`,
        20,
        70
    );

    pdf.text(
        `Matricula: ${item.matricula}`,
        20,
        85
    );

    pdf.text(
        `Empresa: ${item.empresa}`,
        20,
        100
    );

    pdf.text(
        `Funcao: ${item.funcao}`,
        20,
        115
    );

    pdf.text(
        `EPI: ${item.epi}`,
        20,
        130
    );

    pdf.text(
        `Quantidade: ${item.quantidade}`,
        20,
        145
    );

    pdf.text(
        `Motivo: ${item.motivo}`,
        20,
        160
    );

    pdf.text(
        `Status: ${item.status}`,
        20,
        175
    );

    pdf.save(
        `Solicitacao_EPI_${item.colaborador}.pdf`
    );

}

function historicoEPI(matricula){

    const historico =

    solicitacoesEPI.filter(
        item =>

        item.matricula ===
        matricula
    );

    const div =
    document.getElementById(
        "historicoIndividualEPI"
    );

    if(
        historico.length === 0
    ){

        div.innerHTML =
        "Nenhum registro.";

        return;

    }

    let html = `

        <table>

            <thead>

                <tr>

                    <th>Data</th>

                    <th>EPI</th>

                    <th>Quantidade</th>

                    <th>Motivo</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

    `;

    historico.forEach(
        item => {

            html += `

                <tr>

                    <td>
                        ${new Date(item.data)
                        .toLocaleDateString("pt-PT")}
                    </td>

                    <td>
                        ${item.epi}
                    </td>

                    <td>
                        ${item.quantidade}
                    </td>

                    <td>
                        ${item.motivo}
                    </td>

                    <td>
                        ${item.status}
                    </td>

                </tr>

            `;

        }
    );

    html += `

            </tbody>

        </table>

    `;

    div.innerHTML =
    html;

}

async function aprovarEPI(index){

    const item =
    solicitacoesEPIFiltradas[index];

    const { error } =
    await supabaseClient
    .from("epi_solicitacoes")
    .update({
        status:"Aprovado"
    })
    .eq(
        "id",
        item.id
    );

    if(error){
        console.error(error);
        return;
    }

    await carregarSolicitacoesEPISupabase();
}
async function entregarEPI(index){

    const solicitacao =
    solicitacoesEPI[index];

    const itemEstoque =

    estoqueEPI.find(
        item =>

        item.epi ===
        solicitacao.epi
    );

    if(!itemEstoque){

        alert(
            "EPI não encontrado no estoque."
        );

        return;

    }

    const quantidadeSolicitada =

    Number(
        solicitacao.quantidade
    );

    const quantidadeEstoque =

    Number(
        itemEstoque.quantidade
    );

    if(
        quantidadeEstoque <
        quantidadeSolicitada
    ){

        alert(
            "Estoque insuficiente."
        );

        return;

    }

    const novaQuantidade =
quantidadeEstoque -
quantidadeSolicitada;

await supabaseClient
.from("epi_estoque")
.update({
    quantidade:
    novaQuantidade
})
.eq(
    "id",
    itemEstoque.id
);
await carregarEstoqueEPISupabase();

    const { error } =
await supabaseClient
.from("epi_solicitacoes")
.update({
    status:"Entregue"
})
.eq(
    "id",
    solicitacao.id
);

if(error){
    console.error(error);
    return;
}

await carregarSolicitacoesEPISupabase();

    salvarDados(
        "estoqueEPI",
        estoqueEPI
    );

    salvarDados(
        "solicitacoesEPI",
        solicitacoesEPI
    );

    solicitacoesEPIFiltradas =
    [...solicitacoesEPI];

    atualizarEPI();

    atualizarEstoqueEPI();

}
async function rejeitarEPI(index){

    const item =
    solicitacoesEPIFiltradas[index];

    const { error } =
    await supabaseClient
    .from("epi_solicitacoes")
    .update({
        status:"Rejeitado"
    })
    .eq(
        "id",
        item.id
    );

    if(error){
        console.error(error);
        return;
    }

    await carregarSolicitacoesEPISupabase();
}
function atualizarIndicadoresEPI(){

    document.getElementById(
        "totalSolicitacoesEPI"
    ).textContent =
    solicitacoesEPIFiltradas.length;

    document.getElementById(
        "trocasEPI"
    ).textContent =

    solicitacoesEPIFiltradas.filter(
        item =>

        item.motivo ===
        "Troca por Desgaste"

        ||

        item.motivo ===
        "Troca por Danificação"

    ).length;
const contadorColaboradores = {};

solicitacoesEPIFiltradas.forEach(
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
    colaboradoresEmpatados.length > 0
){

    colaboradorFrequente =

    `${colaboradoresEmpatados[0]} (${maiorColaborador})`;

}

document.getElementById(
    "colaboradorFrequenteEPI"
).textContent =
colaboradorFrequente;

const contadorEPI = {};

solicitacoesEPIFiltradas.forEach(
    item => {

        contadorEPI[
            item.epi
        ] =

        (
            contadorEPI[
                item.epi
            ] || 0
        ) + 1;

    }
);

let epiFrequente = "-";

let maiorEPI = 0;

Object.values(
    contadorEPI
).forEach(valor => {

    if(valor > maiorEPI){

        maiorEPI = valor;

    }

});

const episEmpatados =

Object.keys(
    contadorEPI
).filter(

    epi =>

    contadorEPI[
        epi
    ] ===
    maiorEPI

);

if(
    episEmpatados.length === 1
){

    epiFrequente =

    `${episEmpatados[0]} (${maiorEPI})`;

}
else if(
    episEmpatados.length <= 3
){

    epiFrequente =

    `${episEmpatados.join(" / ")} (${maiorEPI})`;

}
else{

    epiFrequente =

    `${episEmpatados.length} EPIs (${maiorEPI})`;

}

document.getElementById(
    "epiFrequente"
).textContent =
epiFrequente;

const contadorEmpresas = {};

solicitacoesEPIFiltradas.forEach(
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
    empresasEmpatadas.length > 0
){

    empresaFrequente =

    `${empresasEmpatadas[0]} (${maiorEmpresa})`;

}

document.getElementById(
    "empresaFrequenteEPI"
).textContent =
empresaFrequente;

const hoje =
new Date();

const mesAtual =
hoje.getMonth();

const anoAtual =
hoje.getFullYear();

const solicitacoesMes =

solicitacoesEPIFiltradas.filter(
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
    "solicitacoesMesEPI"
).textContent =
solicitacoesMes;

document.getElementById(
    "pendentesEPI"
).textContent =

solicitacoesEPIFiltradas.filter(
    item =>
    item.status ===
    "Pendente"
).length;

document.getElementById(
    "aprovadosEPI"
).textContent =

solicitacoesEPIFiltradas.filter(
    item =>
    item.status ===
    "Aprovado"
).length;

document.getElementById(
    "entreguesEPI"
).textContent =

solicitacoesEPIFiltradas.filter(
    item =>
    item.status ===
    "Entregue"
).length;

document.getElementById(
    "rejeitadosEPI"
).textContent =

solicitacoesEPIFiltradas.filter(
    item =>
    item.status ===
    "Rejeitado"
).length;

document.getElementById(
    "estoqueTotalEPI"
).textContent =

estoqueEPI.reduce(

    (total,item) =>

    total +

    Number(
        item.quantidade || 0
    ),

    0

);

document.getElementById(
    "estoqueBaixoEPI"
).textContent =

estoqueEPI.filter(
    item =>

    Number(
        item.quantidade
    ) <= 10

).length;

document.getElementById(
    "semEstoqueEPI"
).textContent =

estoqueEPI.filter(
    item =>

    Number(
        item.quantidade
    ) === 0

).length;


}
let colaboradorSelecionadoEPI =
null;
function carregarListaEPI(){

    const select =
    document.getElementById(
        "epiSolicitado"
    );

    if(!select) return;

    select.innerHTML = "";

    listaEPIs.forEach(
        epi => {

            const option =
            document.createElement(
                "option"
            );

            option.value =
            epi;

            option.textContent =
            epi;

            select.appendChild(
                option
            );

        }
    );

}
const listaEPIs = [

    // CABEÇA
    "Capacete de Segurança",
    "Capacete Classe B",
    "Capacete para Trabalho em Altura",
    "Capacete com Jugular",

    // OLHOS
    "Óculos de Segurança Incolor",
    "Óculos de Segurança Fumado",
    "Óculos de Segurança Ampla Visão",
    "Óculos para Soldadura",

    // FACE
    "Protetor Facial",
    "Viseira Facial",
    "Máscara de Solda Manual",
    "Máscara de Solda Automática",

    // AUDIÇÃO
    "Protetor Auricular Plug",
    "Protetor Auricular Concha",

    // PROTEÇÃO RESPIRATÓRIA
    "Respirador PFF1",
    "Respirador PFF2",
    "Respirador PFF3",
    "Máscara Semifacial",
    "Máscara Facial Inteira",
    "Cartucho para Vapores Orgânicos",
    "Cartucho para Gases Ácidos",
    "Filtro Mecânico",
    "Filtro Químico",

    // MÃOS
    "Luva de Raspa",
    "Luva de Vaqueta",
    "Luva Anticorte",
    "Luva Nitrílica",
    "Luva PVC",
    "Luva para Solda",
    "Luva Isolante Elétrica",
    "Luva de Borracha",
    "Luva Térmica",

    // CORPO
    "Colete Refletivo",
    "Colete Refletivo Classe 2",
    "Colete Refletivo Classe 3",
    "Macacão",
    "Macacão Antichama",
    "Vestimenta Antichama FR",
    "Avental de Raspa",
    "Avental PVC",
    "Jaqueta de Soldador",

    // BRAÇOS
    "Mangote de Raspa",
    "Mangote Anticorte",
    "Mangote para Solda",

    // PERNAS
    "Perneira de Raspa",
    "Perneira PVC",

    // PÉS
    "Botina de Segurança",
    "Bota de Borracha",
    "Bota PVC",
    "Bota para Soldador",
    "Sapato de Segurança",
    

    // TRABALHO EM ALTURA
    "Cinturão Paraquedista",
    "Talabarte Simples",
    "Talabarte Duplo",
    "Trava-Quedas",
    "Linha de Vida",
    "Conector Mosquetão",

    // ESPAÇO CONFINADO
    "Tripé de Resgate",
    "Guincho de Resgate",
    "Detector Multigás",

    // ÓLEO E GÁS
    "Balaclava Antichama",
    "Vestimenta FR",
    "Capuz Antichama",

    // MINERAÇÃO
    "Lanterna de Segurança",
    "Capacete Mineiro",
    "Respirador para Poeiras Minerais",

    // MARÍTIMO
    "Colete Salva-Vidas",

    // CHUVA
    "Capa de Chuva",
    "Conjunto Impermeável",

    // OUTROS
    "Protetor Solar",
    "Creme Protetor para Pele",
    "Óculos para Laser",
    "Avental de Chumbo"

];
const pesquisaEPI =
document.getElementById(
    "pesquisaEPI"
);

if(pesquisaEPI){

    pesquisaEPI.addEventListener(

        "input",

        () => {

            const termo =

            pesquisaEPI.value
            .toLowerCase();

            solicitacoesEPIFiltradas =

            solicitacoesEPI.filter(
                item =>

                (item.colaborador || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.empresa || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.epi || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.status || "")
                .toLowerCase()
                .includes(termo)

            );

            atualizarEPI();

        }

    );

}
function filtrarEPI(){

    const inicio =
    document.getElementById(
        "dataInicioEPI"
    ).value;

    const fim =
    document.getElementById(
        "dataFimEPI"
    ).value;

    solicitacoesEPIFiltradas =

    solicitacoesEPI.filter(
        item => {

            if(!item.data)
            return false;

            return (

                (!inicio ||
                 item.data >= inicio)

                &&

                (!fim ||
                 item.data <= fim)

            );

        }
    );

    atualizarEPI();

}
function limparFiltroEPI(){

    document.getElementById(
        "dataInicioEPI"
    ).value = "";

    document.getElementById(
        "dataFimEPI"
    ).value = "";

    solicitacoesEPIFiltradas =
    [...solicitacoesEPI];

    atualizarEPI();

}
carregarListaEPI();

carregarEPIsEstoque();

atualizarEPI();

atualizarEstoqueEPI();
/* ==========================================
   DDS ELETRONICO
========================================== */

const tabelaDDS =
document.querySelector(
    "#tabelaDDS tbody"
);

const formDDS =
document.getElementById(
    "formDDS"
);

let ddsAtivos = [];

let ddsFiltrados = [];

/* ===========================
   CRIAR DDS
=========================== */

if(formDDS){

    formDDS.addEventListener(

        "submit",

        async e => {

            e.preventDefault();

           const { error } =
await supabaseClient
.from("dds")
.insert([{
empresa_id:
window.empresaAtual,
    data_dds:
    document.getElementById(
        "dataDDS"
    ).value,

    tema:
    document.getElementById(
        "temaDDS"
    ).value,

    responsavel:
    document.getElementById(
        "responsavelDDS"
    ).value

}]);

if(error){

    console.error(error);

    return;
}

await carregarDDSSupabase();

formDDS.reset();

alert(
    "DDS criado com sucesso!"
);
        }

    );

}

/* ===========================
   TABELA
=========================== */
async function carregarDDSSupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("dds")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .order(
        "data_dds",
        {
            ascending:false
        }
    );

    if(error){
        console.error(error);
        return;
    }

    const { data: participantesDDS } =
    await supabaseClient
    .from("dds_participantes")
    .select("*")
.eq("empresa_id",window.empresaAtual);

    ddsAtivos =
    (data || []).map(item => ({

        id: item.id,

        data: item.data_dds,

        tema: item.tema,

        responsavel: item.responsavel,

        totalParticipantes:
        (participantesDDS || [])
        .filter(
            p => p.dds_id === item.id
        ).length

    }));

    ddsFiltrados =
    [...ddsAtivos];

    atualizarDDS();
}
function atualizarDDS(){

    if(!tabelaDDS) return;

    tabelaDDS.innerHTML =
    "";

    ddsFiltrados.forEach(

        (item,index) => {

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `

                <td>${item.data}</td>

                <td>${item.tema}</td>

                <td>${item.responsavel}</td>

                <td>${item.totalParticipantes || 0}</td>

                <td>

    <button onclick="verParticipantesDDS(${index})">
        👥
    </button>

    <button onclick="imprimirDDS(${index})">
        🖨️
    </button>

    <button onclick="eliminarDDS(${index})">
        🗑️
    </button>

</td>
            `;

            tabelaDDS.appendChild(
                linha
            );

        }

    );

    atualizarIndicadoresDDS();


const colaboradores =
window.colaboradores || [];

const totalColaboradores =

Array.isArray(
    colaboradores
)

?

colaboradores.length

:

0;



}
async function imprimirDDS(index){

    const dds =
    ddsFiltrados[index];

    const { data: participantes } =
await supabaseClient
.from("dds_participantes")
.select("*")
.eq("empresa_id",window.empresaAtual)
.eq(
    "dds_id",
    dds.id
);

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();
const logo =
document.getElementById(
    "logoTalanga"
);

if (logo) {

    pdf.addImage(
        logo,
        "PNG",
        10,
        8,
        20,
        20
    );

}

pdf.setFontSize(18);

pdf.text(
    "TALANGA HSE",
    40,
    18
);

pdf.setFontSize(14);

pdf.text(
    "RELATÓRIO DDS ELETRONICO",
    40,
    28
);

pdf.line(
    10,
    38,
    200,
    38
);

    pdf.setFontSize(11);

    pdf.text(
        `Tema: ${dds.tema}`,
        20,
        55
    );

    pdf.text(
        `Data: ${dds.data}`,
        20,
        70
    );

    pdf.text(
        `Responsavel: ${dds.responsavel}`,
        20,
        85
    );

    pdf.text(
    `Participantes: ${(participantes || []).length}`,
    20,
    100
);

    let y = 120;

    pdf.setFontSize(12);

    pdf.text(
        "Lista de Participantes",
        20,
        y
    );

    y += 10;

   (participantes || []).forEach(
        (participante,index) => {

            pdf.text(

                `${index + 1}. ${participante.colaborador} (${participante.matricula})`,

                20,

                y

            );

            y += 8;

            if(y > 270){

                pdf.addPage();

                y = 20;

            }

        }
    );

    pdf.save(

        `DDS_${dds.tema}_${dds.data}.pdf`

    );

}
/* ===========================
   MODULO FALATALANGA
=========================== */

const tabelaFalaTalanga =
document.querySelector(
    "#tabelaFalaTalanga tbody"
);

let falaTalanga = [];

let falaTalangaFiltrado = [];

async function carregarFalaTalangaSupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("fala_talanga")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .order(
        "created_at",
        {
            ascending: false
        }
    );

    if(error){

        console.error(
            "Erro Fala Talanga:",
            error
        );

        return;
    }

    falaTalanga =
    (data || []).map(item => ({

        id: item.id,

        data:
        item.created_at,

        colaborador:
        item.colaborador,

        matricula:
        item.matricula,

        empresa:
        item.empresa,

        funcao:
        item.funcao,

        tipo:
        item.tipo,

        mensagem:
        item.mensagem,

        status:
        item.status,

        resposta:
        item.resposta

    }));

    falaTalangaFiltrado =
    [...falaTalanga];

    atualizarFalaTalanga();
}

function atualizarFalaTalanga(){

    if(!tabelaFalaTalanga)
    return;

    tabelaFalaTalanga.innerHTML =
    "";

   falaTalangaFiltrado.forEach(
    (item,index) => {

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `

    <td>${item.data}</td>

    <td>${item.colaborador}</td>

    <td>${item.empresa}</td>

    <td>${item.tipo}</td>

    <td>${item.mensagem}</td>

   <td>

${
    item.status === "Aberto"

    ? "🟡 Aberto"

    :

    item.status ===
    "Em Tratamento"

    ? "🔵 Em Tratamento"

    :

    "🟢 Fechado"
}

</td>

    <td>
        ${item.resposta || "-"}
    </td>

    <td>

        <button
            onclick="
                responderFalaTalanga(${index})
            "
        >
            💬
        </button>
        <button
    onclick="
        colocarEmTratamento(
            ${index}
        )
    "
>
    🔵
</button>
<button
    onclick="
        eliminarFalaTalanga(${index})
    "
>
    🗑️
</button>
<button
    onclick="
        imprimirFalaTalanga(${index})
    "
>
    🖨️
</button>
    </td>



            `;

            tabelaFalaTalanga.appendChild(
                linha
            );

        }
    );

    atualizarIndicadoresFalaTalanga();

}
function atualizarIndicadoresFalaTalanga(){

    document.getElementById(
        "totalFalaTalanga"
    ).textContent =
    falaTalanga.length;

    document.getElementById(
        "sugestoesFalaTalanga"
    ).textContent =

    falaTalanga.filter(
        item =>
        item.tipo === "Sugestão"
    ).length;

    document.getElementById(
        "reclamacoesFalaTalanga"
    ).textContent =

    falaTalanga.filter(
        item =>
        item.tipo === "Reclamação"
    ).length;

    document.getElementById(
        "denunciasFalaTalanga"
    ).textContent =

    falaTalanga.filter(
        item =>
        item.tipo === "Denúncia"
    ).length;

    document.getElementById(
        "elogiosFalaTalanga"
    ).textContent =

    falaTalanga.filter(
        item =>
        item.tipo === "Elogio"
    ).length;
document.getElementById(
    "observacoesFalaTalanga"
).textContent =

falaTalanga.filter(
    item =>
    item.tipo === "Observação"
).length;
document.getElementById(
    "emTratamentoFalaTalanga"
).textContent =

falaTalanga.filter(
    item =>
    item.status ===
    "Em Tratamento"
).length;

document.getElementById(
    "fechadosFalaTalanga"
).textContent =

falaTalanga.filter(
    item =>
    item.status ===
    "Fechado"
).length;


}
async function colocarEmTratamento(index){

    const item =
    falaTalangaFiltrado[index];

    const { error } =
    await supabaseClient
    .from("fala_talanga")
    .update({

        status:
        "Em Tratamento"

    })
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;
    }

    await carregarFalaTalangaSupabase();
}
function filtrarFalaTalanga(){

    const inicio =
    document.getElementById(
        "dataInicioFalaTalanga"
    ).value;

    const fim =
    document.getElementById(
        "dataFimFalaTalanga"
    ).value;

    falaTalangaFiltrado =

    falaTalanga.filter(
        item =>

        (
            !inicio ||
            item.data >= inicio
        )

        &&

        (
            !fim ||
            item.data <= fim
        )

    );

    atualizarFalaTalanga();

}
function limparFiltroFalaTalanga(){

    document.getElementById(
        "dataInicioFalaTalanga"
    ).value = "";

    document.getElementById(
        "dataFimFalaTalanga"
    ).value = "";

    falaTalangaFiltrado =
    [...falaTalanga];

    atualizarFalaTalanga();

}
function imprimirFalaTalanga(index){

    const item =
    falaTalanga[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();
const logo =
document.getElementById(
    "logoTalanga"
);

if (logo) {

    pdf.addImage(
        logo,
        "PNG",
        10,
        8,
        20,
        20
    );

}

pdf.setFontSize(18);

pdf.text(
    "TALANGA HSE",
    40,
    18
);

pdf.setFontSize(14);

pdf.text(
    "RELATÓRIO FALA TALANGA",
    40,
    28
);

pdf.line(
    10,
    38,
    200,
    38
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
        `Empresa: ${item.empresa}`,
        20,
        85
    );

    pdf.text(
        `Tipo: ${item.tipo}`,
        20,
        100
    );

    pdf.text(
        `Status: ${item.status}`,
        20,
        115
    );

    pdf.text(
        "Mensagem:",
        20,
        135
    );

    pdf.text(
        item.mensagem || "-",
        20,
        145
    );

    pdf.text(
        "Resposta:",
        20,
        175
    );

    pdf.text(
        item.resposta || "-",
        20,
        185
    );

    pdf.save(
        `FalaTalanga_${item.colaborador}.pdf`
    );

}
async function responderFalaTalanga(index){

    const resposta = prompt(
        "Digite a resposta:"
    );

    if(!resposta) return;

    const item =
    falaTalangaFiltrado[index];

    const { error } =
    await supabaseClient
    .from("fala_talanga")
    .update({

        resposta:
        resposta,

        status:
        "Fechado"

    })
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;
    }

    await carregarFalaTalangaSupabase();
}
async function eliminarFalaTalanga(index){

    if(
        !confirm(
            "Eliminar registo?"
        )
    ) return;

    const item =
    falaTalangaFiltrado[index];

    const { error } =
    await supabaseClient
    .from("fala_talanga")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;
    }

    await carregarFalaTalangaSupabase();
}

atualizarFalaTalanga();
/* ===========================
   FILTRO
=========================== */

function filtrarDDS(){

    const inicio =
    document.getElementById(
        "dataInicioDDS"
    ).value;

    const fim =
    document.getElementById(
        "dataFimDDS"
    ).value;

    ddsFiltrados =

    ddsAtivos.filter(
        item =>

        (!inicio ||
        item.data >= inicio)

        &&

        (!fim ||
        item.data <= fim)
    );

    atualizarDDS();

}

function limparFiltroDDS(){

    document.getElementById(
        "dataInicioDDS"
    ).value = "";

    document.getElementById(
        "dataFimDDS"
    ).value = "";

    ddsFiltrados =
    [...ddsAtivos];

    atualizarDDS();

}

/* ===========================
   INDICADORES
=========================== */
async function carregarIndicadoresDDS(){

    const { data, error } =
    await supabaseClient
    .from("dds_participantes")
    .select("*")
.eq("empresa_id",window.empresaAtual);

    if(error){

        console.error(error);

        return;
    }

    document.getElementById(
        "participantesDDS"
    ).textContent =
    data.length;

   const matriculasUnicas =
new Set(
    data.map(
        item => item.matricula
    )
);

const listaColaboradores =
Array.isArray(window.colaboradores)
? window.colaboradores
: [];

const totalColaboradores =
listaColaboradores.length;
    const taxa =
    totalColaboradores === 0
    ? 0
    : Math.round(
        (
            matriculasUnicas.size
            /
            totalColaboradores
        ) * 100
    );

    const taxaElemento =
    document.getElementById(
        "taxaParticipacaoDDS"
    );

    if(taxaElemento){

        taxaElemento.textContent =
        `${taxa}%`;
    }

    const contador = {};

    data.forEach(item => {

        contador[
            item.colaborador
        ] =

        (
            contador[
                item.colaborador
            ] || 0
        ) + 1;

    });

    let nomeTop = "-";
    let maior = 0;

    Object.entries(
        contador
    ).forEach(
        ([nome,total]) => {

            if(total > maior){

                maior = total;

                nomeTop =
                `${nome} (${total})`;
            }

        }
    );

    const maisParticipa =
    document.getElementById(
        "maisParticipaDDS"
    );

    if(maisParticipa){

        maisParticipa.textContent =
        nomeTop;
    }



const semDDS =
listaColaboradores.filter(  colaborador =>

        !matriculasUnicas.has(
            colaborador.matricula
        )
    );

    const elementoNunca =
    document.getElementById(
        "nuncaParticiparamDDS"
    );

    if(elementoNunca){

        elementoNunca.textContent =
        semDDS.length;
    }

    const lista =
    document.getElementById(
        "listaSemDDS"
    );

    if(lista){

        lista.innerHTML =
        semDDS.map(
            item =>

            `<p>
                ${item.nome}
                (${item.matricula})
            </p>`
        ).join("");
    }
}

function atualizarIndicadoresDDS(){

    const totalDDS =
    ddsFiltrados.length;

    const elementoTotalDDS =
    document.getElementById(
        "totalDDS"
    );

    if(elementoTotalDDS){

        elementoTotalDDS.textContent =
        totalDDS;
    }

    carregarIndicadoresDDS();

    const temas = {};

    ddsFiltrados.forEach(dds => {

        temas[dds.tema] =
        (temas[dds.tema] || 0) + 1;

    });

    let temaTop = "-";
    let maiorTema = 0;

    Object.entries(temas).forEach(
        ([tema,total]) => {

            if(total > maiorTema){

                maiorTema = total;

                temaTop =
                `${tema} (${total})`;
            }

        }
    );

    const temaDDS =
    document.getElementById(
        "temaDDSFrequente"
    );

    if(temaDDS){

        temaDDS.textContent =
        temaTop;
    }
}

/* ===========================
   ELIMINAR
=========================== */

async function eliminarDDS(index){

    if(
        !confirm(
            "Eliminar DDS?"
        )
    ) return;

    const item =
    ddsFiltrados[index];

    const { error } =
    await supabaseClient
    .from("dds")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;
    }

    await carregarDDSSupabase();
}

/* ===========================
   PARTICIPANTES
=========================== */

async function verParticipantesDDS(index){

    const dds =
    ddsFiltrados[index];

    const { data, error } =
    await supabaseClient
    .from("dds_participantes")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .eq(
        "dds_id",
        dds.id
    );

    if(error){

        console.error(error);

        return;
    }

    const div =
    document.getElementById(
        "participantesDDSDetalhe"
    );

    if(
        !data ||
        data.length === 0
    ){

        div.innerHTML =
        "Nenhum participante.";

        return;
    }

    let html = "<ul>";

    data.forEach(item => {

        html += `
            <li>
                ${item.colaborador}
                (${item.matricula})
            </li>
        `;

    });

    html += "</ul>";

    div.innerHTML = html;
}
/* ===========================
   INICIALIZAÇÃO
=========================== */

carregarDDSSupabase();
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

let inspecoes = [];

let indiceEdicaoInspecao =
null;

function solicitarEPI(index){

    const colaborador =
    colaboradores[index];

    colaboradorSelecionadoEPI =
    colaborador;

    document.getElementById(
        "colaboradorEPI"
    ).value =
    colaborador.nome;

    document.getElementById(
        "matriculaEPI"
    ).value =
    colaborador.matricula;

    document.getElementById(
        "empresaEPI"
    ).value =
    colaborador.empresa;

    document.getElementById(
        "funcaoEPI"
    ).value =
    colaborador.funcao;

    document
    .getElementById(
        "secaoEPI"
    )
    .scrollIntoView({
        behavior:"smooth"
    });

}
const formSolicitacaoEPI =
document.getElementById(
    "formSolicitacaoEPI"
);

if(formSolicitacaoEPI){

    formSolicitacaoEPI.addEventListener(

        "submit",

        e => {

            e.preventDefault();

            if(
                !colaboradorSelecionadoEPI
            ) return;

            const solicitacao = {

                data:
                new Date()
                .toISOString(),

                colaborador:
                colaboradorSelecionadoEPI.nome,

                matricula:
                colaboradorSelecionadoEPI.matricula,

                empresa:
                colaboradorSelecionadoEPI.empresa,

                funcao:
                colaboradorSelecionadoEPI.funcao,

                epi:
                document.getElementById(
                    "epiSolicitado"
                ).value,

                quantidade:
                document.getElementById(
                    "quantidadeEPI"
                ).value,

                motivo:
                document.getElementById(
                    "motivoEPI"
                ).value,

                status:
                "Pendente"

            };

            solicitacoesEPI.push(
                solicitacao
            );

            salvarDados(
                "solicitacoesEPI",
                solicitacoesEPI
            );

            solicitacoesEPIFiltradas =
            [...solicitacoesEPI];

            atualizarEPI();

            formSolicitacaoEPI
            .reset();

            alert(
                "Solicitação registrada!"
            );

        }

    );

}
async function carregarInspecoesSupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("inspecoes")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .order("data_inspecao", {
        ascending: false
    });

    if(error){
        console.error(
            "Erro Inspecoes:",
            error
        );
        return;
    }

    inspecoes = data || [];


inspecoes = (data || []).map(item => ({
    id: item.id,
    data: item.data_inspecao,
    atividade: item.atividade,
    area: item.area,
    responsavel: item.responsavel,
    tipo: item.tipo,
    descricao: item.descricao,
    acaoCorretiva: item.acao_corretiva,
    prazo: item.prazo,
    status: item.status
}));




    atualizarInspecoes();
}



function atualizarInspecoes(
    lista = inspecoes
){

    if(!tabelaInspecoes) return;

    tabelaInspecoes.innerHTML = "";

    lista.forEach(

        (item,index) => {

            adicionarLinha(

                tabelaInspecoes,

                `

                <td>${item.data || "-"}</td>

<td>${item.atividade || "-"}</td>

<td>${item.area || "-"}</td>

<td>${item.responsavel || "-"}</td>

<td>${item.tipo || "-"}</td>

<td>${item.descricao || "-"}</td>

<td>${item.acaoCorretiva || "-"}</td>

<td>${item.prazo || "-"}</td>

<td>${item.status || "-"}</td>

<td>

    <button
        type="button"
        onclick="
            editarInspecao(${index})
        "
    >
        ✏️
    </button>

    <button
        type="button"
        onclick="
            imprimirInspecao(${index})
        "
    >
        🖨️
    </button>

    <button
        type="button"
        onclick="
            eliminarInspecao(${index})
        "
    >
        🗑️
    </button>

</td>
                `

            );

        }

    );
atualizarIndicadoresInspecoes();
}

function filtrarInspecoes(){

    const inicio =
    document.getElementById(
        "dataInicioInspecao"
    ).value;

    const fim =
    document.getElementById(
        "dataFimInspecao"
    ).value;

    let resultados =
    [...inspecoes];

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

    atualizarInspecoes(
        resultados
    );
atualizarIndicadoresInspecoesPeriodo(
    resultados
);
}

function limparFiltroInspecoes(){

    document.getElementById(
        "dataInicioInspecao"
    ).value = "";

    document.getElementById(
        "dataFimInspecao"
    ).value = "";

    atualizarInspecoes();

    atualizarIndicadoresInspecoes();

}

function atualizarIndicadoresInspecoes(){

    document.getElementById(
        "totalInspecoes"
    ).textContent =
    inspecoes.length;

    document.getElementById(
        "abertasInspecoes"
    ).textContent =

    inspecoes.filter(
        item =>
        item.status ===
        "Aberto"
    ).length;

    document.getElementById(
        "tratamentoInspecoes"
    ).textContent =

    inspecoes.filter(
        item =>
        item.status ===
        "Em Tratamento"
    ).length;

    document.getElementById(
        "fechadasInspecoes"
    ).textContent =

    inspecoes.filter(
        item =>
        item.status ===
        "Fechado"
    ).length;

    const contadorAreas = {};

    inspecoes.forEach(item => {

        contadorAreas[item.area] =

        (
            contadorAreas[item.area]
            || 0
        ) + 1;

   const contadorTipos = {};

inspecoes.forEach(item => {

    contadorTipos[item.tipo] =

    (
        contadorTipos[item.tipo]
        || 0
    ) + 1;

});

let tipoFrequente = "-";

let maiorQuantidadeTipo = 0;

Object.values(
    contadorTipos
).forEach(valor => {

    if(valor > maiorQuantidadeTipo){

        maiorQuantidadeTipo =
        valor;

    }

});

const tiposEmpatados =

Object.keys(
    contadorTipos
).filter(

    tipo =>

    contadorTipos[tipo] ===
    maiorQuantidadeTipo

);

if(tiposEmpatados.length === 1){

    tipoFrequente =

    `${tiposEmpatados[0]} (${maiorQuantidadeTipo})`;

}
else if(tiposEmpatados.length <= 3){

    tipoFrequente =

    `${tiposEmpatados.join(" / ")} (${maiorQuantidadeTipo})`;

}
else{

    tipoFrequente =

    `${tiposEmpatados.length} Tipos (${maiorQuantidadeTipo})`;

}

document.getElementById(
    "tipoFrequenteInspecao"
).textContent =
tipoFrequente;
``
   
    });

    let areaFrequente = "-";

    let maiorQuantidade = 0;

    Object.values(
        contadorAreas
    ).forEach(valor => {

        if(valor > maiorQuantidade){

            maiorQuantidade = valor;

        }

    });

    const empatadas =

    Object.keys(
        contadorAreas
    ).filter(

        area =>

        contadorAreas[area] ===
        maiorQuantidade

    );

    if(empatadas.length === 1){

        areaFrequente =

        `${empatadas[0]} (${maiorQuantidade})`;

    }
    else if(empatadas.length <= 3){

        areaFrequente =

        `${empatadas.join(" / ")} (${maiorQuantidade})`;

    }
    else{

        areaFrequente =

        `${empatadas.length} Áreas (${maiorQuantidade})`;

    }

    document.getElementById(
        "areaFrequenteInspecao"
    ).textContent =
    areaFrequente;

}

if(formInspecao){

    formInspecao.addEventListener(

        "submit",

        async e => {

            e.preventDefault();

            const novaInspecao = {

                data:
                document.getElementById(
                    "dataInspecao"
                ).value,

                atividade:
                document.getElementById(
                    "atividadeInspecao"
                ).value,

                area:
                document.getElementById(
                    "areaInspecao"
                ).value,

                responsavel:
                document.getElementById(
                    "responsavelInspecao"
                ).value,

                tipo:
                document.getElementById(
                    "tipoInspecao"
                ).value,

                descricao:
                document.getElementById(
                    "descricaoInspecao"
                ).value,

                acaoCorretiva:
                document.getElementById(
                    "acaoCorretivaInspecao"
                ).value,

                prazo:
                document.getElementById(
                    "prazoInspecao"
                ).value,

                status:
                document.getElementById(
                    "statusInspecao"
                ).value

            };

           let error;

if(
    indiceEdicaoInspecao !== null
){

    ({ error } =
    await supabaseClient
    .from("inspecoes")
    .update({

        data_inspecao:
        novaInspecao.data,

        atividade:
        novaInspecao.atividade,

        area:
        novaInspecao.area,

        responsavel:
        novaInspecao.responsavel,

        tipo:
        novaInspecao.tipo,

        descricao:
        novaInspecao.descricao,

        acao_corretiva:
        novaInspecao.acaoCorretiva,

        prazo:
        novaInspecao.prazo,

        status:
        novaInspecao.status

    })
    .eq(
        "id",
        indiceEdicaoInspecao
    ));
indiceEdicaoInspecao = null;
}
else{

    ({ error } =
    await supabaseClient
    .from("inspecoes")
    .insert([{
empresa_id:
window.empresaAtual,
        data_inspecao:
        novaInspecao.data,

        atividade:
        novaInspecao.atividade,

        area:
        novaInspecao.area,

        responsavel:
        novaInspecao.responsavel,

        tipo:
        novaInspecao.tipo,

        descricao:
        novaInspecao.descricao,

        acao_corretiva:
        novaInspecao.acaoCorretiva,

        prazo:
        novaInspecao.prazo,

        status:
        novaInspecao.status

    }]));
}

if(error){
    console.error(error);
    alert("Erro ao gravar inspeção.");
    return;
}

await carregarInspecoesSupabase();

formInspecao.reset();

        }

    );
const contadorResponsaveis = {};

inspecoes.forEach(item => {

    contadorResponsaveis[
        item.responsavel
    ] =

    (
        contadorResponsaveis[
            item.responsavel
        ] || 0
    ) + 1;

});

let responsavelFrequente = "-";

let maiorQuantidadeResponsavel = 0;

Object.values(
    contadorResponsaveis
).forEach(valor => {

    if(valor > maiorQuantidadeResponsavel){

        maiorQuantidadeResponsavel =
        valor;

    }

});

const responsaveisEmpatados =

Object.keys(
    contadorResponsaveis
).filter(

    responsavel =>

    contadorResponsaveis[
        responsavel
    ] ===
    maiorQuantidadeResponsavel

);

if(
    responsaveisEmpatados.length === 1
){

    responsavelFrequente =

    `${responsaveisEmpatados[0]} (${maiorQuantidadeResponsavel})`;

}
else if(
    responsaveisEmpatados.length <= 3
){

    responsavelFrequente =

    `${responsaveisEmpatados.join(" / ")} (${maiorQuantidadeResponsavel})`;

}
else{

    responsavelFrequente =

    `${responsaveisEmpatados.length} Responsáveis (${maiorQuantidadeResponsavel})`;

}

document.getElementById(
    "responsavelFrequente"
).textContent =
responsavelFrequente;
}

async function eliminarInspecao(index){

    if(
        !confirm(
            "Eliminar inspeção?"
        )
    ) return;

    const item =
    inspecoes[index];

    const { error } =
    await supabaseClient
    .from("inspecoes")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        alert(
            "Erro ao eliminar."
        );

        return;
    }

    await carregarInspecoesSupabase();
}
function atualizarIndicadoresInspecoesPeriodo(lista){

    document.getElementById(
        "totalInspecoes"
    ).textContent =
    lista.length;

    document.getElementById(
        "abertasInspecoes"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Aberto"
    ).length;

    document.getElementById(
        "tratamentoInspecoes"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Em Tratamento"
    ).length;

    document.getElementById(
        "fechadasInspecoes"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Fechado"
    ).length;

}

function editarInspecao(index){

    const item =
    inspecoes[index];

    document.getElementById(
        "dataInspecao"
    ).value =
    item.data || "";

    document.getElementById(
        "atividadeInspecao"
    ).value =
    item.atividade || "";

    document.getElementById(
        "areaInspecao"
    ).value =
    item.area || "";

    document.getElementById(
        "responsavelInspecao"
    ).value =
    item.responsavel || "";

    document.getElementById(
        "tipoInspecao"
    ).value =
    item.tipo || "";

    document.getElementById(
        "descricaoInspecao"
    ).value =
    item.descricao || "";

    document.getElementById(
        "acaoCorretivaInspecao"
    ).value =
    item.acaoCorretiva || "";

    document.getElementById(
        "prazoInspecao"
    ).value =
    item.prazo || "";

    document.getElementById(
        "statusInspecao"
    ).value =
    item.status || "";

    indiceEdicaoInspecao =
    item.id;

    console.log(
        "EDITANDO ID:",
        indiceEdicaoInspecao
    );
}

function imprimirInspecao(index){

    const item =
    inspecoes[index];
    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();
const logo =
document.getElementById(
    "logoTalanga"
);

if (logo) {

    pdf.addImage(
        logo,
        "PNG",
        10,
        8,
        20,
        20
    );

}

pdf.setFontSize(18);

pdf.text(
    "TALANGA HSE",
    40,
    18
);

pdf.setFontSize(14);

pdf.text(
    "RELATÓRIO DE INSPECÃO",
    40,
    28
);

pdf.line(
    10,
    38,
    200,
    38
);

    pdf.setFontSize(11);

    pdf.text(
        `Data: ${item.data || "-"}`,
        20,
        55
    );

    pdf.text(
        `Atividade: ${item.atividade || "-"}`,
        20,
        70
    );

    pdf.text(
        `Area: ${item.area || "-"}`,
        20,
        85
    );

    pdf.text(
        `Responsavel: ${item.responsavel || "-"}`,
        20,
        100
    );

    pdf.text(
        `Tipo: ${item.tipo || "-"}`,
        20,
        115
    );

    pdf.text(
        `Status: ${item.status || "-"}`,
        20,
        130
    );

    pdf.text(
        `Prazo: ${item.prazo || "-"}`,
        20,
        145
    );

    pdf.text(
        "Descricao:",
        20,
        165
    );

    pdf.text(
        item.descricao || "-",
        20,
        175,
        {
            maxWidth: 160
        }
    );

    pdf.text(
        "Acao Corretiva:",
        20,
        210
    );

    pdf.text(
        item.acaoCorretiva || "-",
        20,
        220,
        {
            maxWidth: 160
        }
    );

    pdf.save(
        `Inspecao_${item.tipo}.pdf`
    );

}





const formOcorrenciasHSE =
document.getElementById(
    "formOcorrenciasHSE"
);
if(formOcorrenciasHSE){

    formOcorrenciasHSE.addEventListener(
        "submit",

        async e => {

            e.preventDefault();

            const registo = {

    data:
    document.getElementById(
        "dataOcorrenciaHSE"
    ).value,

    tipo:
    document.getElementById(
        "tipoOcorrenciaHSE"
    ).value,

    area:
    document.getElementById(
        "areaOcorrenciaHSE"
    ).value,

    local:
    document.getElementById(
        "localOcorrenciaHSE"
    ).value,

    empresa:
    document.getElementById(
        "empresaOcorrenciaHSE"
    ).value,

    colaborador:
    document.getElementById(
        "colaboradorOcorrenciaHSE"
    ).value,

    diasPerdidos:
    Number(
        document.getElementById(
            "diasPerdidosHSE"
        ).value
    ),

    descricao:
    document.getElementById(
        "descricaoOcorrenciaHSE"
    ).value,

    status:
    document.getElementById(
        "statusOcorrenciaHSE"
    ).value

};

            let error;

            if(
                indiceEdicaoOcorrenciaHSE !== null
            ){

                ({ error } =
                await supabaseClient
                .from("ocorrencias_hse")
                .update({

                    data_ocorrencia:
                    registo.data,

                    tipo:
                    registo.tipo,

                    area:
                    registo.area,

                    local:
                    registo.local,
empresa:
registo.empresa,
                    colaborador:
                    registo.colaborador,

                    dias_perdidos:
                    registo.diasPerdidos,

                    descricao:
                    registo.descricao,

                    status:
                    registo.status

                })
                .eq(
                    "id",
                    indiceEdicaoOcorrenciaHSE
                ));

                indiceEdicaoOcorrenciaHSE = null;

            }else{

                ({ error } =
                await supabaseClient
                .from("ocorrencias_hse")
                .insert([{
empresa_id:
window.empresaAtual,
                    data_ocorrencia:
                    registo.data,

                    tipo:
                    registo.tipo,

                    area:
                    registo.area,

                    local:
                    registo.local,

                    empresa:
                    registo.empresa,

                    colaborador:
                    registo.colaborador,

                    dias_perdidos:
                    registo.diasPerdidos,

                    descricao:
                    registo.descricao,

                    status:
                    registo.status

                }]));
            }

            if(error){

                console.error(error);

                alert(
                    "Erro ao gravar ocorrência."
                );

                return;
            }

            await carregarOcorrenciasHSESupabase();

            formOcorrenciasHSE.reset();

            atualizarDashboard();

        }

    );

}

const pesquisaOcorrenciaHSE =
document.getElementById(
    "pesquisaOcorrenciaHSE"
);

if(pesquisaOcorrenciaHSE){

    pesquisaOcorrenciaHSE.addEventListener(
        "input",
        () => {

            const termo =
            pesquisaOcorrenciaHSE.value
            .toLowerCase();

            ocorrenciasHSEFiltradas =

            ocorrenciasHSEFiltradas.filter(
                item =>

                (item.tipo || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.area || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.local || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.colaborador || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.status || "")
                .toLowerCase()
                .includes(termo)
            );

            atualizarOcorrenciasHSE();

        }
    );

}

function filtrarOcorrenciasHSE(){

    const inicio =
    document.getElementById(
        "dataInicioOcorrenciaHSE"
    ).value;

    const fim =
    document.getElementById(
        "dataFimOcorrenciaHSE"
    ).value;

    if(!inicio || !fim){

        alert(
            "Selecione as duas datas."
        );

        return;

    }

    const dataInicio =
    new Date(inicio);

    const dataFim =
    new Date(fim);

    dataFim.setHours(
        23,
        59,
        59,
        999
    );

    ocorrenciasHSEFiltradas =

    ocorrenciasHSE.filter(
        item => {

            const data =
            new Date(
                item.data
            );

            return (
                data >= dataInicio &&
                data <= dataFim
            );

        }
    );

    atualizarOcorrenciasHSE();

}
function limparFiltroOcorrenciasHSE(){

    document.getElementById(
        "dataInicioOcorrenciaHSE"
    ).value = "";

    document.getElementById(
        "dataFimOcorrenciaHSE"
    ).value = "";

    ocorrenciasHSEFiltradas =
    [...ocorrenciasHSE];

    atualizarOcorrenciasHSE();

}


if(pesquisaOcorrenciaHSE){

    pesquisaOcorrenciaHSE
    .addEventListener(
        "input",
        () => {

            const termo =
            pesquisaOcorrenciaHSE
            .value
            .toLowerCase();

            ocorrenciasHSEFiltradas =

            ocorrenciasHSE.filter(
                item =>

                (item.tipo || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.area || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.local || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.colaborador || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.empresa || "")
                .toLowerCase()
                .includes(termo)

                ||

                (item.status || "")
                .toLowerCase()
                .includes(termo)
            );

            atualizarOcorrenciasHSE();

        }
    );

}

function calcularDiasSemAcidente(){

    const acidentesReais =

    ocorrenciasHSEFiltradas.filter(
        item =>

        item.tipo === "ACA" ||

        item.tipo === "Fatalidade"
    );

    const dataBase =
carregarDados(
    "dataBaseAcidente"
);

const hoje =
new Date();

if(
    acidentesReais.length === 0
){

    if(!dataBase){
        return 0;
    }

    return Math.floor(

        (
            hoje -
            new Date(dataBase)
        )

        /

        (1000*60*60*24)

    );

}
    const ultimoAcidente =

    acidentesReais.sort(
        (a,b) =>

        new Date(b.data) -
        new Date(a.data)
    )[0];

    return Math.floor(

        (
            new Date() -
            new Date(
                ultimoAcidente.data
            )
        )

        /

        (1000*60*60*24)

    );

}
window.calcularDiasSemAcidente =
calcularDiasSemAcidente;

async function salvarDataBaseAcidente(){

    const data =
    document.getElementById(
        "dataBaseAcidente"
    ).value;

    const { error } =
    await supabaseClient
    .from("configuracoes_hse")
    const { data: existente } =
await supabaseClient
.from("configuracoes_hse")
.select("id")
.limit(1)

.eq("empresa_id",window.empresaAtual);

if(
    existente &&
    existente.length > 0
){

    await supabaseClient
    .from("configuracoes_hse")
    .update({
        data_base_acidente:data
    })
    .eq(
        "id",
        existente[0].id
    );

}else{

    await supabaseClient
    .from("configuracoes_hse")
    .insert([{
        empresa_id:
window.empresaAtual,
        data_base_acidente:data
    }]);
}
``
    if(error){

        console.error(error);

        alert(
            "Erro ao guardar a data."
        );

        return;
    }

    alert(
        "Data base guardada com sucesso!"
    );

    atualizarDashboard();
}
``
async function carregarDataBaseAcidente() {

    if (!window.empresaAtual) {
        return;
    }

    const { data, error } = await supabaseClient
        .from("configuracoes_hse")
        .select("*")
        .eq("empresa_id", window.empresaAtual)
        .limit(1);

    if (error) {
        console.error(error);
        return;
    }

    const campo = document.getElementById("dataBaseAcidente");

    if (campo && data && data.length > 0) {
        campo.value = data[0].data_base_acidente || "";
    }
}

let indiceEdicaoOcorrenciaHSE = null;



async function carregarOcorrenciasHSESupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("ocorrencias_hse")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .order(
        "data_ocorrencia",
        {
            ascending:false
        }
    );

    if(error){
        console.error(
            "Erro Ocorrencias HSE:",
            error
        );
        return;
    }

    ocorrenciasHSE =
(data || []).map(item => ({

    id: item.id,

    data:
    item.data_ocorrencia,

    tipo:
    item.tipo,

    area:
    item.area,

    local:
    item.local,

    empresa:
    item.empresa,

    colaborador:
    item.colaborador,

    diasPerdidos:
    item.dias_perdidos,

    descricao:
    item.descricao,

    status:
    item.status

}));
    ocorrenciasHSEFiltradas =
    [...ocorrenciasHSE];

    atualizarOcorrenciasHSE();
    atualizarHHT();
}

function atualizarOcorrenciasHSE(){

    const tbody =
    document.querySelector(
        "#tabelaOcorrenciasHSE tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    ocorrenciasHSEFiltradas.forEach(
        (item,index) => {

            tbody.innerHTML += `

            <tbody>

<tr>

    <td>${item.data}</td>

    <td>${item.tipo}</td>

    <td>${item.area}</td>

    <td>${item.local}</td>

    <td>${item.colaborador}</td>

    <td>${item.diasPerdidos}</td>

    <td>${item.status}</td>

    <td>

        <button
            onclick="
                editarOcorrenciaHSE(${index})
            "
        >
            ✏️
        </button>

        <button
            onclick="
                imprimirOcorrenciaHSE(${index})
            "
        >
            🖨️
        </button>

        <button
            onclick="
                eliminarOcorrenciaHSE(${index})
            "
        >
            🗑️
        </button>

    </td>

</tr>
            `;

        }
    );


    
document.getElementById(
    "totalOcorrenciasHSE"
).textContent =
ocorrenciasHSEFiltradas.length;

document.getElementById(
    "nearMissHSE"
).textContent =
ocorrenciasHSEFiltradas.filter(
    item => item.tipo === "Near Miss"
).length;

document.getElementById(
    "saaHSE"
).textContent =
ocorrenciasHSEFiltradas.filter(
    item => item.tipo === "SAA"
).length;

document.getElementById(
    "asaHSE"
).textContent =
ocorrenciasHSEFiltradas.filter(
    item => item.tipo === "ASA"
).length;

document.getElementById(
    "acaHSE"
).textContent =
ocorrenciasHSEFiltradas.filter(
    item => item.tipo === "ACA"
).length;

document.getElementById(
    "fatalidadeHSE"
).textContent =
ocorrenciasHSEFiltradas.filter(
    item => item.tipo === "Fatalidade"
).length;

document.getElementById(
    "diasPerdidosTotal"
).textContent =
ocorrenciasHSE.reduce(
    (total,item) =>
    total +
    Number(
        item.diasPerdidos || 0
    ),
    0
);

}
async function eliminarOcorrenciaHSE(index){

    if(
        !confirm(
            "Eliminar ocorrência?"
        )
    ) return;

    const item =
    ocorrenciasHSE[index];

    const { error } =
    await supabaseClient
    .from("ocorrencias_hse")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        alert(
            "Erro ao eliminar."
        );

        return;
    }

    await carregarOcorrenciasHSESupabase();

    atualizarDashboard();
}
async function imprimirOcorrenciaHSE(index){

    const item =
    ocorrenciasHSEFiltradas[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();
const logo =
document.getElementById(
    "logoTalanga"
);

if (logo) {

    pdf.addImage(
        logo,
        "PNG",
        10,
        8,
        20,
        20
    );

}

pdf.setFontSize(18);

pdf.text(
    "TALANGA HSE",
    40,
    18
);

pdf.setFontSize(14);

pdf.text(
    "RELATÓRIO DE DESVIO",
    40,
    28
);

pdf.line(
    10,
    38,
    200,
    38
);

    pdf.setFontSize(11);

    pdf.text(
        `Data: ${item.data}`,
        20,
        55
    );

    pdf.text(
        `Tipo: ${item.tipo}`,
        20,
        70
    );

    pdf.text(
        `Área: ${item.area}`,
        20,
        85
    );

    pdf.text(
        `Local: ${item.local}`,
        20,
        100
    );

    pdf.text(
        `Empresa: ${item.empresa}`,
        20,
        115
    );

    pdf.text(
        `Colaborador: ${item.colaborador}`,
        20,
        130
    );

    pdf.text(
        `Dias Perdidos: ${item.diasPerdidos}`,
        20,
        145
    );

    pdf.text(
        `Status: ${item.status}`,
        20,
        160
    );

    pdf.text(
        `Descrição: ${item.descricao || ""}`,
        20,
        175
    );

    pdf.save(
        `Ocorrencia_${item.tipo}_${item.data}.pdf`
    );

}

function editarOcorrenciaHSE(index){

    const item =
    ocorrenciasHSE[index];

    document.getElementById(
        "dataOcorrenciaHSE"
    ).value = item.data;

    document.getElementById(
        "tipoOcorrenciaHSE"
    ).value = item.tipo;

    document.getElementById(
        "areaOcorrenciaHSE"
    ).value = item.area;

    document.getElementById(
        "localOcorrenciaHSE"
    ).value = item.local;

    document.getElementById(
        "empresaOcorrenciaHSE"
    ).value = item.empresa;

    document.getElementById(
        "colaboradorOcorrenciaHSE"
    ).value = item.colaborador;

    document.getElementById(
        "diasPerdidosHSE"
    ).value = item.diasPerdidos;

    document.getElementById(
        "descricaoOcorrenciaHSE"
    ).value = item.descricao;

    document.getElementById(
        "statusOcorrenciaHSE"
    ).value = item.status;

   indiceEdicaoOcorrenciaHSE =
item.id;

}

/* ==========================================
   inicicio HHT
========================================== */



let registosHHT = [];

let registosHHTFiltrados = [];

let indiceEdicaoHHT = null;

const formHHT =
document.getElementById(
    "formHHT"
);

const btnRegistarHHT =
document.getElementById(
    "btnRegistarHHT"
);

if(btnRegistarHHT){

    btnRegistarHHT.addEventListener(
        "click",
        registarHHT
    );

}

if(formHHT){

    formHHT.addEventListener(
        "submit",
        registarHHT
    );

}
async function carregarHHTSupabase(){
    if(!window.empresaAtual){
    return;
}

    const { data, error } =
    await supabaseClient
    .from("hht")
    .select("*")
.eq("empresa_id",window.empresaAtual)
    .order(
        "data_inicio",
        {
            ascending:false
        }
    );

    if(error){

        console.error(
            "Erro HHT:",
            error
        );

        return;
    }

    registosHHT =
    (data || []).map(item => ({

        id: item.id,

        semana:
        item.semana,

        dataInicial:
        item.data_inicio,

        dataFinal:
        item.data_fim,

        empresaPrincipal:
        item.empresa_principal,

        empresaSub:
        item.empresa_sub,

        efetivoPrincipal:
        item.efetivo_principal,

        efetivoSub:
        item.efetivo_sub,

        efetivoSemana:
        item.efetivo_semana,

        hhtSemana:
        item.hht_semana,

        ...(item.dados || {})

    }));
registosHHTFiltrados =
[...registosHHT];

atualizarHHT();
   
}

async function registarHHT(e){

   
   
    if(e){
        e.preventDefault();
    }

    const inicioSemana =
    document.getElementById(
        "inicioSemanaHHT"
    ).value;

    const fimSemana =
    document.getElementById(
        "fimSemanaHHT"
    ).value;

    if(
        !inicioSemana ||
        !fimSemana
    ){

        alert(
            "Informe a data inicial e a data final."
        );

        return;

    }

    if(
        inicioSemana > fimSemana
    ){

        alert(
            "A data inicial não pode ser superior à data final."
        );




        
        return;

    }

    const dias = [

        ["seg",8],
        ["ter",8],
        ["qua",8],
        ["qui",8],
        ["sex",8],
        ["sab",7.5],
        ["dom",7.5]

    ];

    let principalTotal = 0;
    let subTotal = 0;
    let hhtSemana = 0;

    dias.forEach(([dia,hora])=>{

        const principal =

            (Number(document.getElementById(`${dia}PMOD`).value) || 0)

            +

            (Number(document.getElementById(`${dia}PMOI`).value) || 0);

        const sub =

            (Number(document.getElementById(`${dia}SMOD`).value) || 0)

            +

            (Number(document.getElementById(`${dia}SMOI`).value) || 0);

        const efetivoDia =

            principal + sub;

        principalTotal += principal;

        subTotal += sub;

        hhtSemana +=

            efetivoDia * hora;

    });

    const efetivoSemana =

        Math.round(

            (principalTotal + subTotal)

            / 7

        );

    const efetivoPrincipal =

        Math.round(
            principalTotal / 7
        );

    const efetivoSub =

        Math.round(
            subTotal / 7
        );

    const registo = {

        semana:
        document.getElementById(
            "semanaHHT"
        ).value,

        dataInicial:
        document.getElementById(
            "inicioSemanaHHT"
        ).value,

        dataFinal:
        document.getElementById(
            "fimSemanaHHT"
        ).value,

        empresaPrincipal:
        document.getElementById(
            "empresaPrincipalHHT"
        ).value,

        empresaSub:
        document.getElementById(
            "empresaSubHHT"
        ).value,

        segPMOD:
        document.getElementById("segPMOD").value,

        segPMOI:
        document.getElementById("segPMOI").value,

        segSMOD:
        document.getElementById("segSMOD").value,

        segSMOI:
        document.getElementById("segSMOI").value,

        terPMOD:
        document.getElementById("terPMOD").value,

        terPMOI:
        document.getElementById("terPMOI").value,

        terSMOD:
        document.getElementById("terSMOD").value,

        terSMOI:
        document.getElementById("terSMOI").value,

        quaPMOD:
        document.getElementById("quaPMOD").value,

        quaPMOI:
        document.getElementById("quaPMOI").value,

        quaSMOD:
        document.getElementById("quaSMOD").value,

        quaSMOI:
        document.getElementById("quaSMOI").value,

        quiPMOD:
        document.getElementById("quiPMOD").value,

        quiPMOI:
        document.getElementById("quiPMOI").value,

        quiSMOD:
        document.getElementById("quiSMOD").value,

        quiSMOI:
        document.getElementById("quiSMOI").value,

        sexPMOD:
        document.getElementById("sexPMOD").value,

        sexPMOI:
        document.getElementById("sexPMOI").value,

        sexSMOD:
        document.getElementById("sexSMOD").value,

        sexSMOI:
        document.getElementById("sexSMOI").value,

        sabPMOD:
        document.getElementById("sabPMOD").value,

        sabPMOI:
        document.getElementById("sabPMOI").value,

        sabSMOD:
        document.getElementById("sabSMOD").value,

        sabSMOI:
        document.getElementById("sabSMOI").value,

        domPMOD:
        document.getElementById("domPMOD").value,

        domPMOI:
        document.getElementById("domPMOI").value,

        domSMOD:
        document.getElementById("domSMOD").value,

        domSMOI:
        document.getElementById("domSMOI").value,

        efetivoPrincipal,

        efetivoSub,

        efetivoSemana,

        hhtSemana

    };
   const existePeriodo =

registosHHT.some(
    item =>

    item.dataInicial === registo.dataInicial
    &&
    item.dataFinal === registo.dataFinal
    &&
    item.id !== indiceEdicaoHHT
);

if(
    existePeriodo
){

    alert(
        "Já existe um registo para este período."
    );

    return;

}

    let error;
console.log(
    "ID EM EDIÇÃO:",
    indiceEdicaoHHT

);

if(indiceEdicaoHHT !== null){

    ({ error } =
    await supabaseClient
    .from("hht")
    .update({

        semana: registo.semana,
        data_inicio: registo.dataInicial,
        data_fim: registo.dataFinal,
        empresa_principal: registo.empresaPrincipal,
        empresa_sub: registo.empresaSub,
        efetivo_principal: registo.efetivoPrincipal,
        efetivo_sub: registo.efetivoSub,
        efetivo_semana: registo.efetivoSemana,
        hht_semana: registo.hhtSemana,
        dados: registo

    })
    .eq(
        "id",
        indiceEdicaoHHT
    ));

    indiceEdicaoHHT = null;

}else{

    ({ error } =
    await supabaseClient
    .from("hht")
    .insert([{
empresa_id:
window.empresaAtual,
        semana: registo.semana,
        data_inicio: registo.dataInicial,
        data_fim: registo.dataFinal,
        empresa_principal: registo.empresaPrincipal,
        empresa_sub: registo.empresaSub,
        efetivo_principal: registo.efetivoPrincipal,
        efetivo_sub: registo.efetivoSub,
        efetivo_semana: registo.efetivoSemana,
        hht_semana: registo.hhtSemana,
        dados: registo

    }]));
}

if(error){

    console.error(error);

    alert(
        "Erro ao gravar HHT."
    );

    return;
}

await carregarHHTSupabase();

formHHT.reset();

}
function filtrarHHT(){

    const inicio =
    document.getElementById(
        "dataInicioHHT"
    ).value;

    const fim =
    document.getElementById(
        "dataFimHHT"
    ).value;

    registosHHTFiltrados =
registosHHT.filter(
        item=>{

            const data =
            new Date(
                item.dataInicial
            );

            const dtInicio =
            new Date(inicio);

            const dtFim =
            new Date(fim);

            dtFim.setHours(
                23,
                59,
                59,
                999
            );

            return (
                data >= dtInicio &&
                data <= dtFim
            );

        }
    );

    atualizarHHT();

}

function limparFiltroHHT(){

    document.getElementById(
        "dataInicioHHT"
    ).value = "";

    document.getElementById(
        "dataFimHHT"
    ).value = "";

    document.getElementById(
        "pesquisaHHT"
    ).value = "";

    registosHHTFiltrados =
    [...registosHHTFiltrados];

    atualizarHHT();

}

const pesquisaHHT =
document.getElementById(
    "pesquisaHHT"
);

if(pesquisaHHT){

    pesquisaHHT.addEventListener(
        "input",
        ()=>{

            const termo =

            pesquisaHHT.value
            .toLowerCase();

           registosHHTFiltrados =

registosHHT.filter(
                item =>

                item.semana
                .toLowerCase()
                .includes(
                    termo
                )

                ||

                item.empresaPrincipal
                .toLowerCase()
                .includes(
                    termo
                )

                ||

                item.empresaSub
                .toLowerCase()
                .includes(
                    termo
                )
            );

            atualizarHHT();

        }
    );

}

document
.getElementById("pesquisaHHT")
.addEventListener(
    "input",
    function(){

        if(
            this.value.trim() === ""
        ){

            registosHHTFiltrados =
            [...registosHHT];

            atualizarHHT();

        }

    }
);



document
.getElementById("dataInicioHHT")
.addEventListener(
    "change",
    verificarLimpezaFiltro
);

document
.getElementById("dataFimHHT")
.addEventListener(
    "change",
    verificarLimpezaFiltro
);
function verificarLimpezaFiltro(){

    const inicio =
    document.getElementById(
        "dataInicioHHT"
    ).value;

    const fim =
    document.getElementById(
        "dataFimHHT"
    ).value;

    if(
        !inicio &&
        !fim
    ){

        registosHHTFiltrados =
        [...registosHHT];

        atualizarHHT();

    }

}


function atualizarHHT(){

    const tbody =
    document.querySelector(
        "#tabelaHHT tbody"
    );


    
    if(!tbody) return;

    tbody.innerHTML = "";

    registosHHTFiltrados.forEach(
        (item,index) => {

            tbody.innerHTML += `

            <tr>

                <td>${item.semana}</td>

                <td>${item.dataInicial}</td>

                <td>${item.dataFinal}</td>

                <td>${item.efetivoPrincipal}</td>

                <td>${item.efetivoSub}</td>

                <td>${item.efetivoSemana}</td>

                <td>${item.hhtSemana}</td>

               <td>

    <button
        onclick="
        editarHHT(${index})
        "
    >
        ✏️
    </button>

    <button
        onclick="
        eliminarHHT(${index})
        "
    >
        🗑️
    </button>

</td>
            </tr>

            `;

            
        }
    );
document.getElementById(
    "hhtMes"
).textContent =

calcularHHTMes()
.toLocaleString(
    "pt-PT"
);

document.getElementById(
    "hhtAcumulado"
).textContent =

calcularHHTAcumulado()
.toLocaleString(
    "pt-PT"
);

document.getElementById(
    "efetivoMesHHT"
).textContent =

calcularEfetivoMes();

const ocorrenciasHSEData =
ocorrenciasHSEFiltradas;

const totalACA =
ocorrenciasHSEData.filter(
    item => item.tipo === "ACA"
).length;

const totalDiasPerdidos =
ocorrenciasHSEData.reduce(
    (total,item) =>
    total +
    Number(item.diasPerdidos || 0),
    0
);

const hhtAcumulado =
registosHHTFiltrados.reduce(
    (total,item) =>
    total +
    Number(item.hhtSemana || 0),
    0
);

const tf =
hhtAcumulado > 0
? (totalACA * 1000000) / hhtAcumulado
: 0;

const tg =
hhtAcumulado > 0
? (totalDiasPerdidos * 1000000) / hhtAcumulado
: 0;
document.getElementById(
    "taxaFrequencia"
).textContent =

tf.toFixed(2);

document.getElementById(
    "taxaGravidade"
).textContent =

tg.toFixed(2);

if(registosHHTFiltrados.length){

    const ultimo =
    registosHHTFiltrados[
        registosHHTFiltrados.length - 1
    ];

    const mediaEfetivo =

    Math.round(

        registosHHTFiltrados.reduce(
            (total,item)=>
            total +
            item.efetivoSemana,
            0
        )

        /

        registosHHTFiltrados.length

    );

    const totalHHT =

    registosHHTFiltrados.reduce(
        (total,item)=>
        total +
        item.hhtSemana,
        0
    );

    document.getElementById(
        "efetivoPrincipal"
    ).textContent =
    ultimo.efetivoPrincipal;

    document.getElementById(
        "efetivoSubcontratada"
    ).textContent =
    ultimo.efetivoSub;

    document.getElementById(
        "efetivoSemanaHHT"
    ).textContent =
    ultimo.efetivoSemana;

    document.getElementById(
        "efetivoMesHHT"
    ).textContent =
    mediaEfetivo;

    document.getElementById(
        "hhtSemana"
    ).textContent =
    ultimo.hhtSemana;

    document.getElementById(
        "hhtMes"
    ).textContent =
    totalHHT;

    document.getElementById(
        "hhtAcumulado"
    ).textContent =
    totalHHT;

    document.getElementById(
        "semanaAtualHHT"
    ).textContent =
    ultimo.semana;

}

}

function editarHHT(index){

    const item =
    registosHHTFiltrados[index];

    document.getElementById(
        "semanaHHT"
    ).value =
    item.semana;

    document.getElementById(
        "inicioSemanaHHT"
    ).value =
    item.dataInicial;

    document.getElementById(
        "fimSemanaHHT"
    ).value =
    item.dataFinal;

    document.getElementById(
        "empresaPrincipalHHT"
    ).value =
    item.empresaPrincipal;

    document.getElementById(
        "empresaSubHHT"
    ).value =
    item.empresaSub;

    document.getElementById("segPMOD").value = item.segPMOD || "";
    document.getElementById("segPMOI").value = item.segPMOI || "";
    document.getElementById("segSMOD").value = item.segSMOD || "";
    document.getElementById("segSMOI").value = item.segSMOI || "";

    document.getElementById("terPMOD").value = item.terPMOD || "";
    document.getElementById("terPMOI").value = item.terPMOI || "";
    document.getElementById("terSMOD").value = item.terSMOD || "";
    document.getElementById("terSMOI").value = item.terSMOI || "";

    document.getElementById("quaPMOD").value = item.quaPMOD || "";
    document.getElementById("quaPMOI").value = item.quaPMOI || "";
    document.getElementById("quaSMOD").value = item.quaSMOD || "";
    document.getElementById("quaSMOI").value = item.quaSMOI || "";

    document.getElementById("quiPMOD").value = item.quiPMOD || "";
    document.getElementById("quiPMOI").value = item.quiPMOI || "";
    document.getElementById("quiSMOD").value = item.quiSMOD || "";
    document.getElementById("quiSMOI").value = item.quiSMOI || "";

    document.getElementById("sexPMOD").value = item.sexPMOD || "";
    document.getElementById("sexPMOI").value = item.sexPMOI || "";
    document.getElementById("sexSMOD").value = item.sexSMOD || "";
    document.getElementById("sexSMOI").value = item.sexSMOI || "";

    document.getElementById("sabPMOD").value = item.sabPMOD || "";
    document.getElementById("sabPMOI").value = item.sabPMOI || "";
    document.getElementById("sabSMOD").value = item.sabSMOD || "";
    document.getElementById("sabSMOI").value = item.sabSMOI || "";

    document.getElementById("domPMOD").value = item.domPMOD || "";
    document.getElementById("domPMOI").value = item.domPMOI || "";
    document.getElementById("domSMOD").value = item.domSMOD || "";
    document.getElementById("domSMOI").value = item.domSMOI || "";

    indiceEdicaoHHT = item.id;


    window.scrollTo({
        top: document.getElementById("formHHT").offsetTop,
        behavior: "smooth"
    });

}
async function eliminarHHT(index){


    if(!confirm("Eliminar registo?")){
        return;
    }

    const registo =
    registosHHTFiltrados[index];

    const indiceReal =
    registosHHT.findIndex(
        item =>

        item.semana === registo.semana

        &&

        item.dataInicial === registo.dataInicial

        &&

        item.dataFinal === registo.dataFinal
    );

    if(indiceReal > -1){

       const item =
registosHHTFiltrados[index];

await supabaseClient
.from("hht")
.delete()
.eq(
    "id",
    item.id
);

await carregarHHTSupabase();

}
}
function calcularHHTMes(){

    const hoje = new Date();

    const mesAtual =
    hoje.getMonth();

    const anoAtual =
    hoje.getFullYear();

    return registosHHTFiltrados
    .filter(item=>{

        const data =
        new Date(
            item.dataInicial
        );

        return (

            data.getMonth() ===
            mesAtual

            &&

            data.getFullYear() ===
            anoAtual

        );

    })
    .reduce(
        (total,item)=>
        total + item.hhtSemana,
        0
    );

}
function calcularHHTAcumulado(){

    return registosHHTFiltrados
    .reduce(
        (total,item)=>
        total + item.hhtSemana,
        0
    );

}
function calcularEfetivoMes(){

    if(
        registosHHTFiltrados.length === 0
    ){
        return 0;
    }

    const soma =

    registosHHTFiltrados.reduce(
        (total,item)=>

        total +
        item.efetivoSemana,

        0
    );

    return soma;

}
atualizarHHT();

/* ==========================================
   final HHT
========================================== */


carregarOcorrenciasHSESupabase();
carregarDataBaseAcidente();
carregarInspecoesSupabase();
carregarFalaTalangaSupabase();
carregarSolicitacoesEPISupabase();
carregarDDSSupabase();
carregarHHTSupabase();
carregarOcorrenciasSupabase();
carregarEstoqueEPISupabase();
