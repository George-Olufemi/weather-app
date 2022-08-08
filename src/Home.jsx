import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    if(location === "") {
      setWeather({})
    }
  }, [weather, location])

  const processFunc = (url, apiKey, params) => {
    if (url){
      return `${url}?key=${apiKey}&q=${location}&${{...params}}`;
    }
    return null;
  }
  const url = process.env.REACT_APP_WEATHER_API
  const key = process.env.REACT_APP_API_KEY 
  const params = `q=${location}&aqi=no12`;

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(processFunc(url, key, params))
      .then((response) => {
        setWeather(response.data)
        //console.log(response.data)
      })
    }
  }
  return (
    <React.Fragment>
      <Container>
        <Header>Welcome to Weathera</Header>
        <HeaderText>Check the weather condition of places in the world right now</HeaderText>
        <Search>
          <InputBox>
            <Icon>
              <Image src="/searchicon.png" alt="Search" />
            </Icon>
            <Input 
              type="text" 
              placeholder="Search any location" 
              value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyPress={searchLocation}
            />
          </InputBox>
          <Button>
            <ButtonText onClick={setLocation}>Go</ButtonText>
          </Button>
        </Search>
        {/*  */}
        {
          weather.current !== undefined && 
        <CardSection>
          <CardOne>
            <CardOneHeader>
              <Location>
                <Image src="/carbon.png" alt="Search" />
              </Location>
              <LocationText>Location</LocationText>
            </CardOneHeader>
            <Null>
                <Link to={`/location/${location}`}>
                    {weather.location ? <State>{weather.location.name},</State> : null}
                    {weather.location ? <Country>{weather.location.country}</Country> : null}
                </Link>
            </Null>
            {/*  */}
            <Time>Time</Time>
            {weather.location ? <Timestamp>{weather.location.localtime}</Timestamp> : null}
          </CardOne>
          <CardTwo>
            <CardOneHeader>
              <Location>
                <Image src="/cloud.png" alt="Cloud" />
              </Location>
              <LocationText>Weather</LocationText>
            </CardOneHeader>
            <Div>
              {weather.current ? <Image src={weather.current.condition.icon} alt="Sun" /> : null}
            </Div>
            {weather.current ? <Description>{weather.current.condition.text}</Description> : null}
            <Temperature>Temperature</Temperature>
            {weather.current ? <TemperatureData>{weather.current.temp_c}&#8451;</TemperatureData> : null}
          </CardTwo>
          <CardThree>
            <OtherConditions>Other Conditions</OtherConditions>
            {/*  */}
            <Temperature>Feels Like</Temperature>
            {weather.current ? <TemperatureData>{weather.current.feelslike_c}&#8451;</TemperatureData> : null}
            {/*  */}
            <Temperature>Humidity</Temperature>
            {weather.current ? <TemperatureData>{weather.current.humidity}</TemperatureData> : null}
            {/*  */}
            <Temperature>Wind Speed</Temperature>
            {weather.current ? <TemperatureData>{weather.current.wind_mph}MPH</TemperatureData> : null}
          </CardThree>
        </CardSection>
        }
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: url('/background.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media (max-width: 700px) {
    background: linear-gradient(pink, purple);
    height: auto;
    padding-bottom: 50px;
  }
`

const Header = styled.h1`
  text-align: center;
  margin-top: 50px;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 43px;
  color: #FFFFFF;
`

const HeaderText = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 32px;
  color: #FFFFFF;
  margin-bottom: 48px;
`

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const InputBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 600px;
  height: 60px;
  background: rgba(72, 72, 72, 0.4);
  border-radius: 20px;
  margin-right: 20px;
  @media (max-width: 700px) {
    margin-left: 20px;
  }
`

const Icon =styled.div`
  margin-left: 21.67px;
  margin-right: 22.5px
`
const Image = styled.img`
  
`

const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  width: 500px;
  height: 40px;
  font-size: 24px;
  color: white;
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    color: #FFFFFF;
  }
  @media (max-width: 700px) {
    width: 300px;
  }
`

const Button = styled.button`
  display: none;
  flex-direction: row;
  align-items: center;
  padding: 15.5px 20px;
  gap: 20px;
  width: 74px;
  height: 60px;
  background: #262626;
  border: 1px solid #262626;
  border-radius: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
`

const ButtonText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
`

const CardSection = styled.div`
  margin-top: 121px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    display: block;
  }
`

const CardOne = styled.div`
  width: 300px;
  height: 400px;
  margin-right: 40.75px;
  background: linear-gradient(156.49deg, rgba(0, 0, 0, 0.084) 0%, rgba(0, 0, 0, 0.14) 93.13%);
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 4px rgba(215, 215, 215, 0.25);
  backdrop-filter: blur(50px);
  border-radius: 30px;
  cursor: pointer;
  @media (max-width: 700px) {
    margin-left: 55px;
    margin-bottom: 20px;
  }
`

const CardOneHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Location = styled.div`
  margin-right: 15.75px;
`

const LocationText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const State = styled.p`
  margin-left: 20px;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const Country = styled.p`
  margin-left: 20px;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const Time = styled.h4`
  margin-left: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const Timestamp = styled.p`
  margin-left: 20px;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const CardTwo = styled.div`
  width: 300px;
  height: 400px;
  margin-left: 40.75px;
  margin-right: 40.75px;
  background: linear-gradient(156.49deg, rgba(0, 0, 0, 0.084) 0%, rgba(0, 0, 0, 0.14) 93.13%);
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 4px rgba(215, 215, 215, 0.25);
  backdrop-filter: blur(50px);
  border-radius: 30px;
  cursor: pointer;
  @media (max-width: 700px) {
    margin-left: 55px;
    margin-bottom: 20px;
  }
`

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Description = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const Temperature = styled.h1`
  margin-left: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const TemperatureData = styled.div`
  margin-left: 20px;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const CardThree = styled.div`
  width: 300px;
  height: 400px;
  margin-left: 40.75px;
  background: linear-gradient(156.49deg, rgba(0, 0, 0, 0.084) 0%, rgba(0, 0, 0, 0.14) 93.13%);
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 4px rgba(215, 215, 215, 0.25);
  backdrop-filter: blur(50px);
  border-radius: 30px;
  cursor: pointer;
  @media (max-width: 700px) {
    margin-left: 55px;
    margin-bottom: 30px;
  }
`

const OtherConditions = styled.h1`
  margin-top: 20px;
  margin-bottom: 32px;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
`

const Null = styled.div`
    cursor: pointer;
`

