import './App.css';
import Landing from './pages/landing';
import Compare from './pages/compare';
import TimeLine from './pages/timeline';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import BasicNav from './pages/components/Navbar';



function App() {
  return (
    <>
      <BasicNav />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='/timeline' element={<TimeLine />} />
      </Routes>
    </>

  );
}

export default App;
