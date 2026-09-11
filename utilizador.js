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
let utilizadores = [];

async function carregarUtilizadoresSupabase(){
if(!window.empresaAtual){
    return;
}
    const {
        data,
        error
    } =
    await supabaseClient
    .from("utilizadores")
    .select("*")
.eq("empresa_id",window.empresaAtual)

    if(error){

        console.error(error);

        return;

    }

    utilizadores =
    data || [];

    atualizarUtilizadores();

    atualizarIndicadoresUtilizadores();

}

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
       ${item.created_at
    ? item.created_at.split("T")[0]
    : "N/D"}
    </td>

    <td>
        ${item.ultimo_acesso || "-"}
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
    async e => {

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
const utilizadorLogado =
JSON.parse(
    localStorage.getItem(
        "utilizadorLogado"
    )
);

const novoPerfil =
document.getElementById(
    "perfilUser"
).value;

if(

    novoPerfil ===
    "Super Admin"

    &&

    utilizadorLogado.perfil
    .toLowerCase()
    !==
    "super admin"

){

    alert(
        "Apenas o Super Admin pode criar outro Super Admin."
    );

    return;

}

if(
    indiceEdicaoUtilizador !== null
){

    const utilizadorEditado =
    utilizadores[
        indiceEdicaoUtilizador
    ];

    const { error } =
    await supabaseClient
    .from("utilizadores")
    .update({

        nome:
        novoUtilizador.nome,

        email:
        novoUtilizador.email,

        perfil:
        novoUtilizador.perfil,

        status:
        novoUtilizador.status

    })
    .eq(
        "id",
        utilizadorEditado.id
    );

    if(error){

        console.error(error);

        return;

    }

    indiceEdicaoUtilizador =
    null;

}

else{
const {
    data: { session }
} =
await supabaseClient.auth.getSession();

console.log("SESSION:", session);

if(!session){

    alert(
        "Sessão não encontrada."
    );

    return;

}

    const resposta =
await fetch(

    "https://phtxaeswfsphuopyjteu.supabase.co/functions/v1/criar-utilizador",

    {

        method: "POST",

        headers: {

            "Content-Type":
            "application/json",

            "Authorization":
            `Bearer ${session.access_token}`

        },

        body: JSON.stringify({

            nome:
            novoUtilizador.nome,

            email:
            novoUtilizador.email,

            perfil:
            novoUtilizador.perfil,

            status:
            novoUtilizador.status,

            empresa_id:
            window.empresaAtual

        })

    }

);

    const resultado =
    await resposta.json();

    if(!resposta.ok){

        console.error(resultado);

        alert(
            "Erro ao criar utilizador."
        );

        return;

    }

    alert(

        "Utilizador criado com sucesso!\n\n" +

        "Senha temporária: " +

        resultado.password

    );

}
      salvarDados(
                "utilizadores",
                utilizadores
            );

           

            formUtilizador.reset();
            await carregarUtilizadoresSupabase();
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
async function eliminarUtilizador(index){



if(

!confirm(

"Eliminar utilizador?"
)

) return;

const utilizador =

utilizadores[index];

const { error } =

await supabaseClient

.from("utilizadores")

.delete()

.eq(

"id",

utilizador.id

);

if(error){

console.error(error);

return;

}

await carregarUtilizadoresSupabase();

}

async function resetSenha(index){

    const utilizador =
    utilizadores[index];

    if(
        !confirm(
            `Resetar a senha de ${utilizador.nome} para Talanga@123 ?`
        )
    ){
        return;
    }

    const {
        data: { session }
    } =
    await supabaseClient.auth.getSession();

    const resposta =
    await fetch(

        "https://phtxaeswfsphuopyjteu.supabase.co/functions/v1/reset-password",

        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json",

                "Authorization":
                `Bearer ${session.access_token}`

            },

            body: JSON.stringify({

                email:
                utilizador.email

            })

        }

    );

    const resultado =
    await resposta.json();

    if(!resposta.ok){

        console.error(resultado);

        alert(
            "Erro ao redefinir senha."
        );

        return;

    }

    alert(
        "Senha redefinida para Talanga@123"
    );

}
function atualizarIndicadoresUtilizadores(){

    console.log(
    "UTILIZADORES:",
    utilizadores
);

utilizadores.forEach(item => {

    console.log(
        "PERFIL:",
        item.perfil
    );

});
document.getElementById(
    "superAdminsUtilizadores"
).textContent =

utilizadores.filter(
    item =>
    item.perfil &&
    item.perfil.trim().toLowerCase()
    === "super admin"
).length;

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
        item.perfil &&
        item.perfil.trim().toLowerCase()
        === "administrador"
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
function controlarPerfisUtilizador(){

    const utilizador = JSON.parse(
        localStorage.getItem(
            "utilizadorLogado"
        )
    );

    if(!utilizador){
        return;
    }

    const perfilUser =
    document.getElementById(
        "perfilUser"
    );

    if(!perfilUser){
        return;
    }

    if(
        utilizador.perfil
        .toLowerCase() !==
        "super admin"
    ){

        perfilUser.innerHTML = `
            <option>
                Administrador
            </option>

            <option>
                Técnico HSE
            </option>
        `;
    }

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
carregarUtilizadoresSupabase();
controlarPerfisUtilizador();