var modoJogo;
var tamanhoTabuleiro;
var valorJogadorDaVez = 'X';

document.getElementById("jogoForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    tamanhoTabuleiro = document.getElementById("tamanhoTabuleiro").value;
    modoJogo;
    if (document.getElementById("doisJogadores").checked) {
        modoJogo = document.getElementById("doisJogadores").value;
    } else if (document.getElementById("jogarMaquina").checked) {
        modoJogo = document.getElementById("jogarMaquina").value;
    }
    
    document.getElementById("jogadorGanhador").innerHTML = "";

    carregarTabuleiro();
});

function carregarTabuleiro(){
    let tabelaHTML = '<table id="tabuleiroJogo">'; 
    
    for(let i = 0; i < tamanhoTabuleiro; i++){
        tabelaHTML += '<tr>'; 
        for(let j = 0; j < tamanhoTabuleiro; j++){
            let celularId = `${i}${j}`; 
            tabelaHTML += `<td id="${celularId}">`; 
            tabelaHTML += '</td>'; 
        }
        tabelaHTML += '</tr>'; 
    }
    
    tabelaHTML += '</table>'; 
        
    document.getElementById("tabuleiroContainer").innerHTML = tabelaHTML;
    carregaModoJogo()
}

function carregaModoJogo(){
    if(modoJogo === 'doisJogadores'){
        carregaJogadasListener();
    } else {
        //TO-DO
    }
}

function carregaJogadasListener(){
    let cells = document.querySelectorAll('#tabuleiroJogo td');
    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            realizaJogada(cell.id);
        });
    });
}

function realizaJogada(cellId){
    let cell = document.getElementById(cellId);
    if(verificaJogadaValida(cell)){
        cell.innerHTML = valorJogadorDaVez;
        if(verificaVitoria(valorJogadorDaVez)){
            encerrarJogo();
        } else {
            mudaJogador();
        }
    }
}

function verificaJogadaValida(cell){
    if(cell.innerHTML === '') 
        return true;
    else 
        return false;
}

function mudaJogador(){
    if(valorJogadorDaVez === 'X') 
        valorJogadorDaVez = 'O'
    else 
        valorJogadorDaVez = 'X'
}

function verificaVitoria(valorJogadorDaVez){
    let vitoria = (verificaVitoriaHorizontal(valorJogadorDaVez) || verificaVitoriaVertical(valorJogadorDaVez) 
                    || verificaVitoriaDiagonalPrincipal(valorJogadorDaVez) || verificaVitoriaDiagonalSecundaria(valorJogadorDaVez));
    return vitoria;
}

function encerrarJogo(){
    let ganhador = document.getElementById("jogadorGanhador");
    ganhador.innerHTML = "Jogador " + valorJogadorDaVez + " venceu!"
}

function verificaVitoriaHorizontal(valorJogadorDaVez) {
    let vitoria;
    for (let linha = 0; linha < tamanhoTabuleiro; linha++) {
        vitoria = true;

        for (let coluna = 0; coluna < tamanhoTabuleiro; coluna++) {
            let cell = document.getElementById(linha + '' + coluna);
            if (cell.innerHTML === '' || cell.innerHTML !== valorJogadorDaVez) {
                vitoria = false;
                break; 
            }
        }
        if (vitoria) {
            return true; 
        }
    }
    return false; 
}

function verificaVitoriaVertical(valorJogadorDaVez) {
    let vitoria;
    for (let coluna = 0; coluna < tamanhoTabuleiro; coluna++) {
        vitoria = true;

        for (let linha = 0; linha < tamanhoTabuleiro; linha++) {
            let cell = document.getElementById(linha + '' + coluna);
            if (cell.innerHTML === '' || cell.innerHTML !== valorJogadorDaVez) {
                vitoria = false;
                break; 
            }
        }
        if (vitoria) {
            return true; 
        }
    }
    return false; 
}

function verificaVitoriaDiagonalPrincipal(valorJogadorDaVez) {
    let vitoria = true;
    for (let i = 0; i < tamanhoTabuleiro; i++) {
        let cell = document.getElementById(i + '' + i);
        if (cell.innerHTML !== valorJogadorDaVez) {
            vitoria = false;
            break;
        }
    }
    return vitoria;
}

function verificaVitoriaDiagonalSecundaria(valorJogadorDaVez) {
    let vitoria = true;
    for (let i = 0; i < tamanhoTabuleiro; i++) {
        let cell = document.getElementById(i + '' + (tamanhoTabuleiro - 1 - i));
        if (cell.innerHTML !== valorJogadorDaVez) {
            vitoria = false;
            break;
        }
    }
    return vitoria;
}