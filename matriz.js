/* ==========================================
   MATRIZ DE RISCO
========================================== */
let riscoEmEdicao = null;

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

if (riscoEmEdicao) {

    const resultado =

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

        .eq(
            "id",
            riscoEmEdicao
        );

    error = resultado.error;

} else {

    const resultado =

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

        }]);

    error = resultado.error;

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

carregarMatrizRiscos();
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

    const tbody =
    document.querySelector(
        "#tabelaMatrizRiscos tbody"
    );

    tbody.innerHTML = "";

    data.forEach(risco => {

        tbody.innerHTML += `

        <tr class="${classeRisco(
    risco.risco_inerente
)}">

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
${risco.status || "-"}
</td>

<td>
${risco.prazo || "-"}
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
data.filter(
    r => r.risco_inerente <= 4
).length;

const medios =
data.filter(
    r =>
    r.risco_inerente >= 5 &&
    r.risco_inerente <= 9
).length;

const altos =
data.filter(
    r =>
    r.risco_inerente >= 10 &&
    r.risco_inerente <= 16
).length;

const criticos =
data.filter(
    r =>
    r.risco_inerente >= 17
).length;

document.getElementById(
    "riscosBaixos"
).textContent =
`🟢 ${baixos}`;

document.getElementById(
    "riscosMedios"
).textContent =
`🟡 ${medios}`;

document.getElementById(
    "riscosAltos"
).textContent =
`🟠 ${altos}`;

document.getElementById(
    "riscosCriticos"
).textContent =
`🔴 ${criticos}`;
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

(async () => {

    await carregarMatrizRiscos();

})();