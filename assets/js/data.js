const horaHTML = document.querySelector('.tempo');
const dataHTML = document.querySelector('.data');

let segundos = new Date().getSeconds();
let minutos = new Date().getMinutes();
let horas = new Date().getHours();

const hora = `${horas}:${minutos}:${segundos}`;
const data = new Date().toLocaleDateString('pt-BR');


function inserirHorario () {
    horaHTML.innerHTML = hora;
    dataHTML.innerHTML = data;
    contagemHoras()
}

function criaHorario(horas, minutos, segundos) {
    return `${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`
}

function contagemHoras() {
    contagem = setInterval(function() {
            segundos++;
            if (segundos === 60) {
                segundos = 0;
                minutos++;
            }
            if (minutos === 60) {
                minutos = 0;
                horas++;
            }
            horaHTML.innerHTML = criaHorario(horas, minutos, segundos);
    }, 1000);
}

inserirHorario()

