async function getWeather(cidade) {
    try {
        const apiKey = "11cb5eefb25088199665927fa6eddd61";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`)

        const resultado = await response.json()
        if (resultado.cod == 404) {
            throw new Error("Cidade não encontrada")
        } else if (resultado.cod == 200) {
            return resultado
        } else {
            alert("Error ", resultado.cod)
        }
    } catch (error) {
        console.error(error);
        return null
    }
}

async function handleEnterPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão se necessário
        const inputValue = event.target.value;
        const getTemp = await getWeather(inputValue)


        let notFound = document.getElementById('error')
        let weather = document.getElementById("weather")
        let image = document.getElementById("teste");
        let weatherInfo = document.getElementById("weatherInfo")
        let weatherTemp = document.getElementById("weather-temp")
        let weatherCity = document.getElementById("weather-city")
        let weatherHumidity = document.getElementById('humidity')
        let weatherwindSpeed = document.getElementById('windSpeed')

        if (getTemp != null) {

            notFound.classList.add('active');
            notFound.classList.remove('show');

            weather.classList.remove('show');
            weatherInfo.classList.remove('show');

            let celsius = getTemp.main.temp - 273;
            let windSpeed = (getTemp.wind.speed * 3.6).toFixed(2);

            setTimeout(() => {
                switch (getTemp.weather[0].main) {
                    case 'Clear':
                        image.src = ("icons/clear.png");
                        break;
                    case 'Rain':
                        image.src = ("icons/rainy.png");
                        break;
                    case 'Thunderstorm':
                        image.src = ("icons/storm.png");
                        break;
                    case 'Snow':
                        image.src = ("icons/snow.png");
                        break;
                    case 'Mist':
                        image.src = ("icons/mist.png");
                        break;
                    case 'Smoke':
                        image.src = ("icons/smoke.png");
                        break;
                    case 'Clouds':
                        image.src = ("icons/cloud.png");
                        break;
                }
                weather.classList.remove('active')
                weatherInfo.classList.remove('active')

                weather.classList.add('show');
                weatherInfo.classList.add('show');

                weatherTemp.textContent = Math.floor(celsius) + '°c'
                weatherCity.textContent = getTemp.name

                weatherHumidity.textContent = getTemp.main.humidity + '%'
                weatherwindSpeed.textContent = (windSpeed) + ' Km/h';
            }, 300);
        } else {
            weather.classList.add('active')
            weatherInfo.classList.add('active')

            notFound.classList.add('show')
            notFound.classList.remove('active')
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('textInput');
    inputField.addEventListener('keydown', handleEnterPress);
});
