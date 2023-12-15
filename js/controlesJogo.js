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
    let cells = document.querySelectorAll('#tabuleiroJogo td');
    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            realizaJogada(cell.id);
        });
    });
}

function carregaModoJogoDoisJogadores(){
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
            if(modoJogo == 'jogarMaquina'){
                setTimeout(function() {
                    realizaJogadaMaquina();
                }, 1000); 
            }
        }
    }

}

function realizaJogadaMaquina(){
    let maquinaJogou = false;

    function numeroAleatorio(max) {
        return Math.floor(Math.random() * max);
    }

    while (!maquinaJogou) {
        let linha = numeroAleatorio(tamanhoTabuleiro);
        let coluna = numeroAleatorio(tamanhoTabuleiro);
        let cell = document.getElementById(linha + '' + coluna);

        if (cell.innerHTML === '') {
            cell.innerHTML = valorJogadorDaVez;
            maquinaJogou = true;
            break;
        }
    }

    if(verificaVitoria(valorJogadorDaVez)){
        encerrarJogo();
    } else {
        mudaJogador();
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

