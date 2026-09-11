/* ==========================================
   AMBIENTE
========================================== */

const formAmbiente =
document.getElementById(
    "formAmbiente"
);

const tabelaAmbiental =
document.querySelector(
    "#tabelaAmbiental tbody"
);

let ambiental = [];

let indiceEdicaoAmbiental =
null;

/* ==========================================
   IMPACTO AMBIENTAL
========================================== */
let graficoAspectos = null;

const formAspectoAmbiental = document.getElementById("formAspectoAmbiental");
const tabelaAspectosAmbientais = document.querySelector("#tabelaAspectosAmbientais tbody");

let aspectosAmbientais = [];
let indiceEdicaoAspecto = null;

async function carregarAspectosAmbientaisSupabase() {

    if (!window.empresaAtual) return;

    const { data, error } = await supabaseClient
        .from("aspectos_impactos_ambientais")
        .select("*")
        .eq("empresa_id", window.empresaAtual);

    if (error) {
        console.error(error);
        return;
    }

    aspectosAmbientais = data || [];
    console.log(
    "DADOS ASPECTOS:",
    aspectosAmbientais
);

    atualizarAspectosAmbientais();
}
function atualizarGraficoAspectos(){

    const canvas =
    document.getElementById(
        "graficoAspectos"
    );

    if(!canvas){
        return;
    }

    const ctx =
    canvas.getContext("2d");

    if(graficoAspectos){

        graficoAspectos.destroy();

    }

    const baixos =
    aspectosAmbientais.filter(
        item => item.classificacao === "Baixo"
    ).length;

    const moderados =
    aspectosAmbientais.filter(
        item => item.classificacao === "Moderado"
    ).length;

    const altos =
    aspectosAmbientais.filter(
        item => item.classificacao === "Alto"
    ).length;

    const criticos =
    aspectosAmbientais.filter(
        item => item.classificacao === "Crítico"
    ).length;

    graficoAspectos =
    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Baixo",
                "Moderado",
                "Alto",
                "Crítico"

            ],

            datasets: [{

                data: [

                    baixos,
                    moderados,
                    altos,
                    criticos

                ],

                backgroundColor: [

                    "#4CAF50",
                    "#FFC107",
                    "#FF9800",
                    "#F44336"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
function atualizarAspectosAmbientais(lista = aspectosAmbientais) {

    if (!tabelaAspectosAmbientais) return;

    tabelaAspectosAmbientais.innerHTML = "";

    lista.forEach((item,index) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
    <td>${item.atividade}</td>
    <td>${item.aspecto}</td>
    <td>${item.impacto}</td>
    <td>${item.area || "-"}</td>
    <td>${item.responsavel || "-"}</td>
    <td>${item.status || "-"}</td>
    <td>${item.risco}</td>
    <td>
    ${
        item.significativo === "Sim"
        ? "✅ Sim"
        : "❌ Não"
    }
</td>
    <td>

${
item.classificacao === "Crítico"
? "🔴 Crítico"

: item.classificacao === "Alto"
? "🟠 Alto"

: item.classificacao === "Moderado"
? "🟡 Moderado"

: "🟢 Baixo"
}

</td>
    <td>
    <button
        type="button"
        onclick="editarAspecto(${index})"
    >
        ✏️
    </button>

    <button
        type="button"
        onclick="imprimirAspecto(${index})"
    >
        🖨️
    </button>

    <button
        type="button"
        onclick="eliminarAspecto(${index})"
    >
        🗑️
    </button>
</td>

        `;

        tabelaAspectosAmbientais.appendChild(linha);
    });

    atualizarIndicadoresAspectos();

desenharMatrizAmbiental();

atualizarGraficoAspectos();
}

document
.getElementById("pesquisaAspecto")
?.addEventListener(
    "input",
    pesquisarAspectos
);
function pesquisarAspectos(){

    const texto =
    document.getElementById(
        "pesquisaAspecto"
    ).value.toLowerCase();

    const resultados =
    aspectosAmbientais.filter(item =>

        item.atividade
        ?.toLowerCase()
        .includes(texto)

        ||

        item.aspecto
        ?.toLowerCase()
        .includes(texto)

        ||

        item.impacto
        ?.toLowerCase()
        .includes(texto)

        ||

        item.responsavel
        ?.toLowerCase()
        .includes(texto)

    );

    atualizarAspectosAmbientais(
        resultados
    );

}
function filtrarAspectos(){

    const inicio =
    document.getElementById(
        "dataInicioAspecto"
    ).value;

    const fim =
    document.getElementById(
        "dataFimAspecto"
    ).value;

    let resultados =
    [...aspectosAmbientais];

    if(inicio){

        resultados =
        resultados.filter(
            item =>
            item.created_at.substring(0,10)
            >= inicio
        );

    }

    if(fim){

        resultados =
        resultados.filter(
            item =>
            item.created_at.substring(0,10)
            <= fim
        );

    }

    atualizarAspectosAmbientais(
        resultados
    );

}
function limparFiltrosAspectos(){

    document.getElementById(
        "pesquisaAspecto"
    ).value = "";

    document.getElementById(
        "dataInicioAspecto"
    ).value = "";

    document.getElementById(
        "dataFimAspecto"
    ).value = "";

    atualizarAspectosAmbientais();

}
async function eliminarAspecto(index){

    if(
        !confirm(
            "Eliminar registo?"
        )
    ) return;

    const item =
    aspectosAmbientais[index];

    const { error } =
    await supabaseClient
    .from(
        "aspectos_impactos_ambientais"
    )
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;

    }

    await carregarAspectosAmbientaisSupabase();

}
function editarAspecto(index){

    const item =
    aspectosAmbientais[index];

    document.getElementById(
        "atividadeAmbiental"
    ).value =
    item.atividade || "";

    document.getElementById(
        "aspectoAmbiental"
    ).value =
    item.aspecto || "";

    document.getElementById(
        "impactoAmbiental"
    ).value =
    item.impacto || "";

    document.getElementById(
        "areaAmbiental"
    ).value =
    item.area || "";

    document.getElementById(
        "responsavelAspecto"
    ).value =
    item.responsavel || "";

    document.getElementById(
        "statusAspecto"
    ).value =
    item.status || "Ativo";

    indiceEdicaoAspecto =
    item.id;
    document.getElementById(
    "controleAmbiental"
).value =
item.controle_existente || "";

document.getElementById(
    "mitigacaoAmbiental"
).value =
item.acao_mitigacao || "";

document.getElementById(
    "probabilidadeAmbiental"
).value =
item.probabilidade || 1;

document.getElementById(
    "severidadeAmbiental"
).value =
item.severidade || 1;

}

function imprimirAspecto(index){

    const item =
    aspectosAmbientais[index];

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
    "ASPECTOS E IMPACTOS AMBIENTAIS",
    55,
    28
);

    pdf.line(
        15,
        45,
        195,
        45
    );
    pdf.text(
    `Total Aspectos: ${aspectosAmbientais.length}`,
    15,
    55
);

pdf.text(
    `Críticos: ${
        aspectosAmbientais.filter(
            i => i.classificacao === "Crítico"
        ).length
    }`,
    15,
    65
);

pdf.text(
    `Altos: ${
        aspectosAmbientais.filter(
            i => i.classificacao === "Alto"
        ).length
    }`,
    15,
    75
);

pdf.text(
    `Significativos: ${
        aspectosAmbientais.filter(
            i => i.significativo === "Sim"
        ).length
    }`,
    15,
    85
);

    pdf.setFontSize(11);

    pdf.text(
        `Atividade: ${item.atividade}`,
        15,
        60
    );

    pdf.text(
        `Aspecto: ${item.aspecto}`,
        15,
        75
    );

    pdf.text(
        `Impacto: ${item.impacto}`,
        15,
        90
    );

    pdf.text(
        `Área: ${item.area || "-"}`,
        15,
        105
    );

    pdf.text(
        `Responsável: ${item.responsavel || "-"}`,
        15,
        120
    );

    pdf.text(
        `Status: ${item.status || "-"}`,
        15,
        135
    );

    pdf.text(
        `Probabilidade: ${item.probabilidade}`,
        15,
        150
    );

    pdf.text(
        `Severidade: ${item.severidade}`,
        15,
        165
    );

    pdf.text(
        `Risco: ${item.risco}`,
        15,
        180
    );

    pdf.text(
        `Classificação: ${item.classificacao}`,
        15,
        195
    );

    pdf.text(
        `Significativo: ${item.significativo || "Não"}`,
        15,
        210
    );

    pdf.text(
        `Controle Existente: ${item.controle_existente || "-"}`,
        15,
        225,
        { maxWidth: 170 }
    );

    pdf.text(
        `Ação de Mitigação: ${item.acao_mitigacao || "-"}`,
        15,
        245,
        { maxWidth: 170 }
    );

    pdf.save(
        `Aspecto_Ambiental_${item.atividade}.pdf`
    );

}

function atualizarIndicadoresAspectos() {

    document.getElementById("totalAspectos").textContent =
        aspectosAmbientais.length;

    document.getElementById("riscosCriticos").textContent =
        aspectosAmbientais.filter(
            item => item.classificacao === "Crítico"
        ).length;

    document.getElementById("riscosAltos").textContent =
        aspectosAmbientais.filter(
            item => item.classificacao === "Alto"
        ).length;
        document.getElementById("aspectosAtivos").textContent =
aspectosAmbientais.filter(
    item => item.status === "Ativo"
).length;

document.getElementById("aspectosEncerrados").textContent =
aspectosAmbientais.filter(
    item => item.status === "Encerrado"
).length;
document.getElementById(
    "aspectosSignificativos"
).textContent =
aspectosAmbientais.filter(
    item => item.significativo === "Sim"
).length;
document.getElementById(
    "riscosModerados"
).textContent =

aspectosAmbientais.filter(
    item =>
    item.classificacao ===
    "Moderado"
).length;
document.getElementById(
    "riscosBaixos"
).textContent =

aspectosAmbientais.filter(
    item =>
    item.classificacao ===
    "Baixo"
).length;
}
if (
    formAspectoAmbiental &&
    tabelaAspectosAmbientais
) {

    formAspectoAmbiental.addEventListener(
        "submit",
        async e => {

            e.preventDefault();

            const atividade =
                document.getElementById(
                    "atividadeAmbiental"
                ).value;

            const aspecto =
                document.getElementById(
                    "aspectoAmbiental"
                ).value;

            const impacto =
                document.getElementById(
                    "impactoAmbiental"
                ).value;

            const area =
                document.getElementById(
                    "areaAmbiental"
                ).value;

            const probabilidade =
                Number(
                    document.getElementById(
                        "probabilidadeAmbiental"
                    ).value
                );

            const severidade =
                Number(
                    document.getElementById(
                        "severidadeAmbiental"
                    ).value
                );

            const controle_existente =
                document.getElementById(
                    "controleAmbiental"
                ).value;

            const acao_mitigacao =
                document.getElementById(
                    "mitigacaoAmbiental"
                ).value;

            const risco =
                probabilidade * severidade;

            let classificacao = "";

           if (risco <= 4) {

    classificacao = "Baixo";

}
else if (risco <= 9) {

    classificacao = "Moderado";

}
else if (risco <= 16) {

    classificacao = "Alto";

}
else {

    classificacao = "Crítico";

}
let significativo = "Não";

if(risco >= 10){
    significativo = "Sim";
}
            const responsavel =
    document.getElementById(
        "responsavelAspecto"
    ).value;

const status =
    document.getElementById(
        "statusAspecto"
    ).value;

    if(indiceEdicaoAspecto){

    const { error } =
    await supabaseClient
    .from("aspectos_impactos_ambientais")
    .update({

        atividade,
        aspecto,
        impacto,
        area,
        probabilidade,
        severidade,
        risco,
        classificacao,
        controle_existente,
        acao_mitigacao,
        responsavel,
        status

    })
    .eq(
        "id",
        indiceEdicaoAspecto
    );

    if(error){
        console.error(error);
        return;
    }

    indiceEdicaoAspecto = null;

    await carregarAspectosAmbientaisSupabase();

    formAspectoAmbiental.reset();

    return;
}
            const { error } =
                await supabaseClient
                    .from(
                        "aspectos_impactos_ambientais"
                    )
                    .insert([{
    empresa_id: window.empresaAtual,
    atividade,
    aspecto,
    impacto,
    area,
    probabilidade,
    severidade,
    risco,
    classificacao,
    significativo,
    controle_existente,
    acao_mitigacao,
    responsavel,
    status
}]);

            if (error) {

                console.error(
                    "Erro Aspecto:",
                    error
                );

                return;

            }

            await carregarAspectosAmbientaisSupabase();

            formAspectoAmbiental.reset();

        }
    );

}

function desenharMatrizAmbiental(){

    document
        .querySelectorAll(
            "#matrizAmbiental td"
        )
        .forEach(td => {

            td.textContent = "";
            td.className = "";

        });

    aspectosAmbientais.forEach(item => {

        const prob =
        Number(item.probabilidade);

        const sev =
        Number(item.severidade);

        const risco =
        Number(item.risco);

        const id =
        `p${prob}s${sev}`;

        const celula =
        document.getElementById(id);

        celula.style.cursor =
"pointer";

celula.onclick = () => {

    mostrarDetalhesMatriz(
        prob,
        sev
    );

};

        if(!celula){
            return;
        }

        celula.textContent =
        Number(celula.textContent || 0) + 1;

        if(risco <= 4){

            celula.classList.add(
                "baixo"
            );

        }
        else if(risco <= 9){

            celula.classList.add(
                "moderado"
            );

        }
        else if(risco <= 16){

            celula.classList.add(
                "alto"
            );

        }
        else{

            celula.classList.add(
                "critico"
            );

        }

    });

}

function mostrarDetalhesMatriz(
    probabilidade,
    severidade
){

    const detalhes =
    document.getElementById(
        "detalhesMatrizAmbiental"
    );

    const encontrados =
    aspectosAmbientais.filter(
        item =>

        Number(item.probabilidade)
        === probabilidade

        &&

        Number(item.severidade)
        === severidade
    );

    detalhes.style.display =
    "block";

    if(!encontrados.length){

        detalhes.innerHTML =
        `
        <h4>
            Nenhum aspecto encontrado
        </h4>
        `;

        return;
    }

    detalhes.innerHTML = `

    <div
        style="
            display:flex;
            justify-content:space-between;
            align-items:center;
        "
    >

        <h4>
            Aspectos da célula
            P${probabilidade}
            ×
            S${severidade}
        </h4>

        <button
            type="button"
            onclick="fecharDetalhesMatriz()"
        >
            ✖ Fechar
        </button>

    </div>

`;

    encontrados.forEach(item => {

        detalhes.innerHTML += `

            <div
                style="
                padding:8px;
                border-bottom:
                1px solid #ddd;
                "
            >

                <strong>
                    ${item.atividade}
                </strong>

                <br>

                Aspecto:
                ${item.aspecto}

                <br>

                Impacto:
                ${item.impacto}

                <br>

                Classificação:
                ${item.classificacao}

            </div>

        `;

    });

}
function fecharDetalhesMatriz(){

    const detalhes =
    document.getElementById(
        "detalhesMatrizAmbiental"
    );

    detalhes.style.display =
    "none";

    detalhes.innerHTML = "";

}

function calcularStatusAmbiental(

    possuiValidade,

    dataValidade

){

    if(
        possuiValidade ===
        "Nao"
    ){

        return "Sem Validade";

    }

    const hoje =
    new Date();

    const validade =
    new Date(
        dataValidade
    );

    const diferencaDias =

    Math.ceil(

        (
            validade -
            hoje
        )

        /

        (
            1000 *
            60 *
            60 *
            24
        )

    );

    if(
        diferencaDias < 0
    ){

        return "Vencido";

    }

    if(
        diferencaDias <= 30
    ){

        return "A Vencer";

    }

    return "Valido";

}

async function carregarAmbientalSupabase(){
    if(!window.empresaAtual){
    return;
}

    const {
        data,
        error
    } = await supabaseClient
    .from("ambiental")
    .select("*")
.eq("empresa_id",window.empresaAtual)

    if(error){

        console.error(
            "Erro Ambiental:",
            error
        );

        return;

    }

    console.log(
        "DADOS AMBIENTAL:",
        data
    );

    ambiental =
    data || [];

    atualizarAmbiental();

}


function atualizarAmbiental(){

    if(
        !tabelaAmbiental
    ) return;

    tabelaAmbiental.innerHTML =
    "";

    ambiental.forEach(
        (item, index) => {

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `
                <td>${item.requisito}</td>

                <td>${item.categoria}</td>

                <td>${item.responsavel}</td>

                <td>${item.cumprimento}</td>

                ${item.status === "Valido"
? "🟢 Valido"

: item.status === "A Vencer"
? "🟡 A Vencer"

: item.status === "Vencido"
? "🔴 Vencido"

: "⚪ Sem Validade"

}

                <td>

    <button
        type="button"
        onclick="editarAmbiental(${index})"
    >
        ✏️
    </button>

    <button
        type="button"
        onclick="imprimirAmbiental(${index})"
    >
        🖨️
    </button>

    <button
        type="button"
        onclick="eliminarAmbiental(${index})"
    >
        🗑️
    </button>

</td>
`; 

            tabelaAmbiental
            .appendChild(
                linha
            );

        }
    );
atualizarIndicadoresAmbientais();

atualizarAlertasAmbientais();
}

function atualizarAlertasAmbientais(){

    const container =
    document.getElementById(
        "alertasAmbientais"
    );

    if(!container) return;

    container.innerHTML = "";

    let existeAlerta =
    false;

    const hoje =
    new Date();

    ambiental.forEach(item => {

       if(
    item.possui_validade !== "Sim"
)

{
            return;
        }

       const validade =
new Date(
    item.data_validade
);

        const dias =
        Math.ceil(

            (
                validade -
                hoje
            )

            /

            (
                1000 *
                60 *
                60 *
                24
            )

        );

        if(
            dias < 0
        ){

            existeAlerta =
            true;

            container.innerHTML += `
<div>
🔴 ${item.requisito}
está vencido
</div>
`;

        }
        else if(
            dias <= 30
        ){

            existeAlerta =
            true;

           container.innerHTML += `
<div>
⚠️ ${item.requisito}
vence em ${dias} dias
</div>
`;
        }

    });

    if(!existeAlerta){

        container.innerHTML = `
            <div class="
                alerta-ambiental
                alerta-valido">

                ✅ Não existem
                requisitos próximos
                do vencimento.

            </div>
        `;

    }

}
carregarAmbientalSupabase();


async function carregarConsumosSupabase(){
    if(!window.empresaAtual){
    return;
}

    const {
        data,
        error
    } = await supabaseClient
    .from("consumos")
    .select("*")
.eq("empresa_id",window.empresaAtual)

    if(error){

        console.error(
            "Erro Consumos:",
            error
        );

        return;

    }

    console.log(
        "DADOS CONSUMOS:",
        data
    );

    consumos =
    data || [];

    atualizarConsumos();

}

const formConsumos =
document.getElementById(
    "formConsumos"
);

const tabelaConsumos =
document.querySelector(
    "#tabelaConsumos tbody"
);

let consumos = [];

let indiceEdicaoConsumo =
null;

const formResiduos =
document.getElementById(
    "formResiduos"
);

const tabelaResiduos =
document.querySelector(
    "#tabelaResiduos tbody"
);

let residuos = [];

let indiceEdicaoResiduo =
null;

if(
    formResiduos &&
    tabelaResiduos
){

    formResiduos.addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        console.log(
            "SUBMIT RESIDUO"
        );

        const data =
        document.getElementById(
            "dataResiduo"
        ).value;

        const tipo =
        document.getElementById(
            "tipoResiduo"
        ).value;

        const quantidade =
        document.getElementById(
            "quantidadeResiduo"
        ).value;

        const unidade =
        document.getElementById(
            "unidadeResiduo"
        ).value;

        const destino =
        document.getElementById(
            "destinoResiduo"
        ).value;

        const responsavel =
        document.getElementById(
            "responsavelResiduo"
        ).value;
if(
    indiceEdicaoResiduo
){

    const { error } =
    await supabaseClient
    .from("residuos")
    .update({

        data_residuo: data,
        tipo,
        quantidade,
        unidade,
        destino,
        responsavel

    })
    .eq(
        "id",
        indiceEdicaoResiduo
    );

    if(error){

        console.error(error);

        return;

    }

    indiceEdicaoResiduo =
    null;

    await carregarResiduosSupabase();

    formResiduos.reset();

    return;

}
        const { error } =
        await supabaseClient
        .from("residuos")
        .insert([{
empresa_id:
window.empresaAtual,
    data_residuo:
    data,

    tipo,
    quantidade,
    unidade,
    destino,
    responsavel

}]);
        if(error){

            console.error(
                "ERRO INSERT:",
                error
            );

            return;

        }

        await carregarResiduosSupabase();

        formResiduos.reset();

    }
);


}

async function carregarResiduosSupabase(){
    if(!window.empresaAtual){
    return;
}

    const {
        data,
        error
    } = await supabaseClient
    .from("residuos")
    .select("*")
.eq("empresa_id",window.empresaAtual)

    if(error){

        console.error(
            "Erro Resíduos:",
            error
        );

        return;

    }

    console.log(
        "DADOS RESIDUOS:",
        data
    );

    residuos =
    data || [];

    atualizarResiduos();

}

function atualizarResiduos(lista = residuos){

    if(
        !tabelaResiduos
    ) return;

    tabelaResiduos.innerHTML =
    "";

    lista.forEach(
        (item, index) => {

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `

                <td>${item.data_residuo || "-"}</td>

                <td>${item.tipo}</td>

                <td>${item.quantidade}</td>

                <td>${item.unidade}</td>

                <td>${item.destino}</td>

                <td>${item.responsavel}</td>

                <td>

    <button
        type="button"
        onclick="
            editarResiduo(${index})
        "
    >
        ✏️
    </button>

    <button
        type="button"
        onclick="
            imprimirResiduo(${index})
        "
    >
        🖨️
    </button>

    <button
        type="button"
        onclick="
            eliminarResiduo(${index})
        "
    >
        🗑️
    </button>

</td>
            `;

            tabelaResiduos.appendChild(
                linha
            );

        }

    );

   atualizarIndicadoresResiduos(); 
}
function atualizarIndicadoresResiduos(){

    document.getElementById(
        "totalResiduos"
    ).textContent =
    residuos.length;

    const quantidadeTotal =
    residuos.reduce(
        (total, item) =>

        total +
        Number(
            item.quantidade || 0
        ),

        0
    );

    document.getElementById(
        "quantidadeTotalResiduo"
    ).textContent =
    quantidadeTotal;

    const contadorTipos = {};

residuos.forEach(item => {

    contadorTipos[item.tipo] =

    (contadorTipos[item.tipo] || 0) + 1;

});

let maisFrequente = "-";

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

    maisFrequente =

    `${empatados[0]} (${maiorQuantidade})`;

}
else if(empatados.length <= 3){

    maisFrequente =

    `${empatados.join(" / ")} (${maiorQuantidade})`;

}
else{

    maisFrequente =

    `${empatados.length} Tipos (${maiorQuantidade})`;

}

document.getElementById(
    "residuoFrequente"
).textContent =
maisFrequente;

document.getElementById(
        "reciclagemResiduos"
    ).textContent =

    residuos.filter(
        item =>
        item.destino ===
        "Reciclagem"
    ).length;

    document.getElementById(
        "reutilizacaoResiduos"
    ).textContent =

    residuos.filter(
        item =>
        item.destino ===
        "Reutilização"
    ).length;

    document.getElementById(
        "aterroResiduos"
    ).textContent =

    residuos.filter(
        item =>
        item.destino ===
        "Aterro"
    ).length;

    document.getElementById(
        "coprocessamentoResiduos"
    ).textContent =

    residuos.filter(
        item =>
        item.destino ===
        "Coprocessamento"
    ).length;


}
async function eliminarResiduo(index){

    if(
        !confirm("Eliminar resíduo?")
    ) return;

    const item =
    residuos[index];

    const { error } =
    await supabaseClient
    .from("residuos")
    .delete()
    .eq("id", item.id);

    if(error){

        console.error(error);

        return;

    }

    await carregarResiduosSupabase();

}
function editarResiduo(index){

    const item =
    residuos[index];

    document.getElementById(
        "dataResiduo"
    ).value =
    item.data_residuo || "";

    document.getElementById(
        "tipoResiduo"
    ).value =
    item.tipo || "";

    document.getElementById(
        "quantidadeResiduo"
    ).value =
    item.quantidade || "";

    document.getElementById(
        "unidadeResiduo"
    ).value =
    item.unidade || "";

    document.getElementById(
        "destinoResiduo"
    ).value =
    item.destino || "";

    document.getElementById(
        "responsavelResiduo"
    ).value =
    item.responsavel || "";

    indiceEdicaoResiduo =
    item.id;

}
function imprimirResiduo(index){

    const item =
    residuos[index];

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
    "RELATORIO DE RESIDUO",
    55,
    28
);

    pdf.line(
        20,
        40,
        190,
        40
    );

    pdf.setFontSize(11);

    pdf.text(
        `Data: ${item.data_residuo}`,
        20,
        55
    );

    pdf.text(
        `Tipo: ${item.tipo}`,
        20,
        70
    );

    pdf.text(
        `Quantidade: ${item.quantidade}`,
        20,
        85
    );

    pdf.text(
        `Unidade: ${item.unidade}`,
        20,
        100
    );

    pdf.text(
        `Destino: ${item.destino}`,
        20,
        115
    );

    pdf.text(
        `Responsavel: ${item.responsavel}`,
        20,
        130
    );

    pdf.save(
        `Residuo_${item.tipo}.pdf`
    );

}

function pesquisarResiduos(){

    const texto =
    document.getElementById(
        "pesquisaResiduo"
    ).value.toLowerCase();

    const resultados =
    residuos.filter(item =>

        item.tipo
        .toLowerCase()
        .includes(texto)

        ||

        item.destino
        .toLowerCase()
        .includes(texto)

        ||

        item.responsavel
        .toLowerCase()
        .includes(texto)

    );

    atualizarResiduos(
        resultados
    );

}
function pesquisarFauna(){

    const texto =
    document.getElementById(
        "pesquisaFauna"
    ).value.toLowerCase();

    const resultados =
    fauna.filter(item =>

        item.animal
        .toLowerCase()
        .includes(texto)

        ||

        item.local
        .toLowerCase()
        .includes(texto)

        ||

        (item.descricao || "")
        .toLowerCase()
        .includes(texto)

    );

    atualizarFauna(
        resultados
    );

    atualizarIndicadoresFaunaPeriodo(
        resultados
    );

}
function filtrarFauna(){

    const inicio =
    document.getElementById(
        "dataInicioFauna"
    ).value;

    const fim =
    document.getElementById(
        "dataFimFauna"
    ).value;

    let resultados =
    [...fauna];

    if(inicio){

        resultados =
        resultados.filter(
            item =>
            item.data_fauna >= inicio
        );

    }

    if(fim){

        resultados =
        resultados.filter(
            item =>
            item.data_fauna <= fim
        );

    }

    atualizarFauna(
        resultados
    );

    atualizarIndicadoresFaunaPeriodo(
        resultados
    );

}
function limparFiltroFauna(){

    document.getElementById(
        "pesquisaFauna"
    ).value = "";

    document.getElementById(
        "dataInicioFauna"
    ).value = "";

    document.getElementById(
        "dataFimFauna"
    ).value = "";

    atualizarFauna();

    atualizarIndicadoresFauna();

}
function filtrarResiduos(){

    const inicio =
    document.getElementById(
        "dataInicioResiduo"
    ).value;

    const fim =
    document.getElementById(
        "dataFimResiduo"
    ).value;

    let resultados =
    [...residuos];

    if(inicio){

        resultados =
        resultados.filter(
            item =>
            item.data_residuo >= inicio
        );

    }

    if(fim){

        resultados =
        resultados.filter(
            item =>
            item.data_residuo <= fim
        );

    }

    atualizarResiduos(
        resultados
    );

}

function limparFiltrosResiduos(){

    document.getElementById(
        "pesquisaResiduo"
    ).value = "";

    document.getElementById(
        "dataInicioResiduo"
    ).value = "";

    document.getElementById(
        "dataFimResiduo"
    ).value = "";

    atualizarResiduos();

}

if(
    formConsumos &&
    tabelaConsumos
){

    formConsumos.addEventListener(
    "submit",
    async e => {

e.preventDefault();
if(
    indiceEdicaoConsumo
){

    const { error } =
    await supabaseClient
    .from("consumos")
    .update({

        data_consumo:
        document.getElementById(
            "dataConsumo"
        ).value,

        tipo:
        document.getElementById(
            "tipoConsumo"
        ).value,

        quantidade:
        document.getElementById(
            "quantidadeConsumo"
        ).value,

        unidade:
        document.getElementById(
            "unidadeConsumo"
        ).value,

        local:
        document.getElementById(
            "localConsumo"
        ).value,

        observacao:
        document.getElementById(
            "observacaoConsumo"
        ).value

    })
    .eq(
        "id",
        indiceEdicaoConsumo
    );

    if(error){

        console.error(error);

        return;

    }

    indiceEdicaoConsumo = null;

    await carregarConsumosSupabase();

    formConsumos.reset();

    return;

}
const { error } =
await supabaseClient
.from("consumos")
.insert([{
empresa_id:
window.empresaAtual,
    data_consumo:
    document.getElementById(
        "dataConsumo"
    ).value,

    tipo:
    document.getElementById(
        "tipoConsumo"
    ).value,

    quantidade:
    document.getElementById(
        "quantidadeConsumo"
    ).value,

    unidade:
    document.getElementById(
        "unidadeConsumo"
    ).value,

    local:
    document.getElementById(
        "localConsumo"
    ).value,

    observacao:
    document.getElementById(
        "observacaoConsumo"
    ).value

}]);
if(error){

    console.error(
        "ERRO INSERT:",
        error
    );

    return;

}

await carregarConsumosSupabase();

formConsumos.reset();

        }
    );

}



function atualizarConsumos(lista = consumos){

    if(
        !tabelaConsumos
    ) return;

    tabelaConsumos.innerHTML =
    "";

    lista.forEach(
        (item, index) => {

            const linha =
            document.createElement(
                "tr"
            );

            linha.innerHTML = `

                <td>${item.data_consumo}</td>

                <td>${item.tipo}</td>

                <td>${item.quantidade}</td>

                <td>${item.unidade}</td>

                <td>${item.local}</td>

                <td>

    <button
        type="button"
        onclick="
            editarConsumo(
                ${index}
            )
        "
    >
        ✏️
    </button>

    <button
        type="button"
        onclick="
            imprimirConsumo(
                ${index}
            )
        "
    >
        🖨️
    </button>

    <button
        type="button"
        onclick="
            eliminarConsumo(
                ${index}
            )
        "
    >
        🗑️
    </button>

</td>
            `;

            tabelaConsumos
            .appendChild(
                linha
            );

        }
    );
atualizarIndicadoresConsumos();
}
function atualizarIndicadoresConsumos(){

    document.getElementById(
        "totalConsumos"
    ).textContent =
    consumos.length;

   document.getElementById(
    "aguaPotavel"
).textContent =

consumos.filter(
    item =>
    item.tipo ===
    "Água Potável"
).length;


document.getElementById(
    "aguaBruta"
).textContent =

consumos.filter(
    item =>
    item.tipo ===
    "Água Bruta"
).length;


document.getElementById(
    "aguaConsumos"
).textContent =

consumos.filter(
    item =>

    item.tipo ===
    "Água Potável"

    ||

    item.tipo ===
    "Água Bruta"

).length;

    document.getElementById(
    "energiaRede"
).textContent =

consumos.filter(
    item =>
    item.tipo ===
    "Energia - Rede Pública"
).length;


document.getElementById(
    "energiaGerador"
).textContent =

consumos.filter(
    item =>
    item.tipo ===
    "Energia - Gerador"
).length;


document.getElementById(
    "energiaConsumos"
).textContent =

consumos.filter(
    item =>

    item.tipo ===
    "Energia - Rede Pública"

    ||

    item.tipo ===
    "Energia - Gerador"

).length;

    document.getElementById(
    "gasoleoConsumos"
).textContent =

consumos.filter(
    item =>
    item.tipo === "Gasóleo"
).length;

document.getElementById(
    "gasolinaConsumos"
).textContent =

consumos.filter(
    item =>
    item.tipo === "Gasolina"
).length;

document.getElementById(
    "combustivelConsumos"
).textContent =

consumos.filter(
    item =>

    item.tipo === "Gasóleo"

    ||

    item.tipo === "Gasolina"

).length;

    document.getElementById(
        "co2Consumos"
    ).textContent =

    consumos.filter(
        item =>
        item.tipo === "CO₂"
    ).length;

}
function atualizarIndicadoresConsumosPeriodo(lista){

    document.getElementById(
        "totalConsumos"
    ).textContent =
    lista.length;

    document.getElementById(
        "aguaPotavel"
    ).textContent =

    lista.filter(
        item =>
        item.tipo ===
        "Água Potável"
    ).length;

    document.getElementById(
        "aguaBruta"
    ).textContent =

    lista.filter(
        item =>
        item.tipo ===
        "Água Bruta"
    ).length;

    document.getElementById(
        "aguaConsumos"
    ).textContent =

    lista.filter(
        item =>

        item.tipo ===
        "Água Potável"

        ||

        item.tipo ===
        "Água Bruta"

    ).length;

    document.getElementById(
        "energiaRede"
    ).textContent =

    lista.filter(
        item =>
        item.tipo ===
        "Energia - Rede Pública"
    ).length;

    document.getElementById(
        "energiaGerador"
    ).textContent =

    lista.filter(
        item =>
        item.tipo ===
        "Energia - Gerador"
    ).length;

    document.getElementById(
        "energiaConsumos"
    ).textContent =

    lista.filter(
        item =>

        item.tipo ===
        "Energia - Rede Pública"

        ||

        item.tipo ===
        "Energia - Gerador"

    ).length;

    document.getElementById(
        "gasoleoConsumos"
    ).textContent =

    lista.filter(
        item =>
        item.tipo ===
        "Gasóleo"
    ).length;

    document.getElementById(
        "gasolinaConsumos"
    ).textContent =

    lista.filter(
        item =>
        item.tipo ===
        "Gasolina"
    ).length;

    document.getElementById(
        "combustivelConsumos"
    ).textContent =

    lista.filter(
        item =>

        item.tipo ===
        "Gasóleo"

        ||

        item.tipo ===
        "Gasolina"

    ).length;

    document.getElementById(
        "co2Consumos"
    ).textContent =

    lista.filter(
        item =>
        item.tipo ===
        "CO₂"
    ).length;

}
async function eliminarConsumo(index){

    if(
        !confirm(
            "Eliminar registo?"
        )
    ) return;

    const item =
    consumos[index];

    const { error } =
    await supabaseClient
    .from("consumos")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;

    }

    await carregarConsumosSupabase();

}
function editarConsumo(index){

    const item =
    consumos[index];

    document.getElementById(
        "dataConsumo"
    ).value =
    item.data_consumo || "";

    document.getElementById(
        "tipoConsumo"
    ).value =
    item.tipo || "";

    document.getElementById(
        "quantidadeConsumo"
    ).value =
    item.quantidade || "";

    document.getElementById(
        "unidadeConsumo"
    ).value =
    item.unidade || "";

    document.getElementById(
        "localConsumo"
    ).value =
    item.local || "";

    document.getElementById(
        "observacaoConsumo"
    ).value =
    item.observacao || "";

    indiceEdicaoConsumo =
    item.id;

}

function imprimirConsumo(index){

    const item =
    consumos[index];

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
    "RELATORIO DE CONSUMO",
    55,
    28
);

    pdf.line(
        20,
        40,
        190,
        40
    );

    pdf.setFontSize(11);

    pdf.text(
        `Data: ${item.data_consumo}`,
        20,
        55
    );

    pdf.text(
        `Tipo: ${item.tipo}`,
        20,
        70
    );

    pdf.text(
        `Quantidade: ${item.quantidade}`,
        20,
        85
    );

    pdf.text(
        `Unidade: ${item.unidade}`,
        20,
        100
    );

    pdf.text(
        `Local: ${item.local}`,
        20,
        115
    );

    pdf.text(
        `Observacao: ${
            item.observacao || "-"
        }`,
        20,
        130
    );

    pdf.save(
        `Consumo_${item.tipo}.pdf`
    );

}

function filtrarConsumos(){

    const texto =
    document.getElementById(
        "pesquisaConsumos"
    ).value.toLowerCase();

    const inicio =
    document.getElementById(
        "dataInicio"
    ).value;

    const fim =
    document.getElementById(
        "dataFim"
    ).value;

    let resultados =
    [...consumos];

    if(texto){

        resultados =
        resultados.filter(
            item =>
            item.tipo
            .toLowerCase()
            .includes(texto)

            ||

            item.local
            .toLowerCase()
            .includes(texto)

            ||

            (item.observacao || "")
            .toLowerCase()
            .includes(texto)
        );

    }

    if(inicio){

        resultados =
        resultados.filter(
            item =>
            item.data_consumo >= inicio
        );

    }

    if(fim){

        resultados =
        resultados.filter(
            item =>
            item.data_consumo <= fim
        );

    }

    atualizarConsumos(
        resultados
    );

    atualizarIndicadoresConsumosPeriodo(
        resultados
    );

}
function controlarValidadeAmbiental(){

    const possuiValidade =

    document.getElementById(
        "possuiValidade"
    ).value;
let dataEmissao =
document.getElementById(
    "dataEmissao"
).value;

let dataValidade =
document.getElementById(
    "dataValidade"
).value;

if(
    possuiValidade === "Nao"
){

    dataEmissao = null;
    dataValidade = null;

}
    const grupoDataEmissao =

    document.getElementById(
        "grupoDataEmissao"
    );

    const grupoDataValidade =

    document.getElementById(
        "grupoDataValidade"
    );

    if(
        possuiValidade ===
        "Nao"
    ){

        grupoDataEmissao
        .style.display =
        "none";

        grupoDataValidade
        .style.display =
        "none";

    }
    else{

        grupoDataEmissao
        .style.display =
        "block";

        grupoDataValidade
        .style.display =
        "block";

    }

}


async function eliminarAmbiental(index){

    if(
        !confirm(
            "Deseja eliminar este requisito?"
        )
    ) return;

    const item =
    ambiental[index];

    const { error } =
    await supabaseClient
    .from("ambiental")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;

    }

    await carregarAmbientalSupabase();

}
function editarAmbiental(index){

    const item =
    ambiental[index];

    document.getElementById(
    "requisitoLegal"
).value =
item.requisito || "";
    document.getElementById(
        "categoriaAmbiental"
    ).value =
    item.categoria || "";

    document.getElementById(
        "possuiValidade"
    ).value =
    item.possui_validade || "";

    document.getElementById(
        "dataEmissao"
    ).value =
    item.data_emissao || "";

    document.getElementById(
        "dataValidade"
    ).value =
    item.data_validade || "";

    document.getElementById(
        "responsavelAmbiental"
    ).value =
    item.responsavel || "";

    document.getElementById(
        "cumprimentoAmbiental"
    ).value =
    item.cumprimento || "";

    document.getElementById(
        "observacoesAmbientais"
    ).value =
    item.observacoes || "";

    indiceEdicaoAmbiental =
    item.id;

}

if(
    formAmbiente &&
    tabelaAmbiental
){

   formAmbiente.addEventListener(
    "submit",
    async e => {
            e.preventDefault();

            const requisitoLegal =
            document.getElementById(
                "requisitoLegal"
            ).value;

            const categoria =
            document.getElementById(
                "categoriaAmbiental"
            ).value;

            const possuiValidade =
            document.getElementById(
                "possuiValidade"
            ).value;

            let dataEmissao =
document.getElementById(
    "dataEmissao"
).value;

let dataValidade =
document.getElementById(
    "dataValidade"
).value;
if(
    possuiValidade !== "Sim"
){

    dataEmissao = null;
    dataValidade = null;

}

            const responsavel =
            document.getElementById(
                "responsavelAmbiental"
            ).value;

            const cumprimento =
            document.getElementById(
                "cumprimentoAmbiental"
            ).value;

            const observacoes =
            document.getElementById(
                "observacoesAmbientais"
            ).value;

            const status =

            calcularStatusAmbiental(

                possuiValidade,

                dataValidade

            );
if(
    indiceEdicaoAmbiental
){
if(
    possuiValidade !== "Sim")
{

    dataEmissao = null;
    dataValidade = null;

}
    const { error } =
    await supabaseClient
    .from("ambiental")
    .update({

    requisito:
    requisitoLegal,

    categoria:
    categoria,

    possui_validade:
    possuiValidade,

    data_emissao:
    dataEmissao,

    data_validade:
    dataValidade,

    responsavel:
    responsavel,

    cumprimento:
    cumprimento,

    observacoes:
    observacoes,

    status:
    status

})
    .eq(
        "id",
        indiceEdicaoAmbiental
    );

    if(error){

        console.error(error);

        return;

    }

    indiceEdicaoAmbiental =
    null;

    await carregarAmbientalSupabase();

    formAmbiente.reset();

    return;

}
console.log(
    "VALIDADE:",
    possuiValidade
);

console.log(
    "EMISSAO:",
    dataEmissao
);

console.log(
    "VALIDADE DATA:",
    dataValidade
);
const { error } =
await supabaseClient
.from("ambiental")
.insert([{
empresa_id:
window.empresaAtual,
    requisito:
    requisitoLegal,

    categoria:
    categoria,

    possui_validade:
    possuiValidade,

    data_emissao:
    dataEmissao,

    data_validade:
    dataValidade,

    responsavel:
    responsavel,

    cumprimento:
    cumprimento,

    observacoes:
    observacoes,

    status:
    status

}]);
if(error){

    console.error(
        "ERRO INSERT:",
        error
    );

    return;

}

await carregarAmbientalSupabase();

formAmbiente.reset();

        }
    );

}
function imprimirAmbiental(index){

   const item =
ambiental[index];

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
    "REQUISITO LEGAL AMBIENTAL",
    55,
    28
);
    pdf.line(
        20,
        40,
        190,
        40
    );

    pdf.setFontSize(11);

    pdf.text(
        `Requisito: ${item.requisito}`,
        20,
        55
    );

    pdf.text(
        `Categoria: ${item.categoria}`,
        20,
        70
    );

    pdf.text(
        `Responsavel: ${item.responsavel}`,
        20,
        85
    );

    pdf.text(
        `Cumpre: ${item.cumprimento}`,
        20,
        100
    );

    pdf.text(
        `Status: ${item.status}`,
        20,
        115
    );

    pdf.text(
        `Data Emissao: ${
            item.dataEmissao || "-"
        }`,
        20,
        130
    );

    pdf.text(
        `Data Validade: ${
            item.dataValidade || "-"
        }`,
        20,
        145
    );

    pdf.text(
        `Observacoes: ${
            item.observacoes || "-"
        }`,
        20,
        160,
        {
            maxWidth: 160
        }
    );

    pdf.save(
        `Requisito_${item.requisito}.pdf`
    );

}

function atualizarIndicadoresAmbientais(){

    document.getElementById(
        "totalAmbiental"
    ).textContent =
    ambiental.length;

    document.getElementById(
        "validosAmbiental"
    ).textContent =

    ambiental.filter(
        item =>
        item.status ===
        "Valido"
    ).length;

    document.getElementById(
        "vencerAmbiental"
    ).textContent =

    ambiental.filter(
        item =>
        item.status ===
        "A Vencer"
    ).length;

    document.getElementById(
        "vencidosAmbiental"
    ).textContent =

    ambiental.filter(
        item =>
        item.status ===
        "Vencido"
    ).length;

    document.getElementById(
        "semValidadeAmbiental"
    ).textContent =

    ambiental.filter(
        item =>
        item.status ===
        "Sem Validade"
    ).length;

}

function atualizarIndicadoresAmbientaisPesquisa(lista){

    document.getElementById(
        "totalAmbiental"
    ).textContent =
    lista.length;

    document.getElementById(
        "validosAmbiental"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Valido"
    ).length;

    document.getElementById(
        "vencerAmbiental"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "A Vencer"
    ).length;

    document.getElementById(
        "vencidosAmbiental"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Vencido"
    ).length;

    document.getElementById(
        "semValidadeAmbiental"
    ).textContent =

    lista.filter(
        item =>
        item.status ===
        "Sem Validade"
    ).length;

}


controlarValidadeAmbiental();
atualizarAmbiental();
carregarConsumosSupabase();





/* ==========================================
   FAUNA
========================================== */

const formFauna =
    document.getElementById(
        "formFauna"
    );

const tabelaFauna =
    document.querySelector(
        "#tabelaFauna tbody"
    );
let fauna = [];

formFauna.addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        console.log(
            "SUBMIT FAUNA"
        );
if(
    indiceEdicaoFauna
){

    const { error } =
    await supabaseClient
    .from("fauna")
    .update({

        data_fauna:
        document.getElementById(
            "dataFauna"
        ).value,

        animal:
        document.getElementById(
            "animal"
        ).value,

        local:
        document.getElementById(
            "localAnimal"
        ).value,

        descricao:
        document.getElementById(
            "descricaoFauna"
        ).value

    })
    .eq(
        "id",
        indiceEdicaoFauna
    );

    if(error){

        console.error(error);

        return;

    }

    indiceEdicaoFauna =
    null;

    await carregarFaunaSupabase();

    formFauna.reset();

    return;

}
        const { error } =
        await supabaseClient
        .from("fauna")
        .insert([{
empresa_id:
window.empresaAtual,
           data_fauna:
document.getElementById(
    "dataFauna"
).value,

            animal:
            document.getElementById(
                "animal"
            ).value,

            local:
            document.getElementById(
                "localAnimal"
            ).value,

            descricao:
            document.getElementById(
                "descricaoFauna"
            ).value

        }]);

        if(error){

            console.error(
                "ERRO INSERT:",
                error
            );

            return;

        }

        await carregarFaunaSupabase();

        formFauna.reset();

    }
);
async function carregarFaunaSupabase(){
    if(!window.empresaAtual){
    return;
}

    const {
        data,
        error
    } = await supabaseClient
    .from("fauna")
    .select("*")
.eq("empresa_id",window.empresaAtual)

    if(error){

        console.error(
            "Erro Fauna:",
            error
        );

        return;

    }

    console.log(
        "DADOS FAUNA:",
        data
    );

    fauna =
    data || [];

    atualizarFauna();

}

function atualizarFauna(lista = fauna){

    tabelaFauna.innerHTML = "";

    lista.forEach((item, index) => {

        adicionarLinha(

            tabelaFauna,

            `
            <td>${item.data_fauna || "-"}</td>

<td>${item.animal}</td>

<td>${item.local}</td>

<td>
    ${item.descricao || "-"}
</td>

<td>

<button
    type="button"
    onclick="
        editarFauna(${index})
    ">
    ✏️
</button>

<button
    type="button"
    onclick="
        imprimirFauna(${index})
    ">
    🖨️
</button>

<button
    type="button"
    onclick="
        eliminarFauna(${index})
    ">
    🗑️
</button>

</td>
            `

        );

    });
atualizarIndicadoresFauna();
}
function atualizarIndicadoresFaunaPeriodo(lista){

    document.getElementById(
        "totalFauna"
    ).textContent =
    lista.length;

    const contadorAnimais = {};

    const contadorLocais = {};

    lista.forEach(item => {

        contadorAnimais[item.animal] =
        (contadorAnimais[item.animal] || 0) + 1;

        contadorLocais[item.local] =
        (contadorLocais[item.local] || 0) + 1;

    });

    let animalMaisFrequente = "-";

    let localMaisFrequente = "-";

    if(Object.keys(contadorAnimais).length){

        animalMaisFrequente =
        Object.keys(contadorAnimais)
        .reduce((a,b)=>

            contadorAnimais[a] >
            contadorAnimais[b]
            ? a
            : b

        );

    }

    if(Object.keys(contadorLocais).length){

        localMaisFrequente =
        Object.keys(contadorLocais)
        .reduce((a,b)=>

            contadorLocais[a] >
            contadorLocais[b]
            ? a
            : b

        );

    }

    document.getElementById(
        "animalFrequente"
    ).textContent =
    animalMaisFrequente;

    document.getElementById(
        "localFrequente"
    ).textContent =
    localMaisFrequente;

    document.getElementById(
        "especiesFauna"
    ).textContent =

    new Set(
        lista.map(
            item => item.animal
        )
    ).size;

}

async function eliminarFauna(index){

    if(
        !confirm(
            "Eliminar registo?"
        )
    ) return;

    const item =
    fauna[index];

    const { error } =
    await supabaseClient
    .from("fauna")
    .delete()
    .eq(
        "id",
        item.id
    );

    if(error){

        console.error(error);

        return;

    }

    await carregarFaunaSupabase();

}
let indiceEdicaoFauna =
null;
function editarFauna(index){

    const item =
    fauna[index];

    document.getElementById(
        "dataFauna"
    ).value =
    item.data_fauna || "";

    document.getElementById(
        "animal"
    ).value =
    item.animal || "";

    document.getElementById(
        "localAnimal"
    ).value =
    item.local || "";

    document.getElementById(
        "descricaoFauna"
    ).value =
    item.descricao || "";

    indiceEdicaoFauna =
    item.id;

}

function imprimirFauna(index){

    const item =
    fauna[index];

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
    "RELATORIO FAUNA",
    55,
    28
);

    pdf.text(
        `Data: ${item.data_fauna || "-"}`,
        20,
        55
    );

    pdf.text(
        `Animal: ${item.animal}`,
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
            maxWidth: 150
        }
    );

    pdf.save(
        `Fauna_${item.animal}.pdf`
    );

}

function atualizarIndicadoresFauna(){

    document.getElementById(
        "totalFauna"
    ).textContent =
    fauna.length;

    const contadorAnimais = {};

    const contadorLocais = {};

    fauna.forEach(item => {

        contadorAnimais[
            item.animal
        ] =

        (contadorAnimais[
            item.animal
        ] || 0) + 1;

        contadorLocais[
            item.local
        ] =

        (contadorLocais[
            item.local
        ] || 0) + 1;

    });

    const animalMaisFrequente =
    Object.keys(
        contadorAnimais
    ).reduce(

        (a,b)=>

        contadorAnimais[a] >
        contadorAnimais[b]

        ? a
        : b,

        "-"

    );

    const localMaisFrequente =
    Object.keys(
        contadorLocais
    ).reduce(

        (a,b)=>

        contadorLocais[a] >
        contadorLocais[b]

        ? a
        : b,

        "-"

    );

    document.getElementById(
        "animalFrequente"
    ).textContent =
    animalMaisFrequente;

    document.getElementById(
        "localFrequente"
    ).textContent =
    localMaisFrequente;

    document.getElementById(
        "especiesFauna"
    ).textContent =

    new Set(

        fauna.map(
            item =>
            item.animal
        )

    ).size;

}

carregarFaunaSupabase();



function alternarSecao(id){

    const secao =
    document.getElementById(
        id
    );

    if(
        secao.style.display ===
        "none"
    ){

        secao.style.display =
        "block";

    }
    else{

        secao.style.display =
        "none";

    }

}document
.getElementById(
    "pesquisaConsumos"
)
?.addEventListener(
    "input",
    pesquisarConsumos
);
function pesquisarConsumos(){

    const texto =
    document.getElementById(
        "pesquisaConsumos"
    ).value.toLowerCase();

    const resultados =
    consumos.filter(item =>

        item.tipo
        .toLowerCase()
        .includes(texto)

        ||

        item.local
        .toLowerCase()
        .includes(texto)

        ||

        (item.observacao || "")
        .toLowerCase()
        .includes(texto)

    );

    atualizarConsumos(
        resultados
    );
atualizarIndicadoresConsumosPeriodo(
    resultados
);
}

function limparFiltrosConsumos(){

    document.getElementById(
        "pesquisaConsumos"
    ).value = "";

    document.getElementById(
        "dataInicio"
    ).value = "";

    document.getElementById(
        "dataFim"
    ).value = "";

    atualizarConsumos();

    atualizarIndicadoresConsumos();

}
document
.getElementById(
    "pesquisaResiduo"
)
?.addEventListener(
    "input",
    pesquisarResiduos
);
document
.getElementById(
    "pesquisaFauna"
)
?.addEventListener(
    "input",
    pesquisarFauna
);
carregarResiduosSupabase();

carregarAspectosAmbientaisSupabase();
