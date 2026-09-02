const baseConhecimentoTalanga = [

{
    palavras:[
        "hht",
        "registrar hht",
        "registar hht",
        "como faço hht"
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
• Subcontratada

4. Preencha os efetivos diários.

5. Clique em:

✅ Registar Semana HHT

`
},

{
    palavras:[
        "aso",
        "registrar aso",
        "registar aso"
    ],

    resposta:`

🩺 REGISTO DE ASO

1. Aceda ao módulo Saúde Ocupacional.

2. Abra Gestão de ASO.

3. Selecione o colaborador.

4. Informe:

• Tipo de exame
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

🦺 DDS ELECTRÓNICO

1. Aceda ao módulo DDS.

2. Informe:

• Tema
• Data
• Responsável

3. Registe os participantes.

4. Grave o DDS.

`
},

{
    palavras:[
        "epi",
        "solicitar epi"
    ],

    resposta:`

🧤 SOLICITAÇÃO DE EPI

1. Aceda à Gestão de EPI.

2. Leia o QR Code do colaborador.

3. Escolha o EPI.

4. Informe a quantidade.

5. Clique em Solicitar.

`
},

{
    palavras:[
        "gt",
        "gt engenharia",
        "quem criou o talanga"
    ],

    resposta:`

🏢 TALANGA HSE

O Talanga HSE foi desenvolvido
pelo Engenheiro Graciano de Jesus Tshifua e atribuido os direitos autorais a GT Engenharia e Serviços empresa que ele é fundador e CO.

O objetivo é digitalizar a gestão
de Saúde, Segurança e Ambiente
numa única plataforma integrada.

📧 gtengenhariaservicos@gmail.com

📞 +244 921 630 180

`
},

{
    palavras:[
        "comprar",
        "adquirir",
        "demonstração"
    ],

    resposta:`

🚀 AQUISIÇÃO

Pode solicitar uma demonstração
através do botão:

✅ Solicitar Demonstração

ou contactar:

📧 gtengenhariaservicos@gmail.com

📞 +244 921 630 180

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