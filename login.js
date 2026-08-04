/* ==========================================
   LOGIN
========================================== */

const formLogin =
document.getElementById(
    "formLogin"
);

if(formLogin){

    formLogin.addEventListener(

        "submit",

        e => {

            e.preventDefault();

            const email =

            document.getElementById(
                "loginEmail"
            ).value;

            const senha =

            document.getElementById(
                "loginSenha"
            ).value;

            const utilizadores =

            carregarDados(
                "utilizadores"
            ) || [];

            const utilizador =

            utilizadores.find(
                item =>

                item.email === email

                &&

                item.senha === senha
            );

            if(!utilizador){

                alert(
                    "Email ou palavra-passe inválidos."
                );

                return;

            }

            if(
                utilizador.status ===
                "Inativo"
            ){

                alert(
                    "Utilizador inativo."
                );

                return;

            }

            utilizador.ultimoAcesso =

            new Date()
            .toLocaleString();

            salvarDados(
                "utilizadores",
                utilizadores
            );
atualizarIndicadoresLogin();
            localStorage.setItem(

                "utilizadorLogado",

                JSON.stringify(
                    utilizador
                )

            );
            mostrarUtilizadorLogado();

            alert(
    `Bem-vindo ${utilizador.nome}`
);

mostrarUtilizadorLogado();

aplicarPermissoes();

mostrarModulo(
    "dashboard"
);
        }

    );

}
const formAlterarSenha =
document.getElementById(
    "formAlterarSenha"
);

if(formAlterarSenha){

    formAlterarSenha.addEventListener(

        "submit",

        e => {

            e.preventDefault();

            const utilizador =

            JSON.parse(
                localStorage.getItem(
                    "utilizadorLogado"
                )
            );

            if(!utilizador){

                alert(
                    "Faça login primeiro."
                );

                return;

            }

            const senhaAtual =
            document.getElementById(
                "senhaAtual"
            ).value;

            const novaSenha =
            document.getElementById(
                "novaSenha"
            ).value;

            const confirmarSenha =
            document.getElementById(
                "confirmarSenha"
            ).value;

            if(
                senhaAtual !==
                utilizador.senha
            ){

                alert(
                    "Senha atual incorreta."
                );

                return;

            }

            if(
                novaSenha !==
                confirmarSenha
            ){

                alert(
                    "As senhas não coincidem."
                );

                return;

            }

            const utilizadores =

            carregarDados(
                "utilizadores"
            ) || [];

            const indice =

            utilizadores.findIndex(
                item =>

                item.email ===
                utilizador.email
            );

            if(
                indice === -1
            ) return;

            utilizadores[
                indice
            ].senha =
            novaSenha;

            salvarDados(
                "utilizadores",
                utilizadores
            );

            utilizador.senha =
            novaSenha;

            localStorage.setItem(

                "utilizadorLogado",

                JSON.stringify(
                    utilizador
                )

            );

            alert(
                "Palavra-passe alterada com sucesso!"
            );

            formAlterarSenha.reset();

        }

    );

}
function atualizarIndicadoresLogin(){

    const utilizadores =

    carregarDados(
        "utilizadores"
    ) || [];

    const totalLogins =
    utilizadores.filter(
        item =>
        item.ultimoAcesso &&
        item.ultimoAcesso !== "-"
    ).length;

    document.getElementById(
        "totalLogins"
    ).textContent =
    totalLogins;

    document.getElementById(
        "utilizadoresAtivos"
    ).textContent =

    utilizadores.filter(
        item =>
        item.status ===
        "Ativo"
    ).length;

}
atualizarIndicadoresLogin();