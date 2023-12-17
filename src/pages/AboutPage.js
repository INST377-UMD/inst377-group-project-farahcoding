// test
import React, { useEffect } from 'react';

const About = () => {

  useEffect(() => {
    document.title = "Weatherly | About";
    document.body.classList.add('about-page'); 
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);
  return (
    <div className="app-about">
      <h1 id="about-h1">About <hr id="about-h1-hr" /></h1>
      <div className="text-content-about">
        <div className="about-section" id="about-site-desc">
          <p>
            Weatherly provides different metrics for a specific location. When a user opens the application, the user's coordinates are used to populate the home page with the default location's weather metrics. If the host device's location is disabled or location is not found, the user would be prompted to manually enter the location in the search input field.
          </p>
        </div>
        <div className="about-section" id="tech-stack-desc">
          <dl>
            <dt id = "tech-stack">Technology Stack Utilized:</dt>
            <hr />
            <dd>- FrontEnd: <b>React</b></dd>
            <img src= "/reactImg.jpg" id = "reactImg" alt = "reactImg"></img>
            <dd>- DataBase: <b>Supabase</b></dd>
            <img src= "/channels4_profile.jpg" id = "supabaseImg" alt = 'supabaseImg'></img>
            <dd>- Deployment: <b>Vercel</b></dd>
            <img src= "/vercelImg.png" id = "vercelImg" alt = "vercelImg"></img>
          </dl>
        </div>
        <div className="about-section" id="about-api-desc">
          <dl>
            <dt id = "tech-stack">Data retrieved from:</dt>
            <hr />
            <dd>- <b>OpenWeatherMap</b>: This API allowed us to fetch data regarding the weather and conditions in different locations.</dd>
            <dd>- <b>Geolocation</b>: This API allows the app to collect the user's current location, eliminating the need for users to enter their current address to get results. -- Please ensure you have location features enabled on whatever browser you are using.</dd>
            <dd>- <b>Leaflet.js</b>: Leaflet.js allows the application to generate a map, focusing and pinning on your location or the location you search.</dd>
          </dl>
          <span> <img src = "opwimg.png" id = "opwimg" alt = "opwimg"></img> <img src = "geoloc.png" id = "geoloc" alt = "geolocimg"></img> <img src ="leaf.jpg" id="leafimg" alt = "leafimg"></img></span>
        </div>
        <div className="button-container">
        <p id ="button-container-text">For more instructions:</p>
          <a href = "https://github.com/BradyB1/react-weather-app/blob/main/UserManual.md" target="_blank" rel="noopener noreferrer">
        <button className="button"><span>User Manual</span></button>
        </a>
        
        <a href = "https://github.com/BradyB1/react-weather-app/blob/main/DeveloperManual.md" target="_blank" rel="noopener noreferrer">
        <button className="button"><span>Dev Manual</span></button>
        </a>
        </div>
      </div>
      
      <footer id="about-designedBy">Designed & Developed by: Brady Buttrey, Farah Assgari, and James Miller.</footer>
      
    </div>
    
  );
}

export default About;