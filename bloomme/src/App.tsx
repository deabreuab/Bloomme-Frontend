import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa 'Routes' en lugar de 'Switch'
import { Home } from './views/Home.view';
import { Login } from './views/Login.view';
import { Quiz } from './views/Quiz.view';
import { QuizQuestion } from './views/QuizQuestion.view';
import { Search } from './views/Search.view';
import { FrontPageView } from './views/FrontPage.view';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<FrontPageView/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/quiz' element={<div className="body-quiz"><Quiz/></div>} />
        <Route path='/quizQuestion/:category' element={<QuizQuestion/>}/>
        <Route path='/search' element={<div className="body-search"><Search/></div>}/>
      </Routes>
    </Router>
  );
};

export default App;
