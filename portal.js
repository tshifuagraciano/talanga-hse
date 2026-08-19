let colaboradorPortal = null;
window.onload = async function(){

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

const {
    data: asoColaborador,
    error: erroASO
} =
await supabaseClient
.from("asos")
.select("*")
.eq(
    "colaborador_id",
    colaboradorPortal.id
)
.order(
    "validade",
    {
        ascending:false
    }
)
.limit(1)
.single();

if(erroASO){
    console.error(
        "ERRO ASO:",
        erroASO
    );
}

console.log(
    "ASO:",
    asoColaborador
);
const {
    data: treinamentos,
    error: erroTreinamentos
} =
await supabaseClient
.from("treinamentos")
.select("*")
.eq(
    "colaborador_id",
    colaboradorPortal.id
);
console.log(
    "TREINAMENTOS:",
    treinamentos
);

if(erroTreinamentos){

    console.error(
        "ERRO TREINAMENTOS:",
        erroTreinamentos
    );
}

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
treinamentos || [];


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
async function enviarSolicitacaoPortal(){

    const solicitacao = {

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
        Number(
            document.getElementById(
                "quantidadePortal"
            ).value
        ),

        motivo:
        document.getElementById(
            "motivoPortal"
        ).value,

        status:
        "Pendente"
    };

    const { error } =
    await supabaseClient
    .from("epi_solicitacoes")
    .insert([{

        colaborador:
        solicitacao.colaborador,

        matricula:
        solicitacao.matricula,

        empresa:
        solicitacao.empresa,

        funcao:
        solicitacao.funcao,

        epi:
        solicitacao.epi,

        quantidade:
        solicitacao.quantidade,

        motivo:
        solicitacao.motivo,

        status:
        solicitacao.status

    }]);

    if(error){

        console.error(error);

        alert(
            "Erro ao enviar solicitação."
        );

        return;
    }

    alert(
        "✅ Solicitação enviada com sucesso!"
    );
}
const btnHistoricoEPI =
document.getElementById(
    "btnHistoricoEPI"
);

if(btnHistoricoEPI){

    btnHistoricoEPI.addEventListener(
    "click",
    async () => {

            const { data, error } =
await supabaseClient
.from("epi_solicitacoes")
.select("*")
.eq(
    "matricula",
    colaboradorPortal.matricula
);

if(error){

    console.error(error);

    return;
}

const solicitacoes =
data || [];

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
                                  ${new Date(
    item.data_solicitacao
).toLocaleDateString(
    "pt-PT"
)}
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

        async () => {

           const {
    data: ddsAtivos,
    error
} =
await supabaseClient
.from("dds")
.select("*")
.order(
    "data_dds",
    {
        ascending:false
    }
);

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
ddsAtivos[0];

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
                    ${dds.data_dds}
                </p>

                <p>
                    <strong>Responsável:</strong>
                    ${dds.responsavel}
                </p>

                <button
                    onclick="registrarParticipacaoDDS('${dds.id}')"
                >
                    ✅ Registrar Participação
                </button>

            `;

        }

    );

}
async function registrarParticipacaoDDS(idDDS){

    const { data: participacoes, error } =
    await supabaseClient
    .from("dds_participantes")
    .select("*")
    .eq(
        "dds_id",
        idDDS
    )
    .eq(
        "matricula",
        colaboradorPortal.matricula
    );

    if(error){

        console.error(error);

        return;
    }

    if(
        participacoes.length > 0
    ){

        alert(
            "Você já participou deste DDS."
        );

        return;
    }

    const { error: erroInsert } =
    await supabaseClient
    .from("dds_participantes")
    .insert([{

        dds_id:
        idDDS,

        matricula:
        colaboradorPortal.matricula,

        colaborador:
        colaboradorPortal.nome,

        empresa:
        colaboradorPortal.empresa

    }]);

    if(erroInsert){

        console.error(
            erroInsert
        );

        alert(
            "Erro ao registrar participação."
        );

        return;
    }

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

    alert("A enviar...");
    console.log(supabaseClient);

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
                                    ${new Date(
    item.created_at
).toLocaleString(
    "pt-PT"
)}
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
