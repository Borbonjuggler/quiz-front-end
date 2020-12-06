import React from 'react';
import ReactDOM from 'react-dom'; //webpage
import './assets/style.css';
import MemGame from './components/MemGame';
import QuizzBee from './components/Quizz';
import QuizzBee1 from './components/Quizz1';


ReactDOM.render(
  <QuizzBee />,
  // <MemGame />,
  <QuizzBee1 />,
  document.getElementById('root'));
