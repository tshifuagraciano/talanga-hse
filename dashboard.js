


console.log("dashboard.js carregado");


/* ==========================================
   DASHBOARD
========================================== */

function atualizarNotificacoes(){

    const lista =
    document.getElementById(
        "listaNotificacoes"
    );

    if(!lista) return;

    lista.innerHTML = "";

    const hoje =
    new Date();

    asos.forEach(item => {

        const validade =
        new Date(item.validade);

        const dias =
        Math.ceil(
            (validade - hoje) /
            (1000 * 60 * 60 * 24)
        );

        if(dias < 0){

            lista.innerHTML += `
                <li>
                    🔴 ${item.nome}
                    - ASO vencido
                </li>
            `;

        }
        else if(dias <= 30){

            lista.innerHTML += `
                <li>
                    🟡 ${item.nome}
                    - ASO vence em
                    ${dias} dias
                </li>
            `;

        }

    });

}


function atualizarDashboard(){

    document.getElementById(
        "cardColaboradores"
    ).textContent =
    colaboradores.length;

    document.getElementById(
        "cardTreinamentos"
    ).textContent =
    treinamentos.length;

    const cardOcorrencias =
document.getElementById(
    "cardOcorrencias"
);

if(cardOcorrencias){

    cardOcorrencias.textContent =
    ocorrencias.length;

}
   /* const cardASO =
document.getElementById(
    "cardASO"
);

if(cardASO){

    cardASO.textContent =
    asos.length;

}
    document.getElementById(
        "cardInspecoes"
    ).textContent =
    inspecoes.length;

    const registosHHT =
carregarDados(
    "registosHHT"
) || [];*/





const hhtAcumulado =

registosHHT.reduce(
    (total,item)=>

    total +
    Number(item.hhtSemana || 0),

    0
);

const ocorrenciasHSE =
carregarDados(
    "ocorrenciasHSE"
) || [];

const totalACA =

ocorrenciasHSE.filter(
    item =>

    item.tipo === "ACA"
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
const tf =

hhtAcumulado > 0

?

(
    totalACA * 1000000
)

/

hhtAcumulado

: 0;
const tg =

hhtAcumulado > 0

?

(
    totalDiasPerdidos
    *
    1000000
)

/

hhtAcumulado

: 0;
let efetivoAtual = 0;

if(
    registosHHT.length
){

    efetivoAtual =

    registosHHT[
        registosHHT.length - 1
    ].efetivoSemana;

}
/*
document.getElementById(
    "cardHHTAcumulado"
).textContent =
hhtAcumulado.toLocaleString(
    "pt-PT"
);
*/

document.getElementById(
    "cardTF"
).textContent =

tf.toFixed(2);

document.getElementById(
    "cardTG"
).textContent =

tg.toFixed(2);

document.getElementById(
    "cardEfetivoAtual"
).textContent =

efetivoAtual;

if(tf === 0){

    document.getElementById(
        "cardTF"
    ).style.color = "#22c55e";

}else{

    document.getElementById(
        "cardTF"
    ).style.color = "#dc2626";

}

if(tg === 0){

    document.getElementById(
        "cardTG"
    ).style.color = "#22c55e";

}else{

    document.getElementById(
        "cardTG"
    ).style.color = "#dc2626";

}

   

    /* SAÚDE */

    document.getElementById(
        "saudeASO"
    ).textContent =
    asos.length;

    document.getElementById(
        "saudeAmbulatorio"
    ).textContent =
    atendimentosAmbulatorio.length;

    document.getElementById(
        "saudeMedicamentos"
    ).textContent =
    medicamentos.length;

    document.getElementById(
        "saudeEmergencias"
    ).textContent =
    emergencias.length;

    /* AMBIENTE */

    document.getElementById(
        "ambRequisitos"
    ).textContent =
    ambiental.length;

    document.getElementById(
        "ambResiduos"
    ).textContent =
    residuos.length;

    document.getElementById(
        "ambConsumos"
    ).textContent =
    consumos.length;

    document.getElementById(
        "ambFauna"
    ).textContent =
    fauna.length;

}


if(window.graficoResumoObj){

    window.graficoResumoObj.destroy();

}

/* SEGURANÇA */

document.getElementById(
    "segOcorrencias"
).textContent =
ocorrencias.length;

document.getElementById(
    "segEPI"
).textContent =
solicitacoesEPI.length;

document.getElementById(
    "segDDS"
).textContent =
ddsAtivos.length;

document.getElementById(
    "segFalaTalanga"
).textContent =
falaTalanga.length;

/* SAÚDE */

/*const cardASO =
document.getElementById(
    "cardASO"
);

if(cardASO){

    cardASO.textContent =
    asos.length;

}*/
document.getElementById(
    "saudeASO"
).textContent =
asos.length;

document.getElementById(
    "saudeAmbulatorio"
).textContent =
atendimentosAmbulatorio.length;

document.getElementById(
    "saudeMedicamentos"
).textContent =
medicamentos.length;

document.getElementById(
    "saudeEmergencias"
).textContent =
emergencias.length;

/* AMBIENTE */

document.getElementById(
    "ambRequisitos"
).textContent =
ambiental.length;

document.getElementById(
    "ambResiduos"
).textContent =
residuos.length;

document.getElementById(
    "ambConsumos"
).textContent =
consumos.length;

document.getElementById(
    "ambFauna"
).textContent =
fauna.length;






if(window.graficoEfetivoObj){

    window.graficoEfetivoObj.destroy();

}

const ctxEfetivo =
document.getElementById(
    "graficoEfetivo"
);




{

    const abertas =
    ocorrencias.filter(
        item => item.status === "Aberto"
    ).length;

    const tratamento =
    ocorrencias.filter(
        item => item.status === "Em Tratamento"
    ).length;

    const fechadas =
    ocorrencias.filter(
        item => item.status === "Fechado"
    ).length;

const hoje =
new Date();

let asoVencido = 0;
let asoProximo = 0;

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

let treinamentoVencido = 0;
let treinamentoProximo = 0;

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
document.getElementById(
    "alertaASOVencido"
).textContent =
`⚠️ ASO vencidos: ${asoVencido}`;


document.getElementById(
    "alertaASOProximo"
).textContent =
`📅 ASO a vencer: ${asoProximo}`;

document.getElementById(
    "alertaTreinamentoVencido"
).textContent =
`⚠️ Treinamentos vencidos: ${treinamentoVencido}`;


document.getElementById(
    "alertaTreinamentoProximo"
).textContent =
`📚 Treinamentos a vencer: ${treinamentoProximo}`;

const totalColaboradores =
colaboradores.length;

const totalTreinamentos =
treinamentos.length;




const totalInspecoes =
carregarDados(
    "inspecoes"
).length;

const asoValidos =
asos.filter(item => {

    return new Date(item.validade)
    >= hoje;

}).length;

const treinamentosValidos =
treinamentos.filter(item => {

    return new Date(item.validade)
    >= hoje;

}).length;

const ocorrenciasAbertas =
ocorrencias.filter(
    item => item.status !== "Fechado"
).length;

const inspecoesAbertas =
inspecoes.filter(
    item => item.status !== "Fechado"
).length;

const ambientalVencido =
ambiental.filter(
    item => item.status === "Vencido"
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

const conformidadeGeral =
totalItens > 0
? Math.max(
    0,
    Math.round(
        (
            (totalItens - totalNaoConformes) /
            totalItens
        ) * 100
    )
)
: 100;
document.getElementById(
    "cardInspecoes"
).textContent =
totalInspecoes;

document.getElementById(
    "cardColaboradores"
).textContent =
totalColaboradores;

document.getElementById(
    "cardTreinamentos"
).textContent =
totalTreinamentos;





document.getElementById(
    "cardInspecoes"
).textContent =
carregarDados("inspecoes").length;

const cardConformidade =
document.getElementById(
    "cardConformidade"
);

if(cardConformidade){

    cardConformidade.textContent =
    `${conformidadeGeral}%`;

    const statusConformidade =
    document.getElementById(
        "statusConformidade"
    );

    if(conformidadeGeral >= 90){

    cardConformidade.style.color =
    "#22c55e";

    if(statusConformidade){

        statusConformidade.textContent =
        "🟢 Conforme";

    }

}
    else if(conformidadeGeral >= 70){

    cardConformidade.style.color =
    "#f59e0b";

    if(statusConformidade){

        statusConformidade.textContent =
        "🟡 Atenção";

    }

}
else{

    cardConformidade.style.color =
    "#dc2626";

    if(statusConformidade){

        statusConformidade.textContent =
        "🔴 Não Conforme";

    }


}

}
    new Chart(

    

    {

        type: "bar",

        data: {

            labels: [
                "Aberto",
                "Em Tratamento",
                "Fechado"
            ],

            datasets: [
                {

                    label: "Ocorrências",

                    data: [
                        abertas,
                        tratamento,
                        fechadas
                    ],

                    backgroundColor:[

    "#f59e0b", // Aberto
    "#3b82f6", // Em tratamento
    "#22c55e"  // Fechado

]

                }
            ]

        },

        options:{

    responsive:true,

    maintainAspectRatio:false,

    plugins:{

        legend:{

            position:"top",

            labels:{

                color:"#64748b",

                font:{

                    size:14,

                    weight:"bold"

                }

            }

        }

    },

    scales:{

        y:{

            beginAtZero:true,

            ticks:{

                color:"#64748b"

            }

        },

        x:{

            ticks:{

                color:"#64748b"

            }

        }

    }

}

    }
    

);
async function atualizarCardColaboradoresSupabase(){

    const { data, error } =
    await supabaseClient
    .from("colaboradores")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "cardColaboradores"
    ).textContent =
    data.length;

}
async function atualizarCardTreinamentosSupabase(){

    const { data, error } =
    await supabaseClient
    .from("treinamentos")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "cardTreinamentos"
    ).textContent =
    data.length;

}
async function atualizarCardASOSupabase(){

    const { data, error } =
    await supabaseClient
    .from("asos")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "saudeASO"
    ).textContent =
    data.length;

}
async function atualizarCardDesviosSupabase(){

    const { data, error } =
    await supabaseClient
    .from("desvios")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    const card =
    document.getElementById(
        "segOcorrencias"
    );

    if(card){

        card.textContent =
        data.length;

    }

}
async function atualizarCardInspecoesSupabase(){

    const { data, error } =
    await supabaseClient
    .from("inspecoes")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    const card =
    document.getElementById(
        "cardInspecoes"
    );

    if(card){

        card.textContent =
        data.length;

    }

}
async function atualizarCardAmbulatorioSupabase(){

    const { data, error } =
    await supabaseClient
    .from("ambulatorio")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "saudeAmbulatorio"
    ).textContent =
    data.length;

}
async function atualizarCardMedicamentosSupabase(){

    const { data, error } =
    await supabaseClient
    .from("medicamentos")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "saudeMedicamentos"
    ).textContent =
    data.length;

}
async function atualizarCardEmergenciasSupabase(){

    const { data, error } =
    await supabaseClient
    .from("emergencias")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "saudeEmergencias"
    ).textContent =
    data.length;

}
async function atualizarCardAmbientalSupabase(){

    const { data, error } =
    await supabaseClient
    .from("ambiental")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "ambRequisitos"
    ).textContent =
    data.length;

}
async function atualizarCardResiduosSupabase(){

    const { data, error } =
    await supabaseClient
    .from("residuos")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "ambResiduos"
    ).textContent =
    data.length;

}
async function atualizarCardConsumosSupabase(){

    const { data, error } =
    await supabaseClient
    .from("consumos")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "ambConsumos"
    ).textContent =
    data.length;

}
async function atualizarCardFaunaSupabase(){

    const { data, error } =
    await supabaseClient
    .from("fauna")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "ambFauna"
    ).textContent =
    data.length;

}
async function atualizarHHTDashboardSupabase(){

    const { data, error } =
    await supabaseClient
    .from("hht")
    .select("*");

    if(error){

        console.error(error);
        return;

    }

    const hhtAcumulado =

    data.reduce(

        (total,item)=>

        total +

        Number(
            item.hht_semana || 0
        ),

        0

    );

    document.getElementById(
        "cardHHTAcumulado"
    ).textContent =

    hhtAcumulado.toLocaleString(
        "pt-PT"
    );

}
async function atualizarEfetivoDashboardSupabase(){

    const { data, error } =
    await supabaseClient
    .from("hht")
    .select("*")
    .order(
        "created_at",
        {
            ascending:false
        }
    )
    .limit(1);

    if(error){

        console.error(error);
        return;

    }

    if(!data.length){
        return;
    }

    document.getElementById(
        "cardEfetivoAtual"
    ).textContent =

    data[0].efetivo_semana || 0;

}
async function atualizarTFDashboardSupabase(){

    const { data: hht } =
    await supabaseClient
    .from("hht")
    .select("*");

    const { data: ocorrencias } =
    await supabaseClient
    .from("ocorrencias_hse")
    .select("*");

    const hhtAcumulado =

    hht.reduce(

        (total,item)=>

        total +

        Number(
            item.hht_semana || 0
        ),

        0

    );

    const totalACA =

    ocorrencias.filter(

        item =>
        item.tipo === "ACA"

    ).length;

    const tf =

    hhtAcumulado > 0

    ?

    (
        totalACA * 1000000
    ) / hhtAcumulado

    :

    0;

    document.getElementById(
        "cardTF"
    ).textContent =

    tf.toFixed(2);

}
async function atualizarTGDashboardSupabase(){

    const { data: hht } =
    await supabaseClient
    .from("hht")
    .select("*");

    const { data: ocorrencias } =
    await supabaseClient
    .from("ocorrencias_hse")
    .select("*");

    const hhtAcumulado =

    hht.reduce(

        (total,item)=>

        total +

        Number(
            item.hht_semana || 0
        ),

        0

    );

    const diasPerdidos =

    ocorrencias.reduce(

        (total,item)=>

        total +

        Number(
            item.dias_perdidos || 0
        ),

        0

    );

    const tg =

    hhtAcumulado > 0

    ?

    (
        diasPerdidos * 1000000
    ) / hhtAcumulado

    :

    0;

    document.getElementById(
        "cardTG"
    ).textContent =

    tg.toFixed(2);

}

async function atualizarDiasSemAcidenteSupabase(){

    try{

        const {

            data: ocorrencias,

            error: erroOcorrencias

        } = await supabaseClient
        .from("ocorrencias_hse")
        .select("*");

        if(erroOcorrencias){

            console.error(
                erroOcorrencias
            );

            return;

        }

        const acidentes =

        (ocorrencias || [])

        .filter(item =>

            item.tipo === "ACA"

            ||

            item.tipo === "Fatalidade"

        )

        .sort(

            (a,b) =>

            new Date(
                b.data_ocorrencia
            )

            -

            new Date(
                a.data_ocorrencia
            )

        );

        let dataReferencia;

        if(acidentes.length > 0){

            dataReferencia =
            acidentes[0]
            .data_ocorrencia;

        }
        else{

            const {

                data: configuracoes,

                error: erroConfig

            } = await supabaseClient

            .from(
                "configuracoes_hse"
            )

            .select("*")

            .order(
                "created_at",
                {
                    ascending:false
                }
            )

            .limit(1);

            if(erroConfig){

                console.error(
                    erroConfig
                );

                return;

            }

            if(
                !configuracoes ||
                !configuracoes.length
            ){

                document
                .getElementById(
                    "diasSemAcidente"
                )
                .textContent =
                "0";

                return;

            }

            dataReferencia =

            configuracoes[0]
            .data_base_acidente;

        }

        const inicio =

        new Date(
            dataReferencia
        );

        const hoje =
        new Date();

        const dias =

        Math.floor(
            (
                hoje - inicio
            )
            /
            (
                1000 *
                60 *
                60 *
                24
            )
        );

        document
        .getElementById(
            "diasSemAcidente"
        )
        .textContent =
        dias;

    }
    catch(erro){

        console.error(
            erro
        );

    }

}
async function atualizarConformidadeSupabase(){

    const [

        asosResult,
        treinamentosResult,
        ambientalResult,
        desviosResult,
        inspecoesResult

    ] = await Promise.all([

        supabaseClient
        .from("asos")
        .select("*"),

        supabaseClient
        .from("treinamentos")
        .select("*"),

        supabaseClient
        .from("ambiental")
        .select("*"),

        supabaseClient
        .from("desvios")
        .select("*"),

        supabaseClient
        .from("inspecoes")
        .select("*")

    ]);

    const asos =
    asosResult.data || [];

    const treinamentos =
    treinamentosResult.data || [];

    const ambiental =
    ambientalResult.data || [];

    const desvios =
    desviosResult.data || [];

    const inspecoes =
    inspecoesResult.data || [];

    const hoje =
    new Date();

    let asoVencido = 0;

    asos.forEach(item => {

        if(
            item.validade &&
            new Date(item.validade) < hoje
        ){
            asoVencido++;
        }

    });

    let treinamentoVencido = 0;

    treinamentos.forEach(item => {

        if(
            item.validade &&
            new Date(item.validade) < hoje
        ){
            treinamentoVencido++;
        }

    });

    const ambientalVencido =

    ambiental.filter(
        item =>
        item.status === "Vencido"
    ).length;

    const desviosAbertos =

    desvios.filter(
        item =>
        item.status !== "Fechado"
    ).length;

    const inspecoesAbertas =

    inspecoes.filter(
        item =>
        item.status !== "Fechado"
    ).length;

    const totalItens =

        asos.length +

        treinamentos.length +

        ambiental.length +

        desvios.length +

        inspecoes.length;

    const naoConformes =

        asoVencido +

        treinamentoVencido +

        ambientalVencido +

        desviosAbertos +

        inspecoesAbertas;

    const conformidade =

    totalItens > 0

    ?

    Math.max(

        0,

        Math.round(

            (
                (totalItens - naoConformes)

                /

                totalItens

            ) * 100

        )

    )

    :

    100;

    const card =
    document.getElementById(
        "cardConformidade"
    );

    if(card){

        card.textContent =
        `${conformidade}%`;

        if(conformidade >= 90){

            card.style.color =
            "#22c55e";

        }
        else if(
            conformidade >= 70
        ){

            card.style.color =
            "#f59e0b";

        }
        else{

            card.style.color =
            "#dc2626";

        }

    }

}
async function atualizarAlertasSupabase(){

    const [
        asosResult,
        treinamentosResult
    ] = await Promise.all([

        supabaseClient
        .from("asos")
        .select("*")
        .eq(
    "empresa_id",
    window.empresaAtual
),

        supabaseClient
        .from("treinamentos")
        .select("*")
        .eq(
    "empresa_id",
    window.empresaAtual
)

    ]);

    const asos =
    asosResult.data || [];

    const treinamentos =
    treinamentosResult.data || [];

    const hoje =
    new Date();

    let asoVencido = 0;
    let asoProximo = 0;

    asos.forEach(item => {

        if(!item.validade) return;

        const dias =

        Math.floor(

            (
                new Date(item.validade)
                -
                hoje
            )

            /

            (1000 * 60 * 60 * 24)

        );

        if(dias < 0){

            asoVencido++;

        }
        else if(dias <= 30){

            asoProximo++;

        }

    });

    let treinamentoVencido = 0;
    let treinamentoProximo = 0;

    treinamentos.forEach(item => {

        if(!item.validade) return;

        const dias =

        Math.floor(

            (
                new Date(item.validade)
                -
                hoje
            )

            /

            (1000 * 60 * 60 * 24)

        );

        if(dias < 0){

            treinamentoVencido++;

        }
        else if(dias <= 30){

            treinamentoProximo++;

        }

    });

    document.getElementById(
        "alertaASOVencido"
    ).textContent =
    `⚠️ ASO vencidos: ${asoVencido}`;

    document.getElementById(
        "alertaASOProximo"
    ).textContent =
    `📅 ASO a vencer: ${asoProximo}`;

    document.getElementById(
        "alertaTreinamentoVencido"
    ).textContent =
    `⚠️ Treinamentos vencidos: ${treinamentoVencido}`;

    document.getElementById(
        "alertaTreinamentoProximo"
    ).textContent =
    `📚 Treinamentos a vencer: ${treinamentoProximo}`;

}
async function atualizarCardEPISupabase(){

    const { data, error } =
    await supabaseClient
    .from("epi_solicitacoes")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "segEPI"
    ).textContent =
    data.length;

}
async function atualizarCardDDSSupabase(){

    const { data, error } =
    await supabaseClient
    .from("dds")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "segDDS"
    ).textContent =
    data.length;

}
async function atualizarCardFalaTalangaSupabase(){

    const { data, error } =
    await supabaseClient
    .from("fala_talanga")
    .select("id")
    .eq(
    "empresa_id",
    window.empresaAtual
);

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "segFalaTalanga"
    ).textContent =
    data.length;

}
async function atualizarGraficoHHT(){

    const { data, error } =
    await supabaseClient
    .from("hht")
    .select("*")
    .order(
        "data_inicio",
        {
            ascending:true
        }
    );

    if(error){
        console.error(error);
        return;
    }

    const labels =
    data.map(
        item => item.semana
    );

    const valores =
    data.map(
        item => item.hht_semana
    );

    const ctx =
    document.getElementById(
        "graficoHHT"
    );

    if(!ctx) return;

    if(window.graficoHHTObj){

        window.graficoHHTObj.destroy();

    }

    window.graficoHHTObj =
    new Chart(ctx,{

        type:"line",

        data:{

            labels,

            datasets:[{

                label:"HHT",

                data:valores,

                borderColor:"#2563eb",

                backgroundColor:
                "rgba(37,99,235,.2)",

                fill:true

            }]

        }

    });

}
async function atualizarGraficoDesvios(){

    const { data, error } =

    await supabaseClient
    .from("desvios")
    .select("*");

    if(error){

        console.error(error);
        return;

    }

    const meses = [
        "Jan","Fev","Mar","Abr",
        "Mai","Jun","Jul","Ago",
        "Set","Out","Nov","Dez"
    ];

    const totais =
    Array(12).fill(0);

    data.forEach(item => {

        if(!item.created_at) return;

        const mes =
        new Date(
            item.created_at
        ).getMonth();

        totais[mes]++;

    });
if(window.graficoDesviosObj){

    window.graficoDesviosObj.destroy();

}

   const ctxEvolucao =
document.getElementById(
    "graficoEvolucao"
);

if(!ctxEvolucao){
    return;
}

if(window.graficoDesviosObj){

    window.graficoDesviosObj.destroy();

}

if(window.graficoDesviosObj){

    window.graficoDesviosObj.destroy();

}

window.graficoDesviosObj =
new Chart(
    ctxEvolucao,

        {

            type:"line",

            data:{

                labels:meses,

                datasets:[{

                    label:"Desvios",

                    data:totais,

                    borderColor:"#2563eb",

                    backgroundColor:
                    "rgba(37,99,235,.15)",

                    fill:true

                }]

            }

        }

    );

}
async function atualizarGraficoOcorrencias(){

    const { data } =
    await supabaseClient
    .from("ocorrencias_hse")
    .select("*");

    const totalACA =
    data.filter(
        item => item.tipo === "ACA"
    ).length;

    const totalFatalidades =
    data.filter(
        item => item.tipo === "Fatalidade"
    ).length;

    const totalNearMiss =
    data.filter(
        item => item.tipo === "Near Miss"
    ).length;

    const ctx =
    document.getElementById(
        "graficoSegurancaEvolucao"
    );

    if(!ctx) return;

    if(window.graficoSegurancaObj){

        window.graficoSegurancaObj.destroy();

    }

    window.graficoSegurancaObj =
    new Chart(ctx,{
        type:"bar",
        data:{
            labels:[
                "ACA",
                "Fatalidades",
                "Near Miss"
            ],
            datasets:[{
                label:"Ocorrências",
                data:[
                    totalACA,
                    totalFatalidades,
                    totalNearMiss
                ]
            }]
        }
    });

}
async function atualizarGraficoEfetivo(){

    const { data, error } =

    await supabaseClient
    .from("hht")
    .select("*")
    .order(
        "data_inicio",
        {
            ascending:true
        }
    );

    if(error){

        console.error(error);

        return;

    }

    const labels =
    data.map(
        item => item.semana
    );

    const valores =
    data.map(
        item => item.efetivo_semana
    );

    const ctx =
    document.getElementById(
        "graficoEfetivo"
    );

    if(!ctx) return;

    if(window.graficoEfetivoObj){

        window.graficoEfetivoObj.destroy();

    }

    window.graficoEfetivoObj =

    new Chart(ctx,{

        type:"bar",

        data:{

            labels,

            datasets:[{

                label:"Efetivo",

                data:valores,

                backgroundColor:"#22c55e"

            }]

        }

    });

}
async function atualizarGraficoVencimentos(){

    const [
        asosResult,
        treinamentosResult
    ] = await Promise.all([

        supabaseClient
        .from("asos")
        .select("*")
        .eq(
    "empresa_id",
    window.empresaAtual
),

        supabaseClient
        .from("treinamentos")
        .select("*")
        .eq(
    "empresa_id",
    window.empresaAtual
)

    ]);

    const asos =
    asosResult.data || [];

    const treinamentos =
    treinamentosResult.data || [];

    const hoje =
    new Date();

    let asoVencido = 0;
    let asoProximo = 0;

    let treinamentoVencido = 0;
    let treinamentoProximo = 0;

    asos.forEach(item => {

        if(!item.validade) return;

        const dias =

        Math.floor(
            (
                new Date(item.validade)
                - hoje
            )
            /
            (1000 * 60 * 60 * 24)
        );

        if(dias < 0){

            asoVencido++;

        }
        else if(dias <= 30){

            asoProximo++;

        }

    });

    treinamentos.forEach(item => {

        if(!item.validade) return;

        const dias =

        Math.floor(
            (
                new Date(item.validade)
                - hoje
            )
            /
            (1000 * 60 * 60 * 24)
        );

        if(dias < 0){

            treinamentoVencido++;

        }
        else if(dias <= 30){

            treinamentoProximo++;

        }

    });

    const ctx =
    document.getElementById(
        "graficoVencimentos"
    );

    if(!ctx) return;

    if(window.graficoVencimentosObj){

        window.graficoVencimentosObj.destroy();

    }

    window.graficoVencimentosObj =
    new Chart(ctx,{

        type:"bar",

        data:{

            labels:[

                "ASO Vencidos",

                "ASO a Vencer",

                "Trein. Vencidos",

                "Trein. a Vencer"

            ],

            datasets:[{

                label:"Vencimentos",

                data:[

                    asoVencido,

                    asoProximo,

                    treinamentoVencido,

                    treinamentoProximo

                ],

                backgroundColor:[

                    "#dc2626",

                    "#f59e0b",

                    "#dc2626",

                    "#eab308"

                ]

            }]

        }

    });

}
async function atualizarGraficoResumo(){

    const [

        desviosResult,
        epiResult,
        ddsResult,
        falaResult

    ] = await Promise.all([

        supabaseClient
        .from("desvios")
        .select("id")
        .eq(
    "empresa_id",
    window.empresaAtual
),

        supabaseClient
        .from("epi_solicitacoes")
        .select("id")
        .eq(
    "empresa_id",
    window.empresaAtual
),

        supabaseClient
        .from("dds")
        .select("id")
        .eq(
    "empresa_id",
    window.empresaAtual
),

        supabaseClient
        .from("fala_talanga")
        .select("id")
.eq(
    "empresa_id",
    window.empresaAtual
)
    ]);

    const totalDesvios =
    desviosResult.data?.length || 0;

    const totalEPI =
    epiResult.data?.length || 0;

    const totalDDS =
    ddsResult.data?.length || 0;

    const totalFala =
    falaResult.data?.length || 0;

    const ctx =
    document.getElementById(
        "graficoSegurancaResumo"
    );

    if(!ctx){
        return;
    }

    if(window.graficoResumoObj){

        window.graficoResumoObj.destroy();

    }

  window.graficoResumoObj =
new Chart(ctx, {

    type: "doughnut",

    data: {

        labels:[
            "Desvios",
            "EPI",
            "DDS",
            "Fala Talanga"
        ],

        datasets:[{

            data:[

                totalDesvios,
                totalEPI,
                totalDDS,
                totalFala

            ],

            backgroundColor:[

                "#2563eb",
                "#ec4899",
                "#f59e0b",
                "#eab308"

            ]

        }]

    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            datalabels:{

                color:"#ffffff",

                font:{

                    weight:"bold",

                    size:14

                },

                formatter:value => value

            }

        }

    }

});
}

atualizarDashboard();
atualizarNotificacoes();

atualizarCardColaboradoresSupabase();
atualizarCardTreinamentosSupabase();
atualizarCardASOSupabase();
atualizarHHTDashboardSupabase();
atualizarEfetivoDashboardSupabase();
atualizarCardDesviosSupabase();
atualizarCardInspecoesSupabase();
atualizarCardAmbulatorioSupabase();
atualizarCardMedicamentosSupabase();
atualizarCardEmergenciasSupabase();
atualizarCardAmbientalSupabase();
atualizarCardResiduosSupabase();
atualizarCardConsumosSupabase();
atualizarCardFaunaSupabase();
atualizarTFDashboardSupabase();
atualizarTGDashboardSupabase();
atualizarDiasSemAcidenteSupabase();
atualizarConformidadeSupabase();
atualizarAlertasSupabase();
atualizarCardEPISupabase();
atualizarCardDDSSupabase();
atualizarCardFalaTalangaSupabase();
atualizarGraficoHHT();
atualizarGraficoDesvios();
atualizarGraficoOcorrencias();
atualizarGraficoEfetivo();
atualizarGraficoVencimentos();
atualizarGraficoResumo();

}

Chart.register(
    ChartDataLabels
);