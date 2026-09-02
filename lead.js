const formLead =
document.getElementById(
    "formLead"
);

if(formLead){

    formLead.addEventListener(

        "submit",

        async e => {

            e.preventDefault();

            const { error } =

            await supabaseClient

            .from("leads")

            .insert([{

                nome:
                document.getElementById(
                    "leadNome"
                ).value,

                empresa:
                document.getElementById(
                    "leadEmpresa"
                ).value,

                email:
                document.getElementById(
                    "leadEmail"
                ).value,

                telefone:
                document.getElementById(
                    "leadTelefone"
                ).value,

                sector:
                document.getElementById(
                    "leadSector"
                ).value,

                colaboradores:
                Number(
                    document.getElementById(
                        "leadColaboradores"
                    ).value
                ),

                mensagem:
                document.getElementById(
                    "leadMensagem"
                ).value

            }]);

            if(error){

                console.error(error);

                alert(
                    "Erro ao enviar."
                );

                return;

            }

            alert(
                "Pedido enviado com sucesso."
            );

            fecharModalLead();

            formLead.reset();

        }

    );

}