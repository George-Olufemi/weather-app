import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import processFunc  from "./Home";

export default function Place() {
  const [location, setLocation] = useState("");

  const processFunc = (url, apiKey, params) => {
    if (url){
      return `${url}?key=${apiKey}&q=${location}&${{...params}}`;
    }
    return null;
  }

  const { id } = useParams();
  return (
    <React.Fragment>
        <div>
          <h1>Lagos, Nigeria</h1>
          <p>Time: 2pm</p>
          <p>Humidity: 30</p>
          <p>Temperature: 20 C</p>
          <p>Light Rain Shower: yes</p>
        </div>
    </React.Fragment>
  )
}