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

        () => {

            localStorage.removeItem(
                "utilizadorLogado"
            );

            alert(
                "Sessão terminada."
            );

            location.reload();

        }

    );

}
function aplicarPermissoes(){

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
    const perfil =

    utilizador.perfil
    .trim()
    .toLowerCase();

    /* =====================================
       ADMINISTRADOR
    ===================================== */

    if (
    perfil === "administrador"
){

    menuItens.forEach(item => {

        item.style.display = "";

    });

    return;
}
    /* =====================================
       TÉCNICO HSE
    ===================================== */

   if (
    perfil === "técnico hse"
){

    menuItens.forEach(item => {

        item.style.display = "";

    });

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
function solicitarDemonstracao(){

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

}
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
function responderTalanguinha(){

    const pergunta =

    document.getElementById(
        "perguntaTalanguinha"
    )
    .value
    .toLowerCase();

    let resposta =
    "Desculpe, ainda não sei responder isso.";

    if(
        pergunta.includes(
            "conformidade"
        )
    ){

        resposta =

        "📊 A conformidade atual é de "

        +

        document.getElementById(
            "cardConformidade"
        ).textContent;

    }

    else if(
        pergunta.includes(
            "hht"
        )
    ){

        resposta =

        "⏱️ HHT Acumulado: "

        +

        document.getElementById(
            "hhtAcumulado"
        ).textContent;

    }

    else if(
        pergunta.includes(
            "tf"
        )
    ){

        resposta =

        "📊 Taxa de Frequência: "

        +

        document.getElementById(
            "taxaFrequencia"
        ).textContent;

    }

    else if(
        pergunta.includes(
            "tg"
        )
    ){

        resposta =

        "📊 Taxa de Gravidade: "

        +

        document.getElementById(
            "taxaGravidade"
        ).textContent;

    }

    else if(
        pergunta.includes(
            "dias"
        )
    ){

        resposta =

        "🏆 Dias sem acidente: "

        +

        document.getElementById(
            "cardDiasSemAcidente"
        ).textContent;

    }

    adicionarMensagem(
        pergunta,
        "user"
    );

    adicionarMensagem(
        resposta,
        "bot"
    );

    document.getElementById(
        "perguntaTalanguinha"
    ).value = "";

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
criarUtilizadoresDemo();

mostrarUtilizadorLogado();
aplicarPermissoes();