// Select elements from the DOM
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const weatherImg = document.querySelector('.we-img');
const tempElement = document.getElementById('temp');
const cityElement = document.getElementById('city');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

// API details
const apiKey = "fcdf2f31c92952a7d550e99673af27a5";

// Function to fetch weather data
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weatherData = await response.json();
        let f=await weatherData
        console.log(f); // Check the console to see the structure of data

        // Update DOM elements with data
        weatherImg.src = getWeatherImage(f.weather[0].main.toUpperCase());
        tempElement.textContent = `${f.main.temp}°C`;
        cityElement.textContent = f.name;
        humidityElement.textContent = `${f.main.humidity}%`;
        windSpeedElement.textContent = `${f.wind.speed} Km/h`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Function to get appropriate weather image based on weather condition
function getWeatherImage(weatherCondition) {
    switch (weatherCondition) {
        case 'clear':
            return 'images/clear.png';
        case 'clouds':
            return 'images/clouds.png';
        case 'drizzle':
            return 'images/drizzle.png';
        case 'mist':
            return 'images/mist.png';
        case 'snow':
            return 'images/snow.png';
        case 'rain':
            return 'images/rain.png';
        default:
            return 'images/clouds.png';
    }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
        searchInput.value = ''; // Clear input field after search
    } else {
        alert('Please enter a city name!');
    }
});

// Initial weather display (optional)
getWeather('London'); // Default city, you can change it as per your preference
