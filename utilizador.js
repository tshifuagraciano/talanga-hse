/* ==========================================
   UTILIZADORES
========================================== */

const formUtilizador =
    document.getElementById(
        "formUtilizador"
    );

const tabelaUtilizadores =
    document.querySelector(
        "#tabelaUtilizadores tbody"
    );
let utilizadores =
carregarDados(
    "utilizadores"
);
function atualizarUtilizadores(){

    if(!tabelaUtilizadores) return;

    tabelaUtilizadores.innerHTML = "";

    utilizadores.forEach(
    (item,index) => {

        const linha =
        document.createElement("tr");

        linha.innerHTML = `

    <td>${item.nome}</td>

    <td>${item.email}</td>

    <td>${item.perfil}</td>

    <td>

    ${item.status || "Ativo"}

</td>

    <td>
        ${item.dataCriacao
?
item.dataCriacao.split("T")[0]
:
"N/D"}
    </td>

    <td>
        ${item.ultimoAcesso || "-"}
    </td>
<td>
        ********
    </td>
    <td>

        <button
            onclick="
                editarUtilizador(${index})
            "
        >
            ✏️
        </button>

        <button
            onclick="
                eliminarUtilizador(${index})
            "
        >
            🗑️
        </button>
<button
    onclick="
        resetSenha(${index})
    "
>
    🔑
</button>
<button
    onclick="
        verSenha(${index})
    "
>
    👁️
</button>
    </td>

`;

        tabelaUtilizadores.appendChild(
            linha
        );

    });

}
if(formUtilizador && tabelaUtilizadores){

    formUtilizador.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const nome =
            document.getElementById(
                "nomeUser"
            ).value;

            const email =
            document.getElementById(
                "emailUser"
            ).value;

            const perfil =
            document.getElementById(
                "perfilUser"
            ).value;

           const novoUtilizador = {

    nome,

    email,

    perfil,

    status:

    document.getElementById(
        "statusUser"
    ).value,

    senha:

    indiceEdicaoUtilizador !== null

    ?

    utilizadores[
        indiceEdicaoUtilizador
    ].senha || "123456"

    :

    "123456",

    dataCriacao:

    indiceEdicaoUtilizador !== null

    ?

    utilizadores[
        indiceEdicaoUtilizador
    ].dataCriacao

    :

    new Date().toISOString(),

    ultimoAcesso:

    indiceEdicaoUtilizador !== null

    ?

    utilizadores[
        indiceEdicaoUtilizador
    ].ultimoAcesso

    :

    "-"

};

if(
    indiceEdicaoUtilizador !== null
){

    utilizadores[
        indiceEdicaoUtilizador
    ] = novoUtilizador;

    indiceEdicaoUtilizador =
    null;

}
else{

    utilizadores.push(
        novoUtilizador
    );

}

            salvarDados(
                "utilizadores",
                utilizadores
            );

           

            formUtilizador.reset();
atualizarUtilizadores();
        }
    );
atualizarIndicadoresUtilizadores();
}

function verSenha(index){

    alert(
        `Senha: ${utilizadores[index].senha}`
    );

}

let indiceEdicaoUtilizador =
null;
function eliminarUtilizador(index){

    if(
        !confirm(
            "Eliminar utilizador?"
        )
    ) return;

    utilizadores.splice(
        index,
        1
    );

    salvarDados(
        "utilizadores",
        utilizadores
    );

    atualizarUtilizadores();

}
function resetSenha(index){

    if(
        !confirm(
            "Resetar senha para 123456?"
        )
    ) return;

    utilizadores[index]
    .senha =
    "123456";

    salvarDados(
        "utilizadores",
        utilizadores
    );

    alert(
        "Senha redefinida para 123456"
    );

}
function atualizarIndicadoresUtilizadores(){

    document.getElementById(
        "totalUtilizadores"
    ).textContent =
    utilizadores.length;

    document.getElementById(
        "ativosUtilizadores"
    ).textContent =

    utilizadores.filter(
        item =>

        (item.status || "Ativo")
        === "Ativo"
    ).length;

    document.getElementById(
    "inativosUtilizadores"
).textContent =

utilizadores.filter(
    item =>

    item.status ===
    "Inativo"
).length;
    document.getElementById(
        "adminsUtilizadores"
    ).textContent =

    utilizadores.filter(
        item =>

        item.perfil ===
        "Administrador"
    ).length;

    document.getElementById(
        "hseUtilizadores"
    ).textContent =

    utilizadores.filter(
        item =>

        item.perfil ===
        "Técnico HSE"
    ).length;

}
function editarUtilizador(index){

    const item =
    utilizadores[index];

    document.getElementById(
        "nomeUser"
    ).value =
    item.nome;

    document.getElementById(
        "emailUser"
    ).value =
    item.email;

    document.getElementById(
        "perfilUser"
    ).value =
    item.perfil;

    document.getElementById(
        "statusUser"
    ).value =
    item.status;

    indiceEdicaoUtilizador =
    index;

}
const btnCSV =
document.getElementById(
    "exportarCSV"
);

const btnExcel =
document.getElementById(
    "exportarExcel"
);

const btnPDF =
document.getElementById(
    "exportarPDF"
);
if(btnCSV){

    btnCSV.addEventListener(

        "click",

        () => {

            let csv =

            "Nome,Email,Perfil,Status\n";

            utilizadores.forEach(
                item => {

                    csv +=

                    `${item.nome},${item.email},${item.perfil},${item.status}\n`;

                }
            );

            const blob =
            new Blob(
                [csv],
                {
                    type:
                    "text/csv"
                }
            );

            const link =
            document.createElement(
                "a"
            );

            link.href =
            URL.createObjectURL(
                blob
            );

            link.download =
            "Utilizadores.csv";

            link.click();

        }

    );

}
if(btnPDF){

    btnPDF.addEventListener(

        "click",

        () => {

            const { jsPDF } =
            window.jspdf;

            const pdf =
            new jsPDF();

            pdf.text(
                "UTILIZADORES",
                20,
                20
            );

            let y = 40;

            utilizadores.forEach(
                item => {

                    pdf.text(

                        `${item.nome} - ${item.email} - ${item.perfil}`,

                        20,

                        y

                    );

                    y += 10;

                }
            );

            pdf.save(
                "Utilizadores.pdf"
            );

        }

    );

}
if(btnExcel){

    btnExcel.addEventListener(

        "click",

        () => {

            const ws =

            XLSX.utils.json_to_sheet(
                utilizadores
            );

            const wb =
            XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                wb,
                ws,
                "Utilizadores"
            );

            XLSX.writeFile(
                wb,
                "Utilizadores.xlsx"
            );

        }

    );

}
atualizarUtilizadores();