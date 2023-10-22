/// Formulario 
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    /// Faz a coleta da entrada de dados da  que o usuario digitou
    let input = document.querySelector('#searchInput').value;
    
    /// Condicional se o usuario fez alguma busca
    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        ///API para saber a cidade / localização ( Processamento dos dados )
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`);
        let json = await results.json();

        /// Condicional em json para os dados das cidades ( Dados selecionados para sair  )
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
            /// Condicional caso não ache o resultado
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }
});

/// Mostra as informações do objeto (Saida de dados)

function showInfo(obj) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    
    document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}
/// Informações sobre o resultado e caso o usuario digite algo que não seja relacionado ao contexto do programa 

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'; /// Mostra a saida de dados do que o usuario digitou atraves de um display
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg; /// Mensagem caso ocorra algum erro
}