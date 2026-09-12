/* ==========================================
   MATRIZ DE RISCO
========================================== */
let riscoEmEdicao = null;
let graficoRiscos = null;
document
.getElementById(
    "formMatrizRiscos"
)
.addEventListener(
    "submit",
    guardarRisco
);
async function guardarRisco(e) {

    e.preventDefault();

    const probabilidade =
    Number(
        probabilidadeRisco.value
    );

    const consequencia =
    Number(
        impactoRisco.value
    );

    const riscoInerente =
    probabilidade *
    consequencia;

    const riscoResidual =
    Number(
        novaProbabilidade.value
    ) *
    Number(
        novaConsequencia.value
    );

   let error;
let resultado;

if (riscoEmEdicao) {

    resultado =
await supabaseClient


        .from("matriz_riscos")

        .update({

            categoria:
            categoriaRisco.value,

            processo:
            processoRisco.value,

            descricao_risco:
            descricaoRisco.value,

            causa:
            causaRisco.value,

            consequencia:
            consequenciaRisco.value,

            natureza:
            naturezaRisco.value,

            tipo_resposta:
            tipoResposta.value,

            tratamento:
            tratamentoRisco.value,
            acao_corretiva:
acaoCorretiva.value,


            probabilidade:
            probabilidade,

            consequencia_nivel:
            consequencia,

            risco_inerente:
            riscoInerente,

            nova_probabilidade:
            Number(
                novaProbabilidade.value
            ),

            nova_consequencia:
            Number(
                novaConsequencia.value
            ),

            risco_residual:
            riscoResidual,

            responsavel:
            responsavelRisco.value,

           prazo:
prazoRisco.value || null,

            status:
            statusRisco.value

        })
.select()

.single()
        .eq(
            "id",
            riscoEmEdicao
        );

    error = resultado.error;

} else {

    resultado =
await supabaseClient


        .from("matriz_riscos")

        .insert([{

            empresa_id:
            utilizadorAtual.empresa_id,

            categoria:
            categoriaRisco.value,

            processo:
            processoRisco.value,

            descricao_risco:
            descricaoRisco.value,

            causa:
            causaRisco.value,

            consequencia:
            consequenciaRisco.value,

            natureza:
            naturezaRisco.value,

            tipo_resposta:
            tipoResposta.value,

            tratamento:
            tratamentoRisco.value,
            acao_corretiva:
acaoCorretiva.value,

            probabilidade:
            probabilidade,

            consequencia_nivel:
            consequencia,

            risco_inerente:
            riscoInerente,

            nova_probabilidade:
            Number(
                novaProbabilidade.value
            ),

            nova_consequencia:
            Number(
                novaConsequencia.value
            ),

            risco_residual:
            riscoResidual,

            responsavel:
            responsavelRisco.value,

           prazo:
prazoRisco.value || null,
            status:
            statusRisco.value

        }])
        .select()
.single();



        


    error = resultado.error;

}

if (
    !error &&
    riscoInerente >= 17
) {

    await gerarAcaoAutomatica(

        resultado.data.id,

        descricaoRisco.value,

        responsavelRisco.value,

        prazoRisco.value

    );

}

    if (error) {

        console.error(error);

        return;

    }

    document
    .getElementById(
        "formMatrizRiscos"
    )
    .reset();

    carregarMatrizRiscos();

    riscoEmEdicao = null;

document
.getElementById(
    "formMatrizRiscos"
)
.reset();

if (
    riscoInerente >= 17
) {

    alert(
        "Risco crítico. Plano de ação criado automaticamente."
    );

}
carregarMatrizRiscos();
}

document
.getElementById(
    "filtroStatusRisco"
)
.addEventListener(
    "change",
    carregarMatrizRiscos
);

async function carregarPlanoAcoes() {

    const { data, error } =

    await supabaseClient

        .from("plano_acoes")

        .select("*")

        .order(
            "created_at",
            {
                ascending: false
            }
        );

    if (error) {

        console.error(error);

        return;

    }

    const tbody =
    document.querySelector(
        "#tabelaPlanoAcoes tbody"
    );

    tbody.innerHTML = "";

    data.forEach(acao => {

        tbody.innerHTML += `

        <tr>

            <td>
                ${acao.origem}
            </td>

            <td>
                ${acao.titulo}
            </td>

            <td>
                ${acao.responsavel || "-"}
            </td>

            <td>
                ${acao.prazo || "-"}
            </td>

            <td>
                ${acao.prioridade}
            </td>

            <td>
    ${acao.status}
</td>
<td>

    <button
        onclick="
        gerarPdfPlanoAcao(
            '${acao.risco_id}'
        )
        "
    >
        📄
    </button>

    

    <button
        onclick="
        eliminarPlanoAcao(
            '${acao.id}'
        )
        "
    >
        🗑️
    </button>

</td>

        </tr>

        `;

    });
const totalAcoes =
data.length;

const abertas =
data.filter(
    acao =>
    acao.status === "ABERTO"
).length;

const fechadas =
data.filter(
    acao =>
    acao.status === "FECHADO"
).length;

const vencidas =
data.filter(acao => {

    if (
        acao.status === "FECHADO"
    ) {
        return false;
    }

    if (!acao.prazo) {
        return false;
    }

    return new Date(acao.prazo) <
    new Date();

}).length;
document.getElementById(
    "totalAcoes"
).textContent =
totalAcoes;

document.getElementById(
    "acoesAbertas"
).textContent =
abertas;

document.getElementById(
    "acoesFechadas"
).textContent =
fechadas;

document.getElementById(
    "acoesVencidas"
).textContent =
vencidas;
}

async function gerarPdfPlanoAcao(
    riscoId
) {

    const { data: plano, error } =

    await supabaseClient

        .from("plano_acoes")

        .select("*")

        .eq(
            "risco_id",
            riscoId
        )

        .single();

    if (error || !plano) {

        alert(
            "Plano de Ação não encontrado."
        );

        return;

    }

    const { data: risco } =

    await supabaseClient

        .from("matriz_riscos")

        .select("*")

        .eq(
            "id",
            riscoId
        )

        .single();

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
            28,
            28
        );

    }

    pdf.setFontSize(18);

    pdf.text(
        "PLANO DE AÇÃO",
        105,
        20,
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
        145,
        15
    );

    pdf.text(
        `Origem: ${
            plano.origem || "-"
        }`,
        145,
        22
    );

    pdf.text(
        `Prioridade: ${
            plano.prioridade || "-"
        }`,
        145,
        29
    );

    pdf.line(
        10,
        40,
        200,
        40
    );

    let y = 55;

    pdf.setFontSize(12);

    pdf.text(
        `Título: ${
            plano.titulo || "-"
        }`,
        10,
        y
    );

    y += 10;

    pdf.text(
        `Responsável: ${
            plano.responsavel || "-"
        }`,
        10,
        y
    );

    y += 10;

    pdf.text(
        `Prazo: ${
            plano.prazo
            ?
            new Date(
                plano.prazo
            ).toLocaleDateString(
                "pt-PT"
            )
            :
            "-"
        }`,
        10,
        y
    );

    y += 10;

    pdf.text(
        `Status: ${
            plano.status || "-"
        }`,
        10,
        y
    );

    y += 20;

    /* ==========================
       PLANO DE AÇÃO
    ========================== */

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
        "PLANO DE AÇÃO",
        13,
        y + 7
    );

    y += 20;

    pdf.setFontSize(10);

    const linhasPlano =

    pdf.splitTextToSize(
        plano.descricao || "",
        180
    );

    pdf.text(
        linhasPlano,
        10,
        y
    );

    y +=
    linhasPlano.length * 6 +
    15;

    /* ==========================
       RISCO ASSOCIADO
    ========================== */

    if (risco) {

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
            "RISCO ASSOCIADO",
            13,
            y + 7
        );

        y += 20;

        pdf.setFontSize(10);

        pdf.text(
            `Categoria: ${
                risco.categoria || "-"
            }`,
            10,
            y
        );

        y += 8;

        pdf.text(
            `Processo: ${
                risco.processo || "-"
            }`,
            10,
            y
        );

        y += 8;

        pdf.text(
            `Natureza: ${
                risco.natureza || "-"
            }`,
            10,
            y
        );

        y += 8;

        pdf.text(
            `Risco Inerente: ${
                risco.risco_inerente || "-"
            }`,
            10,
            y
        );

        y += 8;

        pdf.text(
            `Risco Residual: ${
                risco.risco_residual || "-"
            }`,
            10,
            y
        );

        y += 12;

        const descricaoRisco =

        pdf.splitTextToSize(
            risco.descricao_risco || "",
            180
        );

        pdf.text(
            descricaoRisco,
            10,
            y
        );

    }

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

    }

    pdf.save(
        `Plano_Acao_${plano.id}.pdf`
    );

}

async function eliminarPlanoAcao(id) {

    if (
        !confirm(
            "Eliminar Plano de Ação?"
        )
    ) {

        return;

    }

    const { error } =

    await supabaseClient

        .from("plano_acoes")

        .delete()

        .eq(
            "id",
            id
        );

    if (error) {

        console.error(error);

        return;

    }

    carregarPlanoAcoes();

}

function classificarRisco(valor) {

    if (valor <= 4)
        return `🟢 BAIXO (${valor})`;

    if (valor <= 9)
        return `🟡 MÉDIO (${valor})`;

    if (valor <= 16)
        return `🟠 ALTO (${valor})`;

    return `🔴 CRÍTICO (${valor})`;

}
function classeRisco(valor) {

    if (valor <= 4)
        return "risco-baixo";

    if (valor <= 9)
        return "risco-medio";

    if (valor <= 16)
        return "risco-alto";

    return "risco-critico";

}


async function carregarMatrizRiscos() {

    const { data } =

    await supabaseClient

        .from(
            "matriz_riscos"
        )

        .select("*")

        .order(
            "created_at",
            {
                ascending: false
            }
        );
let riscosFiltrados =
data || [];

const statusSelecionado =

document.getElementById(
    "filtroStatusRisco"
).value;

const textoPesquisa =

document
.getElementById(
    "pesquisaMatrizRisco"
)
.value
.toLowerCase();

if (statusSelecionado) {

    riscosFiltrados =
    riscosFiltrados.filter(
        risco =>

        risco.status ===
        statusSelecionado
    );

}
if (textoPesquisa) {

    riscosFiltrados =
    riscosFiltrados.filter(risco =>

        (risco.categoria || "")
        .toLowerCase()
        .includes(textoPesquisa)

        ||

        (risco.processo || "")
        .toLowerCase()
        .includes(textoPesquisa)

        ||

        (risco.descricao_risco || "")
        .toLowerCase()
        .includes(textoPesquisa)

        ||

        (risco.responsavel || "")
        .toLowerCase()
        .includes(textoPesquisa)

    );

}
const vencidos =

riscosFiltrados.filter(
    risco =>
    riscoVencido(risco)
).length;

document.getElementById(
    "riscosVencidos"
).textContent =
vencidos;

    const tbody =
    document.querySelector(
        "#tabelaMatrizRiscos tbody"
    );

    tbody.innerHTML = "";

    riscosFiltrados.forEach(risco => {

        tbody.innerHTML += `

       <tr
class="
${classeRisco(
    risco.risco_inerente
)}
${

riscoVencido(risco)

?

"risco-vencido"

:

""

}
">

            <td>
                ${risco.categoria}
            </td>

            <td>
                ${risco.processo}
            </td>

            <td>
                ${risco.descricao_risco}
            </td>

            <td>
                ${risco.natureza}
            </td>

            <td>
                ${risco.probabilidade}
            </td>

            <td>
                ${risco.consequencia_nivel}
            </td>

            <td>
${classificarRisco(
    risco.risco_inerente
)}
</td>

<td>
${classificarRisco(
    risco.risco_residual
)}
</td>

<td>
${risco.responsavel || "-"}
</td>

<td>

${
    riscoVencido(risco)

    ?

    "🚨 VENCIDO"

    :

    (risco.status || "-")

}

</td>

<td>
${
    risco.prazo
    ?
    new Date(
        risco.prazo
    ).toLocaleDateString(
        "pt-PT"
    )
    :
    "-"
}
</td>

<td>

    <button
        onclick="
        verPlanoAcao(
            '${risco.id}'
        )
        "
    >
        📋
    </button>

</td>

<td>

    <button
        onclick="
        editarRisco(
            '${risco.id}'
        )
        "
    >
        ✏️
    </button>

    <button
        onclick="
        eliminarRisco(
            '${risco.id}'
        )
        "
    >
        🗑️
    </button>

</td>
        </tr>

        `;

    });
const baixos =
riscosFiltrados.filter(
    r => r.risco_inerente <= 4
).length;

const medios =
riscosFiltrados.filter(
    r =>
    r.risco_inerente >= 5 &&
    r.risco_inerente <= 9
).length;

const altos =
riscosFiltrados.filter(
    r =>
    r.risco_inerente >= 10 &&
    r.risco_inerente <= 16
).length;

const criticos =
riscosFiltrados.filter(
    r =>
    r.risco_inerente >= 17
).length;

const totalRiscos =
riscosFiltrados.length;

const cardBaixos =
document.getElementById(
    "riscosBaixos"
);
atualizarGraficoRiscos(

    baixos,

    medios,

    altos,

    criticos

);
if (cardBaixos) {

    cardBaixos.textContent =
    baixos;

}

const cardMedios =
document.getElementById(
    "riscosMedios"
);

if (cardMedios) {

    cardMedios.textContent =
    medios;

}

const cardAltos =
document.getElementById(
    "riscosAltos"
);

if (cardAltos) {

    cardAltos.textContent =
    altos;

}

const cardCriticos =
document.getElementById(
    "riscosCriticos"
);

if (cardCriticos) {

    cardCriticos.textContent =
    criticos;

}

const cardVencidos =
document.getElementById(
    "riscosVencidos"
);

if (cardVencidos) {

    cardVencidos.textContent =
    vencidos;
const cardTotal =
document.getElementById(
    "totalRiscos"
);

if (cardTotal) {

    cardTotal.textContent =
    totalRiscos;

}
}
}

function riscoVencido(risco) {

    if (
        risco.status === "FECHADO"
    ) {

        return false;

    }

    if (!risco.prazo) {

        return false;

    }

    return new Date(risco.prazo)
    <
    new Date();

}

async function editarRisco(id) {

    const { data, error } =

    await supabaseClient

        .from(
            "matriz_riscos"
        )

        .select("*")

        .eq("id", id)

        .single();

    if (error) {

        console.error(error);

        return;

    }

    riscoEmEdicao = id;

    categoriaRisco.value =
    data.categoria || "";

    processoRisco.value =
    data.processo || "";

    descricaoRisco.value =
    data.descricao_risco || "";

    causaRisco.value =
    data.causa || "";

    consequenciaRisco.value =
    data.consequencia || "";

    naturezaRisco.value =
    data.natureza || "";

    tipoResposta.value =
    data.tipo_resposta || "";

    tratamentoRisco.value =
    data.tratamento || "";
    acaoCorretiva.value =
data.acao_corretiva || "";

    probabilidadeRisco.value =
    data.probabilidade || 1;

    impactoRisco.value =
    data.consequencia_nivel || 1;

    novaProbabilidade.value =
    data.nova_probabilidade || 1;

    novaConsequencia.value =
    data.nova_consequencia || 1;

    responsavelRisco.value =
    data.responsavel || "";

    prazoRisco.value =
    data.prazo || "";

    statusRisco.value =
    data.status || "ABERTO";

}

async function eliminarRisco(id) {

    if (
        !confirm(
            "Eliminar este risco?"
        )
    ) {

        return;

    }

    const { error } =

    await supabaseClient

        .from(
            "matriz_riscos"
        )

        .delete()

        .eq(
            "id",
            id
        );

    if (error) {

        console.error(error);

        alert(
            "Erro ao eliminar."
        );

        return;

    }

    carregarMatrizRiscos();

}

document
.getElementById(
    "btnExportarMatriz"
)
.addEventListener(
    "click",
    exportarMatrizExcel
);
async function exportarMatrizExcel() {

    const { data, error } =

    await supabaseClient

        .from("matriz_riscos")

        .select("*")

        .order(
            "created_at",
            {
                ascending: false
            }
        );

    if (error) {

        console.error(error);

        return;

    }

    const dados =

    data.map(risco => ({

        Categoria:
        risco.categoria,

        Processo:
        risco.processo,

        Risco:
        risco.descricao_risco,

        Causa:
        risco.causa,

        Consequência:
        risco.consequencia,

        Natureza:
        risco.natureza,

        Resposta:
        risco.tipo_resposta,

        Tratamento:
        risco.tratamento,

        Probabilidade:
        risco.probabilidade,

        Impacto:
        risco.consequencia_nivel,

        "Risco Inerente":
        risco.risco_inerente,

        "Nova Probabilidade":
        risco.nova_probabilidade,

        "Nova Consequência":
        risco.nova_consequencia,

        "Risco Residual":
        risco.risco_residual,

        Responsável:
        risco.responsavel,

        Prazo:
        risco.prazo,

        Status:
        risco.status

    }));

    const worksheet =
    XLSX.utils.json_to_sheet(
        dados
    );

    const workbook =
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Matriz de Riscos"

    );

    XLSX.writeFile(

        workbook,

        "Matriz_Riscos.xlsx"

    );

}

document
.getElementById(
    "pesquisaMatrizRisco"
)
.addEventListener(
    "input",
    carregarMatrizRiscos
);
function atualizarGraficoRiscos(
    baixos,
    medios,
    altos,
    criticos
) {

    const ctx =
    document
    .getElementById(
        "graficoRiscos"
    )
    .getContext("2d");

    if (graficoRiscos) {

        graficoRiscos.destroy();

    }

    graficoRiscos =
    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Baixos",
                "Médios",
                "Altos",
                "Críticos"

            ],

            datasets: [{

                label:
                "Quantidade",

                data: [

                    baixos,
                    medios,
                    altos,
                    criticos

                ],

                backgroundColor: [

                    "#28a745",
                    "#ffc107",
                    "#fd7e14",
                    "#dc3545"

                ],

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            },

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}
async function gerarAcaoAutomatica(
    riscoId,
    descricao,
    responsavel,
    prazo
) {

    const prioridade =
    "CRÍTICA";

    await supabaseClient

        .from("plano_acoes")

        .insert([{

            empresa_id:
            utilizadorAtual.empresa_id,

            risco_id:
            riscoId,

           titulo:
acaoCorretiva.value,

           descricao:
`
Risco:
${descricaoRisco.value}

Causa:
${causaRisco.value}

Consequência:
${consequenciaRisco.value}

Tratamento:
${tratamentoRisco.value}
`,

            responsavel:
            responsavel,

            prazo:
            prazo || null,

            prioridade:
            prioridade,

            origem:
            "MATRIZ DE RISCOS"

        }]);

}

async function verPlanoAcao(
    riscoId
) {

    alternarSecao(
        "secaoPlanoAcoes"
    );

    await carregarPlanoAcoes();

    document
    .getElementById(
        "secaoPlanoAcoes"
    )
    .scrollIntoView({

        behavior: "smooth"

    });

}

(async () => {

    await carregarMatrizRiscos();

})();