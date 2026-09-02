async function carregarLeads(){

    const { data, error } =

    await supabaseClient
    .from("leads")
    .select("*")
    .order(
        "id",
        {
            ascending:false
        }
    );

    if(error){

        console.error(error);

        return;

    }
window.listaLeads =
data;
    const tbody =

    document.querySelector(
        "#tabelaLeads tbody"
    );

    if(!tbody){

        return;

    }

    tbody.innerHTML = "";

    data.forEach(lead => {

        tbody.innerHTML += `

       <tr
    data-status="${lead.status}"
    data-data="${lead.created_at.split("T")[0]}"
>

            <td>${lead.nome}</td>

            <td>${lead.empresa}</td>

            <td>${lead.email}</td>

            <td>${lead.telefone}</td>

            <td>${lead.sector}</td>

            <td>${lead.colaboradores}</td>
            <td>


<select
 onchange="alterarStatusLead(
 '${lead.id}',
 this.value
 )"
>

<option
${lead.status==="Novo"?"selected":""}
>
Novo
</option>

<option
${lead.status==="Contactado"?"selected":""}
>
Contactado
</option>

<option
${lead.status==="Proposta"?"selected":""}
>
Proposta
</option>

<option
${lead.status==="Cliente"?"selected":""}
>
Cliente
</option>

<option
${lead.status==="Perdido"?"selected":""}
>
Perdido
</option>

</select>

</td>
<td>
${new Date(
lead.created_at
).toLocaleDateString()}
</td>

<td>

<button
onclick="
converterLeadCliente(
'${lead.id}'
)
"
>
Converter
</button>

<button
onclick="
editarLead(
'${lead.id}'
)
"
>
Editar
</button>

<button
onclick="
imprimirLead(
'${lead.id}'
)
"
>
Imprimir
</button>

<button
onclick="
eliminarLead(
'${lead.id}'
)
"
>
Eliminar
</button>

</td>

        </tr>

        `;

    });
document.getElementById(
    "totalLeads"
).textContent =
data.length;

const hoje =
new Date()
.toISOString()
.split("T")[0];

const leadsHoje =

data.filter(

    lead =>

    lead.created_at &&
    lead.created_at.startsWith(
        hoje
    )

).length;

document.getElementById(
    "leadsHoje"
).textContent =
leadsHoje;

const empresasUnicas =

new Set(

    data.map(
        lead =>
        lead.empresa
    )

);



document.getElementById(
    "empresasLeads"
).textContent =

empresasUnicas.size;

const sectoresUnicos =

new Set(

    data.map(
        lead =>
        lead.sector
    )

);

document.getElementById(
    "sectoresLeads"
).textContent =

sectoresUnicos.size;

document.getElementById(
    "clientesConvertidos"
).textContent =

data.filter(
    lead =>
    lead.status ===
    "Cliente"
).length;
document.getElementById(
"novosLeads"
).textContent =

data.filter(
lead =>
lead.status ===
"Novo"
).length;

document.getElementById(
    "clientesConvertidos"
).textContent =

data.filter(
    lead =>
    lead.status ===
    "Cliente"
).length;

document.getElementById(
    "contactadosLeads"
).textContent =

data.filter(
    lead =>
    lead.status ===
    "Contactado"
).length;
}
async function alterarStatusLead(
    id,
    status
){

    const { error } =

    await supabaseClient
    .from("leads")
    .update({
        status
    })
    .eq(
        "id",
        id
    );

    if(error){

        console.error(error);

        alert(
            "Erro ao atualizar status."
        );

        return;

    }

    carregarLeads();

}
async function converterLeadCliente(
    id
){

    const { error } =

    await supabaseClient
    .from("leads")
    .update({
        status:"Cliente"
    })
    .eq(
        "id",
        id
    );

    if(error){

        console.error(error);

        alert(
            "Erro ao converter lead."
        );

        return;

    }

    alert(
        "Lead convertido em Cliente."
    );

    carregarLeads();

}


    function filtrarLeads(){

    const pesquisaInput =
    document.getElementById(
        "pesquisaLead"
    );

    const statusSelect =
    document.getElementById(
        "filtroStatusLead"
    );

    const dataInicioInput =
    document.getElementById(
        "dataInicioLead"
    );

    const dataFimInput =
    document.getElementById(
        "dataFimLead"
    );

    const pesquisa =
    pesquisaInput
    ? pesquisaInput.value.toLowerCase()
    : "";

    const status =
    statusSelect
    ? statusSelect.value
    : "Todos";

    const dataInicio =
    dataInicioInput
    ? dataInicioInput.value
    : "";

    const dataFim =
    dataFimInput
    ? dataFimInput.value
    : "";

    const linhas =

    document.querySelectorAll(
        "#tabelaLeads tbody tr"
    );

    linhas.forEach(linha => {

        const texto =

        linha.textContent
        .toLowerCase();

        const dataLinha =
        linha.dataset.data;

        let mostrar =
        true;

        if(
            pesquisa &&
            !texto.includes(
                pesquisa
            )
        ){

            mostrar = false;

        }

        if(

            status &&
            status !== "Todos"

        ){

            const statusLinha =

            linha.dataset.status;

            if(
                statusLinha !== status
            ){

                mostrar = false;

            }

        }

        if(
            dataInicio &&
            dataLinha < dataInicio
        ){

            mostrar = false;

        }

        if(
            dataFim &&
            dataLinha > dataFim
        ){

            mostrar = false;

        }

        linha.style.display =

        mostrar

        ?

        ""

        :

        "none";

    });

}
function limparFiltroLeads(){

    const pesquisa =
    document.getElementById(
        "pesquisaLead"
    );

    const status =
    document.getElementById(
        "filtroStatusLead"
    );

    const dataInicio =
    document.getElementById(
        "dataInicioLead"
    );

    const dataFim =
    document.getElementById(
        "dataFimLead"
    );

    if(pesquisa){
        pesquisa.value = "";
    }

    if(status){
        status.value = "Todos";
    }

    if(dataInicio){
        dataInicio.value = "";
    }

    if(dataFim){
        dataFim.value = "";
    }

    filtrarLeads();

}
async function eliminarLead(id){

    if(
        !confirm(
            "Eliminar lead?"
        )
    ){
        return;
    }

    const { error } =

    await supabaseClient
    .from("leads")
    .delete()
    .eq("id", id);

    console.log(error);

    if(error){

        alert(
            "Erro ao eliminar"
        );

        return;

    }

    carregarLeads();

}
function imprimirLead(id){

    const lead =

    window.listaLeads.find(
        item => item.id == id
    );

    if(!lead){
        return;
    }

    const janela =
    window.open(
        "",
        "_blank"
    );

    janela.document.write(`

    <html>

    <head>

        <title>
            Lead Comercial
        </title>

        <style>

            body{

                font-family: Arial;

                padding:40px;

            }

            .cabecalho{

                text-align:center;

                margin-bottom:30px;

            }

            .logo{

                height:90px;

            }

            h2{

                color:#0D1B3D;

            }

            p{

                font-size:16px;

                margin:10px 0;

            }

            .rodape{

                margin-top:40px;

                text-align:center;

                font-size:12px;

                color:#777;

            }

        </style>

    </head>

    <body>

        <div class="cabecalho">

           <img src="logo-talanga.png">

            <h2>
                Lead Comercial Talanga HSE
            </h2>

        </div>

        <p><strong>Nome:</strong> ${lead.nome}</p>

        <p><strong>Empresa:</strong> ${lead.empresa}</p>

        <p><strong>Email:</strong> ${lead.email}</p>

        <p><strong>Telefone:</strong> ${lead.telefone}</p>

        <p><strong>Sector:</strong> ${lead.sector}</p>

        <p><strong>Colaboradores:</strong> ${lead.colaboradores}</p>

        <p><strong>Status:</strong> ${lead.status}</p>

        <p><strong>Mensagem:</strong> ${lead.mensagem || "-"}</p>

        <div class="rodape">

            Talanga HSE®<br>

            Desenvolvido por GT Engenharia &
            Serviços

        </div>

    </body>

    </html>

    `);

    janela.document.close();

    janela.print();

}
function editarLead(id){

    const lead =

    window.listaLeads.find(
        item => item.id == id
    );

    if(!lead){
        return;
    }

    document.getElementById(
        "editarLeadId"
    ).value = lead.id;

    document.getElementById(
        "editarLeadNome"
    ).value = lead.nome || "";

    document.getElementById(
        "editarLeadEmpresa"
    ).value = lead.empresa || "";

    document.getElementById(
        "editarLeadEmail"
    ).value = lead.email || "";

    document.getElementById(
        "editarLeadTelefone"
    ).value = lead.telefone || "";

    document.getElementById(
        "editarLeadSector"
    ).value = lead.sector || "";

    document.getElementById(
        "editarLeadColaboradores"
    ).value = lead.colaboradores || "";

    document.getElementById(
        "editarLeadMensagem"
    ).value = lead.mensagem || "";

    document.getElementById(
        "modalEditarLead"
    ).style.display = "flex";

}
function fecharModalEditarLead(){

    document.getElementById(
        "modalEditarLead"
    ).style.display = "none";

}
async function guardarEdicaoLead(){

    const id =
    document.getElementById(
        "editarLeadId"
    ).value;

    const { error } =

    await supabaseClient
    .from("leads")
    .update({

        nome:
        document.getElementById(
            "editarLeadNome"
        ).value,

        empresa:
        document.getElementById(
            "editarLeadEmpresa"
        ).value,

        email:
        document.getElementById(
            "editarLeadEmail"
        ).value,

        telefone:
        document.getElementById(
            "editarLeadTelefone"
        ).value,

        sector:
        document.getElementById(
            "editarLeadSector"
        ).value,

        colaboradores:
        Number(
            document.getElementById(
                "editarLeadColaboradores"
            ).value
        ),

        mensagem:
        document.getElementById(
            "editarLeadMensagem"
        ).value

    })

    .eq(
        "id",
        id
    );

    if(error){

        console.error(error);

        alert(
            "Erro ao atualizar lead."
        );

        return;

    }

    alert(
        "Lead atualizado com sucesso."
    );

    fecharModalEditarLead();

    carregarLeads();

}


carregarLeads();