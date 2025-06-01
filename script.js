const searchInput = document.getElementById('searchInput');
const errorElement = document.querySelector('.error-message');
const weatherContainer = document.querySelector('.weather-container');

searchInput.addEventListener('input', function() {
    const city = searchInput.value.trim();
    if (city.length > 2) {
        getWeatherData(city);
    }
});

// data from api 

async function getWeatherData(city) {
    try {
        errorElement.textContent = '';
        
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=ab665c02dc384b38902150930242803&q=${city}&days=3`
        );
        
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }
        
        const data = await response.json();
        displayWeather(data); 
    } catch (error) {
        errorElement.textContent = error.message;
        weatherContainer.innerHTML = '<p>No data to display</p>';
    }
}

// show data

function displayWeather(data) {
    const today = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;
    
    weatherContainer.innerHTML = `
        <div class="weather-card">
            <h2>${location.name}</h2>
            <div class="today">
                <h3>Today</h3>
                <img src="https:${today.condition.icon}" alt="${today.condition.text}">
                <p>${today.temp_c}°C</p>
                <p>${today.condition.text}</p>
                <p>winds: ${today.wind_kph} kph</p>
            </div>
            
            <div class="tomorrow">
                <h3>tomorrow</h3>
                <img src="https:${forecast[1].day.condition.icon}" alt="${forecast[1].day.condition.text}">
                <p>max-temp: ${forecast[1].day.maxtemp_c}°C</p>
                <p>min-temp: ${forecast[1].day.mintemp_c}°C</p>
            </div>
            
            <div class="after-tomorrow">
                <h3> after tomorrow</h3>
                <img src="https:${forecast[2].day.condition.icon}" alt="${forecast[2].day.condition.text}">
                <p>max-temp: ${forecast[2].day.maxtemp_c}°C</p>
                <p>min-temp: ${forecast[2].day.mintemp_c}°C</p>
            </div>
        </div>
    `;
};