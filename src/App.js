import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from "react-router-dom"
import Activity from "./Activity"
import Details from "./Details"

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';

// import Activity_details from './Activity_details.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <div className="container-view">Some activities should be here</div>
      <Activity />


    </div>
  );
};
export default App;
