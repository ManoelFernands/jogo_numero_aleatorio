let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela(".texto__paragrafo", "Escolha um número entre 1 e 10");    
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector("input").value;
   console.log(numeroSecreto)
    if ( chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Você acertou!!");
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = (`Você descobriu o número secreto em ${tentativas} ${palavraTentativas}!`)
        exibirTextoNaTela(".texto__paragrafo", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute ("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela(".texto__paragrafo", "O número secreto é menor!");
        } else {
            exibirTextoNaTela(".texto__paragrafo", "O número secreto é maior!"); 
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}
