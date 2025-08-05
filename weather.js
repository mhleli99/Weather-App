document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    
    // Default city when page loads
    fetchWeather('London');
    
    // Event listener for search button
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
    
    // Event listener for Enter key
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });
    
    function fetchWeather(city) {
        fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey})
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                alert(error.message);
                console.error('Error:', error);
            });
    }
    
    function displayWeather(data) {
        // Update city name
        document.getElementById('city-name').textContent = ${data.name}, ${data.sys.country};
        
        // Update date
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
        
        // Update temperature
        document.getElementById('temp').textContent = Math.round(data.main.temp);
        
        // Update weather icon and description
        const iconCode = data.weather[0].icon;
        const iconUrl = https://openweathermap.org/img/wn/${iconCode}@2x.png;
        document.getElementById('weather-icon').src = iconUrl;
        document.getElementById('weather-icon').alt = data.weather[0].description;
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        
        // Update humidity
        document.getElementById('humidity').textContent = ${data.main.humidity}%;
        
        // Update wind speed
        document.getElementById('wind-speed').textContent = ${Math.round(data.wind.speed * 3.6)} km/h;
    }
});