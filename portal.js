let colaboradorPortal = null;
window.onload = function(){
const parametros =
new URLSearchParams(
    window.location.search
);

const matricula =
parametros.get(
    "matricula"
);

const { data, error } =
await supabaseClient
.from("colaboradores")
.select("*")
.eq(
    "matricula",
    matricula
)
.single();

colaboradorPortal = data;

const dados =
document.getElementById(
    "dadosColaborador"
);

const asos =
JSON.parse(
    localStorage.getItem(
        "asos"
    )
) || [];

const treinamentos =
JSON.parse(
    localStorage.getItem(
        "treinamentos"
    )
) || [];

const asoColaborador =
asos.find(
    item =>
    item.colaborador ===
    colaboradorPortal.nome
);

let htmlASO =
"⚪ ASO não encontrado";

if(asoColaborador){

    const hoje =
    new Date();

    const validade =
    new Date(
        asoColaborador.validade
    );

    const diasRestantes =

    Math.ceil(

        (
            validade - hoje
        ) /

        (
            1000 *
            60 *
            60 *
            24
        )

    );

    if(diasRestantes < 0){

        htmlASO =

        `🔴 Vencido
        (${asoColaborador.validade})`;

    }
    else if(diasRestantes <= 30){

        htmlASO =

        `🟡 Vence em
        ${diasRestantes} dias
        (${asoColaborador.validade})`;

    }
    else{

        htmlASO =

        `✅ Válido até
        ${asoColaborador.validade}`;

    }

}

const treinamentosColaborador =

treinamentos.filter(
    item =>

    item.colaborador ===

    colaboradorPortal.nome
);

let htmlTreinamentos = "";

if(
    treinamentosColaborador.length === 0
){

    htmlTreinamentos =

    "<p>⚪ Nenhum treinamento registado</p>";

}
else{

    treinamentosColaborador.forEach(
        treinamento => {

            const hoje =
            new Date();

            const validade =
            new Date(
                treinamento.validade
            );

            const diasRestantes =

            Math.ceil(

                (
                    validade - hoje
                ) /

                (
                    1000 *
                    60 *
                    60 *
                    24
                )

            );

            let status = "✅";

            if(diasRestantes < 0){

                status = "🔴";

            }
            else if(
                diasRestantes <= 30
            ){

                status = "🟡";

            }

            htmlTreinamentos += `

                <p>

                    ${status}
                    ${treinamento.tipo}

                    <br>

                    Validade:
                    ${treinamento.validade}

                </p>

            `;

        }
    );

}

if(colaboradorPortal){

    dados.innerHTML = `

        <h2>

            👤
            ${colaboradorPortal.nome}

        </h2>

        <p>

            🔢 Matrícula:
            ${colaboradorPortal.matricula}

        </p>

        <p>

            🏢 Empresa:
            ${colaboradorPortal.empresa}

        </p>

        <p>

            💼 Função:
            ${colaboradorPortal.funcao}

        </p>

        <hr>

        <h3>

            🩺 ASO

        </h3>

        <p>

            ${htmlASO}

        </p>

        <hr>

        <h3>

            🎓 Treinamentos

        </h3>

        ${htmlTreinamentos}

    `;

}
    const btnSolicitarEPI =
    document.getElementById(
        "btnSolicitarEPI"
    );
console.log(
    "COLABORADOR PORTAL:",
    colaboradorPortal
);
    console.log(
        "BOTAO:",
        btnSolicitarEPI
    );

    btnSolicitarEPI.addEventListener(

        "click",

        () => {
const listaEPIs = [

    "Capacete de Segurança",
    "Capacete Classe B",
    "Capacete para Trabalho em Altura",
    "Óculos de Segurança Incolor",
    "Óculos de Segurança Fumado",
    "Protetor Facial",
    "Protetor Auricular Plug",
    "Protetor Auricular Concha",
    "Respirador PFF2",
    "Respirador PFF3",
    "Luva de Raspa",
    "Luva de Vaqueta",
    "Luva Anticorte",
    "Luva Nitrílica",
    "Botina de Segurança",
    "Bota de Borracha",
    "Colete Refletivo",
    "Macacão",
    "Vestimenta Antichama",
    "Cinturão Paraquedista",
    "Talabarte Duplo",
    "Trava-Quedas",
    "Colete Salva-Vidas",
    "Detector Multigás",
    "Lanterna de Segurança"

];

const opcoesEPI =

listaEPIs.map(
    epi =>

    `<option>${epi}</option>`

).join("");
            document.getElementById(
                "conteudoPortal")
            

                
            .innerHTML = `

                <h3>
                    🦺 Solicitação de EPI
                </h3>
<select id="epiPortal">

    ${opcoesEPI}

</select>
                
                <br><br>

                <input
                    type="number"
                    id="quantidadePortal"
                    placeholder="Quantidade"
                    min="1"
                >

                <br><br>

                <select id="motivoPortal">

                    <option>
                        Troca por Desgaste
                    </option>

                    <option>
                        Troca por Danificação
                    </option>

                    <option>
                        Perda
                    </option>

                    <option>
                        Reposição
                    </option>

                </select>

                <br><br>

                <button
                    onclick="
                        enviarSolicitacaoPortal()
                    "
                >
                    Enviar Solicitação
                </button>

            `;

        }

    );

};
function enviarSolicitacaoPortal(){

    console.log(
        "ENVIANDO SOLICITACAO"
    );

    const solicitacoesEPI =
    JSON.parse(
        localStorage.getItem(
            "solicitacoesEPI"
        )
    ) || [];

    const solicitacao = {

        data:
        new Date().toISOString(),

        colaborador:
        colaboradorPortal.nome,

        matricula:
        colaboradorPortal.matricula,

        empresa:
        colaboradorPortal.empresa,

        funcao:
        colaboradorPortal.funcao,

        epi:
        document.getElementById(
            "epiPortal"
        ).value,

        quantidade:
        document.getElementById(
            "quantidadePortal"
        ).value,

        motivo:
        document.getElementById(
            "motivoPortal"
        ).value,

        status:
        "Pendente"

    };

    solicitacoesEPI.push(
        solicitacao
    );

    localStorage.setItem(
        "solicitacoesEPI",
        JSON.stringify(
            solicitacoesEPI
        )
    );

    alert(
        "Solicitação enviada com sucesso!"
    );

}
const btnHistoricoEPI =
document.getElementById(
    "btnHistoricoEPI"
);

if(btnHistoricoEPI){

    btnHistoricoEPI.addEventListener(

        "click",

        () => {

            const solicitacoes =

            JSON.parse(
                localStorage.getItem(
                    "solicitacoesEPI"
                )
            ) || [];

            const historico =

            solicitacoes.filter(
                item =>

                item.matricula ==
                colaboradorPortal.matricula
            );

            let html = `

                <h3>
                    📋 Meu Histórico EPI
                </h3>

            `;

            if(
                historico.length === 0
            ){

                html += `
                    <p>
                        Nenhuma solicitação encontrada.
                    </p>
                `;

            }
            else{

                historico.forEach(
                    item => {

                        html += `

                            <div
                                class="card-historico"
                            >

                                <p>
                                    📅
                                    ${new Date(item.data)
                                    .toLocaleDateString("pt-PT")}
                                </p>

                                <p>
                                    🦺
                                    ${item.epi}
                                </p>

                                <p>
                                    📦 Quantidade:
                                    ${item.quantidade}
                                </p>

                                <p>
                                    ${item.status}
                                </p>

                            </div>

                            <hr>

                        `;

                    }
                );

            }

            document.getElementById(
                "conteudoPortal"
            ).innerHTML =
            html;

        }

    );

}
const btnDDS =
document.getElementById(
    "btnDDS"
);

if(btnDDS){

    btnDDS.addEventListener(

        "click",

        () => {

            const ddsAtivos =

            JSON.parse(
                localStorage.getItem(
                    "ddsAtivos"
                )
            ) || [];

            if(
                ddsAtivos.length === 0
            ){

                document.getElementById(
                    "conteudoPortal"
                ).innerHTML = `

                    <h3>
                        📢 DDS Eletrônico
                    </h3>

                    <p>
                        Nenhum DDS disponível.
                    </p>

                `;

                return;

            }

            const dds =
            ddsAtivos[
                ddsAtivos.length - 1
            ];

            document.getElementById(
                "conteudoPortal"
            ).innerHTML = `

                <h3>
                    📢 DDS Eletrônico
                </h3>

                <p>
                    <strong>Tema:</strong>
                    ${dds.tema}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${dds.data}
                </p>

                <p>
                    <strong>Responsável:</strong>
                    ${dds.responsavel}
                </p>

                <button
                    onclick="
                        registrarParticipacaoDDS(
                            ${dds.id}
                        )
                    "
                >
                    ✅ Registrar Participação
                </button>

            `;

        }

    );

}
function registrarParticipacaoDDS(idDDS){

    const ddsAtivos =

    JSON.parse(
        localStorage.getItem(
            "ddsAtivos"
        )
    ) || [];

    const dds =
    ddsAtivos.find(
        item =>
        item.id === idDDS
    );

    if(!dds){

        alert(
            "DDS não encontrado."
        );

        return;

    }

    const jaParticipou =

    dds.participantes.some(
        participante =>

        participante.matricula ===

        colaboradorPortal.matricula
    );

    if(jaParticipou){

        alert(
            "Você já participou deste DDS."
        );

        return;

    }

    dds.participantes.push({

        matricula:
        colaboradorPortal.matricula,

        nome:
        colaboradorPortal.nome,

        empresa:
        colaboradorPortal.empresa

    });

    localStorage.setItem(

        "ddsAtivos",

        JSON.stringify(
            ddsAtivos
        )

    );

    alert(
        "✅ Participação registada com sucesso!"
    );

}
const btnFalaTalanga =
document.getElementById(
    "btnFalaTalanga"
);

if(btnFalaTalanga){

    btnFalaTalanga.addEventListener(

        "click",

        () => {

            document.getElementById(
                "conteudoPortal"
            ).innerHTML = `

                <h3>
                    🗣️ Fala Talanga
                </h3>

               <select
    id="tipoFalaTalanga"
>

    <option>
        Sugestão
    </option>

    <option>
        Reclamação
    </option>

    <option>
        Denúncia
    </option>

    <option>
        Elogio
    </option>

    <option>
        Observação
    </option>

</select>

                <br><br>

                <textarea
                    id="mensagemFalaTalanga"
                    placeholder="Descreva sua mensagem"
                    rows="6"
                ></textarea>

                <br><br>

                <button
                    onclick="
                        enviarFalaTalanga()
                    "
                >
                    Enviar
                </button>

            `;

        }

    );

}
async function enviarFalaTalanga(){

    const novoRegistro = {

        colaborador:
        colaboradorPortal.nome,

        matricula:
        colaboradorPortal.matricula,

        empresa:
        colaboradorPortal.empresa,

        funcao:
        colaboradorPortal.funcao,

        tipo:
        document.getElementById(
            "tipoFalaTalanga"
        ).value,

        mensagem:
        document.getElementById(
            "mensagemFalaTalanga"
        ).value,

        status:
        "Aberto",

        resposta:
        ""

    };

    const { error } =
    await supabaseClient
    .from("fala_talanga")
    .insert([{

        colaborador:
        novoRegistro.colaborador,

        matricula:
        novoRegistro.matricula,

        empresa:
        novoRegistro.empresa,

        funcao:
        novoRegistro.funcao,

        tipo:
        novoRegistro.tipo,

        mensagem:
        novoRegistro.mensagem,

        status:
        novoRegistro.status,

        resposta:
        novoRegistro.resposta

    }]);

    if(error){

        console.error(error);

        alert(
            "Erro ao enviar mensagem."
        );

        return;
    }

    alert(
        "✅ Mensagem enviada com sucesso!"
    );

}
const btnMinhasMensagens =
document.getElementById(
    "btnMinhasMensagens"
);

if(btnMinhasMensagens){

    btnMinhasMensagens
.addEventListener(
    "click",
    async () => {


           const { data, error } =
await supabaseClient
.from("fala_talanga")
.select("*");

if(error){

    console.error(error);

    return;
}

const mensagens =
data || [];

            const minhasMensagens =

            mensagens.filter(
                item =>

                item.matricula ===

                colaboradorPortal.matricula
            );

            let html = `

                <h3>
                    📨 Minhas Mensagens
                </h3>

            `;

            if(
                minhasMensagens.length === 0
            ){

                html += `

                    <p>
                        Nenhuma mensagem encontrada.
                    </p>

                `;

            }
            else{

                minhasMensagens.forEach(
                    item => {

                        html += `

                            <div
                                class="card-historico"
                            >

                                <p>

                                    📅
                                    ${item.data}

                                </p>

                                <p>

                                    📌 Tipo:
                                    ${item.tipo}

                                </p>

                                <p>

                                    💬 Mensagem:
                                    ${item.mensagem}

                                </p>

                                <p>

                                    📊 Status:
                                    ${item.status}

                                </p>

                                <p>

                                    📝 Resposta:
                                    ${item.resposta || "Sem resposta"}

                                </p>

                            </div>

                            <hr>

                        `;

                    }
                );

            }

            document.getElementById(
                "conteudoPortal"
            ).innerHTML =
            html;

        }

    );

}