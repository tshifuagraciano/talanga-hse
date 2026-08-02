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
