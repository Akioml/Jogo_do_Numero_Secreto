let listaDeNumeros = []
let maximoTentativa = 5
let numeroSecreto = numeroAleatorio()
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2})
}
function exibirMensagemInicial(){
    exibirTextoNaTela ('h1', 'Jogo do número secreto')
    exibirTextoNaTela('p','Escolha um numéro entre 0 e 10')
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou')
        exibirTextoNaTela('p','Você descobriu o número secreto!')

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativa = `Você descobriu o número secreto com  ${tentativas} ${palavraTentativa}`

        exibirTextoNaTela('p',mensagemTentativa)
        document.getElementById('reiniciar').removeAttribute('disabled')
        limparCampo()

    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor')
        } else{
            exibirTextoNaTela('p','O número secreto é maior')
        }
        tentativas++
        limparCampo()
    }

}

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * maximoTentativa + 1)
    let quantidadeElementos = listaDeNumeros.length

    if(quantidadeElementos == maximoTentativa){
        listaDeNumeros = []
    }

    if(listaDeNumeros.includes(numeroEscolhido)){
        return numeroAleatorio()
    } else {
        listaDeNumeros.push(numeroEscolhido)
        console.log(listaDeNumeros)
        return numeroEscolhido
    }
}

function limparCampo(){
    chute = document.querySelector('input')
    chute.value = ''
}

function reiniciarJogo(){
    numeroSecreto = numeroAleatorio()
    limparCampo()
    tentativas = 1
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true)
}