import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa 'Routes' en lugar de 'Switch'
import { Home } from './views/Home.view';
import { Login } from './views/Login.view';
import { Quiz } from './views/Quiz.view';
import { QuizQuestion } from './views/QuizQuestion.view';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/quizQuestion' element={<QuizQuestion/>}/>
      </Routes>
    </Router>
  );
};

export default App;
