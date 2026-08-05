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
    const cardASO =
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
) || [];





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
document.getElementById(
    "cardHHTAcumulado"
).textContent =

hhtAcumulado.toLocaleString(
    "pt-PT"
);

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



if(
    typeof Chart !== "undefined" &&
    document.getElementById(
        "graficoSegurancaResumo"
    )
){

    new Chart(
        document.getElementById(
            "graficoSegurancaResumo"
        ),
        {
            type:"doughnut",

            data:{

                labels:[
                    "Desvios",
                    "EPI",
                    "DDS",
                    "Fala Talanga"
                ],

                datasets:[
                    {
                        data:[
                            ocorrencias.length,
                            solicitacoesEPI.length,
                            ddsAtivos.length,
                            falaTalanga.length
                        ]
                    }
                ]

            }

        }
    );
const cardDiasSemAcidente =
document.getElementById(
    "diasSemAcidente"
);

if(cardDiasSemAcidente){

    cardDiasSemAcidente.textContent =
    calcularDiasSemAcidente();

}

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

const cardASO =
document.getElementById(
    "cardASO"
);

if(cardASO){

    cardASO.textContent =
    asos.length;

}
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


if(
    typeof Chart !== "undefined" &&
    document.getElementById(
        "graficoVencimentos"
    )
){

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

    new Chart(

        document.getElementById(
            "graficoVencimentos"
        ),

        {

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

            },

           options:{

    responsive:true,

    maintainAspectRatio:false,

    plugins:{

        legend:{

            display:false

        }

    },

    scales:{

        y:{

            beginAtZero:true,

            grid:{

                color:"#e2e8f0"

            }

        }

    }

}
        }

    );
const labelsHHT =

registosHHT.map(
    item => item.semana
);

const dadosHHT =

registosHHT.map(
    item => item.hhtSemana
);

if(window.graficoHHTObj){

    window.graficoHHTObj.destroy();

}

const ctxHHT =
document.getElementById(
    "graficoHHT"
);

if(ctxHHT){

    window.graficoHHTObj =
    new Chart(
        ctxHHT,
        {

            type:"line",

            data:{

                labels:
                labelsHHT,

                datasets:[

                    {

                        label:
                        "HHT",

                        data:
                        dadosHHT,

                        borderColor:
                        "#2563eb",

                        backgroundColor:
                        "rgba(37,99,235,.2)",

                        fill:true,

                        tension:.3

                    }

                ]

            }

        }
    );

}
const labelsEfetivo =

registosHHT.map(
    item => item.semana
);

const dadosEfetivo =

registosHHT.map(
    item => item.efetivoSemana
);
if(window.graficoEfetivoObj){

    window.graficoEfetivoObj.destroy();

}

const ctxEfetivo =
document.getElementById(
    "graficoEfetivo"
);

if(ctxEfetivo){

    window.graficoEfetivoObj =
    new Chart(
        ctxEfetivo,
        {

            type:"bar",

            data:{

                labels:
                labelsEfetivo,

                datasets:[

                    {

                        label:
                        "Efetivo",

                        data:
                        dadosEfetivo,

                        backgroundColor:
                        "#22c55e",

                        borderColor:
                        "#16a34a",

                        borderWidth:1

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:true

                    }

                },

                scales:{

                    y:{

                        beginAtZero:true

                    }

                }

            }

        }
    );

}

}

if(
    typeof Chart !== "undefined" &&
    document.getElementById(
        "graficoEvolucao"
    )
){

    const meses = [

        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"

    ];

    const totais =
    Array(12).fill(0);

    ocorrencias.forEach(item => {

        if(!item.data) return;

        const data =
        new Date(item.data);

        const mes =
        data.getMonth();

        totais[mes]++;

    });

    new Chart(

        document.getElementById(
            "graficoEvolucao"
        ),

        {

            type:"line",

            data:{

                labels:meses,

                datasets:[{

    

    data:totais,

    borderColor:"#2563eb",

    backgroundColor:"rgba(37,99,235,0.15)",

    borderWidth:3,

    pointRadius:5,

    pointHoverRadius:8,

    pointBackgroundColor:"#2563eb",

    fill:true,

    tension:0.4

}]
            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        position:"top"

                    }

                }

            }

        }

    );
const ocorrenciasHSE =
carregarDados(
    "ocorrenciasHSE"
) || [];

const totalACA =

ocorrenciasHSE.filter(
    item => item.tipo === "ACA"
).length;

const totalFatalidades =

ocorrenciasHSE.filter(
    item => item.tipo === "Fatalidade"
).length;


const totalNearMiss =

ocorrenciasHSE.filter(
    item => item.tipo === "Near Miss"
).length;
``
if(window.graficoSegurancaObj){

    window.graficoSegurancaObj.destroy();

}
const ctxSeguranca =
document.getElementById(
    "graficoSegurancaEvolucao"
);

if(ctxSeguranca){

    window.graficoSegurancaObj =
    new Chart(
        ctxSeguranca,
        {

            type:"bar",

            data:{

                labels:[

                    "ACA",
                    "Fatalidades",
                    
                    "Near Miss"

                ],

                datasets:[

                    {

                        label:
                        "Ocorrências",

                        data:[

                            totalACA,
                            totalFatalidades,
                            
                            totalNearMiss

                        ],

                        backgroundColor:[

                            "#ef4444",
                            "#7f1d1d",
                            "#f59e0b",
                            "#3b82f6"

                        ]

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                scales:{

                    y:{

                        beginAtZero:true,

                        ticks:{

                            precision:0

                        }

                    }

                }

            }

        }
    );

}
}
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

atualizarDashboard();
atualizarNotificacoes();
}

