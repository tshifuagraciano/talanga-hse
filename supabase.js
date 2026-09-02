console.log("SUPABASE CARREGADO");

const SUPABASE_URL =
"https://phtxaeswfsphuopyjteu.supabase.co";

const SUPABASE_KEY =
"sb_publishable_tLHoMBxNI3W6baCjHyhXUw_alv4DWdi";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.utilizadorAtual =
JSON.parse(
    localStorage.getItem(
        "utilizadorLogado"
    )
);

if(window.utilizadorAtual){

    window.empresaAtual =
    window.utilizadorAtual.empresa_id;

}

if(utilizadorGuardado){

    window.utilizadorAtual =
    utilizadorGuardado;

    window.empresaAtual =
    utilizadorGuardado.empresa_id;

}

async function testarSupabase(){
    

    const { data, error } =
    await supabaseClient
    .from("colaboradores")
.select("*")
.eq(
    "empresa_id",
    window.empresaAtual
);

    console.log("DADOS:");
    console.log(data);

    console.log("ERRO:");
    console.log(error);

}

testarSupabase();