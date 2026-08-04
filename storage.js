console.log("storage.js carregado");
/* ==========================================
   LOCAL STORAGE
========================================== */


function salvarDados(chave, dados) {
    localStorage.setItem(
        chave,
        JSON.stringify(dados)
    );
}

function carregarDados(chave) {
    return JSON.parse(
        localStorage.getItem(chave)
    ) || [];
}

