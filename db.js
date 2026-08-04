let db;

const request =
indexedDB.open(
    "TalangaHSE",
    1
);

request.onupgradeneeded =
e => {

    db =
    e.target.result;

    if(

        !db.objectStoreNames.contains(
            "evidencias"
        )

    ){

        db.createObjectStore(

            "evidencias",

            {

                keyPath:"id",

                autoIncrement:true

            }

        );

    }

};

request.onsuccess =
e => {

    db =
    e.target.result;

    console.log(
        "IndexedDB iniciado"
    );

    if(
        typeof atualizarOcorrencias ===
        "function"
    ){

        atualizarOcorrencias();

    }

};


request.onerror =
e => {

    console.error(
        "Erro IndexedDB",
        e
    );

};
function salvarEvidencia(
    fotoProblema,
    fotoSolucao
){

    return new Promise(
        (resolve, reject) => {

            if(!db){

                reject(
                    "IndexedDB ainda não iniciado."
                );

                return;

            }

            const transacao =
            db.transaction(
                ["evidencias"],
                "readwrite"
            );

            const store =
            transacao.objectStore(
                "evidencias"
            );

            const pedido =
            store.add({

                fotoProblema,
                fotoSolucao

            });

            pedido.onsuccess =
            () => resolve(
                pedido.result
            );

            pedido.onerror =
            erro => reject(
                erro
            );

        }
    );

}


function obterEvidencia(id){

    return new Promise(
        (resolve, reject) => {

            if(!db){

                resolve(null);
                return;

            }

            const transacao =
            db.transaction(
                ["evidencias"],
                "readonly"
            );

            const store =
            transacao.objectStore(
                "evidencias"
            );

            const pedido =
            store.get(id);

            pedido.onsuccess =
            () => resolve(
                pedido.result
            );

            pedido.onerror =
            erro => reject(
                erro
            );

        }
    );

}