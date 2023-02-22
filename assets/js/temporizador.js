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

let limite = 0;
let contagem;
tocar = false



function restringeInput(input, numbMaximo) {
    const numbMinimo = 0
    let tipoInput = input
    if (tipoInput.value >= numbMaximo) {
        tipoInput.value = numbMaximo
    } else if (tipoInput.value <= numbMinimo){
        tipoInput.value = numbMinimo
    }
}

function formatarTempo(horas, minutos, segundos) {
    let horasContagem = horas < 10 ? `0${horas}` : horas;
    let segundosContagem = segundos < 10 ? `0${segundos}` : segundos;
    let minutosContagem = minutos < 10 ? `0${minutos}` : minutos;
    return `${horasContagem}:${minutosContagem}:${segundosContagem}`;
}

function temporizador() {
    let horas = horasInput.value === '' ? 0 : horasInput.value;
    let minutos = minutosInput.value === '' ? 0 : minutosInput.value;
    let segundos = segundosInput.value === '' ? 0 : segundosInput.value;

    let contagem = setInterval(function () {
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
            tempo.innerHTML = formatarTempo(0, 0, 0)
            alarmeSom.play()

        } else {
            tempo.innerHTML = formatarTempo(horas, minutos, segundos);
        }
    }, 1000);
}




horasInput.addEventListener('input', function(e){
    restringeInput(horasInput, 24);

    
});

minutosInput.addEventListener('input', function(e){
    restringeInput(minutosInput, 59);
    
});

segundosInput.addEventListener('input', function(e){
    restringeInput(segundosInput, 59);
    
});

iniciar.addEventListener('click', function () {
    limite += 1;
    if (limite === 1) {
        return temporizador();
    }

});

parar.addEventListener('click', function(){
    alarmeSom.pause();
    limite = 0;
    clearInterval(contagem);
});


reiniciar.addEventListener('click', function(){
    location.reload();
});

