const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        });
    }
});

function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        alert('Please enter a location');
    }
}

function displayWeather(data) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');

    locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
    conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
}
