console.log("tema.js carregado");

function alternarTema(){

    document.body.classList.toggle(
        "dark"
    );

    const botao =
    document.getElementById(
        "btnTema"
    );

    if(document.body.classList.contains("dark")){

        botao.textContent =
        "☀️ Modo Claro";

    }else{

        botao.textContent =
        "🌙 Modo Escuro";

    }

}
function alternarTema(){

    document.body.classList.toggle(
        "dark"
    );

    localStorage.setItem(

        "tema",

        document.body.classList.contains(
            "dark"
        )

        ?

        "dark"

        :

        "light"

    );

}
const temaGuardado =

localStorage.getItem(
    "tema"
);

if(
    temaGuardado ===
    "dark"
){

    document.body.classList.add(
        "dark"
    );

}
