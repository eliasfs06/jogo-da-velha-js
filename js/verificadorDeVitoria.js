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