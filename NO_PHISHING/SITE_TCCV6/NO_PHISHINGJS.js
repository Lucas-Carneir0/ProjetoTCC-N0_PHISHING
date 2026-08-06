const titulo = "NO_PHISHING";
let i = 0;
function escreverTitulo(){
    if(i < titulo.length){
        document.getElementById("titulo").innerHTML += titulo.charAt(i);
        i++;
        setTimeout(escreverTitulo,150);
    }else{
        iniciarBoot();
    }
}

const mensagens=[
"Inicializando sistema...",
"Carregando módulos...",
"Carregando banco de dados...",
"Carregando módulos de segurança...",
"Verificando integridade...",
"OK.",
"Sistema carregado com sucesso."
];
let indice=0;
function iniciarBoot(){
    mostrarMensagem();
}

function mostrarMensagem(){
    if(indice >= mensagens.length){
        setTimeout(() => {
            entrarNoTerminal();
        },1000);
        return;
    }

    const loading = document.getElementById("loading");
    const mensagem = mensagens[indice];

    // Cria uma linha para a mensagem atual
    const linha = document.createElement("div");
    loading.appendChild(linha);

    // Mensagens que possuem "..."
    if(mensagem.endsWith("...")){
        const texto = mensagem.slice(0,-3);
        let pontos = 0;
        let voltas = 0;
        const animacao = setInterval(() =>{
            linha.textContent = texto + ".".repeat(pontos);
            pontos++;
            if(pontos > 3){
                pontos = 0;
                voltas++;
                // Quantas vezes repetir a animação
                if(voltas == 2){
                    clearInterval(animacao);
                    linha.textContent = mensagem;
                    indice++;
                    setTimeout(mostrarMensagem,400);
                }
            }
        },100); // decidi o tempo que demora para carregar rapaz
    }else{
        linha.textContent = mensagem;
        indice++;
        setTimeout(mostrarMensagem,700);
    }
}

// Verifica se o usuário desativou a intro
if(localStorage.getItem("pularIntro") === "true"){
    entrarNoTerminal();
}else{
    escreverTitulo();
}

document.getElementById("desativarIntro").addEventListener("click", () => {

    localStorage.setItem("pularIntro", "true");

    entrarNoTerminal();

});

const progresso = document.getElementById("progresso");

window.addEventListener("scroll",()=>{

    const altura =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const porcentagem =
        (window.scrollY/altura)*100;

    progresso.style.width = porcentagem+"%";

});
const botaoCRT = document.getElementById("btnCRT");

botaoCRT.addEventListener("click", () => {

    document.body.classList.toggle("sem-crt");

    if(document.body.classList.contains("sem-crt")){
        botaoCRT.textContent = "Ativar efeito CRT";
    }else{
        botaoCRT.textContent = "Desativar efeito CRT";
    }

});

document.getElementById("reativarIntro").addEventListener("click", () => {

    localStorage.removeItem("pularIntro");

    alert("A intro será exibida na próxima vez que abrir o site.");

});
const painel = document.getElementById("painelConfigs");
const abrir = document.getElementById("abrirConfigs");

abrir.addEventListener("click", () => {
    painel.classList.toggle("aberto");
});
function entrarNoTerminal(){

    document.getElementById("boot").style.display = "none";
    document.getElementById("terminal").style.display = "block";
    document.getElementById("painelConfigs").style.display = "block";

}