//I want to create a weather app using React JS

//Useful imports that I would be working with -->
import React, { useState } from 'react'
//require('dotenv').config();

//This declares the api that we would be using for the tutorial
const api = {
  //Replace the weather api key and api base url with yours
  key: process.env.API_KEY,
  base: process.env.API_BASE
}


//This handles the main app function
function App() {

  //Setting the use state
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  //This handles the query of the weather
  const search = evt => {
    try {
      if(evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result) //This sets the result as the weather
            setQuery("") //This sets the search box back to blank
            console.log(result, "result")});
            // if (result.cod === "404") {
            //   throw "Name of country not found"
            // }}
    }}
    catch(ex){
      console.log(`An error occurred due to ${ex}`)
    }
  }

  //Setting the date builder
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  
  return (

    //Checking to see if the temp is cold or warm to change picture
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 
    "app warm" : "app") : "app"}> 
      <main> 
        <div className='search-box'> 
          <input type="text" className="search-bar" placeholder='Search city...' 
          onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box"> 
              <div className='location'> {weather.name}, {weather.sys.country} </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'> 
              <div className='temp'> {Math.round(weather.main.temp)}°C </div>
              <div className='weather'> {weather.weather[0].main} </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App;
