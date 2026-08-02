/* ==========================================
   COLABORADORES
========================================== */

const formColaborador =
    document.getElementById(
        "formColaborador"
    );

const tabelaColaboradores =
    document.querySelector(
        "#tabelaColaboradores tbody"
    );

let colaboradores =
carregarDados(
    "colaboradores"
);

function atualizarColaboradores(
    lista = colaboradores
){

    

    if(!tabelaColaboradores) return;

    tabelaColaboradores.innerHTML = "";

    lista.forEach(
    (item,index) => {

        const linha =
        document.createElement("tr");

        linha.innerHTML = `
            <td>${item.nome}</td>

<td>${item.matricula}</td>

<td>${item.genero}</td>

<td>${item.funcao}</td>

<td>${item.setor}</td>

<td>${item.lider}</td>

<td>${item.empresa}</td>
<td>${item.dataAdmissao || "-"}</td>

<td>${item.dataDemissao || "-"}</td>
<td>${item.status}</td>
<td>

    <button
        onclick="
            gerarQRCodeColaborador(${index})
        "
    >
        📱
    </button>

<button
    onclick="
        solicitarEPI(${index})
    "
>
    🦺
</button>


</td>
<td>

    <button
        type="button"
        onclick="
            editarColaborador(${index})
        "
    >
        ✏️
    </button>

    <button
        type="button"
        onclick="
            imprimirColaborador(${index})
        "
    >
        🖨️
    </button>

    <button
        type="button"
        onclick="
            eliminarColaborador(${index})
        "
    >
        🗑️
    </button>

</td>
        `;

        tabelaColaboradores.appendChild(
            linha
        );

    });
atualizarIndicadoresColaboradores();
}

let indiceEdicaoColaborador =
null;

function atualizarIndicadoresColaboradores(){

    document.getElementById(
        "totalColaboradores"
    ).textContent =
    colaboradores.length;

    document.getElementById(
        "ativosColaboradores"
    ).textContent =

    colaboradores.filter(
        item =>
        item.status === "Ativo"
    ).length;

    document.getElementById(
        "inativosColaboradores"
    ).textContent =

    colaboradores.filter(
        item =>
        item.status === "Inativo"
    ).length;

    document.getElementById(
        "homensColaboradores"
    ).textContent =

    colaboradores.filter(
        item =>
        item.genero === "Masculino"
    ).length;

    document.getElementById(
        "mulheresColaboradores"
    ).textContent =

    colaboradores.filter(
        item =>
        item.genero === "Feminino"
    ).length;

    const contadorEmpresas = {};

    colaboradores.forEach(item => {

        contadorEmpresas[item.empresa] =

        (
            contadorEmpresas[item.empresa]
            || 0
        ) + 1;

    });

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

        contadorEmpresas[empresa] ===
        maiorEmpresa

    );

    if(empresasEmpatadas.length === 1){

        empresaFrequente =

        `${empresasEmpatadas[0]} (${maiorEmpresa})`;

    }
    else if(empresasEmpatadas.length <= 3){

        empresaFrequente =

        `${empresasEmpatadas.join(" / ")} (${maiorEmpresa})`;

    }
    else{

        empresaFrequente =

        `${empresasEmpatadas.length} Empresas (${maiorEmpresa})`;

    }

    document.getElementById(
        "empresaFrequente"
    ).textContent =
    empresaFrequente;

    const contadorFuncoes = {};

    colaboradores.forEach(item => {

        contadorFuncoes[item.funcao] =

        (
            contadorFuncoes[item.funcao]
            || 0
        ) + 1;

    });

    let funcaoFrequente = "-";

    let maiorFuncao = 0;

    Object.values(
        contadorFuncoes
    ).forEach(valor => {

        if(valor > maiorFuncao){

            maiorFuncao = valor;

        }

    });

    const funcoesEmpatadas =

    Object.keys(
        contadorFuncoes
    ).filter(

        funcao =>

        contadorFuncoes[funcao] ===
        maiorFuncao

    );

    if(funcoesEmpatadas.length === 1){

        funcaoFrequente =

        `${funcoesEmpatadas[0]} (${maiorFuncao})`;

    }
    else if(funcoesEmpatadas.length <= 3){

        funcaoFrequente =

        `${funcoesEmpatadas.join(" / ")} (${maiorFuncao})`;

    }
    else{

        funcaoFrequente =

        `${funcoesEmpatadas.length} Funções (${maiorFuncao})`;

    }

    document.getElementById(
        "funcaoFrequente"
    ).textContent =
    funcaoFrequente;

}

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
        behavior: "smooth"
    });

}

function gerarQRCodeColaborador(index){

    const colaborador =
    colaboradores[index];

   const codigoQR =

`portal.html?matricula=${colaborador.matricula}`;
    const container =
    document.createElement("div");

    container.style.position =
    "absolute";

    container.style.left =
    "-9999px";

    document.body.appendChild(
        container
    );

    const qrDiv =
    document.createElement("div");

    container.appendChild(
        qrDiv
    );

    new QRCode(
        qrDiv,
        {
            text: codigoQR,
            width: 250,
            height: 250
        }
    );

    setTimeout(() => {

        const qrImg =
        qrDiv.querySelector("img");

        const canvas =
        document.createElement(
            "canvas"
        );

        canvas.width = 400;
        canvas.height = 500;

        const ctx =
        canvas.getContext("2d");

        ctx.fillStyle =
        "#ffffff";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle =
        "#000000";

        ctx.font =
        "bold 24px Arial";

        ctx.fillText(
            "TALANGA HSE",
            100,
            40
        );

        const imagemQR =
        new Image();

        imagemQR.onload = () => {

            ctx.drawImage(
                imagemQR,
                75,
                70,
                250,
                250
            );

            ctx.font =
            "bold 20px Arial";

            ctx.fillText(
                colaborador.nome,
                40,
                370
            );

            ctx.font =
            "18px Arial";

            ctx.fillText(
                `Matrícula: ${colaborador.matricula}`,
                40,
                410
            );

            const link =
            document.createElement(
                "a"
            );

            link.download =

            `QR_${colaborador.nome.replace(/\s+/g,"_")}.png`;

            link.href =
            canvas.toDataURL(
                "image/png"
            );

            link.click();

            document.body.removeChild(
                container
            );

        };

        imagemQR.src =
        qrImg.src;

    }, 500);

}
function atualizarIndicadoresColaboradoresPeriodo(lista){

    document.getElementById(
        "totalColaboradores"
    ).textContent =
    lista.length;

    document.getElementById(
        "ativosColaboradores"
    ).textContent =

    lista.filter(
        item =>
        item.status === "Ativo"
    ).length;

    document.getElementById(
        "inativosColaboradores"
    ).textContent =

    lista.filter(
        item =>
        item.status === "Inativo"
    ).length;

    document.getElementById(
        "homensColaboradores"
    ).textContent =

    lista.filter(
        item =>
        item.genero === "Masculino"
    ).length;

    document.getElementById(
        "mulheresColaboradores"
    ).textContent =

    lista.filter(
        item =>
        item.genero === "Feminino"
    ).length;

}

function filtrarColaboradores(){

    const inicio =
    document.getElementById(
        "dataInicioColaborador"
    ).value;

    const fim =
    document.getElementById(
        "dataFimColaborador"
    ).value;

    let resultados =
    [...colaboradores];

    if(inicio){

        resultados =
        resultados.filter(
            item =>
            item.dataAdmissao >= inicio
        );

    }

    if(fim){

        resultados =
        resultados.filter(
            item =>
            item.dataAdmissao <= fim
        );

    }

    atualizarColaboradores(
        resultados
    );

    atualizarIndicadoresColaboradoresPeriodo(
        resultados
    );

}
function limparFiltroColaboradores(){

    document.getElementById(
        "dataInicioColaborador"
    ).value = "";

    document.getElementById(
        "dataFimColaborador"
    ).value = "";

    atualizarColaboradores();

    atualizarIndicadoresColaboradores();

}

function eliminarColaborador(index){

    if(
        !confirm(
            "Eliminar colaborador?"
        )
    ) return;

    colaboradores.splice(
        index,
        1
    );

    salvarDados(
        "colaboradores",
        colaboradores
    );

    atualizarColaboradores();

}



function editarColaborador(index){

console.log(
    "Editar:",
    index
);

indiceEdicaoColaborador =
index;

console.log(
    "Indice guardado:",
    indiceEdicaoColaborador
);


    const item =
    colaboradores[index];

    document.getElementById(
        "nomeFuncionario"
    ).value =
    item.nome || "";

    document.getElementById(
        "matriculaFuncionario"
    ).value =
    item.matricula || "";

    document.getElementById(
        "generoFuncionario"
    ).value =
    item.genero || "";

    document.getElementById(
        "funcaoFuncionario"
    ).value =
    item.funcao || "";

    document.getElementById(
        "setorFuncionario"
    ).value =
    item.setor || "";

    document.getElementById(
        "liderFuncionario"
    ).value =
    item.lider || "";

    document.getElementById(
        "empresaFuncionario"
    ).value =
    item.empresa || "";

    document.getElementById(
    "dataAdmissao"
).value =
item.dataAdmissao || "";

document.getElementById(
    "dataDemissao"
).value =
item.dataDemissao || "";
    

    indiceEdicaoColaborador =
    index;

}
if (formColaborador && tabelaColaboradores) {

    formColaborador.addEventListener(
        "submit",
        e => {

            e.preventDefault();

           const novoColaborador = {

    nome:
    document.getElementById(
        "nomeFuncionario"
    ).value,

    matricula:
    document.getElementById(
        "matriculaFuncionario"
    ).value,

    genero:
    document.getElementById(
        "generoFuncionario"
    ).value,

    funcao:
    document.getElementById(
        "funcaoFuncionario"
    ).value,

    setor:
    document.getElementById(
        "setorFuncionario"
    ).value,

    lider:
    document.getElementById(
        "liderFuncionario"
    ).value,

    empresa:
    document.getElementById(
        "empresaFuncionario"
    ).value,

dataAdmissao:
document.getElementById(
    "dataAdmissao"
).value,

dataDemissao:
document.getElementById(
    "dataDemissao"
).value,

    status:

document.getElementById(
    "dataDemissao"
).value

? "Inativo"

: "Ativo"
};
         
console.log(
    "Indice ao salvar:",
    indiceEdicaoColaborador
);

if(
    indiceEdicaoColaborador !== null
){

    colaboradores[
        indiceEdicaoColaborador
    ] = novoColaborador;

    indiceEdicaoColaborador =
    null;

}
else{

    colaboradores.push(
        novoColaborador
    );

}

            salvarDados(
                "colaboradores",
                colaboradores
            );

            atualizarColaboradores();

            formColaborador.reset();

        }
    );

}function imprimirColaborador(index){

    const item =
    colaboradores[index];

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
        "FICHA DE COLABORADOR",
        20,
        35
    );

   let y = 55;

pdf.text(`Nome: ${item.nome}`,20,y);
y += 15;

pdf.text(`Matricula: ${item.matricula}`,20,y);
y += 15;

pdf.text(`Genero: ${item.genero}`,20,y);
y += 15;

pdf.text(`Funcao: ${item.funcao}`,20,y);
y += 15;

pdf.text(`Setor: ${item.setor}`,20,y);
y += 15;

pdf.text(`Lider: ${item.lider}`,20,y);
y += 15;

pdf.text(`Empresa: ${item.empresa}`,20,y);
y += 15;

pdf.text(`Data de Admissao: ${item.dataAdmissao || "-"}`,20,y);
y += 15;

pdf.text(`Data de Demissao: ${item.dataDemissao || "-"}`,20,y);
y += 15;

pdf.text(`Status: ${item.status}`,20,y);
    pdf.save(
        `Colaborador_${item.nome}.pdf`
    );

}


atualizarColaboradores();
