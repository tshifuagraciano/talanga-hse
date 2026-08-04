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

let ambiental =
carregarDados(
    "ambiental"
);
let indiceEdicaoAmbiental =
null;

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
                <td>${item.requisitoLegal}</td>

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
            item.possuiValidade ===
            "Nao"
        ){
            return;
        }

        const validade =
        new Date(
            item.dataValidade
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
                <div class="
                    alerta-ambiental
                    alerta-vencido">

                    🔴
                    ${item.requisitoLegal}
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
                <div class="
                    alerta-ambiental
                    alerta-vencer">

                    ⚠️
                    ${item.requisitoLegal}
                    vence em
                    ${dias} dias

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


const formConsumos =
document.getElementById(
    "formConsumos"
);

const tabelaConsumos =
document.querySelector(
    "#tabelaConsumos tbody"
);

let consumos =
carregarDados(
    "consumos"
);

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

let residuos =
carregarDados(
    "residuos"
);

let indiceEdicaoResiduo =
null;

if(
    formResiduos &&
    tabelaResiduos
){

    formResiduos.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const novoResiduo = {

                data:
                document.getElementById(
                    "dataResiduo"
                ).value,

                tipo:
                document.getElementById(
                    "tipoResiduo"
                ).value,

                quantidade:
                document.getElementById(
                    "quantidadeResiduo"
                ).value,

                unidade:
                document.getElementById(
                    "unidadeResiduo"
                ).value,

                destino:
                document.getElementById(
                    "destinoResiduo"
                ).value,

                responsavel:
                document.getElementById(
                    "responsavelResiduo"
                ).value

            };

            if(
                indiceEdicaoResiduo !== null
            ){

                residuos[
                    indiceEdicaoResiduo
                ] = novoResiduo;

                indiceEdicaoResiduo =
                null;

            }
            else{

                residuos.push(
                    novoResiduo
                );

            }

            salvarDados(
                "residuos",
                residuos
            );

            atualizarResiduos();

            formResiduos.reset();

        }
    );

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

                <td>${item.data}</td>

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
function eliminarResiduo(index){

    if(
        !confirm(
            "Eliminar resíduo?"
        )
    ) return;

    residuos.splice(
        index,
        1
    );

    salvarDados(
        "residuos",
        residuos
    );

    atualizarResiduos();

}
function editarResiduo(index){

    const item =
    residuos[index];

    document.getElementById(
        "dataResiduo"
    ).value =
    item.data;

    document.getElementById(
        "tipoResiduo"
    ).value =
    item.tipo;

    document.getElementById(
        "quantidadeResiduo"
    ).value =
    item.quantidade;

    document.getElementById(
        "unidadeResiduo"
    ).value =
    item.unidade;

    document.getElementById(
        "destinoResiduo"
    ).value =
    item.destino;

    document.getElementById(
        "responsavelResiduo"
    ).value =
    item.responsavel;

    indiceEdicaoResiduo =
    index;

}

function imprimirResiduo(index){

    const item =
    residuos[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "RELATORIO DE RESIDUO",
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
        e => {

            e.preventDefault();
console.log("SUBMIT CONSUMO");
            const novoConsumo = {

                data:
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

            };

            if(
                indiceEdicaoConsumo !== null
            ){

                consumos[
                    indiceEdicaoConsumo
                ] = novoConsumo;

                indiceEdicaoConsumo =
                null;

            }
            else{

                consumos.push(
                    novoConsumo
                );

            }

            salvarDados(
                "consumos",
                consumos
            );

            atualizarConsumos();

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

                <td>${item.data}</td>

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
function eliminarConsumo(index){

    if(
        !confirm(
            "Eliminar registo?"
        )
    ) return;

    consumos.splice(
        index,
        1
    );

    salvarDados(
        "consumos",
        consumos
    );

    atualizarConsumos();

}
function editarConsumo(index){

    const item =
    consumos[index];

    document.getElementById(
        "dataConsumo"
    ).value =
    item.data;

    document.getElementById(
        "tipoConsumo"
    ).value =
    item.tipo;

    document.getElementById(
        "quantidadeConsumo"
    ).value =
    item.quantidade;

    document.getElementById(
        "unidadeConsumo"
    ).value =
    item.unidade;

    document.getElementById(
        "localConsumo"
    ).value =
    item.local;

    document.getElementById(
        "observacaoConsumo"
    ).value =
    item.observacao;

    indiceEdicaoConsumo =
    index;

}

function imprimirConsumo(index){

    const item =
    consumos[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "RELATORIO DE CONSUMO",
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
        resultados.filter(item =>

            item.tipo.toLowerCase().includes(texto)

            ||

            item.local.toLowerCase().includes(texto)

            ||

            (item.observacao || "")
            .toLowerCase()
            .includes(texto)

        );

    }

    if(inicio){

        resultados =
        resultados.filter(
            item => item.data >= inicio
        );

    }

    if(fim){

        resultados =
        resultados.filter(
            item => item.data <= fim
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


function eliminarAmbiental(index){

    if(
        !confirm(
            "Deseja eliminar este requisito?"
        )
    ) return;

    ambiental.splice(
        index,
        1
    );

    salvarDados(
        "ambiental",
        ambiental
    );

    atualizarAmbiental();

}

function editarAmbiental(index){

    const item =
    ambiental[index];

    document.getElementById(
        "requisitoLegal"
    ).value =
    item.requisitoLegal;

    document.getElementById(
        "categoriaAmbiental"
    ).value =
    item.categoria;

    document.getElementById(
        "possuiValidade"
    ).value =
    item.possuiValidade;

    document.getElementById(
        "dataEmissao"
    ).value =
    item.dataEmissao;

    document.getElementById(
        "dataValidade"
    ).value =
    item.dataValidade;

    document.getElementById(
        "responsavelAmbiental"
    ).value =
    item.responsavel;

    document.getElementById(
        "cumprimentoAmbiental"
    ).value =
    item.cumprimento;

    document.getElementById(
        "observacoesAmbientais"
    ).value =
    item.observacoes;

    indiceEdicaoAmbiental =
    index;

}

if(
    formAmbiente &&
    tabelaAmbiental
){

    formAmbiente.addEventListener(
        "submit",
        e => {

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

            const dataEmissao =
            document.getElementById(
                "dataEmissao"
            ).value;

            const dataValidade =
            document.getElementById(
                "dataValidade"
            ).value;

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

            const novoRegisto = {

                requisitoLegal,

                categoria,

                possuiValidade,

                dataEmissao,

                dataValidade,

                responsavel,

                cumprimento,

                observacoes,

                status,

                dataRegisto:
                new Date().toISOString()

            };

            if(
                indiceEdicaoAmbiental !== null
            ){

                ambiental[
                    indiceEdicaoAmbiental
                ] = novoRegisto;

                indiceEdicaoAmbiental =
                null;

            }
            else{

                ambiental.push(
                    novoRegisto
                );

            }

            salvarDados(
                "ambiental",
                ambiental
            );

            atualizarAmbiental();

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

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "REQUISITO LEGAL AMBIENTAL",
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
        `Requisito: ${item.requisitoLegal}`,
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
        `Requisito_${item.requisitoLegal}.pdf`
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


function imprimirAmbiental(index){

    const item =
    ambiental[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.setFontSize(14);

    pdf.text(
        "REQUISITO LEGAL AMBIENTAL",
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
        `Requisito: ${item.requisitoLegal}`,
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
        `Requisito_${item.requisitoLegal}.pdf`
    );

}

controlarValidadeAmbiental();
atualizarAmbiental();
atualizarConsumos();




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

let fauna =
carregarDados(
    "fauna"
);

if (formFauna && tabelaFauna) {        formFauna.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        fauna.push({

    data:
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

});

        salvarDados(
            "fauna",
            fauna
        );

        atualizarFauna();

        formFauna.reset();

    }
);
function atualizarFauna(lista = fauna){

    tabelaFauna.innerHTML = "";

    lista.forEach((item, index) => {

        adicionarLinha(

            tabelaFauna,

            `
            <td>${item.data || "-"}</td>

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

function eliminarFauna(index){

    if(
        !confirm(
            "Eliminar registo?"
        )
    ) return;

    fauna.splice(
        index,
        1
    );

    salvarDados(
        "fauna",
        fauna
    );

    atualizarFauna();

}
function editarFauna(index){

    const item =
    fauna[index];

    document.getElementById(
        "dataFauna"
    ).value =
    item.data || "";

    document.getElementById(
        "animal"
    ).value =
    item.animal;

    document.getElementById(
        "localAnimal"
    ).value =
    item.local;

    document.getElementById(
        "descricaoFauna"
    ).value =
    item.descricao || "";

}
function imprimirFauna(index){

    const item =
    fauna[index];

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF();

    pdf.text(
        "TALANGA HSE",
        20,
        20
    );

    pdf.text(
        "RELATORIO DE FAUNA",
        20,
        35
    );

    pdf.text(
        `Data: ${item.data || "-"}`,
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

atualizarFauna();
}
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
atualizarResiduos();