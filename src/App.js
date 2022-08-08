import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Place from './Place'

export default function Homee() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location/:id" element={<Place />} />
        </Routes>
    </BrowserRouter>
  )
}