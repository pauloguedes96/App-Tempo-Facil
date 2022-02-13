document.addEventListener('DOMContentLoaded', () => {

    cidade = 'Riachinho';
    buscaDados();
});

let cidade = null;
let cidadeEx = null;
let pais = null;
let icon = null;
let clima = null;
let temp_main = null;
let temp_min = null;
let temp_max = null;
let umidade = null;
let tempoRes = null;

function recebeDados() {
    //zera timeout
    clearTimeout(tempoRes);

    tempoRes = setTimeout(() => {

        cidade = document.querySelector('#search').value;
        buscaDados();
    }, 2000);
}

async function buscaDados() {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=4e4c1789138cda089948e551ba82a25d&lang=pt_br&units=metric`;

    try {

        let dados = await fetch(url);
        let dadosJson = await dados.json();

        if (dadosJson.cod == 404) {
            throw 'Inexistente no DB'
        }

        if (dadosJson.cod == 400) {
            throw 'Campo cidade não Preenchido'
        }

        icon = dadosJson.weather[0].icon;
        temp_main = dadosJson.main.temp;
        clima = dadosJson.weather[0].description;
        cidadeEx = dadosJson.name;
        pais = dadosJson.sys.country;
        temp_min = dadosJson.main.temp_min;
        temp_max = dadosJson.main.temp_max;
        umidade = dadosJson.main.humidity;

        exibirDados();

    } catch (error) {

        lancaErro(error);
        console.log('Houve um erro: ' + error);
    }
}

function exibirDados() {

    document.querySelector('#iconClima').src =
        `http://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('#tempMain').innerHTML = `${temp_main} °C`;
    document.querySelector('#clima').innerHTML = `${clima}`;
    document.querySelector('#cidade').innerHTML = `${cidadeEx},${pais}`;
    document.querySelector('#temp_min').innerHTML = `Min: ${temp_min} °C`;
    document.querySelector('#temp_max').innerHTML = `Max: ${temp_max} °C`;
    document.querySelector('#humidity').innerHTML = `${umidade}%`;
}

function lancaErro(error) {

    document.querySelector('#tempMain').innerHTML = `Erro`;
    document.querySelector('#cidade').innerHTML = `${error}`;
    document.querySelector('#iconClima').src = ``;
    document.querySelector('#clima').innerHTML = ``;
    document.querySelector('#temp_min').innerHTML = `Min: °C`;
    document.querySelector('#temp_max').innerHTML = `Max: °C`;
    document.querySelector('#humidity').innerHTML = ` %`;
}