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
        const { notFound, weather, image, Temp, City, Humidity, WindSpeed } = getElements();

        if (getTemp != null) {

            notFound.classList.add('active');
            notFound.classList.remove('show');
            weather.classList.remove('show');
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
                        image.src = ("icons/clouds.png");
                        break;
                    case 'Haze':
                        image.src = ("icons/smoke.png");
                        break;
                }
                weather.classList.remove('active')
                weather.classList.add('show');

                Temp.textContent = Math.floor(celsius) + '°c'
                City.textContent = getTemp.name
                Humidity.textContent = getTemp.main.humidity + '%'
                WindSpeed.textContent = (windSpeed) + ' Km/h';

            }, 300);
        } else {
            weather.classList.add('active')
            notFound.classList.add('show')
            notFound.classList.remove('active')
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('textInput');
    inputField.addEventListener('keydown', handleEnterPress);
});

function getElements() {
    return {
        notFound: document.getElementById('error'),
        weather: document.getElementById("weatherCast"),
        image: document.getElementById("weatherIcons"),
        Temp: document.getElementById("weather-temp"),
        City: document.getElementById("weather-city"),
        Humidity: document.getElementById('humidity'),
        WindSpeed: document.getElementById('windSpeed')
    };
}