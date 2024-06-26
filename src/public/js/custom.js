const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Juneho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", 
"Quinta-feira", "Sexta-feira", "Sábado"];

function getWeather(params) {
    const apiChave = '8640e4d89b6671d0a02afe035bee1c39';
 
    const cidade = document.getElementById("idPesquisa").value;

    if (!cidade) {
        alert('Por favor digite o nome da cidade na barra de pesquisa');
        return ;
    }
    
    const currentClimaURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiChave}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiChave}`;

    fetch(currentClimaURL).then(response => response.json()).then(data => {
        displayWeather(data);
    }).catch(erro => {
        console.log('Erro no fetch Clima corrente', erro);
        alert('Erro no fetch Clima corrente. Por favor tente novamente');
    });

    fetch(forecastURL).then(response => response.json()).then(data => {
        displayHourlyForecast(data.list);
    }).catch(erro => {
        console.log('Erro no fetch forecast Horario', erro);
        alert('Erro no fetch forecast horario. Por favor tente novamente');
    });

}

function displayWeather(data) {

    const nomeC = document.getElementById('nome_cidade');
    const temper = document.getElementById('temperatura');
    const dataInfo = document.getElementById('data-info');
    const weatherImage= document.getElementById('w-img');
    const weatherInfoDiv = document.getElementById('weather-info');
    const btem = document.getElementById('tem');
    const bven = document.getElementById('ven');
    const bhum = document.getElementById('hum');

    weatherInfoDiv.innerHTML = '';

    if(data.cod === '404')
    {
        weatherInfoDiv.innerHTML = `<span>${data.message}</span>`;
    }
    else
    {
        const nomeCidade = data.name +", "+ data.sys.country;
        const temperatura = Math.round(data.main.temp - 273.15);
        const dateTime = new Date(data.dt * 1000);   
        const hora = dateTime.getHours();
        const mes = dateTime.getMonth();
        const dia = dateTime.getDate();
        const min = dateTime.getMinutes();
        const weekDay = dateTime.getUTCDay();
        const descricao =  data.weather[0].description;
        const iconCode = data.weather[0].icon;

        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperaturaHTML = `<span>${temperatura}&deg;C</span>`;
        const weatherHTML = `<span>${nomeCidade}</span><br><span>${descricao}</span>`;

        nomeC.innerText = nomeCidade;
        temper.innerHTML= temperatura+"&deg;"+"C";
        weatherInfoDiv.innerHTML = weatherHTML;
        dataInfo.innerHTML = dia+" "+monthNames[mes]+", "+diasSemana[weekDay]+" "+hora+":"+min;
        weatherImage.src=iconURL;
        bven.innerHTML = data.wind.speed+" km/h";
        btem.innerHTML = temperatura+"&deg;C";
        bhum.innerHTML = data.main.humidity+"%";

        console.log(monthNames[mes]);

        weatherImage.alt = descricao;
        showImage();
    }
    
}

const itemPrincipal = document.getElementById('diasShowen');

function displayDailyForecast(hourlyData) {

    const dailyForecastDiv = document.getElementsByClassName('semanal');
    const next24Hours = hourlyData.slice(0, 3);

    next24Hours.forEach(element => {
        const dateTime = new Date(element.dt * 1000);
        const nomeDia =new Date(element.dt * 1000).toLocaleDateString("pt",
    {
        weekday:"long",
    }) 
    
    const mes =dateTime.getMonth();
    const dia = dateTime.getDate();
    const min = dateTime.getMinutes();
    const weekDay = dateTime.getUTCDay();  
        //const hora = dateTime.getHours();
        const temperatura = Math.round(element.main.temp - 273.15);
        const descricao =  element.weather[0].description;

        const iconCode = element.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const dailyItemHtml = `<div class="dias">
        <div class="dias_top">
            <h1>${weekDay}</h1>
            <span>${dia} de${monthNames[mes]}</span>
        </div>
        <div class="dias_middle">
            <div class="imagem">
                <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${descricao}"> 
            </div>
        </div>
        <div class="dias_bottom">
            <span>28&deg;- 34&deg;</span>
            <span>Parc.Ensolarado</span>
            <span>Wind:8hm/h</span>
        </div>
    </div>`;
        dailyForecastDiv.innerHTML += dailyItemHtml;

    });

}

function displayHourlyForecast(dailyData) {

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = dailyData.slice(0, 4);

    next24Hours.forEach(element => {
        const dateTime = new Date(element.dt * 8000 );   
        const nomeDia =new Date(element.dt * 8000).toLocaleDateString("pt",
        {
            weekday:"long",
        }) 
        const hora = dateTime.getHours();
        const temperatura = Math.round(element.main.temp - 273.15);
        const mes =dateTime.getMonth();
    const dia = dateTime.getDate();
        const weekDay = dateTime.getUTCDay();
        
        const descricao =  element.weather[0].description;
        const iconCode = element.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `<div class="dias">
        <div class="dias_top">
            <h1>${nomeDia}</h1>
            <span>${dia} de${monthNames[mes]}</span>
        </div>
        <div class="dias_middle">
            <div class="imagem">
                <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="${descricao}"> 
            </div>
        </div>
        <div class="dias_bottom">
            <span>28&deg;- 34&deg;</span>
            <span>Parc.Ensolarado</span>
            <span>Wind:8hm/h</span>
        </div>
    </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });

}

function showImage() {
    const weatherIcon = document.getElementById('w-img');
    weatherIcon.style.display = 'block';
}

function abilitar(params) {
    document.querySelector('#idPesquisa').classList.add('abilitado');
    document.querySelector('.form-pesquisa').classList.add('abilitado');
    document.getElementsByClassName("btn-pesquisa").disabled = true;
    document.getElementById("acert").style.zIndex = "-1";
}