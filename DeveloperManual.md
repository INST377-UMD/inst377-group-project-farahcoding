## Developer Manual

# clone the repository:

git clone https://github.com/BradyB1/react-weather-app.git

# install dependencies:

npm install
npm install @supabase/supabase-js
npm install leaflet.js
npm install react-router-dom

For further information on the dependencies:
"@supabase/supabase-js": "^2.39.0",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"axios": "^1.6.2",
"leaflet": "^1.9.4",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-leaflet": "^4.2.1",
"react-router-dom": "^6.20.1",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

# Folder structure

the public folder contains all of the images used in the project (background and supportive images)
The src folder contains the JavaScript and CSS files. Refer to the Pages folder to find the page folders. You will find the index.css (the main css file for the application) and the Navbar.js/css outside of the pages folder, in the src folder.

# run the applicaiton

npm start

# APIs

The Weatherly applicaiton utiltizes:

1- OpenWeatherMap API's free 'Current weather data'. This allows up to 1000 free calls - you can find obtain an API key by creating an account and requesting a key here: https://openweathermap.org/api

2- Leaflet.js which you can install again if needed through 'npm install react-leaflet' in the terminal. refer to this guide as a reference: https://react-leaflet.js.org/docs/start-installation/

3- Supabase which is an online database platform where you can manage the ContactPage submissions. You can access supabase here: Supabase.com
When you can create a new account and build your table, you will be able to access a unique url and key to the database/table. We have a single table containing 'id','created_at', 'name', 'email', and 'message'

# API Endpoints

GET '/weather?lat={latitude}&lon={longitude}': for weather data specific to latitute and longitude
GET '/weather?q={location}': for weather data based on location name (city)

Refer to the weather.json file for information on how to Fetch weather data such as temperature, min/max temp, etc.

# known bugs:

Sometimes the location is not correct when searched by city - more than one city with the same name -> one will be chosen. The most accurate search is done by allowing location access to the browser and allowing it to use your current location.

If you are experiencing issues with the percision location giving the wrong location -- first ensure that it is not your device providing the wrong location by checking here: https://www.gps-coordinates.net/my-location

# Future Development:

Create more accurate city searching by adding more search parameters such as "City, State"

# Contibutors

Brady Buttrey
Farah Assgari
James Miller
