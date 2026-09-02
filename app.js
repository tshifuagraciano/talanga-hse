console.clear();

console.log("Talanga HSE iniciado");




/* ==========================================
   FUNÇÃO GENÉRICA TABELAS
========================================== */

function adicionarLinha(tabela, conteudo){

    const linha =
    document.createElement("tr");

    linha.innerHTML =
    conteudo;

    tabela.appendChild(
        linha
    );

}

/* ==========================================
   NAVEGAÇÃO
========================================== */

function mostrarModulo(id){

    const modulos =
    document.querySelectorAll(
        ".modulo"
    );

    modulos.forEach(modulo => {

        modulo.style.display =
        "none";

    });

    const moduloSelecionado =
    document.getElementById(id);

    if(moduloSelecionado){

        moduloSelecionado.style.display =
        "block";

    }
    if(id === "login"){

    setTimeout(() => {

        moduloSelecionado.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

        document
        .getElementById(
            "loginEmail"
        )
        ?.focus();

    }, 100);

}


    const itensMenu =
    document.querySelectorAll(
        ".sidebar li"
    );

    itensMenu.forEach(item => {

        item.classList.remove(
            "ativo"
        );

    });

    const itemAtivo =
    document.querySelector(
        `.sidebar li[onclick="mostrarModulo('${id}')"]`
    );

    if(itemAtivo){

        itemAtivo.classList.add(
            "ativo");
        

    }

}

mostrarModulo(
    "dashboard"
);


 function mostrarUtilizadorLogado(){

    const utilizador =

    JSON.parse(
        localStorage.getItem(
            "utilizadorLogado"
        )
    );

    const info =
    document.getElementById(
        "utilizadorLogadoInfo"
    );

    const logout =
    document.getElementById(
        "btnLogout"
    );

    if(!info || !logout)
    return;

    if(utilizador){

        info.textContent =

        `👤 ${utilizador.nome}
         (${utilizador.email})`;

        logout.style.display =
        "inline-block";

    }
    else{

        info.textContent =
        "Não autenticado";

        logout.style.display =
        "none";

    }

}
const btnLogout =
document.getElementById(
    "btnLogout"
);

if(btnLogout){

   btnLogout.addEventListener(

    "click",

    async () => {

        await supabaseClient.auth.signOut();

        localStorage.clear();

        alert(
            "Sessão terminada."
        );

        location.reload();

    }

);

}
async function aplicarPermissoes(){

    const indicadoresLoginAdmin =
document.getElementById(
    "indicadoresLoginAdmin"
);
    
    const utilizador =

    JSON.parse(
        localStorage.getItem(
            "utilizadorLogado"
        )
    );

    const menuItens =
    document.querySelectorAll(
        ".sidebar li"
    );

    const dashboardPrivado =
    document.getElementById(
        "dashboardPrivado"
    );

    const dashboardPublico =
    document.getElementById(
        "dashboardPublico"
    );
    
    /* =====================================
       CONVIDADO
    ===================================== */

    if(!utilizador){

        if(indicadoresLoginAdmin){

    indicadoresLoginAdmin.style.display =
    "none";


}

    document
    .getElementById(
        "areaConvidado"
    )
    ?.style.setProperty(
        "display",
        "block"
    );

    document
    .getElementById(
        "areaPrivada"
    )
    ?.style.setProperty(
        "display",
        "none"
    );

    menuItens.forEach(
        item => {

            const texto =
            item.textContent;

            if(
                !texto.includes("Dashboard")
                &&
                !texto.includes("Login")
            ){

                item.style.display =
                "none";

            }

        }
    );

    return;

}

    /* =====================================
       UTILIZADOR AUTENTICADO
    ===================================== */

   

   const perfil =
(utilizador.perfil || "")
.trim()
.toLowerCase();

const perfisValidos = [
    "super admin",
    "administrador",
    "técnico hse"
];

if(!perfisValidos.includes(perfil)){

    alert(
        "Perfil inválido. Contacte o administrador."
    );

    await supabaseClient.auth.signOut();

    localStorage.clear();

    location.reload();

    return;
}
 if(dashboardPrivado){

        dashboardPrivado.style.display =
        "block";

    }

    if(dashboardPublico){

        dashboardPublico.style.display =
        "none";

    }

document
.getElementById(
    "areaConvidado"
)
?.style.setProperty(
    "display",
    "none"
);

document
.getElementById(
    "areaPrivada"
)
?.style.setProperty(
    "display",
    "block"
);
/* =====================================
       Super usuario
    ===================================== */

    const menuLeads =
document.querySelector(
'.sidebar li[onclick="mostrarModulo(\'leads\')"]'
);
const novoPerfil =
document.getElementById(
    "perfilUser"
).value;
if(menuLeads){

    menuLeads.style.display =
    "none";

}
if(
    perfil === "super admin"
){
document
.getElementById(
    "cardSuperAdmin"
)
?.style.setProperty(
    "display",
    "block"
);
    if(indicadoresLoginAdmin){

        indicadoresLoginAdmin.style.display =
        "flex";

    }

    menuItens.forEach(item => {

        item.style.display = "";

    });

    if(menuLeads){

        menuLeads.style.display =
        "";

    }

    return;

}
const utilizadorLogado =
JSON.parse(
    localStorage.getItem(
        "utilizadorLogado"
    )
);


    /* =====================================
       ADMINISTRADOR
    ===================================== */

   if(
    perfil === "administrador"
){document
.getElementById(
    "cardSuperAdmin"
)
?.style.setProperty(
    "display",
    "none"
);
    

    if(indicadoresLoginAdmin){

        indicadoresLoginAdmin.style.display =
        "flex";

    }
    menuItens.forEach(item => {

        item.style.display = "";

    });

    if(menuLeads){

        menuLeads.style.display =
        "none";

    }


    return;

}


    /* =====================================
       TÉCNICO HSE
    ===================================== */

   if(
    perfil === "técnico hse"
){

    if(indicadoresLoginAdmin){

        indicadoresLoginAdmin.style.display =
        "none";

    }
    document
.getElementById(
    "cardSuperAdmin"
)
?.style.setProperty(
    "display",
    "none"
);

    menuItens.forEach(item => {

        item.style.display = "";

    });

    if(menuLeads){

        menuLeads.style.display =
        "none";

    }

    document
    .querySelector(
        ".sidebar li[onclick=\"mostrarModulo('utilizadores')\"]"
    )
    ?.style.setProperty(
        "display",
        "none"
    );

}
}
/* function solicitarDemonstracao(){

    const mensagem =
    encodeURIComponent(
`Olá!

Tenho interesse em conhecer o Talanga HSE.

Nome:
Empresa:
Sector:
Nº de colaboradores:

Gostaria de solicitar uma demonstração da plataforma.`
    );

    window.open(
        `https://wa.me/921630180?text=${mensagem}`,
        "_blank"
    );

}
function limparTexto(texto){

    return texto
    .replace(/</g,"")
    .replace(/>/g,"");

}
function criarUtilizadoresDemo(){

    const utilizadores =
    carregarDados("utilizadores") || [];

    if(utilizadores.length > 0){
        return;
    }

    const contasDemo = [

        {
            nome:"Administrador",
            email:"admin@talanga.co.ao",
            senha:"123456",
            perfil:"Administrador"
        },

        {
            nome:"Técnico HSE",
            email:"hse@talanga.co.ao",
            senha:"123456",
            perfil:"Técnico HSE"
        }

    ];

    salvarDados(
        "utilizadores",
        contasDemo
    );

}*/
document
.getElementById("menuMobile")
?.addEventListener(
    "click",
    () => {

        document
        .querySelector(".sidebar")
        ?.classList.toggle(
            "aberta"
        );

    }
);
document.addEventListener(
    "click",
    (e) => {

        const sidebar =
        document.querySelector(
            ".sidebar"
        );

        const menuMobile =
        document.getElementById(
            "menuMobile"
        );

        if(
            !sidebar ||
            !menuMobile
        ){
            return;
        }

        if(

            !sidebar.contains(
                e.target
            )

            &&

            !menuMobile.contains(
                e.target
            )

        ){

            sidebar.classList.remove(
                "aberta"
            );

        }

    }
);
document
.querySelectorAll(".sidebar li")
.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            if(
                window.innerWidth <= 768
            ){

                document
                .querySelector(".sidebar")
                ?.classList.remove(
                    "aberta"
                );

            }

        }
    );

});
``
const talanguinhaBot =
document.getElementById(
    "talanguinhaBot"
);

const talanguinhaChat =
document.getElementById(
    "talanguinhaChat"
);

talanguinhaBot.addEventListener(
    "click",
    ()=>{

        if(
            talanguinhaChat.style.display
            ===
            "flex"
        ){

            talanguinhaChat.style.display =
            "none";

        }
        else{

            talanguinhaChat.style.display =
            "flex";

        }

    }
);
async function responderTalanguinha(){

    const pergunta =

    document
    .getElementById(
        "perguntaTalanguinha"
    )
    .value;

    if(!pergunta){
        return;
    }

    adicionarMensagem(
        pergunta,
        "user"
    );

    const resposta =

    await processarPerguntaTalanguinha(
        pergunta
    );

    adicionarMensagem(
        resposta,
        "bot"
    );

    document
    .getElementById(
        "perguntaTalanguinha"
    )
    .value = "";

}
async function resumoConformidadeTalanguinha(){

    const conformidade =

    document
    .getElementById(
        "cardConformidade"
    )
    ?.textContent || "0%";

    return `

📊 CONFORMIDADE GERAL

${conformidade}

${parseFloat(conformidade) >= 90

? "✅ Situação controlada."

: "⚠️ Existem oportunidades de melhoria."

}

`;

}

async function resumoExecutivoTalanguinha(){

    return `

📈 RESUMO EXECUTIVO

✅ Conformidade:
${document.getElementById("cardConformidade")?.textContent || "0%"}

👥 Colaboradores:
${document.getElementById("cardColaboradores")?.textContent || "0"}

🎓 Treinamentos:
${document.getElementById("cardTreinamentos")?.textContent || "0"}

🦺 Desvios:
${document.getElementById("segOcorrencias")?.textContent || "0"}

🔎 Inspeções:
${document.getElementById("cardInspecoes")?.textContent || "0"}

⏱️ HHT:
${document.getElementById("cardHHTAcumulado")?.textContent || "0"}

📊 TF:
${document.getElementById("cardTF")?.textContent || "0"}

📊 TG:
${document.getElementById("cardTG")?.textContent || "0"}

🏆 Dias sem Acidente:
${document.getElementById("diasSemAcidente")?.textContent || "0"}

`;

}
async function analisarDesviosTalanguinha(){

    const { data, error } =

    await supabaseClient
    .from("desvios")
    .select("*");

    if(error){

        console.error(error);

        return `
❌ Erro ao consultar os desvios.
`;

    }

    if(!data || data.length === 0){

        return `
🦺 Não existem desvios registados.
`;

    }

    const total =
    data.length;

    const abertos =

    data.filter(
        item =>
        item.status === "Aberto"
    ).length;

    const tratamento =

    data.filter(
        item =>
        item.status === "Em Tratamento"
    ).length;

    const fechados =

    data.filter(
        item =>
        item.status === "Fechado"
    ).length;

    return `

🦺 ANÁLISE DOS DESVIOS

📌 Total: ${total}

🔴 Abertos: ${abertos}

🟡 Em Tratamento: ${tratamento}

🟢 Fechados: ${fechados}

`;

}

function adicionarMensagem(
    texto,
    tipo
){

    const area =

    document.getElementById(
        "talanguinhaMensagens"
    );

    const div =
    document.createElement(
        "div"
    );

    div.className =

    tipo === "user"

    ?

    "msgUser"

    :

    "msgBot";

    div.textContent =
    texto;

    area.appendChild(
        div
    );

    area.scrollTop =
    area.scrollHeight;

}
document
.getElementById(
    "btnTalanguinha"
)
.addEventListener(
    "click",
    responderTalanguinha
);
function abrirModalLead(){

    const modal =
    document.getElementById(
        "modalLead"
    );

    if(modal){

        modal.style.display =
        "flex";

    }

}

function fecharModalLead(){

    const modal =
    document.getElementById(
        "modalLead"
    );

    if(modal){

        modal.style.display =
        "none";

    }

}
window.addEventListener("click", (e) => {

    const modal =
    document.getElementById("modalLead");

    if(e.target === modal){

        fecharModalLead();

    }

});
function fecharModalLead(){

    const modal =
    document.getElementById("modalLead");

    if(modal){

        modal.style.display = "none";

    }

    document
        .getElementById("formLead")
        ?.reset();

}
document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        fecharModalLead();

    }

});
function irParaPorqueTalanga(){

    window.scrollBy({

        top: window.innerHeight,

        behavior: "smooth"

    });
if(utilizadorLogado){

    document.querySelector(
        ".scroll-indicator"
    )?.remove();

}

}
async function perguntaRapidaTalanguinha(texto){

    document.getElementById(
        "perguntaTalanguinha"
    ).value = texto;

    responderTalanguinha();
    
}
const baseConhecimentoTalanga = [

{
    palavras:[
        "hht",
        "registar hht",
        "registrar hht",
        "como registar hht"
    ],

    resposta:`

📊 REGISTO DE HHT

1. Aceda ao módulo Segurança.

2. Abra a secção HHT.

3. Preencha:

• Semana
• Data Inicial
• Data Final
• Empresa Principal
• Empresa Subcontratada

4. Registe os efetivos.

5. Clique em:

✅ Registar Semana HHT

`
},

{
    palavras:[

    "como registrar aso",
    "como registar aso",

    "registrar aso",
    "registar aso"

],

    resposta:`

🩺 REGISTO DE ASO

1. Aceda ao módulo Saúde Ocupacional.

2. Abra Gestão de ASO.

3. Selecione o colaborador.

4. Informe:

• Tipo
• Data
• Validade
• Resultado

5. Clique em Guardar.

`
},
{
    palavras:[

        "quem criou o talanga",
        "criador do talanga",
        "quem desenvolveu o talanga",
        "quem criou talanga",
        "gt engenharia",
        "gt"

    ],

    resposta:`

🏢 TALANGA HSE

O Talanga HSE foi idealizado e desenvolvido
pela GT Engenharia e Serviços.

O projeto foi concebido por
Graciano De Jesus Tshifua,
com foco na digitalização da gestão
de Saúde, Segurança e Ambiente.

📧 gtengenhariaservicos@gmail.com

📞 +244 921 630 180

`

},
{
    palavras:[

        "comprar",
        "adquirir",
        "adquirir o talanga",
        "como adquirir",
        "demonstração",
        "solicitar demonstração",
        "licença"

    ],

    resposta:`

🚀 AQUISIÇÃO DO TALANGA HSE

Pode solicitar uma demonstração através
do botão:

✅ Solicitar Demonstração

Ou contactar diretamente:

📧 gtengenhariaservicos@gmail.com

📞 +244 921 630 180

A equipa da GT Engenharia e Serviços
irá configurar um ambiente adequado
à sua organização.

`

},
{
    palavras:[

        "como registrar aso",
        "como registar aso",
        "registrar aso",
        "registar aso"

    ],

    resposta:`

🩺 REGISTO DE ASO

1. Aceda ao módulo Saúde Ocupacional.

2. Abra Gestão de ASO.

3. Selecione o colaborador.

4. Informe:

• Tipo do exame
• Data
• Validade
• Resultado

5. Clique em Guardar.

`

},


{
    palavras:[
        "dds",
        "registrar dds",
        "como criar dds"
    ],

    resposta:`

🦺 DDS ELETRÓNICO

1. Aceda ao módulo DDS.

2. Registe:

• Tema
• Data
• Responsável

3. Registe os participantes.

4. Grave o DDS.

`
}

];


function procurarConhecimentoTalanga(
    pergunta
){

    pergunta =
    pergunta.toLowerCase();

    for(
        const item of
        baseConhecimentoTalanga
    ){

        const encontrou =

        item.palavras.some(
            palavra =>

           pergunta
.toLowerCase()
.includes(
    palavra.toLowerCase()
)

        );

        if(encontrou){

            return item.resposta;

        }

    }

    return null;

}
function procurarConhecimentoTalanga(
    pergunta
){

    pergunta =
    pergunta.toLowerCase();

    for(
        const item of
        baseConhecimentoTalanga
    ){

        const encontrou =

        item.palavras.some(
            palavra =>

            pergunta.includes(
                palavra
            )
        );

        if(encontrou){

            return item.resposta;

        }

    }

    return null;

}
async function processarPerguntaTalanguinha(pergunta){

    pergunta =
    pergunta.toLowerCase();
if(
    pergunta.includes("sugere um dds")
    ||
    pergunta.includes("sugerir dds")
    ||
    pergunta.includes("tema de dds")
){
    return await sugerirDDSTalanguinha();
}
    // PRIMEIRO procura na base de conhecimento

    const respostaBase =

    procurarConhecimentoTalanga(
        pergunta
    );

    if(respostaBase){

        return respostaBase;

    }

    // DEPOIS análises dinâmicas

    if(
        pergunta.includes("conformidade")
    ){
        return await resumoConformidadeTalanguinha();
    }

    if(
        pergunta.includes("priorizar")
    ){
        return await prioridadesTalanguinha();
    }

    if(
        pergunta.includes("resumo")
    ){
        return await resumoExecutivoTalanguinha();
    }

    if(
        pergunta.includes("análise dos desvios")
    ){
        return await analisarDesviosTalanguinha();
    }

    if(
        pergunta.includes("análise dos aso")
    ){
        return await analisarASOTalanguinha();
    }
if(
    pergunta.includes("o que devo fazer hoje")
){
    return await prioridadesTalanguinha();
}

if(
    pergunta.includes("como está a empresa")
){
    return await resumoExecutivoTalanguinha();
}

if(
    pergunta.includes("que módulos existem")
    ||
    pergunta.includes("modulos")
    ||
    pergunta.includes("módulos")
){
    return modulosTalanguinha();
}
    return `
🤖 Ainda estou a aprender.

Experimente:

• Como registrar ASO?
• Como registrar HHT?
• Como criar um DDS?
• Quem criou o Talanga?
• Como adquirir o Talanga?
• Resumo da empresa
`;
}

function modulosTalanguinha(){

    return `

📚 MÓDULOS DO TALANGA HSE

🦺 Segurança

🩺 Saúde Ocupacional

🌱 Meio Ambiente

🚨 Emergências

🔎 Inspeções

🎓 Treinamentos

👥 Colaboradores

📊 Relatórios

🧤 Gestão de EPI

📢 DDS Eletrónico

💬 Fala Talanga

📈 Dashboard Executivo

`;

}

async function sugerirDDSTalanguinha(){

    const { data, error } =

    await supabaseClient
    .from("desvios")
    .select("*");

    if(error){

        console.error(error);

        return `
❌ Não consegui analisar os desvios.
`;

    }

    if(!data || data.length === 0){

        return `
🦺 Não existem desvios suficientes para sugerir um DDS.
`;

    }

    const texto =

    JSON.stringify(data)
    .toLowerCase();

    if(texto.includes("epi")){

        return `

🦺 DDS RECOMENDADO

Tema:
Utilização Correta de EPI

Motivo:
Existem desvios relacionados com Equipamentos de Proteção Individual.

`;

    }

    if(
        texto.includes("altura")
        ||
        texto.includes("escada")
    ){

        return `

🦺 DDS RECOMENDADO

Tema:
Trabalho em Altura

Motivo:
Foram identificados desvios relacionados com trabalho em altura.

`;

    }

    return `

🦺 DDS RECOMENDADO

Tema:
Observação e Comunicação de Desvios

Motivo:
Existem desvios registados que justificam reforço da cultura preventiva.

`;

}
async function prioridadesTalanguinha(){

    const prioridades = [];

    const aso =

    document.getElementById(
        "vencidosASO"
    )?.textContent || "0";

    if(Number(aso) > 0){

        prioridades.push(
            `🩺 Renovar ${aso} ASO vencidos`
        );

    }

    const desvios =

    document.getElementById(
        "abertosOcorrencias"
    )?.textContent || "0";

    if(Number(desvios) > 0){

        prioridades.push(
            `🦺 Tratar ${desvios} desvios em aberto`
        );

    }

    const treinamentos =

    document.getElementById(
        "vencidosTreinamentos"
    )?.textContent || "0";

    if(Number(treinamentos) > 0){

        prioridades.push(
            `🎓 Atualizar ${treinamentos} treinamentos vencidos`
        );

    }

    if(prioridades.length === 0){

        return `

✅ Não existem pendências críticas.

A operação encontra-se controlada.

`;

    }

    return `

🎯 PRIORIDADES DE HOJE

${prioridades.join("\n")}

`;

}
async function conformidadeTalanguinha(){

    const conformidade =

    document.getElementById(
        "cardConformidade"
    )?.textContent || "0%";

    return `

📊 CONFORMIDADE GERAL

${conformidade}

${parseFloat(conformidade) >= 90

? "✅ Excelente nível de conformidade."

: "⚠️ Existem oportunidades de melhoria."

}

`;

}
async function analisarASOTalanguinha(){

    const total =

    document.getElementById(
        "totalASO"
    )?.textContent || 0;

    const validos =

    document.getElementById(
        "validosASO"
    )?.textContent || 0;

    const vencidos =

    document.getElementById(
        "vencidosASO"
    )?.textContent || 0;

    const aptos =

    document.getElementById(
        "aptosASO"
    )?.textContent || 0;

    return `

🩺 ANÁLISE DOS ASO

Total: ${total}

✅ Válidos: ${validos}

❌ Vencidos: ${vencidos}

👷 Aptos: ${aptos}

${Number(vencidos) > 0

? "⚠️ Existem colaboradores com ASO vencido."

: "✅ Todos os ASO encontram-se controlados."

}

`;

}
document.addEventListener(
    "click",
    (e)=>{

        const chat =
        document.getElementById(
            "talanguinhaChat"
        );

        const bot =
        document.getElementById(
            "talanguinhaBot"
        );

        if(
            !chat ||
            !bot
        ){
            return;
        }

        if(
            chat.style.display === "flex"
            &&
            !chat.contains(e.target)
            &&
            !bot.contains(e.target)
        ){

            chat.style.display =
            "none";

        }

    }
);


/*criarUtilizadoresDemo();*/

mostrarUtilizadorLogado();
aplicarPermissoes();