/* ==========================================
   LOGIN
========================================== */
const utilizadorGuardado =
JSON.parse(
    localStorage.getItem(
        "utilizadorLogado"
    )
);

if(utilizadorGuardado){

    window.utilizadorAtual =
    utilizadorGuardado;

    window.empresaAtual =
    utilizadorGuardado.empresa_id;

}

const formLogin =
document.getElementById(
    "formLogin"
);

if(formLogin){

    formLogin.addEventListener(

        "submit",

        async e => {

            e.preventDefault();

            const email =
            document.getElementById(
                "loginEmail"
            ).value;

            const senha =
            document.getElementById(
                "loginSenha"
            ).value;

         const { data, error } =
await supabaseClient.auth
.signInWithPassword({

    email,

    password: senha

});

const {
    data: userData
} =
await supabaseClient.auth.getUser();

const {
    data: utilizador
} =
await supabaseClient
    .from("utilizadores")
    .select("status")
    .eq(
        "auth_user_id",
        userData.user.id
    )
    .single();

if (
    utilizador?.status ===
    "Inativo"
) {

    await supabaseClient
        .auth
        .signOut();

    alert(
        "Utilizador desativado."
    );

    return;

}

if(error){

    alert(
        "Email ou palavra-passe inválidos."
    );

    return;
}

const authUser =
data.user;



console.log(
    "UTILIZADORES:"
);

console.log(
    utilizadores
);

const {
    data: utilizadorBD,
    error: erroPerfil
}
=
await supabaseClient
.from("utilizadores")
.select("*")
.eq(
    "email",
    email
)
.single();
if(erroPerfil){

    console.error(
        erroPerfil
    );

    return;
}
if(utilizadorBD.primeiro_acesso){

    window.utilizadorAtual =
    utilizadorBD;

    document.getElementById(
        "areaAlterarSenha"
    ).style.display =
    "block";

    document.getElementById(
        "formLogin"
    ).style.display =
    "none";

    alert(
        "Primeiro acesso. É obrigatório alterar a senha."
    );

    return;
}
window.utilizadorAtual =
utilizadorBD;

window.empresaAtual =
utilizadorBD.empresa_id;


if(!utilizadorBD){

    alert(
        "Utilizador não encontrado."
    );

    return;
}
console.log(
    "UTILIZADOR BD:"
);

console.log(
    utilizadorBD
);

console.log(
    "ERRO UTILIZADOR:"
);


console.log(utilizadorBD);



          

            localStorage.setItem(

    "utilizadorLogado",

    JSON.stringify(
        utilizadorBD
    )

);
window.empresaAtual =
utilizadorBD.empresa_id;
localStorage.setItem(
    "empresaAtual",
    utilizadorBD.empresa_id
);

            alert(
                "Login efetuado com sucesso!"
            );
await supabaseClient
.from("utilizadores")
.update({

    ultimo_acesso:
    new Date().toISOString()

})
.eq(
    "id",
    utilizadorBD.id
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

        async e => {

            e.preventDefault();

            const novaSenha =
            document.getElementById(
                "novaSenha"
            ).value;

            const confirmarSenha =
            document.getElementById(
                "confirmarSenha"
            ).value;
            const senhaAtual =
document.getElementById(
    "senhaAtual"
).value;
const email =
window.utilizadorAtual.email;
const {
    error: erroSenhaAtual
} =
await supabaseClient.auth.signInWithPassword({

    email,

    password: senhaAtual

});
if(erroSenhaAtual){

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

            const {
                error
            } =
            await supabaseClient
            .auth
            .updateUser({

                password:
                novaSenha

            });
            document.getElementById(
    "areaAlterarSenha"
).style.display =
"none";
mostrarModulo(
    "dashboard"
);
            await supabaseClient
.from("utilizadores")
.update({
    primeiro_acesso: false
})


.eq(
    "id",
    window.utilizadorAtual.id
);

document.getElementById(
    "areaAlterarSenha"
).style.display =
"none";

document.getElementById(
    "formLogin"
).style.display =
"block";

mostrarModulo(
    "dashboard"
);


            if(error){

                console.error(error);

                alert(
                    "Erro ao alterar palavra-passe."
                );

                return;

            }

            alert(
                "Palavra-passe alterada com sucesso!"
            );

            formAlterarSenha.reset();

        }

    );

}
async function atualizarIndicadoresLogin(){
    if(!window.empresaAtual){
return;}

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

    document.getElementById(
        "totalLogins"
    ).textContent =

    data.filter(
        item =>
        item.ultimo_acesso
    ).length;

    document.getElementById(
        "utilizadoresAtivos"
    ).textContent =

    data.filter(
        item =>
        item.status === "Ativo"
    ).length;

}
atualizarIndicadoresLogin();