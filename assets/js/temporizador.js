const tempo = document.querySelector('.tempo');
const horasInput = document.querySelector('#input-tempo-horas');
const minutosInput = document.querySelector('#input-tempo-minutos');
const segundosInput = document.querySelector('#input-tempo-segundos');
const alarmeSom = document.querySelector('.som-alarme');
const iniciar = document.querySelector('#iniciar');
const parar = document.querySelector('#parar');
const reiniciar = document.querySelector('#reiniciar');

let horas = horasInput.value;
let minutos = minutosInput.value;
let segundos = segundosInput.value;
let rodaTemporizador = false;
let contagem;

function restringeInput(input, numbMaximo) {
    const numbMinimo = 0;
    let tipoInput = input;
    if (tipoInput.value >= numbMaximo) {
        tipoInput.value = numbMaximo;
    } else if (tipoInput.value <= numbMinimo) {
        tipoInput.value = numbMinimo;
    }
}

function formatarTempo(horas, minutos, segundos) {
    let horasContagem = horas < 10 ? `0${horas}` : horas;
    let segundosContagem = segundos < 10 ? `0${segundos}` : segundos;
    let minutosContagem = minutos < 10 ? `0${minutos}` : minutos;
    return `${horasContagem}:${minutosContagem}:${segundosContagem}`;
}

function tempoRestante() {
    const tempoAtual = tempo.innerHTML.split(':');
    const horasRestantes = parseInt(tempoAtual[0]);
    const minutosRestantes = parseInt(tempoAtual[1]);
    const segundosRestantes = parseInt(tempoAtual[2]);
    horasInput.value = horasRestantes;
    minutosInput.value = minutosRestantes;
    segundosInput.value = segundosRestantes;
}

function temporizador() {
    let horas = horasInput.value === '' ? 0 : horasInput.value;
    let minutos = minutosInput.value === '' ? 0 : minutosInput.value;
    let segundos = segundosInput.value === '' ? 0 : segundosInput.value;

    contagem = setInterval(() => {
        segundos--;
        if (segundos < 0) {
            minutos--;
            segundos = 59;
        }
        if (minutos < 0) {
            horas--;
            minutos = 59;
        }
        if (horas < 0) {
            clearInterval(contagem);
            tempo.innerHTML = formatarTempo(0, 0, 0);
            alarmeSom.play();

        } else {
            tempo.innerHTML = formatarTempo(horas, minutos, segundos);
        }
    }, 1000);
}

horasInput.addEventListener('input', () => {
    restringeInput(horasInput, 24);
});

minutosInput.addEventListener('input', () => {
    restringeInput(minutosInput, 59);
});

segundosInput.addEventListener('input', () => {
    restringeInput(segundosInput, 59);
});

iniciar.addEventListener('click', () => {
    if (!rodaTemporizador) {
        rodaTemporizador = true;
        temporizador();
    }
});

parar.addEventListener('click', () => {
    alarmeSom.pause();
    rodaTemporizador = false;
    clearInterval(contagem);
    tempoRestante();
});

reiniciar.addEventListener('click', () => {
    location.reload();
});

