/* ==========================================
   Produtos quimicos
========================================== */

const formProdutosQuimicos =
document.getElementById(
    "formProdutosQuimicos"
);

const tabelaProdutosQuimicos =
document.querySelector(
    "#tabelaProdutosQuimicos tbody"
);



let produtosQuimicos = [];





document.querySelector(
    "#formProdutosQuimicos button[type='submit']"
).textContent = "Guardar";

document
.getElementById("btnCriarFispq")
.addEventListener(
    "click",
    criarFispqDigital
);

const btnGuardarFispq =
document.getElementById(
    "btnGuardarFispq"
);

if (btnGuardarFispq) {

    btnGuardarFispq.addEventListener(
        "click",
        guardarFispqDigital
    );


}

document
.getElementById(
    "btnGerarPdfFispq"
)
.addEventListener(
    "click",
    gerarPdfFispq
);
document
.getElementById(
    "btnRevisarFispq"
)
.addEventListener(
    "click",
    revisarFispq
);

function adicionarSecao(
    pdf,
    titulo,
    conteudo,
    y
) {

    if (y > 250) {

        pdf.addPage();

        y = 20;

    }

    pdf.setFillColor(
        235,
        230,
        120
    );

    pdf.rect(
    10,
    y,
    190,
    10,
    "F"
);


    pdf.setFontSize(14);

    pdf.text(
        titulo,
        13,
        y + 7
    );

    y += 15;

    pdf.setFontSize(10);

    const linhas =
    pdf.splitTextToSize(
        conteudo || "",
        180
    );

    pdf.text(
        linhas,
        10,
        y
    );

    y +=
    linhas.length * 6 +
    10;

    return y;

}
async function revisarFispq() {

    const produto =
    produtosQuimicos.find(
        p => p.id === produtoEmEdicao
    );

    if (!produto) return;

    await supabaseClient
        .from("produtos_quimicos")
        .update({

            versao_fispq:
            (produto.versao_fispq || 1) + 1,

            ultima_revisao:
            new Date().toISOString()

        })
        .eq(
            "id",
            produtoEmEdicao
        );

    alert(
        "FISPQ revisada."
    );

}

async function gerarPdfFispq() {

    if (!produtoEmEdicao) {

        alert(
            "Abra um produto primeiro."
        );

        return;
    }

    const { data, error } =
await supabaseClient
    .from("produtos_quimicos")
    .select(`
        produto,
        numero_cas,
        numero_onu,
        classificacao_ghs,
        fispq_digital
    `)
    .eq(
        "id",
        produtoEmEdicao
    )
    .single();

    if (error) {

        console.error(error);

        alert(
            "Erro ao obter FISPQ."
        );

        return;
    }
if (!data.fispq_digital) {

    alert(
        "Este produto não possui FISPQ Digital."
    );

    return;
}
    const fispq =
    JSON.parse(
        data.fispq_digital
    );

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();
    pdf.setFontSize(22);

pdf.setTextColor(
    0,
    102,
    204
);

const logoTalanga =
document.getElementById(
    "logoTalanga"
);

pdf.addImage(
    logoTalanga,
    "PNG",
    10,
    10,
    40,
    20
);


pdf.setFontSize(14);

pdf.setTextColor(
    0,
    0,
    0
);

pdf.setFontSize(16);

pdf.text(
    "FICHA DE INFORMAÇÕES DE SEGURANÇA",
    105,
    28,
    {
        align: "center"
    }
);

pdf.text(
    "DE PRODUTOS QUÍMICOS",
    105,
    36,
    {
        align: "center"
    }
);
pdf.setFontSize(10);

pdf.text(
    `Emitido em: ${
        new Date()
        .toLocaleDateString()
    }`,
    150,
    15
);
pdf.text(
    `Versão: ${
        data.versao_fispq || 1
    }`,
    150,
    15
);

pdf.text(
    `Estado: ${
        data.status_fispq || "APROVADA"
    }`,
    150,
    22
);
pdf.setFontSize(12);
pdf.text(
    "FISPQ",
    105,
    42,
    {
        align: "center"
    }
);
pdf.setDrawColor(
    0,
    102,
    204
);

pdf.setLineWidth(0.8);

pdf.line(
    10,
    48,
    200,
    48
);
let y = 55;

pdf.setFontSize(12);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    `Produto: ${data.produto}`,
    10,
    y
);


y += 8;

pdf.text(
    `CAS: ${data.numero_cas || ""}`,
    10,
    y
);

y += 8;

pdf.text(
    `ONU: ${data.numero_onu || ""}`,
    10,
    y
);

y += 8;

pdf.text(
    `GHS: ${data.classificacao_ghs || ""}`,
    10,
    y
);

y += 25;

  y = adicionarSecao(
    pdf,
    "1. IDENTIFICAÇÃO",
`
Empresa:
${fispq.identificacao?.empresa || ""}

Telefone:
${fispq.identificacao?.emergencia || ""}
`,
    y
);

y = adicionarSecao(
    pdf,
    "2. IDENTIFICAÇÃO DE PERIGOS",
    fispq.perigos?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "3. COMPOSIÇÃO",
    fispq.composicao?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "4. PRIMEIROS SOCORROS",
    fispq.primeiros_socorros?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "5. COMBATE A INCÊNDIO",
    fispq.incendio?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "6. DERRAMAMENTO ACIDENTAL",
    fispq.derrame?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "7. MANUSEAMENTO E ARMAZENAMENTO",
    fispq.armazenamento?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "8. EPI",
    fispq.epi?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "9. PROPRIEDADES FÍSICO-QUÍMICAS",
    fispq.propriedades?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "10. ESTABILIDADE E REATIVIDADE",
    fispq.estabilidade?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "11. INFORMAÇÕES TOXICOLÓGICAS",
    fispq.toxicologia?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "12. INFORMAÇÕES ECOLÓGICAS",
    fispq.ecologia?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "13. DESTINAÇÃO FINAL",
    fispq.destinacao?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "14. TRANSPORTE",
`
ONU:
${fispq.transporte?.onu || ""}

Classe:
${fispq.transporte?.classe || ""}

Grupo:
${fispq.transporte?.grupo || ""}

${fispq.transporte?.descricao || ""}
`,
    y
);

y = adicionarSecao(
    pdf,
    "15. REGULAMENTAÇÃO",
    fispq.regulamentacao?.descricao,
    y
);

y = adicionarSecao(
    pdf,
    "16. OUTRAS INFORMAÇÕES",
    fispq.outras_informacoes?.descricao,
    y
); 


const paginas =
pdf.internal.getNumberOfPages();

for (
    let i = 1;
    i <= paginas;
    i++
) {

    pdf.setPage(i);

    pdf.setFontSize(8);

    pdf.text(
        `Talanga HSE | Página ${i} de ${paginas}`,
        10,
        290
    );

    pdf.text(
        new Date().toLocaleDateString(),
        170,
        290
    );

}
const qrDiv =
document.createElement(
    "div"
);

new QRCode(
    qrDiv,
    {
        text: urlFispq,
        width: 120,
        height: 120
    }
);
const qrImg =
qrDiv.querySelector(
    "img"
);
pdf.addImage(

    qrImg.src,

    "PNG",

    160,

    22,

    30,

    30

);

    pdf.save(
        `FISPQ_${data.produto}.pdf`
    );

}

function tituloSecao(
    pdf,
    texto,
    y
) {

    pdf.setFillColor(
        235,
        230,
        120
    );

    pdf.rect(
    10,
    y,
    190,
    10,
    "F"
);


    pdf.setFontSize(14);

    pdf.text(
        texto,
        13,
        y + 7
    );

    return y + 15;

}

const campoPesquisa =
document.getElementById(
    "pesquisarProduto"
);

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "input",
        pesquisarProdutos
    );

}


document
.getElementById("tipoFispq")
.addEventListener("change", function () {

    const tipo = this.value;

    document.getElementById(
        "grupoFispqPdf"
    ).style.display =
        tipo === "PDF"
        ? "block"
        : "none";

    document.getElementById(
        "grupoFispqDigital"
    ).style.display =
        tipo === "DIGITAL"
        ? "block"
        : "none";

        document.getElementById(
    "btnCriarFispq"
).style.display =

tipo === "DIGITAL"
? "inline-block"
: "none";

});

function criarFispqDigital() {

    limparFispq();

    document.getElementById(
        "fispqDigitalForm"
    ).style.display = "block";

    document.getElementById(
    "fispqEmpresa"
).value =
fornecedorQuimico.value;

document.getElementById(
    "fispqEmergencia"
).value =
"+244 ";

    const info =
    bibliotecaGhs[
        classificacaoGhs.value
    ];

    if (!info) return;

    fispqPerigos.value =
    info.perigos;

    fispqComposicao.value =
    info.composicao;

    fispqPrimeirosSocorros.value =
    info.primeirosSocorros;

    fispqIncendio.value =
    info.incendio;

    fispqDerrame.value =
    info.derrame;

    fispqArmazenamento.value =
    info.armazenamento;

    fispqEpi.value =
    info.epi;

    fispqPropriedades.value =
    info.propriedades;

    fispqEstabilidade.value =
    info.estabilidade;

    fispqToxicologia.value =
    info.toxicologia;

    fispqEcologia.value =
    info.ecologia;

    fispqDestinacao.value =
    info.destinacao;

    fispqRegulamentacao.value =
    info.regulamento;

    fispqTransporte.value =

    `ONU: ${numeroOnu.value}

    Classe de Transporte:
    ${classeTransporte.value}

    Grupo de Embalagem:
    ${grupoEmbalagem.value}`;

    fispqOutrasInformacoes.value =

    `Produto: ${produtoQuimico.value}

    Categoria: ${categoriaQuimico.value}

    GHS: ${classificacaoGhs.value}

    Observações:

    ${observacoesQuimico.value}`;

}



    





const bibliotecaGhs = {

    GHS01: {

    perigos:
    "Produto explosivo. Pode explodir por choque, atrito, calor ou chama.",

    composicao:
    "Substância ou mistura explosiva.",

    primeirosSocorros:
    "Remover para local seguro e procurar assistência médica imediata.",

    incendio:
    "Evacuar a área. Não combater incêndio se houver risco de explosão.",

    derrame:
    "Eliminar fontes de ignição. Evitar choques e impacto.",

    armazenamento:
    "Armazenar isoladamente em local seguro.",

    epi:
    "Proteção completa, óculos, viseira e luvas.",

    propriedades:
    "Material explosivo.",

    estabilidade:
    "Sensível ao calor e impacto.",

    toxicologia:
    "Pode causar lesões graves.",

    ecologia:
    "Evitar libertação para o ambiente.",

    destinacao:
    "Eliminar como resíduo explosivo.",

    regulamento:
    "Classificado segundo GHS01."

},


    GHS02: {

        perigos:
        "Líquido e vapor inflamáveis.",

        composicao:
        "Mistura química inflamável.",

        primeirosSocorros:
        "Remover para local ventilado. Procurar assistência médica se necessário.",

        incendio:
        "Utilizar espuma resistente ao álcool, CO₂ ou pó químico.",

        derrame:
        "Eliminar fontes de ignição e conter o derrame.",

        armazenamento:
        "Manter afastado de calor, chamas e faíscas.",

        epi:
        "Óculos de proteção, luvas químicas e vestuário antiestático.",

        propriedades:
        "Produto inflamável, com risco de ignição.",

        estabilidade:
        "Estável em condições normais.",

        toxicologia:
        "Pode causar irritação por exposição prolongada.",

        ecologia:
        "Evitar libertação para o ambiente.",

        destinacao:
        "Eliminar segundo a legislação aplicável.",

        regulamento:
        "Classificado segundo GHS02."

    },

    GHS03: {

        perigos:
        "Agente oxidante. Pode intensificar incêndios.",

        composicao:
        "Substância oxidante.",

        primeirosSocorros:
        "Lavar imediatamente a área atingida.",

        incendio:
        "Usar água pulverizada.",

        derrame:
        "Isolar materiais combustíveis.",

        armazenamento:
        "Separar de inflamáveis.",

        epi:
        "Luvas químicas e proteção ocular.",

        propriedades:
        "Agente oxidante.",

        estabilidade:
        "Reage com materiais combustíveis.",

        toxicologia:
        "Pode causar irritação.",

        ecologia:
        "Evitar contaminação ambiental.",

        destinacao:
        "Eliminar conforme regulamentação.",

        regulamento:
        "Classificado segundo GHS03."
    },

    GHS04: {

    perigos:
    "Contém gás sob pressão. Pode explodir se aquecido.",

    composicao:
    "Gás comprimido ou liquefeito.",

    primeirosSocorros:
    "Levar a vítima para ar fresco.",

    incendio:
    "Arrefecer recipientes expostos ao fogo.",

    derrame:
    "Ventilar a área.",

    armazenamento:
    "Proteger do sol e calor excessivo.",

    epi:
    "Óculos e luvas adequadas.",

    propriedades:
    "Gás sob pressão.",

    estabilidade:
    "Estável em condições normais.",

    toxicologia:
    "Pode causar asfixia.",

    ecologia:
    "Evitar libertação descontrolada.",

    destinacao:
    "Eliminar conforme regulamentação.",

    regulamento:
    "Classificado segundo GHS04."

},


    GHS05: {

        perigos:
        "Provoca queimaduras graves.",

        composicao:
        "Produto corrosivo.",

        primeirosSocorros:
        "Lavar durante 15 minutos.",

        incendio:
        "Utilizar agente compatível com o ambiente.",

        derrame:
        "Conter e neutralizar se possível.",

        armazenamento:
        "Separar de bases e incompatíveis.",

        epi:
        "Viseira, luvas químicas e avental.",

        propriedades:
        "Substância corrosiva.",

        estabilidade:
        "Evitar contacto com incompatíveis.",

        toxicologia:
        "Corrosivo para pele e olhos.",

        ecologia:
        "Evitar descarga para cursos de água.",

        destinacao:
        "Eliminar como resíduo perigoso.",

        regulamento:
        "Classificado segundo GHS05."
    },
    GHS06: {

    perigos:
    "Fatal ou tóxico se ingerido, inalado ou em contacto com a pele.",

    composicao:
    "Substância tóxica.",

    primeirosSocorros:
    "Procurar assistência médica imediata.",

    incendio:
    "Utilizar agente extintor adequado.",

    derrame:
    "Evitar contacto direto.",

    armazenamento:
    "Local fechado e ventilado.",

    epi:
    "Respirador, luvas e proteção ocular.",

    propriedades:
    "Alta toxicidade.",

    estabilidade:
    "Estável em condições normais.",

    toxicologia:
    "Toxicidade aguda elevada.",

    ecologia:
    "Evitar contaminação ambiental.",

    destinacao:
    "Resíduo perigoso.",

    regulamento:
    "Classificado segundo GHS06."

},
GHS07: {

    perigos:
    "Pode causar irritação na pele, olhos e vias respiratórias.",

    composicao:
    "Produto irritante.",

    primeirosSocorros:
    "Lavar abundantemente a área afetada.",

    incendio:
    "Usar meios compatíveis.",

    derrame:
    "Evitar contacto desnecessário.",

    armazenamento:
    "Local ventilado.",

    epi:
    "Óculos e luvas.",

    propriedades:
    "Irritante.",

    estabilidade:
    "Estável em condições normais.",

    toxicologia:
    "Pode provocar irritação.",

    ecologia:
    "Não descarregar diretamente no ambiente.",

    destinacao:
    "Eliminar segundo legislação local.",

    regulamento:
    "Classificado segundo GHS07."

},
GHS08: {

    perigos:
    "Pode provocar danos aos órgãos ou efeitos crónicos.",

    composicao:
    "Substância de perigo crónico.",

    primeirosSocorros:
    "Consultar assistência médica.",

    incendio:
    "Utilizar agente adequado.",

    derrame:
    "Conter e evitar exposição prolongada.",

    armazenamento:
    "Local seguro e ventilado.",

    epi:
    "Proteção respiratória e ocular.",

    propriedades:
    "Perigo à saúde a longo prazo.",

    estabilidade:
    "Estável.",

    toxicologia:
    "Possível carcinogenicidade ou toxicidade crónica.",

    ecologia:
    "Evitar libertação.",

    destinacao:
    "Resíduo perigoso.",

    regulamento:
    "Classificado segundo GHS08."

},
GHS09: {

    perigos:
    "Muito tóxico para organismos aquáticos.",

    composicao:
    "Substância perigosa ao ambiente.",

    primeirosSocorros:
    "Seguir procedimento médico adequado.",

    incendio:
    "Utilizar agente extintor compatível.",

    derrame:
    "Impedir que atinja cursos de água.",

    armazenamento:
    "Armazenar longe de sistemas de drenagem.",

    epi:
    "Luvas e proteção ocular.",

    propriedades:
    "Perigo ambiental elevado.",

    estabilidade:
    "Estável.",

    toxicologia:
    "Baixa toxicidade humana direta.",

    ecologia:
    "Elevada ecotoxicidade.",

    destinacao:
    "Eliminar como resíduo controlado.",

    regulamento:
    "Classificado segundo GHS09."

}
    

};

function limparFispq() {

    const campos = [

        "fispqPerigos",
        "fispqComposicao",
        "fispqPrimeirosSocorros",
        "fispqIncendio",
        "fispqDerrame",
        "fispqArmazenamento",
        "fispqEpi",
        "fispqPropriedades",
        "fispqEstabilidade",
        "fispqToxicologia",
        "fispqEcologia",
        "fispqDestinacao",
        "fispqTransporte",
        "fispqRegulamentacao",
        "fispqOutrasInformacoes"

    ];

    campos.forEach(id => {

        const campo =
        document.getElementById(id);

        if (campo) {
            campo.value = "";
        }

    });

}

async function carregarProdutosQuimicos() {

    const { data, error } =
    await supabaseClient
        .from("produtos_quimicos")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.error(error);
        return;
    }

    produtosQuimicos = data || [];

    renderizarProdutosQuimicos(
        produtosQuimicos
    );
}

function renderizarProdutosQuimicos(
    produtos
) {

    tabelaProdutosQuimicos.innerHTML = "";

    produtos.forEach(produto => {
        const hoje = new Date();

const dataValidade =
produto.data_validade
? new Date(produto.data_validade)
: null;

const dias30 = new Date();
dias30.setDate(
    hoje.getDate() + 30
);

let classeLinha = "";

if (
    dataValidade &&
    dataValidade < hoje
) {

    classeLinha =
    "linha-vencida";

}
else if (
    dataValidade &&
    dataValidade <= dias30
) {

    classeLinha =
    "linha-alerta";

}
        const vencido =
produto.data_validade &&
new Date(produto.data_validade) < new Date();


        tabelaProdutosQuimicos.innerHTML += `

<tr class="${classeLinha}">

    

            <td>${produto.produto}</td>

            <td>${produto.fornecedor || ""}</td>

            <td>${produto.categoria_perigo || ""}</td>

<td>${produto.classificacao_ghs || "-"}</td>

<td>${produto.numero_cas || "-"}</td>

<td>${produto.numero_onu || "-"}</td>

<td>
    ${produto.quantidade || 0}
    ${produto.unidade || ""}
</td>

            <td>
                ${produto.local_armazenamento || ""}
            </td>

            <td>
                ${produto.data_validade || "-"}
            </td>

            <td>
                ${produto.responsavel || "-"}
            </td>

            <td>
                ${produto.tipo_fispq || "-"}
            </td>

            <td>

                <button
                    onclick="
    editarProdutoQuimico(
        '${produto.id}'
    )
"
                >
                    ✏️
                </button>

               <button
    onclick="abrirFispq('${produto.fispq_pdf_url || ""}')"
>
    📄
</button>
                
            <button
    onclick="
        abrirFispqDigital(
            '${produto.id}'
        )
    "
>
    📋
</button>        
                

                <button
                   onclick="
    eliminarProdutoQuimico(
        '${produto.id}'
    )
"
                >
                    🗑️
                </button>

            </td>

        </tr>

        `;

    });
atualizarIndicadoresProdutos(produtos);
}




const matrizCompatibilidade = {

    "Inflamável": [
        "Oxidante",
        "Comburente"
    ],

    "Comburente": [
        "Inflamável"
    ],

    "Oxidante": [
        "Inflamável",
        "Redutor",
        "Peróxido Orgânico"
    ],

    "Corrosivo Ácido": [
        "Corrosivo Base",
        "Cianeto",
        "Sulfeto"
    ],

    "Corrosivo Base": [
        "Corrosivo Ácido"
    ]

};

const incompatibilidadesGHS = {

    GHS02: [
        "GHS03"
    ],

    GHS03: [
        "GHS02"
    ],

    GHS05: [
        "GHS05"
    ],

    GHS01: [
        "GHS02",
        "GHS03"
    ]

};


function verificarCompatibilidade(produtos) {

    const alertas =
    document.getElementById(
        "alertasCompatibilidade"
    );

    alertas.innerHTML = "";

    let total = 0;

    for (let i = 0; i < produtos.length; i++) {

        for (let j = i + 1; j < produtos.length; j++) {

            const p1 = produtos[i];
            const p2 = produtos[j];

            if (
                p1.local_armazenamento !==
                p2.local_armazenamento
            ) {
                continue;
            }

            const listaIncompativeis =
            matrizCompatibilidade[
                p1.categoria_perigo
            ] || [];

            const conflito =
            listaIncompativeis.includes(
                p2.categoria_perigo
            );

            if (conflito) {

                total++;

                alertas.innerHTML += `

                <div class="alerta-compatibilidade">

                    ⚠ ${p1.produto}

                    incompatível com

                    ${p2.produto}

                    <br>

                    Local:
                    ${p1.local_armazenamento}

                </div>

                `;

            }

        }

    }

    document.getElementById(
        "incompatibilidadesQuimicas"
    ).textContent = total;

}
function verificarRiscosGhs(produtos) {

    const alertas =
    document.getElementById(
        "alertasCompatibilidade"
    );

    alertas.innerHTML = "";

    let riscos = 0;


    for (let i = 0; i < produtos.length; i++) {

        for (
            let j = i + 1;
            j < produtos.length;
            j++
        ) {

            const p1 = produtos[i];
            const p2 = produtos[j];

            if (
                p1.local_armazenamento !==
                p2.local_armazenamento
            ) {
                continue;
            }

            const lista =
            incompatibilidadesGHS[
                p1.classificacao_ghs
            ] || [];

            if (
                lista.includes(
                    p2.classificacao_ghs
                )
            ) {

                riscos++;

                alertas.innerHTML += `

                <div class="alerta-compatibilidade">

                    ☣️ Risco GHS:

                    ${p1.produto}

                    (${p1.classificacao_ghs})

                    incompatível com

                    ${p2.produto}

                    (${p2.classificacao_ghs})

                    <br>

                    Local:
                    ${p1.local_armazenamento}

                </div>

                `;

            }

        }

    }

    document.getElementById(
        "riscosQuimicos"
    ).textContent = riscos;

    

}

formProdutosQuimicos
.addEventListener(
"submit",
async function (e) {

let urlFispq = null;

const ficheiroPDF =
document.getElementById(
    "fispqPdfUpload"
).files[0];

    e.preventDefault();

    const {
        data: userData
    } =
    await supabaseClient.auth.getUser();

    const authUserId =
    userData.user.id;

    const {
        data: utilizador
    } =
    await supabaseClient
        .from("utilizadores")
        .select("empresa_id")
        .eq(
            "auth_user_id",
            authUserId
        )
        .single();

        if (
    tipoFispq.value === "PDF" &&
    ficheiroPDF
) {

    const extensao =
ficheiroPDF.name.split(".").pop();

const nomeFicheiro =
`${Date.now()}.${extensao}`;

    const { error: erroUpload } =
    await supabaseClient
        .storage
        .from("fispq")
        .upload(
            nomeFicheiro,
            ficheiroPDF
        );

    if (erroUpload) {

        console.error(
            erroUpload
        );

        alert(
            "Erro ao carregar PDF."
        );

        return;

    }

    const {
        data
    } =
    supabaseClient
        .storage
        .from("fispq")
        .getPublicUrl(
            nomeFicheiro
        );

    urlFispq =
    data.publicUrl;

}
const fispqDigital = {

    identificacao: {

        empresa:
        fispqEmpresa.value,

        emergencia:
        fispqEmergencia.value

    },

    perigos: {
        descricao:
        fispqPerigos.value
    },

    composicao: {
        descricao:
        fispqComposicao.value
    },

    primeiros_socorros: {
        descricao:
        fispqPrimeirosSocorros.value
    },

    incendio: {
        descricao:
        fispqIncendio.value
    },

    derrame: {
        descricao:
        fispqDerrame.value
    },

    armazenamento: {
        descricao:
        fispqArmazenamento.value
    },

    epi: {
        descricao:
        fispqEpi.value
    },
    propriedades: {
    descricao:
    fispqPropriedades.value
},

estabilidade: {
    descricao:
    fispqEstabilidade.value
},

toxicologia: {
    descricao:
    fispqToxicologia.value
},

ecologia: {
    descricao:
    fispqEcologia.value
},

destinacao: {
    descricao:
    fispqDestinacao.value
},

transporte: {

    onu:
    numeroOnu.value,

    classe:
    classeTransporte.value,

    grupo:
    grupoEmbalagem.value,

    descricao:
    fispqTransporte.value
},

regulamentacao: {
    descricao:
    fispqRegulamentacao.value
},

outras_informacoes: {
    descricao:
    fispqOutrasInformacoes.value
},

metadata: {
    versao: 1,
    ghs:
    classificacaoGhs.value,
    criado_em:
    new Date().toISOString()
}

};

    const produto = {

    empresa_id:
    utilizador.empresa_id,

    versao_fispq: 1,

ultima_revisao:
new Date().toISOString(),

status_fispq:
"APROVADA", 

    produto:
    produtoQuimico.value,

    fornecedor:
    fornecedorQuimico.value,

    categoria_perigo:
    categoriaQuimico.value,

    classificacao_ghs:
    classificacaoGhs.value,

    numero_cas:
    numeroCas.value,

    numero_onu:
    numeroOnu.value,

    grupo_embalagem:
    grupoEmbalagem.value,

    classe_transporte:
    classeTransporte.value,

    quantidade:
    quantidadeQuimica.value,

    unidade:
    unidadeQuimica.value,

    local_armazenamento:
    localQuimico.value,

    responsavel:
    responsavelQuimico.value,

    data_validade:
    validadeQuimica.value,

    tipo_fispq:
    tipoFispq.value,

    fispq_pdf_url:
    urlFispq,

    observacoes:
    observacoesQuimico.value,
    
fispq_digital:
JSON.stringify(
    fispqDigital
)

};

    let error;

if (produtoEmEdicao) {
if (
    !ficheiroPDF &&
    produtoEmEdicao
) {

    delete produto.fispq_pdf_url;

}
    const resultado =
    await supabaseClient
        .from("produtos_quimicos")
        
        .update(produto)
        .eq("id", produtoEmEdicao);

    error = resultado.error;

} else {

    const resultado =
    await supabaseClient
        .from("produtos_quimicos")
        .insert([produto])
        .select()

        .single();

console.log(resultado);

    error = resultado.error;

    if (!error) {

        produtoEmEdicao =
        resultado.data.id;

        console.log(
            "Produto criado:",
            produtoEmEdicao
        );

    }

}

    if (error) {

        console.error(error);
        alert("Erro ao guardar.");
        return;

    }

    alert(
        "Produto registado com sucesso."
    );
carregarProdutosQuimicos();
    formProdutosQuimicos.reset();

    

    carregarProdutosQuimicos();

});

async function guardarFispqDigital() {

    console.log(
    "ID:",
    produtoEmEdicao
);

console.log(
    "FISPQ:",
    fispqDigital
);

    if (!produtoEmEdicao) {

    alert(
        "Primeiro abra um produto existente para associar a FISPQ."
    );

    return;

}


    const fispqDigital = {

        identificacao: {

            empresa:
            fispqEmpresa.value,

            emergencia:
            fispqEmergencia.value,

            produto:
            produtoQuimico.value,

            fornecedor:
            fornecedorQuimico.value,

            cas:
            numeroCas.value,

            onu:
            numeroOnu.value

        },

        perigos: {
            descricao:
            fispqPerigos.value
        },

        composicao: {
            descricao:
            fispqComposicao.value
        },

        primeiros_socorros: {
            descricao:
            fispqPrimeirosSocorros.value
        },

        incendio: {
            descricao:
            fispqIncendio.value
        },

        derrame: {
            descricao:
            fispqDerrame.value
        },

        armazenamento: {
            descricao:
            fispqArmazenamento.value
        },

        epi: {
            descricao:
            fispqEpi.value
        },

        propriedades: {
            descricao:
            fispqPropriedades.value
        },

        estabilidade: {
            descricao:
            fispqEstabilidade.value
        },

        toxicologia: {
            descricao:
            fispqToxicologia.value
        },

        ecologia: {
            descricao:
            fispqEcologia.value
        },

        destinacao: {
            descricao:
            fispqDestinacao.value
        },

        transporte: {

            onu:
            numeroOnu.value,

            classe:
            classeTransporte.value,

            grupo:
            grupoEmbalagem.value,

            descricao:
            fispqTransporte.value

        },

        regulamentacao: {
            descricao:
            fispqRegulamentacao.value
        },

        outras_informacoes: {
            descricao:
            fispqOutrasInformacoes.value
        },

        metadata: {

            versao: 1,

            ghs:
            classificacaoGhs.value,

            criado_em:
            new Date().toISOString()

        }

    };

    const resultado =
await supabaseClient
    .from("produtos_quimicos")
    .update({

        fispq_digital:
        JSON.stringify(
            fispqDigital
        )

    })
    .eq(
        "id",
        produtoEmEdicao
    )
    .select();

console.log(
    "RESULTADO UPDATE:",
    resultado
);

const error =
resultado.error;

console.log(
    "ID PRODUTO:",
    produtoEmEdicao
);


    if (error) {

        console.error(error);

        alert(
            "Erro ao guardar FISPQ."
        );

        return;

    }

    alert(
        "FISPQ guardada com sucesso."
    );
await carregarProdutosQuimicos();

}

function atualizarIndicadoresProdutos(produtos) {

    document.getElementById(
        "totalProdutosQuimicos"
    ).textContent = produtos.length;

    document.getElementById(
        "fispqPdf"
    ).textContent =
        produtos.filter(
            p => p.tipo_fispq === "PDF"
        ).length;

    document.getElementById(
        "fispqDigital"
    ).textContent =
        produtos.filter(
            p => p.tipo_fispq === "DIGITAL"
        ).length;

    const hoje = new Date();

    document.getElementById(
        "quimicosVencidos"
    ).textContent =
        produtos.filter(p => {

            if (!p.data_validade)
                return false;

            return new Date(
                p.data_validade
            ) < hoje;

        }).length;
calcularAlertasValidade(produtos);
verificarCompatibilidade(produtos);
verificarRiscosGhs(produtos);
}



function calcularAlertasValidade(produtos) {

    const hoje = new Date();

    const dias30 = new Date();
    dias30.setDate(
        hoje.getDate() + 30
    );

    const dias60 = new Date();
    dias60.setDate(
        hoje.getDate() + 60
    );

    const vencidos =
    produtos.filter(p => {

        if (!p.data_validade)
            return false;

        return new Date(
            p.data_validade
        ) < hoje;

    }).length;

    const vencer30 =
    produtos.filter(p => {

        if (!p.data_validade)
            return false;

        const data =
        new Date(p.data_validade);

        return (
            data >= hoje &&
            data <= dias30
        );

    }).length;

    const vencer60 =
    produtos.filter(p => {

        if (!p.data_validade)
            return false;

        const data =
        new Date(p.data_validade);

        return (
            data > dias30 &&
            data <= dias60
        );

    }).length;

    document.getElementById(
        "quimicosVencidos"
    ).textContent = vencidos;

    document.getElementById(
        "quimicos30Dias"
    ).textContent = vencer30;

    document.getElementById(
        "quimicos60Dias"
    ).textContent = vencer60;

}

function pesquisarProdutos() {

    const termo =
    document
        .getElementById("pesquisarProduto")
        .value
        .toLowerCase();

   const filtrados =
produtosQuimicos.filter(produto =>

    (produto.produto || "")
        .toLowerCase()
        .includes(termo)

    ||

    (produto.fornecedor || "")
        .toLowerCase()
        .includes(termo)

    ||

    (produto.local_armazenamento || "")
        .toLowerCase()
        .includes(termo)

);

    renderizarProdutosQuimicos(filtrados);

}

async function editarProdutoQuimico(id) {

    const { data, error } =
    await supabaseClient
        .from("produtos_quimicos")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {

        console.error(error);
        return;

    }

    produtoEmEdicao = id;

    produtoQuimico.value =
        data.produto || "";

    fornecedorQuimico.value =
        data.fornecedor || "";

    categoriaQuimico.value =
        data.categoria_perigo || "";

    quantidadeQuimica.value =
        data.quantidade || "";

    unidadeQuimica.value =
        data.unidade || "";

    localQuimico.value =
        data.local_armazenamento || "";

    responsavelQuimico.value =
        data.responsavel || "";

    validadeQuimica.value =
        data.data_validade || "";

    tipoFispq.value =
        data.tipo_fispq || "";
        classificacaoGhs.value =
data.classificacao_ghs || "";

numeroCas.value =
data.numero_cas || "";

numeroOnu.value =
data.numero_onu || "";

grupoEmbalagem.value =
data.grupo_embalagem || "";

classeTransporte.value =
data.classe_transporte || "";

    observacoesQuimico.value =
        data.observacoes || "";

    tipoFispq.dispatchEvent(
        new Event("change")
    );
    if (data.fispq_digital) {

    const fispq =
    JSON.parse(
        data.fispq_digital
    );

    document.getElementById(
        "fispqDigitalForm"
    ).style.display =
    "block";

    fispqEmpresa.value =
    fispq.identificacao?.empresa || "";

    fispqEmergencia.value =
    fispq.identificacao?.emergencia || "";

    fispqPerigos.value =
    fispq.perigos?.descricao || "";

    fispqComposicao.value =
    fispq.composicao?.descricao || "";

    fispqPrimeirosSocorros.value =
    fispq.primeiros_socorros?.descricao || "";

    fispqIncendio.value =
    fispq.incendio?.descricao || "";

    fispqDerrame.value =
    fispq.derrame?.descricao || "";

    fispqArmazenamento.value =
    fispq.armazenamento?.descricao || "";

    fispqEpi.value =
    fispq.epi?.descricao || "";

    fispqPropriedades.value =
    fispq.propriedades?.descricao || "";

    fispqEstabilidade.value =
    fispq.estabilidade?.descricao || "";

    fispqToxicologia.value =
    fispq.toxicologia?.descricao || "";

    fispqEcologia.value =
    fispq.ecologia?.descricao || "";

    fispqDestinacao.value =
    fispq.destinacao?.descricao || "";

    fispqTransporte.value =
    fispq.transporte?.descricao || "";

    fispqRegulamentacao.value =
    fispq.regulamentacao?.descricao || "";

    fispqOutrasInformacoes.value =
    fispq.outras_informacoes?.descricao || "";

}

    document.querySelector(
    "#formProdutosQuimicos button[type='submit']"
).textContent = "Atualizar";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

async function eliminarProdutoQuimico(id) {

    if (
        !confirm(
            "Eliminar produto?"
        )
    ) return;

    const { error } =
    await supabaseClient
        .from("produtos_quimicos")
        .delete()
        .eq("id", id);

    if (error) {

        console.error(error);
        return;

    }

    carregarProdutosQuimicos();

}

function abrirFispq(url) {

    if(!url){
        alert("FISPQ não disponível");
        return;
    }

    window.open(
        url,
        "_blank"
    );

}

function abrirFispqDigital(id) {


    


    const produto =
produtosQuimicos.find(
    p => p.id === id
);

if (!produto) {

    alert(
        "Produto não encontrado."
    );

    return;
}

if (produto.fispq_digital) {


    document.getElementById(
    "fispqDigitalForm"
).style.display = "block";

    const fispq =
JSON.parse(
    produto.fispq_digital
);

    


    fispqEmpresa.value =
    fispq.identificacao?.empresa || "";

    fispqEmergencia.value =
    fispq.identificacao?.emergencia || "";

    fispqPerigos.value =
    fispq.perigos?.descricao || "";

    fispqComposicao.value =
    fispq.composicao?.descricao || "";

    fispqPrimeirosSocorros.value =
    fispq.primeiros_socorros?.descricao || "";

    fispqIncendio.value =
    fispq.incendio?.descricao || "";

    fispqDerrame.value =
    fispq.derrame?.descricao || "";

    fispqArmazenamento.value =
    fispq.armazenamento?.descricao || "";

    fispqEpi.value =
    fispq.epi?.descricao || "";

    fispqPropriedades.value =
    fispq.propriedades?.descricao || "";

    fispqEstabilidade.value =
    fispq.estabilidade?.descricao || "";

    fispqToxicologia.value =
    fispq.toxicologia?.descricao || "";

    fispqEcologia.value =
    fispq.ecologia?.descricao || "";

    fispqDestinacao.value =
    fispq.destinacao?.descricao || "";

    fispqTransporte.value =
    fispq.transporte?.descricao || "";

    fispqRegulamentacao.value =
    fispq.regulamentacao?.descricao || "";

    fispqOutrasInformacoes.value =
    fispq.outras_informacoes?.descricao || "";

    return;
}
    if (!produto) {

        alert(
            "FISPQ não encontrada."
        );

        return;
    }

    document.getElementById(
        "fispqDigitalForm"
    ).style.display = "block";

    const info =
    bibliotecaGhs[
        produto.classificacao_ghs
    ];

    if (!info) {

        alert(
            "Classificação GHS não configurada."
        );

        return;
    }

    fispqEmpresa.value =
    produto.fornecedor || "";

    fispqEmergencia.value =
    "+244";

    fispqPerigos.value =
    info.perigos;

    fispqComposicao.value =
    info.composicao;

    fispqPrimeirosSocorros.value =
    info.primeirosSocorros;

    fispqIncendio.value =
    info.incendio;

    fispqDerrame.value =
    info.derrame;

    fispqArmazenamento.value =
    info.armazenamento;

    fispqEpi.value =
    info.epi;

    fispqPropriedades.value =
    info.propriedades;

    fispqEstabilidade.value =
    info.estabilidade;

    fispqToxicologia.value =
    info.toxicologia;

    fispqEcologia.value =
    info.ecologia;

    fispqDestinacao.value =
    info.destinacao;

    fispqRegulamentacao.value =
    info.regulamento;

    fispqTransporte.value =

    `ONU: ${produto.numero_onu || ""}

Classe de Transporte:
${produto.classe_transporte || ""}

Grupo de Embalagem:
${produto.grupo_embalagem || ""}`;

    fispqOutrasInformacoes.value =

    `Produto: ${produto.produto || ""}

Categoria:
${produto.categoria_perigo || ""}

GHS:
${produto.classificacao_ghs || ""}

Observações:

${produto.observacoes || ""}`;

    window.scrollTo({
        top: document.getElementById(
            "fispqDigitalForm"
        ).offsetTop,
        behavior: "smooth"
    });

}


carregarProdutosQuimicos();