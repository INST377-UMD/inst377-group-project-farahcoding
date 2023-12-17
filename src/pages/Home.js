import React, { useState, useEffect } from 'react';
import '../index.css';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet/dist/images/marker-icon.png'; 
import 'leaflet/dist/images/marker-shadow.png'; 
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const customMarker = (temperature, zoom) => {
  const size = Math.max(20, 50 / Math.pow(2, zoom - 10));
  return L.divIcon({
    className: "custom-marker",
    html: `${temperature}°F`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

const Home = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState([0, 0]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false)

  useEffect(() => {
    const storedRecentSearches = localStorage.getItem('recentSearches');
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          getWeatherData(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting geolocation: ${error.message}`);
          setLoading(false);
          setError('Error getting geolocation. Please enter a location manually.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
      setError('Geolocation is not supported. Please enter a location manually.');
    }
  }, []);

  /** get home background image for each weather description */
  const getBackgroundImage = () => {
    if (weatherData && weatherData.weather && weatherData.weather[0]) {
      const weatherDescription = weatherData.weather[0].main;

      switch (weatherDescription) {
        case 'Thunderstorm':
          return 'url(thunderstorm.jpg)';
        case 'Drizzle':
          return 'url(drizzle.jpg)';
        case 'Rain':
          return 'url(rain.jpg)';
        case 'Snow':
          return 'url(snow.jpg)';
        case 'Atmosphere':
          return 'url(atmosphere.jpg)';
        case 'Clear':
          return 'url(clear.jpg)';
        case 'Clouds':
          return 'url(cloudy.jpg)';
        default:
          return 'url(clear.jpg)';
      }
    }

    return 'url(default-background.jpg)';
  };

  /** style background image*/
    const backgroundStyle = {
      backgroundImage: getBackgroundImage(),
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%', 
    };
  
    /** return data from weather API for location coordinate */
    const getWeatherData = (lat, long) => {
      const api_key = '438f4f20a95048ebb8bbf12f71594554';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${api_key}`;
  
      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
          setCenter([lat, long]);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
          setError('Error fetching weather data. Please try again.');
        });
      setLocation('');
    };
  
    /** get location coordinate and details from weather API */
    const searchLocation = async (event) => {
      if (event.key === 'Enter') {
        setLoading(true);
        const api_key = '438f4f20a95048ebb8bbf12f71594554';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${api_key}`;
    
        try {
          const response = await axios.get(url);
          setWeatherData(response.data);
          const searchedLocation = response.data.name;
          setLoading(false);
          setError(null);

          updateRecentSearches(searchedLocation);
    
          getWeatherData(response.data.coord.lat, response.data.coord.lon);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setLoading(false);
          setError('Location not found. Please try again.');
        }
      }
    };
    
    /** store recent searches in array */
    const updateRecentSearches = (searchedLocation) => {
      const updatedRecentSearches = Array.from(new Set([searchedLocation, ...recentSearches]));
      setRecentSearches(updatedRecentSearches.slice(0, 5));
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches.slice(0, 5)));
    };
    
    /** perform weather search when a location from recent list is clicked*/
    const handleRecentSearch = (search, event) => {
      event.preventDefault(); 
    
      setLoading(true);
      const api_key = '438f4f20a95048ebb8bbf12f71594554';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${api_key}`;
    
      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
          setLoading(false);
          setError(null);

          const updatedRecentSearches = Array.from(new Set([search, ...recentSearches]));
          setRecentSearches(updatedRecentSearches);
          localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));

          console.log('Order of places in the array:', updatedRecentSearches);
    
          getWeatherData(response.data.coord.lat, response.data.coord.lon);
    
          setShowRecentSearches(false);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
          setError('Location not found. Please try again.');
        });
    };
    
    /** display list of 5 most recent locations searches on home page */
    const renderRecentSearches = () => {
      const limitedRecentSearches = recentSearches.slice(0, 5);
    
      return (
        <div className="recent-searches">
          <ul>
            {limitedRecentSearches.map((search, index) => (
              <li key={index} onClick={(event) => handleRecentSearch(search, event)}>
                {search}
              </li>
            ))}
          </ul>
        </div>
      );
    };

  /* display map for recent searched location */
    function handleViewLocation() {
      if (weatherData && weatherData.coord) {
        const { lat, lon } = weatherData.coord;
        const cityName = weatherData.name;
        const temperature = weatherData.main ? weatherData.main.temp.toFixed() : '';
  
        return (
          <MapContainer
            center={[lat, lon]}
            zoom={15}
            style={{ height: '600px', width: '100%' }}
            whenCreated={(map) => {
              map.on('zoom', () => {
                setZoom(map.getZoom());
              });
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lon]} icon={customMarker(temperature, zoom)}>
              <Popup>{cityName}</Popup>
            </Marker>
          </MapContainer>
        );
      }
    }

  return (
    <div className="app" style={backgroundStyle}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location (City)"
          type="text"
          onFocus={() => setShowRecentSearches(true)} // Show recent searches when clicked
          onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)} // Hide recent searches after a short delay
        />
        {showRecentSearches && renderRecentSearches()}
      </div>

      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <div className="top">
              <div className="location">
                <p>{weatherData.name}</p>
              </div>
              <div className="temp">
                {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}°F</h1> : null}
              </div>
              <div className="description">
                {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
              </div>
            </div>

            <div className="data-box-container">
              <div className="feels-box">
                <div className="feels">
                  {weatherData.main ? (
                    <p className="bold">{weatherData.main.feels_like.toFixed()}°F</p>
                  ) : null}
                  <p>Feels Like</p>
                </div>
              </div>

              <div className="humidity-box">
                <div className="humidity">
                  {weatherData.main ? (
                    <p className="bold">{weatherData.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind-box">
                <div className="wind">
                  {weatherData.wind ? (
                    <p className="bold">{weatherData.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p>Wind Speed</p>
                </div>
              </div>

              <div className="clouds-box">
                <div className="clouds">
                  {weatherData.clouds ? (
                    <p className="bold">{weatherData.clouds.all}%</p>
                  ) : null}
                  <p>Cloudiness</p>
                </div>
              </div>

              {/* <div className="min-max-box">
                <div className="min-max">
                  {weatherData.main ? (
                    <p className="bold">
                      {weatherData.main.temp_min.toFixed()}°F-{weatherData.main.temp_max.toFixed()}°F
                    </p>
                  ) : null}
                  <p>Min-Max</p>
                </div>
              </div> */}
            
              <div className="min-box">
                <div className="min">
                  {weatherData.main ? (
                    <p className="bold">
                      {weatherData.main.temp_min.toFixed()}°F
                    </p>
                  ) : null}
                  <p>Todays Low</p>
                </div>
              </div>

            {/* adding */}
            <div className="max-box">
                <div className="max">
                  {weatherData.main ? (
                    <p className="bold">
                      {weatherData.main.temp_max.toFixed()}°F
                    </p>
                  ) : null}
                  <p>Todays High</p>
                </div>
              </div>


              <div className="sunrise-box">
                <div className="sunrise">
                  {weatherData.sys ? (
                    <p className="bold">
                      {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  ) : null}
                  <p>Sunrise</p>
                </div>
              </div>

              <div className="sunset-box">
                <div className="sunset">
                  {weatherData.sys ? (
                    <p className="bold">
                      {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  ) : null}
                  <p>Sunset</p>
                </div>
              </div>
            </div>
            {handleViewLocation(center)}
          </div>
        )}
      </div>
      <div>
      </div>
    </div>
  );
};

export default Home;