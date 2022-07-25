import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'

function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] =useState('');
  // const url = process.env.REACT_APP_WEATHER_API_UNUSED
  const url = `https://api.weatherapi.com/v1/current.json?key=4948b55018534a019c853425222307&q=${location}&aqi=no`
  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setWeather(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <React.Fragment>
      <Container>
        {/* <Video src="/Sea Of Clouds.mp4" autoPlay loop muted /> */}
        <Data>
          <Input
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder="Enter Location"
            onKeyPress={searchLocation}
          />
          <Top>
            {weather.location ? <h1>{weather.location.name}, {weather.location.country}</h1> : null}
            {weather.current ? <h1>{weather.current.temp_c}&#8451;</h1> : null}
            {/* <h3>Clouds</h3> */}
            {weather.current ?  <>{weather.current.condition.text}, <img src={weather.current.condition.icon} /> </> : null}
            {weather.location ? <h1>{weather.location.localtime}</h1> : null}
          </Top>
          {/*  */}
          {
            weather.current !== undefined &&
          <Bottom>
            <Name>
              <div>
                {weather.current ? <p>{weather.current.feelslike_c}&#8451;</p> : null}
                <p>Feels like</p>
              </div>
              <div>
              {weather.current ? <p>{weather.current.humidity}</p> : null}
                <p>Humidity</p>
              </div>
              <div>
              {weather.current ? <p>{weather.current.wind_mph}MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </Name>
          </Bottom>
          }

        </Data>
      </Container>
    </React.Fragment>
  );
}

export default App;


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('/pexels-instawalli-165754.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const Video = styled.video`
  height: 100vh;
`

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Input = styled.input`
  margin-top: 50px;
  padding: .7rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.6);
  &::placeholder {
    color: #f8f8f8;
  }
`

const Top = styled.div`
  margin-bottom: 200px;
`

const Bottom = styled.div`

`

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 1rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
`